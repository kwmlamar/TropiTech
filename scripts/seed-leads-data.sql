-- Seed leads data with sample data
-- This script populates the leads tables with realistic sample data

-- Insert sample leads data
INSERT INTO leads (
  company_name,
  contact_name,
  email,
  phone,
  company_size,
  industry,
  description,
  status,
  priority,
  source,
  estimated_value,
  currency,
  first_contact_date,
  last_contact_date,
  next_follow_up_date,
  interested_apps,
  trial_start_date,
  trial_end_date,
  trial_status,
  created_at
) VALUES
  -- App Leads (from the UI)
  ('Construction Co. Ltd', 'John Smith', 'john@constructionco.com', '+1-555-0101', 'medium', 'Construction', 'Looking for project management', 'app_interested', 'high', 'website', 299.00, 'USD', '2024-01-15 10:00:00', '2024-01-20 14:30:00', '2024-01-25 09:00:00', ARRAY['TropiTrack'], NULL, NULL, NULL, '2024-01-15 10:00:00'),
  ('BuildRight Inc', 'Sarah Johnson', 'sarah@buildright.com', '+1-555-0102', 'large', 'Construction', 'Need team collaboration tools', 'demo_scheduled', 'high', 'referral', 499.00, 'USD', '2024-01-10 11:00:00', '2024-01-18 16:00:00', '2024-01-22 10:00:00', ARRAY['TropiTrack', 'TropiBrain'], NULL, NULL, NULL, '2024-01-10 11:00:00'),
  ('Marina Developers', 'Mike Wilson', 'mike@marinadev.com', '+1-555-0103', 'small', 'Real Estate', 'Want time tracking features', 'trial_active', 'medium', 'social_media', 199.00, 'USD', '2024-01-05 09:00:00', '2024-01-19 15:00:00', '2024-01-26 11:00:00', ARRAY['TropiTrack'], '2024-01-15 00:00:00', '2024-02-15 00:00:00', 'active', '2024-01-05 09:00:00'),
  
  -- Additional App Leads
  ('Urban Builders', 'Lisa Chen', 'lisa@urbanbuilders.com', '+1-555-0104', 'medium', 'Construction', 'Interested in project management', 'app_interested', 'medium', 'website', 399.00, 'USD', '2024-01-12 13:00:00', '2024-01-19 10:00:00', '2024-01-24 14:00:00', ARRAY['TropiTrack'], NULL, NULL, NULL, '2024-01-12 13:00:00'),
  ('Skyline Construction', 'David Brown', 'david@skyline.com', '+1-555-0105', 'large', 'Construction', 'Need comprehensive solution', 'demo_scheduled', 'high', 'events', 599.00, 'USD', '2024-01-08 15:00:00', '2024-01-17 11:00:00', '2024-01-23 13:00:00', ARRAY['TropiTrack', 'TropiBrain'], NULL, NULL, NULL, '2024-01-08 15:00:00'),
  ('Coastal Developers', 'Emma Davis', 'emma@coastaldev.com', '+1-555-0106', 'small', 'Real Estate', 'Looking for time tracking', 'app_interested', 'low', 'cold_outreach', 149.00, 'USD', '2024-01-14 16:00:00', '2024-01-20 09:00:00', '2024-01-27 10:00:00', ARRAY['TropiTrack'], NULL, NULL, NULL, '2024-01-14 16:00:00'),
  
  -- Trial Users (from the UI)
  ('ABC Construction', 'Alex Thompson', 'alex@abcconstruction.com', '+1-555-0107', 'medium', 'Construction', 'TropiTrack trial user', 'trial_active', 'high', 'website', 299.00, 'USD', '2024-01-01 08:00:00', '2024-01-19 14:00:00', '2024-01-25 16:00:00', ARRAY['TropiTrack'], '2024-01-10 00:00:00', '2024-01-25 00:00:00', 'active', '2024-01-01 08:00:00'),
  ('XYZ Builders', 'Rachel Green', 'rachel@xyzbuilders.com', '+1-555-0108', 'large', 'Construction', 'TropiTrack trial user', 'trial_active', 'high', 'referral', 499.00, 'USD', '2024-01-03 10:00:00', '2024-01-18 15:00:00', '2024-01-24 09:00:00', ARRAY['TropiTrack'], '2024-01-08 00:00:00', '2024-01-23 00:00:00', 'active', '2024-01-03 10:00:00'),
  ('City Developers', 'Tom Anderson', 'tom@citydev.com', '+1-555-0109', 'small', 'Real Estate', 'New TropiTrack trial', 'trial_active', 'medium', 'social_media', 199.00, 'USD', '2024-01-20 11:00:00', '2024-01-20 11:00:00', '2024-01-27 10:00:00', ARRAY['TropiTrack'], '2024-01-20 00:00:00', '2024-02-20 00:00:00', 'active', '2024-01-20 11:00:00'),
  
  -- Converted Leads
  ('Metro Construction', 'Jennifer Lee', 'jennifer@metroconstruction.com', '+1-555-0110', 'large', 'Construction', 'Converted TropiTrack customer', 'app_converted', 'high', 'website', 799.00, 'USD', '2023-12-01 09:00:00', '2024-01-15 16:00:00', NULL, ARRAY['TropiTrack'], '2023-12-15 00:00:00', '2024-01-15 00:00:00', 'converted', '2023-12-01 09:00:00'),
  ('Premier Builders', 'Robert Wilson', 'robert@premierbuilders.com', '+1-555-0111', 'medium', 'Construction', 'Converted customer', 'app_converted', 'high', 'referral', 399.00, 'USD', '2023-12-10 14:00:00', '2024-01-10 11:00:00', NULL, ARRAY['TropiTrack'], '2023-12-20 00:00:00', '2024-01-20 00:00:00', 'converted', '2023-12-10 14:00:00'),
  ('Elite Developers', 'Maria Garcia', 'maria@elitedev.com', '+1-555-0112', 'small', 'Real Estate', 'Converted customer', 'app_converted', 'medium', 'events', 299.00, 'USD', '2023-12-15 10:00:00', '2024-01-12 13:00:00', NULL, ARRAY['TropiTrack'], '2023-12-25 00:00:00', '2024-01-25 00:00:00', 'converted', '2023-12-15 10:00:00'),
  
  -- More leads for metrics
  ('Summit Construction', 'Kevin O''Brien', 'kevin@summitconstruction.com', '+1-555-0113', 'medium', 'Construction', 'Interested in project management', 'app_interested', 'medium', 'website', 349.00, 'USD', '2024-01-16 12:00:00', '2024-01-21 15:00:00', '2024-01-26 10:00:00', ARRAY['TropiTrack'], NULL, NULL, NULL, '2024-01-16 12:00:00'),
  ('Peak Builders', 'Amanda White', 'amanda@peakbuilders.com', '+1-555-0114', 'large', 'Construction', 'Need comprehensive solution', 'demo_scheduled', 'high', 'referral', 549.00, 'USD', '2024-01-11 13:00:00', '2024-01-19 16:00:00', '2024-01-25 14:00:00', ARRAY['TropiTrack', 'TropiBrain'], NULL, NULL, NULL, '2024-01-11 13:00:00'),
  ('Horizon Developers', 'Chris Martinez', 'chris@horizondev.com', '+1-555-0115', 'small', 'Real Estate', 'Looking for time tracking', 'trial_active', 'low', 'social_media', 179.00, 'USD', '2024-01-13 14:00:00', '2024-01-20 11:00:00', '2024-01-27 09:00:00', ARRAY['TropiTrack'], '2024-01-18 00:00:00', '2024-02-18 00:00:00', 'active', '2024-01-13 14:00:00');

