-- Sync TropiTrack data to leads tables
-- This script pulls data from TropiTrack database to populate the leads tables

-- Function to sync TropiTrack clients to leads
CREATE OR REPLACE FUNCTION sync_tropitrack_clients_to_leads()
RETURNS INTEGER AS $$
DECLARE
  client_record RECORD;
  lead_id UUID;
  synced_count INTEGER := 0;
BEGIN
  -- Loop through TropiTrack clients and create leads for them
  FOR client_record IN 
    SELECT 
      c.id as tropitrack_client_id,
      c.name as company_name,
      c.email,
      c.phone,
      c.company_size,
      c.industry,
      c.created_at,
      c.status
    FROM tropitrack.clients c
    WHERE c.status = 'active'
  LOOP
    -- Check if lead already exists for this TropiTrack client
    SELECT id INTO lead_id 
    FROM leads 
    WHERE tropitrack_client_id = client_record.tropitrack_client_id;
    
    -- If lead doesn't exist, create it
    IF lead_id IS NULL THEN
      INSERT INTO leads (
        company_name,
        contact_name,
        email,
        phone,
        company_size,
        industry,
        status,
        source,
        tropitrack_client_id,
        created_at,
        description
      ) VALUES (
        client_record.company_name,
        client_record.company_name, -- Use company name as contact name initially
        client_record.email,
        client_record.phone,
        client_record.company_size,
        client_record.industry,
        CASE 
          WHEN client_record.status = 'active' THEN 'app_converted'
          ELSE 'app_interested'
        END,
        'tropitrack_migration',
        client_record.tropitrack_client_id,
        client_record.created_at,
        'Imported from TropiTrack client database'
      ) RETURNING id INTO lead_id;
      
      synced_count := synced_count + 1;
    END IF;
  END LOOP;
  
  RETURN synced_count;
END;
$$ LANGUAGE plpgsql;

-- Function to sync TropiTrack trial data to app_trials table
CREATE OR REPLACE FUNCTION sync_tropitrack_trials()
RETURNS INTEGER AS $$
DECLARE
  trial_record RECORD;
  lead_id UUID;
  trial_id UUID;
  synced_count INTEGER := 0;
BEGIN
  -- Loop through TropiTrack subscriptions and create trial records
  FOR trial_record IN 
    SELECT 
      s.id as tropitrack_subscription_id,
      s.client_id,
      s.plan,
      s.status,
      s.created_at as trial_start_date,
      s.current_period_end as trial_end_date,
      c.name as company_name
    FROM tropitrack.subscriptions s
    JOIN tropitrack.clients c ON s.client_id = c.id
    WHERE s.plan LIKE '%trial%' OR s.status = 'trialing'
  LOOP
    -- Find the corresponding lead
    SELECT id INTO lead_id 
    FROM leads 
    WHERE tropitrack_client_id = trial_record.client_id;
    
    -- If lead exists, create trial record
    IF lead_id IS NOT NULL THEN
      -- Check if trial already exists
      SELECT id INTO trial_id 
      FROM app_trials 
      WHERE tropitrack_subscription_id = trial_record.tropitrack_subscription_id;
      
      IF trial_id IS NULL THEN
        INSERT INTO app_trials (
          lead_id,
          app_name,
          trial_start_date,
          trial_end_date,
          trial_status,
          tropitrack_subscription_id,
          trial_notes
        ) VALUES (
          lead_id,
          'TropiTrack',
          trial_record.trial_start_date,
          trial_record.trial_end_date,
          CASE 
            WHEN trial_record.status = 'active' THEN 'active'
            WHEN trial_record.status = 'canceled' THEN 'cancelled'
            WHEN trial_record.status = 'past_due' THEN 'expired'
            ELSE 'active'
          END,
          trial_record.tropitrack_subscription_id,
          'Imported from TropiTrack subscription data'
        );
        
        synced_count := synced_count + 1;
      END IF;
    END IF;
  END LOOP;
  
  RETURN synced_count;
END;
$$ LANGUAGE plpgsql;

-- Function to update lead metrics from TropiTrack usage data
CREATE OR REPLACE FUNCTION update_lead_metrics_from_tropitrack()
RETURNS INTEGER AS $$
DECLARE
  usage_record RECORD;
  lead_id UUID;
  trial_id UUID;
  updated_count INTEGER := 0;
BEGIN
  -- Update app_trials with usage metrics from TropiTrack
  FOR usage_record IN 
    SELECT 
      c.id as client_id,
      COUNT(DISTINCT u.id) as users_count,
      COUNT(DISTINCT p.id) as projects_count,
      COUNT(DISTINCT te.id) as time_entries_count
    FROM tropitrack.clients c
    LEFT JOIN tropitrack.users u ON u.client_id = c.id
    LEFT JOIN tropitrack.projects p ON p.client_id = c.id
    LEFT JOIN tropitrack.time_entries te ON te.user_id = u.id
    WHERE c.status = 'active'
    GROUP BY c.id
  LOOP
    -- Find the corresponding lead
    SELECT id INTO lead_id 
    FROM leads 
    WHERE tropitrack_client_id = usage_record.client_id;
    
    IF lead_id IS NOT NULL THEN
      -- Update the app_trials record
      UPDATE app_trials 
      SET 
        users_count = usage_record.users_count,
        projects_count = usage_record.projects_count,
        time_entries_count = usage_record.time_entries_count,
        updated_at = NOW()
      WHERE lead_id = lead_id AND app_name = 'TropiTrack';
      
      updated_count := updated_count + 1;
    END IF;
  END LOOP;
  
  RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate and update lead metrics
