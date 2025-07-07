-- Create leads tables for TropiTech CRM
-- This script creates all necessary tables for the leads page functionality

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types for lead statuses and sources
CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted',
  'qualified',
  'proposal_sent',
  'negotiation',
  'won',
  'lost',
  'app_interested',
  'demo_scheduled',
  'trial_active',
  'app_converted'
);

CREATE TYPE lead_source AS ENUM (
  'website',
  'referral',
  'social_media',
  'events',
  'cold_outreach',
  'advertising',
  'partnership',
  'other'
);

CREATE TYPE lead_priority AS ENUM (
  'low',
  'medium',
  'high',
  'urgent'
);

CREATE TYPE trial_status AS ENUM (
  'active',
  'expired',
  'converted',
  'cancelled'
);

-- Main leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  company_size VARCHAR(50),
  industry VARCHAR(100),
  description TEXT,
  status lead_status DEFAULT 'new',
  priority lead_priority DEFAULT 'medium',
  source lead_source,
  source_details TEXT,
  estimated_value DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- TropiTrack integration fields
  tropitrack_client_id UUID,
  tropitrack_company_id UUID,
  
  -- Lead progression tracking
  first_contact_date TIMESTAMP WITH TIME ZONE,
  last_contact_date TIMESTAMP WITH TIME ZONE,
  next_follow_up_date TIMESTAMP WITH TIME ZONE,
  
  -- App-specific fields
  interested_apps TEXT[], -- Array of app names they're interested in
  trial_start_date TIMESTAMP WITH TIME ZONE,
  trial_end_date TIMESTAMP WITH TIME ZONE,
  trial_status trial_status,
  
  -- Assignment and ownership
  assigned_to UUID REFERENCES profiles(id),
  created_by UUID REFERENCES profiles(id),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead activities/notes table
CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL, -- 'call', 'email', 'meeting', 'note', 'status_change'
  subject VARCHAR(255),
  description TEXT,
  duration_minutes INTEGER,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  completed_date TIMESTAMP WITH TIME ZONE,
  
  -- User tracking
  created_by UUID REFERENCES profiles(id),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead stage history for tracking progression
CREATE TABLE lead_stage_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  from_status lead_status,
  to_status lead_status NOT NULL,
  reason TEXT,
  changed_by UUID REFERENCES profiles(id),
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead sources tracking
CREATE TABLE lead_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  source_type lead_source,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead response time tracking
CREATE TABLE lead_response_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  response_time_minutes INTEGER,
  response_type VARCHAR(50), -- 'email', 'call', 'meeting'
  responded_by UUID REFERENCES profiles(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- App trials tracking (for TropiTrack integration)
CREATE TABLE app_trials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  app_name VARCHAR(100) NOT NULL, -- 'TropiTrack', 'TropiBrain', etc.
  trial_start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  trial_end_date TIMESTAMP WITH TIME ZONE,
  trial_status trial_status DEFAULT 'active',
  tropitrack_subscription_id VARCHAR(255),
  trial_notes TEXT,
  
  -- Usage metrics
  users_count INTEGER DEFAULT 0,
  projects_count INTEGER DEFAULT 0,
  time_entries_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead metrics aggregation table (for performance)
CREATE TABLE lead_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  total_leads INTEGER DEFAULT 0,
  new_leads INTEGER DEFAULT 0,
  qualified_leads INTEGER DEFAULT 0,
  converted_leads INTEGER DEFAULT 0,
  lost_leads INTEGER DEFAULT 0,
  avg_response_time_minutes INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0,
  
  -- App-specific metrics
  app_interested_count INTEGER DEFAULT 0,
  demo_scheduled_count INTEGER DEFAULT 0,
  trial_active_count INTEGER DEFAULT 0,
  app_converted_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(date)
);

-- Create indexes for better performance
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_tropitrack_client_id ON leads(tropitrack_client_id);
CREATE INDEX idx_leads_trial_status ON leads(trial_status);

CREATE INDEX idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX idx_lead_activities_created_at ON lead_activities(created_at);

CREATE INDEX idx_lead_stage_history_lead_id ON lead_stage_history(lead_id);
CREATE INDEX idx_lead_stage_history_changed_at ON lead_stage_history(changed_at);

CREATE INDEX idx_app_trials_lead_id ON app_trials(lead_id);
CREATE INDEX idx_app_trials_app_name ON app_trials(app_name);
CREATE INDEX idx_app_trials_trial_status ON app_trials(trial_status);