-- Insert sample app trials data
INSERT INTO app_trials (
  lead_id,
  app_name,
  trial_start_date,
  trial_end_date,
  trial_status,
  trial_notes,
  users_count,
  projects_count,
  time_entries_count
) VALUES
  ((SELECT id FROM leads WHERE company_name = 'Marina Developers'), 'TropiTrack', '2024-01-15 00:00:00', '2024-02-15 00:00:00', 'active', 'Active trial - showing good engagement', 5, 3, 45),
  ((SELECT id FROM leads WHERE company_name = 'ABC Construction'), 'TropiTrack', '2024-01-10 00:00:00', '2024-01-25 00:00:00', 'active', 'Trial ends in 5 days', 8, 5, 120),
  ((SELECT id FROM leads WHERE company_name = 'XYZ Builders'), 'TropiTrack', '2024-01-08 00:00:00', '2024-01-23 00:00:00', 'active', 'Trial ends tomorrow', 12, 7, 200),
  ((SELECT id FROM leads WHERE company_name = 'City Developers'), 'TropiTrack', '2024-01-20 00:00:00', '2024-02-20 00:00:00', 'active', 'Started TropiTrack trial today', 3, 2, 15),
  ((SELECT id FROM leads WHERE company_name = 'Metro Construction'), 'TropiTrack', '2023-12-15 00:00:00', '2024-01-15 00:00:00', 'converted', 'Converted to paid plan', 15, 10, 500),
  ((SELECT id FROM leads WHERE company_name = 'Premier Builders'), 'TropiTrack', '2023-12-20 00:00:00', '2024-01-20 00:00:00', 'converted', 'Converted to paid plan', 10, 6, 300),
  ((SELECT id FROM leads WHERE company_name = 'Elite Developers'), 'TropiTrack', '2023-12-25 00:00:00', '2024-01-25 00:00:00', 'converted', 'Converted to paid plan', 7, 4, 150),
  ((SELECT id FROM leads WHERE company_name = 'Horizon Developers'), 'TropiTrack', '2024-01-18 00:00:00', '2024-02-18 00:00:00', 'active', 'New trial user', 4, 2, 25);

