-- Seed Complete CRM Data
-- This script populates all CRM tables with realistic sample data

-- ============================================================================
-- ENHANCE EXISTING COMPANIES
-- ============================================================================

-- Update existing companies with CRM data
UPDATE companies SET 
  industry = CASE 
    WHEN name LIKE '%Construction%' THEN 'Construction'
    WHEN name LIKE '%Tech%' THEN 'Technology'
    WHEN name LIKE '%Build%' THEN 'Construction'
    ELSE 'Other'
  END,
  website = CASE 
    WHEN name = 'TropiTech' THEN 'https://tropitech.com'
    ELSE 'https://' || LOWER(REPLACE(name, ' ', '')) || '.com'
  END,
  phone = '+1-555-' || LPAD(FLOOR(RANDOM() * 9999)::TEXT, 4, '0'),
  employee_count = FLOOR(RANDOM() * 500) + 10,
  annual_revenue = FLOOR(RANDOM() * 10000000) + 100000
WHERE industry IS NULL;

-- ============================================================================
-- INSERT SAMPLE CONTACTS
-- ============================================================================

INSERT INTO contacts (
  company_id,
  first_name,
  last_name,
  email,
  phone,
  title,
  department,
  contact_type,
  is_primary,
  notes,
  assigned_to,
  created_by
) VALUES
  ((SELECT id FROM companies WHERE name = 'TropiTech'), 'John', 'Smith', 'john.smith@tropitech.com', '+1-555-0101', 'CEO', 'Executive', 'customer', true, 'Primary contact for TropiTech', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM companies WHERE name = 'TropiTech'), 'Sarah', 'Johnson', 'sarah.johnson@tropitech.com', '+1-555-0102', 'CTO', 'Technology', 'customer', false, 'Technical decision maker', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM companies WHERE name = 'TropiTech'), 'Mike', 'Wilson', 'mike.wilson@tropitech.com', '+1-555-0103', 'Sales Director', 'Sales', 'customer', false, 'Sales contact', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1));