CREATE INDEX idx_lead_metrics_date ON lead_metrics(date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lead_activities_updated_at BEFORE UPDATE ON lead_activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lead_sources_updated_at BEFORE UPDATE ON lead_sources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_app_trials_updated_at BEFORE UPDATE ON app_trials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lead_metrics_updated_at BEFORE UPDATE ON lead_metrics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default lead sources
INSERT INTO lead_sources (name, source_type, description) VALUES
  ('Website', 'website', 'Leads from company website'),
  ('Referral', 'referral', 'Leads from customer referrals'),
  ('Social Media', 'social_media', 'Leads from social media platforms'),
  ('Events', 'events', 'Leads from trade shows and events'),
  ('Cold Outreach', 'cold_outreach', 'Leads from cold calling/emailing'),
  ('Advertising', 'advertising', 'Leads from paid advertising'),
  ('Partnership', 'partnership', 'Leads from business partnerships'),
  ('Other', 'other', 'Other lead sources');

-- Create RLS policies for security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_stage_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_response_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_metrics ENABLE ROW LEVEL SECURITY;

-- RLS policies for leads table
CREATE POLICY "Users can view leads from their company" ON leads
  FOR SELECT USING (
    assigned_to IN (
      SELECT id FROM profiles WHERE company_id = (
        SELECT company_id FROM profiles WHERE id = auth.uid()
      )
    ) OR created_by IN (
      SELECT id FROM profiles WHERE company_id = (
        SELECT company_id FROM profiles WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can insert leads for their company" ON leads
  FOR INSERT WITH CHECK (
    created_by IN (
      SELECT id FROM profiles WHERE company_id = (
        SELECT company_id FROM profiles WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can update leads they created or are assigned to" ON leads
  FOR UPDATE USING (
    created_by = auth.uid() OR assigned_to = auth.uid()
  );

-- RLS policies for other tables (similar pattern)
CREATE POLICY "Users can view lead activities for their company leads" ON lead_activities
  FOR SELECT USING (
    lead_id IN (
      SELECT id FROM leads WHERE assigned_to IN (
        SELECT id FROM profiles WHERE company_id = (
          SELECT company_id FROM profiles WHERE id = auth.uid()
        )
      ) OR created_by IN (
        SELECT id FROM profiles WHERE company_id = (
          SELECT company_id FROM profiles WHERE id = auth.uid()
        )
      )
    )
  );

-- Add similar policies for other tables...

-- Create views for easier data access
CREATE VIEW lead_summary AS
SELECT 
  l.id,
  l.company_name,
  l.contact_name,
  l.email,
  l.status,
  l.priority,
  l.source,
  l.estimated_value,
  l.assigned_to,
  l.created_at,
  l.last_contact_date,
  l.next_follow_up_date,
  p.full_name as assigned_to_name,
  COUNT(la.id) as activity_count,
  COUNT(ath.id) as stage_changes_count
FROM leads l
LEFT JOIN profiles p ON l.assigned_to = p.id
LEFT JOIN lead_activities la ON l.id = la.lead_id
LEFT JOIN lead_stage_history ath ON l.id = ath.lead_id
GROUP BY l.id, p.full_name;

-- Create view for app trial summary
CREATE VIEW app_trial_summary AS
SELECT 
  at.id,
  at.lead_id,
  l.company_name,
  at.app_name,
  at.trial_start_date,
  at.trial_end_date,
  at.trial_status,
  at.users_count,
  at.projects_count,
  at.time_entries_count,
  CASE 
    WHEN at.trial_end_date IS NOT NULL AND at.trial_end_date < NOW() THEN 'expired'
    WHEN at.trial_status = 'active' THEN 'active'
    WHEN at.trial_status = 'converted' THEN 'converted'
    ELSE 'unknown'
  END as trial_status_calculated
FROM app_trials at
JOIN leads l ON at.lead_id = l.id;

-- Create view for lead metrics
CREATE VIEW lead_metrics_summary AS
SELECT 
  date,
  total_leads,
  new_leads,
  qualified_leads,
  converted_leads,
  lost_leads,
  avg_response_time_minutes,
  conversion_rate,
  app_interested_count,
  demo_scheduled_count,
  trial_active_count,
  app_converted_count
FROM lead_metrics
ORDER BY date DESC;

COMMENT ON TABLE leads IS 'Main leads table for CRM functionality';
COMMENT ON TABLE lead_activities IS 'Activities and notes for leads';
COMMENT ON TABLE lead_stage_history IS 'History of lead stage changes';
COMMENT ON TABLE lead_sources IS 'Available lead sources';
COMMENT ON TABLE lead_response_logs IS 'Response time tracking for leads';
COMMENT ON TABLE app_trials IS 'App trial tracking for TropiTrack integration';
COMMENT ON TABLE lead_metrics IS 'Aggregated lead metrics for reporting'; 