-- Insert sample lead activities
INSERT INTO lead_activities (
  lead_id,
  activity_type,
  subject,
  description,
  duration_minutes,
  scheduled_date,
  completed_date,
  created_at
) VALUES
  ((SELECT id FROM leads WHERE company_name = 'Construction Co. Ltd'), 'email', 'Initial Contact', 'Sent welcome email and product information', 15, '2024-01-15 10:00:00', '2024-01-15 10:15:00', '2024-01-15 10:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'Construction Co. Ltd'), 'call', 'Follow-up Call', 'Discussed project management needs and pricing', 30, '2024-01-20 14:00:00', '2024-01-20 14:30:00', '2024-01-20 14:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'BuildRight Inc'), 'meeting', 'Demo Scheduled', 'Scheduled product demonstration for next week', 60, '2024-01-22 10:00:00', NULL, '2024-01-18 16:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'Marina Developers'), 'email', 'Trial Activation', 'Activated TropiTrack trial for Marina Developers', 10, '2024-01-15 09:00:00', '2024-01-15 09:10:00', '2024-01-15 09:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'ABC Construction'), 'call', 'Trial Check-in', 'Called to check on trial progress and answer questions', 25, '2024-01-19 14:00:00', '2024-01-19 14:25:00', '2024-01-19 14:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'XYZ Builders'), 'email', 'Trial Expiry Reminder', 'Sent reminder about trial ending tomorrow', 5, '2024-01-22 09:00:00', '2024-01-22 09:05:00', '2024-01-22 09:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'City Developers'), 'meeting', 'Trial Onboarding', 'Onboarding call for new trial user', 45, '2024-01-20 11:00:00', '2024-01-20 11:45:00', '2024-01-20 11:00:00');