-- ============================================================================
-- INSERT SAMPLE LEADS (from our previous work)
-- ============================================================================

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
  created_at,
  assigned_to,
  created_by
) VALUES
  ('Construction Co. Ltd', 'John Smith', 'john@constructionco.com', '+1-555-0101', 'medium', 'Construction', 'Looking for project management', 'app_interested', 'high', 'website', 299.00, 'USD', '2024-01-15 10:00:00', '2024-01-20 14:30:00', '2024-01-25 09:00:00', ARRAY['TropiTrack'], NULL, NULL, NULL, '2024-01-15 10:00:00', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('BuildRight Inc', 'Sarah Johnson', 'sarah@buildright.com', '+1-555-0102', 'large', 'Construction', 'Need team collaboration tools', 'demo_scheduled', 'high', 'referral', 499.00, 'USD', '2024-01-10 11:00:00', '2024-01-18 16:00:00', '2024-01-22 10:00:00', ARRAY['TropiTrack', 'TropiBrain'], NULL, NULL, NULL, '2024-01-10 11:00:00', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('Marina Developers', 'Mike Wilson', 'mike@marinadev.com', '+1-555-0103', 'small', 'Real Estate', 'Want time tracking features', 'trial_active', 'medium', 'social_media', 199.00, 'USD', '2024-01-05 09:00:00', '2024-01-19 15:00:00', '2024-01-26 11:00:00', ARRAY['TropiTrack'], '2024-01-15 00:00:00', '2024-02-15 00:00:00', 'active', '2024-01-05 09:00:00', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('ABC Construction', 'Alex Thompson', 'alex@abcconstruction.com', '+1-555-0107', 'medium', 'Construction', 'TropiTrack trial user', 'trial_active', 'high', 'website', 299.00, 'USD', '2024-01-01 08:00:00', '2024-01-19 14:00:00', '2024-01-25 16:00:00', ARRAY['TropiTrack'], '2024-01-10 00:00:00', '2024-01-25 00:00:00', 'active', '2024-01-01 08:00:00', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('XYZ Builders', 'Rachel Green', 'rachel@xyzbuilders.com', '+1-555-0108', 'large', 'Construction', 'TropiTrack trial user', 'trial_active', 'high', 'referral', 499.00, 'USD', '2024-01-03 10:00:00', '2024-01-18 15:00:00', '2024-01-24 09:00:00', ARRAY['TropiTrack'], '2024-01-08 00:00:00', '2024-01-23 00:00:00', 'active', '2024-01-03 10:00:00', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('Metro Construction', 'Jennifer Lee', 'jennifer@metroconstruction.com', '+1-555-0110', 'large', 'Construction', 'Converted TropiTrack customer', 'app_converted', 'high', 'website', 799.00, 'USD', '2023-12-01 09:00:00', '2024-01-15 16:00:00', NULL, ARRAY['TropiTrack'], '2023-12-15 00:00:00', '2024-01-15 00:00:00', 'converted', '2023-12-01 09:00:00', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1));

-- ============================================================================
-- INSERT SAMPLE DEALS
-- ============================================================================

INSERT INTO deals (
  title,
  description,
  company_id,
  contact_id,
  lead_id,
  status,
  stage,
  value,
  currency,
  probability,
  expected_close_date,
  assigned_to,
  created_by
) VALUES
  ('TropiTrack Enterprise License', 'Enterprise license for 100 users', (SELECT id FROM companies WHERE name = 'TropiTech'), (SELECT id FROM contacts WHERE email = 'john.smith@tropitech.com'), NULL, 'negotiation', 'negotiation', 50000.00, 'USD', 75, '2024-02-15', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('Construction Co. Project Management', 'Project management solution for construction company', NULL, NULL, (SELECT id FROM leads WHERE company_name = 'Construction Co. Ltd'), 'prospecting', 'discovery', 15000.00, 'USD', 25, '2024-03-01', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('BuildRight Team Collaboration', 'Team collaboration tools for BuildRight Inc', NULL, NULL, (SELECT id FROM leads WHERE company_name = 'BuildRight Inc'), 'qualification', 'qualification', 25000.00, 'USD', 50, '2024-02-28', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('Marina Developers Time Tracking', 'Time tracking solution for Marina Developers', NULL, NULL, (SELECT id FROM leads WHERE company_name = 'Marina Developers'), 'proposal', 'proposal', 8000.00, 'USD', 60, '2024-02-20', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('ABC Construction Trial Conversion', 'Convert ABC Construction trial to paid plan', NULL, NULL, (SELECT id FROM leads WHERE company_name = 'ABC Construction'), 'negotiation', 'negotiation', 12000.00, 'USD', 80, '2024-01-30', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1));

-- ============================================================================
-- INSERT SAMPLE OPPORTUNITIES
-- ============================================================================

INSERT INTO opportunities (
  title,
  description,
  company_id,
  contact_id,
  deal_id,
  status,
  value,
  currency,
  probability,
  expected_close_date,
  assigned_to,
  created_by
) VALUES
  ('TropiBrain AI Integration', 'AI-powered insights for TropiTech', (SELECT id FROM companies WHERE name = 'TropiTech'), (SELECT id FROM contacts WHERE email = 'sarah.johnson@tropitech.com'), NULL, 'qualified', 30000.00, 'USD', 40, '2024-03-15', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('Construction Analytics Platform', 'Analytics platform for construction industry', NULL, NULL, (SELECT id FROM deals WHERE title LIKE '%Construction Co.%'), 'open', 20000.00, 'USD', 30, '2024-04-01', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('Enterprise Security Package', 'Security enhancements for enterprise clients', (SELECT id FROM companies WHERE name = 'TropiTech'), (SELECT id FROM contacts WHERE email = 'mike.wilson@tropitech.com'), NULL, 'proposal', 45000.00, 'USD', 70, '2024-02-28', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1));

-- ============================================================================
-- INSERT SAMPLE ACTIVITIES
-- ============================================================================

INSERT INTO activities (
  type,
  subject,
  description,
  company_id,
  contact_id,
  lead_id,
  deal_id,
  opportunity_id,
  scheduled_date,
  completed_date,
  duration_minutes,
  assigned_to,
  created_by
) VALUES
  ('call', 'Follow-up with Construction Co.', 'Discuss project management needs and pricing', NULL, NULL, (SELECT id FROM leads WHERE company_name = 'Construction Co. Ltd'), NULL, NULL, '2024-01-25 10:00:00', NULL, 30, (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('meeting', 'Demo for BuildRight Inc', 'Product demonstration for BuildRight team', NULL, NULL, (SELECT id FROM leads WHERE company_name = 'BuildRight Inc'), NULL, NULL, '2024-01-22 14:00:00', NULL, 60, (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('email', 'Trial activation for Marina Developers', 'Activated TropiTrack trial for Marina Developers', NULL, NULL, (SELECT id FROM leads WHERE company_name = 'Marina Developers'), NULL, NULL, '2024-01-15 09:00:00', '2024-01-15 09:10:00', 10, (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('call', 'Trial check-in with ABC Construction', 'Called to check on trial progress and answer questions', NULL, NULL, (SELECT id FROM leads WHERE company_name = 'ABC Construction'), NULL, NULL, '2024-01-19 14:00:00', '2024-01-19 14:25:00', 25, (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('meeting', 'Enterprise deal negotiation', 'Negotiate enterprise license terms', (SELECT id FROM companies WHERE name = 'TropiTech'), (SELECT id FROM contacts WHERE email = 'john.smith@tropitech.com'), NULL, (SELECT id FROM deals WHERE title LIKE '%Enterprise%'), NULL, '2024-01-30 15:00:00', NULL, 90, (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1));

-- ============================================================================
-- INSERT SAMPLE TASKS
-- ============================================================================

INSERT INTO tasks (
  title,
  description,
  company_id,
  contact_id,
  lead_id,
  deal_id,
  opportunity_id,
  status,
  priority,
  due_date,
  assigned_to,
  created_by
) VALUES
  ('Follow up with Construction Co.', 'Call to discuss project management needs', NULL, NULL, (SELECT id FROM leads WHERE company_name = 'Construction Co. Ltd'), NULL, NULL, 'pending', 'high', '2024-01-25 10:00:00', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('Prepare demo for BuildRight', 'Prepare presentation for BuildRight demo', NULL, NULL, (SELECT id FROM leads WHERE company_name = 'BuildRight Inc'), NULL, NULL, 'in_progress', 'high', '2024-01-21 16:00:00', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('Send trial expiry reminder', 'Send reminder about trial ending', NULL, NULL, (SELECT id FROM leads WHERE company_name = 'ABC Construction'), NULL, NULL, 'pending', 'medium', '2024-01-23 09:00:00', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('Prepare proposal for Marina', 'Create proposal for Marina Developers', NULL, NULL, (SELECT id FROM leads WHERE company_name = 'Marina Developers'), NULL, NULL, 'pending', 'high', '2024-01-26 14:00:00', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1)),
  ('Review enterprise contract', 'Review and finalize enterprise contract terms', (SELECT id FROM companies WHERE name = 'TropiTech'), (SELECT id FROM contacts WHERE email = 'john.smith@tropitech.com'), NULL, (SELECT id FROM deals WHERE title LIKE '%Enterprise%'), NULL, 'pending', 'urgent', '2024-01-29 17:00:00', (SELECT id FROM profiles LIMIT 1), (SELECT id FROM profiles LIMIT 1));

-- ============================================================================
-- INSERT SAMPLE APP TRIALS
-- ============================================================================

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
  ((SELECT id FROM leads WHERE company_name = 'Metro Construction'), 'TropiTrack', '2023-12-15 00:00:00', '2024-01-15 00:00:00', 'converted', 'Converted to paid plan', 15, 10, 500);

-- ============================================================================
-- INSERT SAMPLE LEAD ACTIVITIES
-- ============================================================================

INSERT INTO lead_activities (
  lead_id,
  activity_type,
  subject,
  description,
  duration_minutes,
  scheduled_date,
  completed_date,
  created_by
) VALUES
  ((SELECT id FROM leads WHERE company_name = 'Construction Co. Ltd'), 'email', 'Initial Contact', 'Sent welcome email and product information', 15, '2024-01-15 10:00:00', '2024-01-15 10:15:00', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM leads WHERE company_name = 'Construction Co. Ltd'), 'call', 'Follow-up Call', 'Discussed project management needs and pricing', 30, '2024-01-20 14:00:00', '2024-01-20 14:30:00', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM leads WHERE company_name = 'BuildRight Inc'), 'meeting', 'Demo Scheduled', 'Scheduled product demonstration for next week', 60, '2024-01-22 10:00:00', NULL, (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM leads WHERE company_name = 'Marina Developers'), 'email', 'Trial Activation', 'Activated TropiTrack trial for Marina Developers', 10, '2024-01-15 09:00:00', '2024-01-15 09:10:00', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM leads WHERE company_name = 'ABC Construction'), 'call', 'Trial Check-in', 'Called to check on trial progress and answer questions', 25, '2024-01-19 14:00:00', '2024-01-19 14:25:00', (SELECT id FROM profiles LIMIT 1));

-- ============================================================================
-- INSERT SAMPLE DEAL ACTIVITIES
-- ============================================================================

INSERT INTO deal_activities (
  deal_id,
  activity_type,
  subject,
  description,
  duration_minutes,
  scheduled_date,
  completed_date,
  created_by
) VALUES
  ((SELECT id FROM deals WHERE title LIKE '%Enterprise%'), 'meeting', 'Initial Discovery', 'Initial meeting to understand requirements', 60, '2024-01-10 10:00:00', '2024-01-10 11:00:00', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM deals WHERE title LIKE '%Enterprise%'), 'call', 'Follow-up Discussion', 'Follow-up call to discuss technical requirements', 30, '2024-01-15 14:00:00', '2024-01-15 14:30:00', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM deals WHERE title LIKE '%Enterprise%'), 'meeting', 'Proposal Presentation', 'Present proposal to decision makers', 90, '2024-01-25 15:00:00', NULL, (SELECT id FROM profiles LIMIT 1));

-- ============================================================================
-- INSERT SAMPLE LEAD STAGE HISTORY
-- ============================================================================

INSERT INTO lead_stage_history (
  lead_id,
  from_status,
  to_status,
  reason,
  changed_by
) VALUES
  ((SELECT id FROM leads WHERE company_name = 'Construction Co. Ltd'), NULL, 'app_interested', 'Initial lead creation', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM leads WHERE company_name = 'BuildRight Inc'), NULL, 'app_interested', 'Initial lead creation', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM leads WHERE company_name = 'BuildRight Inc'), 'app_interested', 'demo_scheduled', 'Demo scheduled after initial contact', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM leads WHERE company_name = 'Marina Developers'), NULL, 'app_interested', 'Initial lead creation', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM leads WHERE company_name = 'Marina Developers'), 'app_interested', 'trial_active', 'Trial activated', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM leads WHERE company_name = 'Metro Construction'), NULL, 'app_interested', 'Initial lead creation', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM leads WHERE company_name = 'Metro Construction'), 'app_interested', 'trial_active', 'Trial activated', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM leads WHERE company_name = 'Metro Construction'), 'trial_active', 'app_converted', 'Trial converted to paid plan', (SELECT id FROM profiles LIMIT 1));

-- ============================================================================
-- INSERT SAMPLE DEAL STAGE HISTORY
-- ============================================================================

INSERT INTO deal_stage_history (
  deal_id,
  from_stage,
  to_stage,
  reason,
  changed_by
) VALUES
  ((SELECT id FROM deals WHERE title LIKE '%Enterprise%'), NULL, 'discovery', 'Initial deal creation', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM deals WHERE title LIKE '%Enterprise%'), 'discovery', 'qualification', 'Requirements qualified', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM deals WHERE title LIKE '%Enterprise%'), 'qualification', 'proposal', 'Proposal prepared', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM deals WHERE title LIKE '%Enterprise%'), 'proposal', 'negotiation', 'Proposal presented, now negotiating', (SELECT id FROM profiles LIMIT 1));

-- ============================================================================
-- INSERT SAMPLE LEAD METRICS
-- ============================================================================

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
  ('2024-01-15', 80, 12, 14, 17, 2, 25, 21.25, 33, 9, 20, 26),
  ('2024-01-20', 92, 14, 14, 22, 3, 26, 23.91, 38, 8, 25, 31),
  ('2024-01-25', 105, 11, 19, 27, 1, 22, 25.71, 43, 10, 30, 36),
  ('2024-01-30', 117, 13, 19, 32, 2, 24, 27.35, 48, 9, 35, 41),
  ('2024-01-31', 120, 11, 21, 33, 1, 22, 27.50, 49, 10, 36, 42);

-- ============================================================================
-- INSERT SAMPLE USER PERMISSIONS
-- ============================================================================

INSERT INTO user_permissions (
  user_id,
  permission,
  granted_by
) VALUES
  ((SELECT id FROM profiles LIMIT 1), 'leads.read', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM profiles LIMIT 1), 'leads.write', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM profiles LIMIT 1), 'deals.read', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM profiles LIMIT 1), 'deals.write', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM profiles LIMIT 1), 'contacts.read', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM profiles LIMIT 1), 'contacts.write', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM profiles LIMIT 1), 'reports.read', (SELECT id FROM profiles LIMIT 1)),
  ((SELECT id FROM profiles LIMIT 1), 'admin.access', (SELECT id FROM profiles LIMIT 1));