CREATE OR REPLACE FUNCTION calculate_lead_metrics()
RETURNS VOID AS $$
BEGIN
  -- Insert or update metrics for today
  INSERT INTO lead_metrics (
    date,
    total_leads,
    new_leads,
    qualified_leads,
    converted_leads,
    lost_leads,
    app_interested_count,
    demo_scheduled_count,
    trial_active_count,
    app_converted_count,
    conversion_rate
  )
  SELECT 
    CURRENT_DATE,
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE status = 'new') as new_leads,
    COUNT(*) FILTER (WHERE status = 'qualified') as qualified_leads,
    COUNT(*) FILTER (WHERE status = 'won' OR status = 'app_converted') as converted_leads,
    COUNT(*) FILTER (WHERE status = 'lost') as lost_leads,
    COUNT(*) FILTER (WHERE status = 'app_interested') as app_interested_count,
    COUNT(*) FILTER (WHERE status = 'demo_scheduled') as demo_scheduled_count,
    COUNT(*) FILTER (WHERE status = 'trial_active') as trial_active_count,
    COUNT(*) FILTER (WHERE status = 'app_converted') as app_converted_count,
    CASE 
      WHEN COUNT(*) > 0 THEN 
        (COUNT(*) FILTER (WHERE status = 'won' OR status = 'app_converted')::DECIMAL / COUNT(*)::DECIMAL) * 100
      ELSE 0 
    END as conversion_rate
  FROM leads
  ON CONFLICT (date) DO UPDATE SET
    total_leads = EXCLUDED.total_leads,
    new_leads = EXCLUDED.new_leads,
    qualified_leads = EXCLUDED.qualified_leads,
    converted_leads = EXCLUDED.converted_leads,
    lost_leads = EXCLUDED.lost_leads,
    app_interested_count = EXCLUDED.app_interested_count,
    demo_scheduled_count = EXCLUDED.demo_scheduled_count,
    trial_active_count = EXCLUDED.trial_active_count,
    app_converted_count = EXCLUDED.app_converted_count,
    conversion_rate = EXCLUDED.conversion_rate,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to calculate average response time
CREATE OR REPLACE FUNCTION calculate_avg_response_time()
RETURNS VOID AS $$
BEGIN
  -- Update lead_metrics with average response time
  UPDATE lead_metrics 
  SET avg_response_time_minutes = (
    SELECT COALESCE(AVG(response_time_minutes), 0)
    FROM lead_response_logs 
    WHERE DATE(created_at) = lead_metrics.date
  )
  WHERE date = CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Execute the sync functions
-- Note: These would need to be run with proper TropiTrack database access
-- SELECT sync_tropitrack_clients_to_leads();
-- SELECT sync_tropitrack_trials();
-- SELECT update_lead_metrics_from_tropitrack();
-- SELECT calculate_lead_metrics();
-- SELECT calculate_avg_response_time();

-- Create a scheduled job to run these syncs (if using pg_cron extension)
-- SELECT cron.schedule('sync-tropitrack-leads', '0 */6 * * *', 'SELECT sync_tropitrack_clients_to_leads();');
-- SELECT cron.schedule('sync-tropitrack-trials', '0 */6 * * *', 'SELECT sync_tropitrack_trials();');
-- SELECT cron.schedule('update-lead-metrics', '0 */2 * * *', 'SELECT calculate_lead_metrics();');

-- Sample queries to test the data

-- Get all leads with their TropiTrack integration status
SELECT 
  l.company_name,
  l.status,
  l.source,
  l.estimated_value,
  at.trial_status,
  at.users_count,
  at.projects_count,
  at.time_entries_count
FROM leads l
LEFT JOIN app_trials at ON l.id = at.lead_id AND at.app_name = 'TropiTrack'
ORDER BY l.created_at DESC;

-- Get lead metrics for the last 30 days
SELECT 
  date,
  total_leads,
  new_leads,
  converted_leads,
  conversion_rate,
  app_interested_count,
  trial_active_count,
  app_converted_count
FROM lead_metrics
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY date DESC;

-- Get trial users summary
SELECT 
  l.company_name,
  at.trial_start_date,
  at.trial_end_date,
  at.trial_status,
  at.users_count,
  at.projects_count,
  CASE 
    WHEN at.trial_end_date IS NOT NULL AND at.trial_end_date < NOW() THEN 'Expired'
    WHEN at.trial_end_date IS NOT NULL AND at.trial_end_date < NOW() + INTERVAL '7 days' THEN 'Expiring Soon'
    WHEN at.trial_status = 'active' THEN 'Active'
    ELSE 'Other'
  END as trial_status_display
FROM app_trials at
JOIN leads l ON at.lead_id = l.id
WHERE at.app_name = 'TropiTrack'
ORDER BY at.trial_end_date ASC;

-- Get lead sources breakdown
SELECT 
  source,
  COUNT(*) as lead_count,
  COUNT(*) FILTER (WHERE status IN ('won', 'app_converted')) as converted_count,
  ROUND(
    (COUNT(*) FILTER (WHERE status IN ('won', 'app_converted'))::DECIMAL / COUNT(*)::DECIMAL * 100, 2
  ) as conversion_rate
FROM leads
GROUP BY source
ORDER BY lead_count DESC; 