-- Insert sample lead stage history
INSERT INTO lead_stage_history (
  lead_id,
  from_status,
  to_status,
  reason,
  changed_at
) VALUES
  ((SELECT id FROM leads WHERE company_name = 'Construction Co. Ltd'), NULL, 'app_interested', 'Initial lead creation', '2024-01-15 10:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'BuildRight Inc'), NULL, 'app_interested', 'Initial lead creation', '2024-01-10 11:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'BuildRight Inc'), 'app_interested', 'demo_scheduled', 'Demo scheduled after initial contact', '2024-01-18 16:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'Marina Developers'), NULL, 'app_interested', 'Initial lead creation', '2024-01-05 09:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'Marina Developers'), 'app_interested', 'trial_active', 'Trial activated', '2024-01-15 09:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'ABC Construction'), NULL, 'trial_active', 'Direct trial signup', '2024-01-01 08:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'XYZ Builders'), NULL, 'trial_active', 'Direct trial signup', '2024-01-03 10:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'City Developers'), NULL, 'trial_active', 'Direct trial signup', '2024-01-20 11:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'Metro Construction'), NULL, 'app_interested', 'Initial lead creation', '2023-12-01 09:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'Metro Construction'), 'app_interested', 'trial_active', 'Trial activated', '2023-12-15 09:00:00'),
  ((SELECT id FROM leads WHERE company_name = 'Metro Construction'), 'trial_active', 'app_converted', 'Trial converted to paid plan', '2024-01-15 16:00:00');

-- Insert sample lead response logs
INSERT INTO lead_response_logs (
  lead_id,
  response_time_minutes,
  response_type,
  notes,
  created_at
) VALUES
  ((SELECT id FROM leads WHERE company_name = 'Construction Co. Ltd'), 15, 'email', 'Initial welcome email sent', '2024-01-15 10:15:00'),
  ((SELECT id FROM leads WHERE company_name = 'BuildRight Inc'), 45, 'call', 'Follow-up call made', '2024-01-10 11:45:00'),
  ((SELECT id FROM leads WHERE company_name = 'Marina Developers'), 30, 'email', 'Trial activation email sent', '2024-01-15 09:30:00'),
  ((SELECT id FROM leads WHERE company_name = 'ABC Construction'), 10, 'call', 'Trial check-in call', '2024-01-19 14:25:00'),
  ((SELECT id FROM leads WHERE company_name = 'XYZ Builders'), 5, 'email', 'Trial expiry reminder sent', '2024-01-22 09:05:00'),
  ((SELECT id FROM leads WHERE company_name = 'City Developers'), 60, 'meeting', 'Onboarding meeting completed', '2024-01-20 12:00:00');