-- ============================================================================
-- INSERT SAMPLE AUDIT TRAIL
-- ============================================================================

INSERT INTO crm_audit_trail (
  user_id,
  action,
  entity_type,
  entity_id,
  old_values,
  new_values,
  ip_address
) VALUES
  ((SELECT id FROM profiles LIMIT 1), 'created', 'lead', (SELECT id FROM leads WHERE company_name = 'Construction Co. Ltd'), NULL, '{"company_name": "Construction Co. Ltd", "status": "app_interested"}', '192.168.1.1'),
  ((SELECT id FROM profiles LIMIT 1), 'updated', 'lead', (SELECT id FROM leads WHERE company_name = 'BuildRight Inc'), '{"status": "app_interested"}', '{"status": "demo_scheduled"}', '192.168.1.1'),
  ((SELECT id FROM profiles LIMIT 1), 'created', 'deal', (SELECT id FROM deals WHERE title LIKE '%Enterprise%'), NULL, '{"title": "TropiTrack Enterprise License", "value": 50000}', '192.168.1.1'),
  ((SELECT id FROM profiles LIMIT 1), 'updated', 'deal', (SELECT id FROM deals WHERE title LIKE '%Enterprise%'), '{"stage": "proposal"}', '{"stage": "negotiation"}', '192.168.1.1');

-- ============================================================================
-- SAMPLE QUERIES TO VERIFY DATA
-- ============================================================================

-- Get all leads with their status
SELECT 
  company_name,
  status,
  source,
  estimated_value,
  created_at
FROM leads
ORDER BY created_at DESC;

-- Get all deals with their status
SELECT 
  title,
  status,
  stage,
  value,
  probability,
  expected_close_date
FROM deals
ORDER BY created_at DESC;

-- Get all contacts with company info
SELECT 
  c.first_name,
  c.last_name,
  c.email,
  c.title,
  c.contact_type,
  comp.name as company_name
FROM contacts c
LEFT JOIN companies comp ON c.company_id = comp.id
ORDER BY c.created_at DESC;

-- Get dashboard summary
SELECT * FROM dashboard_summary;

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

-- Get upcoming activities
SELECT 
  type,
  subject,
  scheduled_date,
  duration_minutes
FROM activities
WHERE scheduled_date > NOW()
ORDER BY scheduled_date ASC;

-- Get pending tasks
SELECT 
  title,
  priority,
  due_date,
  status
FROM tasks
WHERE status = 'pending'
ORDER BY due_date ASC; 