-- Insert sample lead metrics for the last 30 days
INSERT INTO lead_metrics (
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
) VALUES
  ('2024-01-01', 45, 12, 8, 3, 2, 25, 6.67, 15, 8, 5, 12),
  ('2024-01-02', 47, 10, 9, 4, 1, 22, 8.51, 16, 9, 6, 13),
  ('2024-01-03', 50, 15, 7, 5, 2, 28, 10.00, 18, 7, 8, 14),
  ('2024-01-04', 52, 8, 12, 6, 1, 20, 11.54, 19, 10, 9, 15),
  ('2024-01-05', 55, 13, 9, 7, 3, 24, 12.73, 20, 8, 10, 16),
  ('2024-01-06', 58, 11, 11, 8, 2, 26, 13.79, 22, 9, 11, 17),
  ('2024-01-07', 60, 9, 13, 9, 1, 23, 15.00, 23, 10, 12, 18),
  ('2024-01-08', 63, 14, 10, 10, 3, 27, 15.87, 25, 8, 13, 19),
  ('2024-01-09', 65, 12, 12, 11, 2, 25, 16.92, 26, 9, 14, 20),
  ('2024-01-10', 68, 10, 14, 12, 1, 21, 17.65, 28, 10, 15, 21),
  ('2024-01-11', 70, 16, 11, 13, 4, 29, 18.57, 29, 8, 16, 22),
  ('2024-01-12', 73, 13, 13, 14, 2, 24, 19.18, 30, 9, 17, 23),
  ('2024-01-13', 75, 11, 15, 15, 1, 22, 20.00, 31, 10, 18, 24),
  ('2024-01-14', 78, 14, 12, 16, 3, 26, 20.51, 32, 8, 19, 25),
  ('2024-01-15', 80, 12, 14, 17, 2, 25, 21.25, 33, 9, 20, 26),
  ('2024-01-16', 82, 10, 16, 18, 1, 23, 21.95, 34, 10, 21, 27),
  ('2024-01-17', 85, 15, 13, 19, 4, 28, 22.35, 35, 8, 22, 28),
  ('2024-01-18', 87, 13, 15, 20, 2, 24, 22.99, 36, 9, 23, 29),
  ('2024-01-19', 90, 11, 17, 21, 1, 22, 23.33, 37, 10, 24, 30),
  ('2024-01-20', 92, 14, 14, 22, 3, 26, 23.91, 38, 8, 25, 31),
  ('2024-01-21', 95, 12, 16, 23, 2, 25, 24.21, 39, 9, 26, 32),
  ('2024-01-22', 97, 10, 18, 24, 1, 23, 24.74, 40, 10, 27, 33),
  ('2024-01-23', 100, 16, 15, 25, 4, 29, 25.00, 41, 8, 28, 34),
  ('2024-01-24', 102, 13, 17, 26, 2, 24, 25.49, 42, 9, 29, 35),
  ('2024-01-25', 105, 11, 19, 27, 1, 22, 25.71, 43, 10, 30, 36),
  ('2024-01-26', 107, 14, 16, 28, 3, 26, 26.17, 44, 8, 31, 37),
  ('2024-01-27', 110, 12, 18, 29, 2, 25, 26.36, 45, 9, 32, 38),
  ('2024-01-28', 112, 10, 20, 30, 1, 23, 26.79, 46, 10, 33, 39),
  ('2024-01-29', 115, 15, 17, 31, 4, 28, 26.96, 47, 8, 34, 40),
  ('2024-01-30', 117, 13, 19, 32, 2, 24, 27.35, 48, 9, 35, 41),
  ('2024-01-31', 120, 11, 21, 33, 1, 22, 27.50, 49, 10, 36, 42);

-- Update the leads table to set created_by and assigned_to (assuming we have some profiles)
UPDATE leads SET 
  created_by = (SELECT id FROM profiles LIMIT 1),
  assigned_to = (SELECT id FROM profiles LIMIT 1)
WHERE created_by IS NULL;

-- Update lead activities to set created_by
UPDATE lead_activities SET 
  created_by = (SELECT id FROM profiles LIMIT 1)
WHERE created_by IS NULL;

-- Update lead stage history to set changed_by
UPDATE lead_stage_history SET 
  changed_by = (SELECT id FROM profiles LIMIT 1)
WHERE changed_by IS NULL;

-- Update lead response logs to set responded_by
UPDATE lead_response_logs SET 
  responded_by = (SELECT id FROM profiles LIMIT 1)
WHERE responded_by IS NULL;

-- Sample queries to verify the data

-- Get all leads with their status
SELECT 
  company_name,
  status,
  source,
  estimated_value,
  created_at
FROM leads
ORDER BY created_at DESC;

-- Get trial users
SELECT 
  l.company_name,
  at.trial_start_date,
  at.trial_end_date,
  at.trial_status,
  at.users_count,
  at.projects_count
FROM app_trials at
JOIN leads l ON at.lead_id = l.id
WHERE at.app_name = 'TropiTrack'
ORDER BY at.trial_end_date ASC;

-- Get lead metrics for today
SELECT 
  total_leads,
  new_leads,
  converted_leads,
  conversion_rate,
  app_interested_count,
  trial_active_count,
  app_converted_count
FROM lead_metrics
WHERE date = CURRENT_DATE;

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