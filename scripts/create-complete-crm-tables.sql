-- Complete CRM Database Schema for TropiTech
-- This script creates all necessary tables for the entire CRM system

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ENUM TYPES
-- ============================================================================

-- Drop existing types if they exist (to avoid conflicts)
DROP TYPE IF EXISTS lead_status CASCADE;
DROP TYPE IF EXISTS lead_source CASCADE;
DROP TYPE IF EXISTS lead_priority CASCADE;
DROP TYPE IF EXISTS trial_status CASCADE;
DROP TYPE IF EXISTS deal_status CASCADE;
DROP TYPE IF EXISTS deal_stage CASCADE;
DROP TYPE IF EXISTS contact_type CASCADE;
DROP TYPE IF EXISTS opportunity_status CASCADE;
DROP TYPE IF EXISTS activity_type CASCADE;
DROP TYPE IF EXISTS task_priority CASCADE;
DROP TYPE IF EXISTS task_status CASCADE;
DROP TYPE IF EXISTS company_size CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS subscription_status CASCADE;

-- Lead statuses
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

-- Lead sources
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

-- Lead priorities
CREATE TYPE lead_priority AS ENUM (
  'low',
  'medium',
  'high',
  'urgent'
);

-- Trial statuses
CREATE TYPE trial_status AS ENUM (
  'active',
  'expired',
  'converted',
  'cancelled'
);

-- Deal statuses
CREATE TYPE deal_status AS ENUM (
  'prospecting',
  'qualification',
  'proposal',
  'negotiation',
  'closed_won',
  'closed_lost'
);

-- Deal stages
CREATE TYPE deal_stage AS ENUM (
  'discovery',
  'qualification',
  'proposal',
  'negotiation',
  'closing',
  'closed'
);

-- Contact types
CREATE TYPE contact_type AS ENUM (
  'lead',
  'customer',
  'prospect',
  'partner',
  'vendor'
);

-- Opportunity statuses
CREATE TYPE opportunity_status AS ENUM (
  'open',
  'qualified',
  'proposal',
  'negotiation',
  'won',
  'lost'
);

-- Activity types
CREATE TYPE activity_type AS ENUM (
  'call',
  'email',
  'meeting',
  'note',
  'task',
  'demo',
  'proposal',
  'follow_up'
);

-- Task priorities
CREATE TYPE task_priority AS ENUM (
  'low',
  'medium',
  'high',
  'urgent'
);

-- Task statuses
CREATE TYPE task_status AS ENUM (
  'pending',
  'in_progress',
  'completed',
  'cancelled'
);

-- Company sizes
CREATE TYPE company_size AS ENUM (
  'startup',
  'small',
  'medium',
  'large',
  'enterprise'
);

-- User roles
CREATE TYPE user_role AS ENUM (
  'admin',
  'manager',
  'sales_rep',
  'support',
  'viewer'
);

-- Subscription statuses
CREATE TYPE subscription_status AS ENUM (
  'active',
  'trialing',
  'past_due',
  'canceled',
  'unpaid'
);

-- ============================================================================
-- CORE CRM TABLES
-- ============================================================================

-- Companies table (enhanced from existing)
ALTER TABLE companies ADD COLUMN IF NOT EXISTS industry VARCHAR(100);
ALTER TABLE companies ADD COLUMN IF NOT EXISTS website VARCHAR(255);
ALTER TABLE companies ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
ALTER TABLE companies ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE companies ADD COLUMN IF NOT EXISTS state VARCHAR(100);
ALTER TABLE companies ADD COLUMN IF NOT EXISTS country VARCHAR(100);
ALTER TABLE companies ADD COLUMN IF NOT EXISTS postal_code VARCHAR(20);
ALTER TABLE companies ADD COLUMN IF NOT EXISTS annual_revenue DECIMAL(15,2);
ALTER TABLE companies ADD COLUMN IF NOT EXISTS employee_count INTEGER;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS founded_year INTEGER;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS tags TEXT[];

-- Drop existing tables if they exist (to avoid conflicts)
DROP TABLE IF EXISTS crm_audit_trail CASCADE;
DROP TABLE IF EXISTS user_permissions CASCADE;
DROP TABLE IF EXISTS deal_activities CASCADE;
DROP TABLE IF EXISTS deal_stage_history CASCADE;
DROP TABLE IF EXISTS lead_metrics CASCADE;
DROP TABLE IF EXISTS app_trials CASCADE;
DROP TABLE IF EXISTS lead_response_logs CASCADE;
DROP TABLE IF EXISTS lead_sources CASCADE;
DROP TABLE IF EXISTS lead_stage_history CASCADE;
DROP TABLE IF EXISTS lead_activities CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS opportunities CASCADE;
DROP TABLE IF EXISTS deals CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;

-- Contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  mobile VARCHAR(50),
  title VARCHAR(100),
  department VARCHAR(100),
  island VARCHAR(100),
  contact_type contact_type DEFAULT 'lead',
  is_primary BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  -- Social media
  linkedin_url VARCHAR(255),
  twitter_handle VARCHAR(100),
  
  -- Additional info
  notes TEXT,
  birthday DATE,
  anniversary DATE,
  
  -- Assignment
  assigned_to UUID REFERENCES profiles(id),
  created_by UUID REFERENCES profiles(id),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table (from our previous work)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  company_size VARCHAR(50),
  industry VARCHAR(100),
  island VARCHAR(100),
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

-- Deals table
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  
  -- Deal details
  status deal_status DEFAULT 'prospecting',
  stage deal_stage DEFAULT 'discovery',
  value DECIMAL(15,2),
  currency VARCHAR(3) DEFAULT 'USD',
  probability INTEGER CHECK (probability >= 0 AND probability <= 100),
  
  -- Dates
  expected_close_date DATE,
  actual_close_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Assignment
  assigned_to UUID REFERENCES profiles(id),
  created_by UUID REFERENCES profiles(id),
  
  -- Additional info
  source VARCHAR(100),
  tags TEXT[]
);

-- Opportunities table
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  deal_id UUID REFERENCES deals(id) ON DELETE SET NULL,
  
  -- Opportunity details
  status opportunity_status DEFAULT 'open',
  value DECIMAL(15,2),
  currency VARCHAR(3) DEFAULT 'USD',
  probability INTEGER CHECK (probability >= 0 AND probability <= 100),
  
  -- Dates
  expected_close_date DATE,
  actual_close_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Assignment
  assigned_to UUID REFERENCES profiles(id),
  created_by UUID REFERENCES profiles(id),
  
  -- Additional info
  source VARCHAR(100),
  tags TEXT[]
);

-- Activities table
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type activity_type NOT NULL,
  subject VARCHAR(255),
  description TEXT,
  
  -- Related entities
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  
  -- Activity details
  scheduled_date TIMESTAMP WITH TIME ZONE,
  completed_date TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  
  -- Assignment
  assigned_to UUID REFERENCES profiles(id),
  created_by UUID REFERENCES profiles(id),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Related entities
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  
  -- Task details
  status task_status DEFAULT 'pending',
  priority task_priority DEFAULT 'medium',
  due_date TIMESTAMP WITH TIME ZONE,
  completed_date TIMESTAMP WITH TIME ZONE,
  
  -- Assignment
  assigned_to UUID REFERENCES profiles(id),
  created_by UUID REFERENCES profiles(id),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- LEAD-SPECIFIC TABLES (from our previous work)
-- ============================================================================

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

-- ============================================================================
-- DEAL-SPECIFIC TABLES
-- ============================================================================

-- Deal stages history
CREATE TABLE deal_stage_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  from_stage deal_stage,
  to_stage deal_stage NOT NULL,
  reason TEXT,
  changed_by UUID REFERENCES profiles(id),
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deal activities
CREATE TABLE deal_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL,
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

-- ============================================================================
-- ENHANCED USER MANAGEMENT
-- ============================================================================

-- Enhanced profiles table (add CRM-specific fields)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'sales_rep';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS department VARCHAR(100);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS manager_id UUID REFERENCES profiles(id);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS quota DECIMAL(15,2);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS commission_rate DECIMAL(5,2);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- User permissions table
CREATE TABLE user_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  permission VARCHAR(100) NOT NULL,
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  granted_by UUID REFERENCES profiles(id),
  
  UNIQUE(user_id, permission)
);

-- ============================================================================
-- ENHANCED BILLING & SUBSCRIPTIONS
-- ============================================================================

-- Enhanced subscriptions table (add CRM-specific fields)
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS deal_id UUID REFERENCES deals(id);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS contact_id UUID REFERENCES contacts(id);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS sales_rep_id UUID REFERENCES profiles(id);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS commission_amount DECIMAL(10,2);
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS renewal_date DATE;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;

-- ============================================================================
-- SYSTEM & AUDIT TABLES
-- ============================================================================

-- Enhanced system_logs table (add CRM-specific fields)
ALTER TABLE system_logs ADD COLUMN IF NOT EXISTS entity_type VARCHAR(50);
ALTER TABLE system_logs ADD COLUMN IF NOT EXISTS entity_id UUID;
ALTER TABLE system_logs ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id);

-- CRM audit trail
CREATE TABLE crm_audit_trail (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TROPIBRAIN INTEGRATION
-- ============================================================================

-- Enhanced tropibrain_insights table
ALTER TABLE tropibrain_insights ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id);
ALTER TABLE tropibrain_insights ADD COLUMN IF NOT EXISTS contact_id UUID REFERENCES contacts(id);
ALTER TABLE tropibrain_insights ADD COLUMN IF NOT EXISTS lead_id UUID REFERENCES leads(id);
ALTER TABLE tropibrain_insights ADD COLUMN IF NOT EXISTS deal_id UUID REFERENCES deals(id);
ALTER TABLE tropibrain_insights ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'medium';

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Company indexes
CREATE INDEX IF NOT EXISTS idx_companies_name ON companies(name);
CREATE INDEX IF NOT EXISTS idx_companies_industry ON companies(industry);
CREATE INDEX IF NOT EXISTS idx_companies_status ON companies(status);

-- Contact indexes
CREATE INDEX IF NOT EXISTS idx_contacts_company_id ON contacts(company_id);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_assigned_to ON contacts(assigned_to);
CREATE INDEX IF NOT EXISTS idx_contacts_contact_type ON contacts(contact_type);
CREATE INDEX IF NOT EXISTS idx_contacts_island ON contacts(island);

-- Lead indexes
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_tropitrack_client_id ON leads(tropitrack_client_id);
CREATE INDEX IF NOT EXISTS idx_leads_trial_status ON leads(trial_status);
CREATE INDEX IF NOT EXISTS idx_leads_island ON leads(island);

-- Deal indexes
CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON deals(stage);
CREATE INDEX IF NOT EXISTS idx_deals_company_id ON deals(company_id);
CREATE INDEX IF NOT EXISTS idx_deals_assigned_to ON deals(assigned_to);
CREATE INDEX IF NOT EXISTS idx_deals_expected_close_date ON deals(expected_close_date);

-- Opportunity indexes
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON opportunities(status);
CREATE INDEX IF NOT EXISTS idx_opportunities_company_id ON opportunities(company_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_assigned_to ON opportunities(assigned_to);

-- Activity indexes
CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(type);
CREATE INDEX IF NOT EXISTS idx_activities_scheduled_date ON activities(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_activities_assigned_to ON activities(assigned_to);

-- Task indexes
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);

-- Lead-specific indexes
CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_created_at ON lead_activities(created_at);
CREATE INDEX IF NOT EXISTS idx_lead_stage_history_lead_id ON lead_stage_history(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_stage_history_changed_at ON lead_stage_history(changed_at);
CREATE INDEX IF NOT EXISTS idx_app_trials_lead_id ON app_trials(lead_id);
CREATE INDEX IF NOT EXISTS idx_app_trials_app_name ON app_trials(app_name);
CREATE INDEX IF NOT EXISTS idx_app_trials_trial_status ON app_trials(trial_status);
CREATE INDEX IF NOT EXISTS idx_lead_metrics_date ON lead_metrics(date);

-- Deal-specific indexes
CREATE INDEX IF NOT EXISTS idx_deal_stage_history_deal_id ON deal_stage_history(deal_id);
CREATE INDEX IF NOT EXISTS idx_deal_activities_deal_id ON deal_activities(deal_id);

-- Audit indexes
CREATE INDEX IF NOT EXISTS idx_crm_audit_trail_entity ON crm_audit_trail(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_crm_audit_trail_user_id ON crm_audit_trail(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_audit_trail_created_at ON crm_audit_trail(created_at);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_companies_updated_at ON companies;
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
DROP TRIGGER IF EXISTS update_deals_updated_at ON deals;
DROP TRIGGER IF EXISTS update_opportunities_updated_at ON opportunities;
DROP TRIGGER IF EXISTS update_activities_updated_at ON activities;
DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
DROP TRIGGER IF EXISTS update_lead_activities_updated_at ON lead_activities;
DROP TRIGGER IF EXISTS update_lead_sources_updated_at ON lead_sources;
DROP TRIGGER IF EXISTS update_app_trials_updated_at ON app_trials;
DROP TRIGGER IF EXISTS update_lead_metrics_updated_at ON lead_metrics;
DROP TRIGGER IF EXISTS update_deal_activities_updated_at ON deal_activities;

-- Apply updated_at triggers
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON opportunities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lead_activities_updated_at BEFORE UPDATE ON lead_activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lead_sources_updated_at BEFORE UPDATE ON lead_sources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_app_trials_updated_at BEFORE UPDATE ON app_trials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lead_metrics_updated_at BEFORE UPDATE ON lead_metrics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deal_activities_updated_at BEFORE UPDATE ON deal_activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_stage_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_response_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_stage_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_audit_trail ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view companies from their organization" ON companies;
DROP POLICY IF EXISTS "Users can insert companies for their organization" ON companies;
DROP POLICY IF EXISTS "Users can view contacts from their organization" ON contacts;
DROP POLICY IF EXISTS "Users can insert contacts for their organization" ON contacts;
DROP POLICY IF EXISTS "Users can view leads from their organization" ON leads;
DROP POLICY IF EXISTS "Users can insert leads for their organization" ON leads;
DROP POLICY IF EXISTS "Users can update leads they created or are assigned to" ON leads;

-- RLS policies for companies
CREATE POLICY "Users can view companies from their organization" ON companies
  FOR SELECT USING (
    id IN (
      SELECT company_id FROM profiles WHERE id = auth.uid()
    ) OR id IN (
      SELECT company_id FROM profiles WHERE company_id = (
        SELECT company_id FROM profiles WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can insert companies for their organization" ON companies
  FOR INSERT WITH CHECK (
    id IN (
      SELECT company_id FROM profiles WHERE id = auth.uid()
    )
  );

-- RLS policies for contacts
CREATE POLICY "Users can view contacts from their organization" ON contacts
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM profiles WHERE id = auth.uid()
    ) OR assigned_to = auth.uid()
  );

CREATE POLICY "Users can insert contacts for their organization" ON contacts
  FOR INSERT WITH CHECK (
    company_id IN (
      SELECT company_id FROM profiles WHERE id = auth.uid()
    )
  );

-- RLS policies for leads
CREATE POLICY "Users can view leads from their organization" ON leads
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

CREATE POLICY "Users can insert leads for their organization" ON leads
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

-- Similar policies for other tables...
-- (Add comprehensive RLS policies for all tables)

-- ============================================================================
-- VIEWS FOR EASY DATA ACCESS
-- ============================================================================

-- Drop existing views if they exist
DROP VIEW IF EXISTS lead_summary CASCADE;
DROP VIEW IF EXISTS deal_summary CASCADE;
DROP VIEW IF EXISTS contact_summary CASCADE;
DROP VIEW IF EXISTS app_trial_summary CASCADE;
DROP VIEW IF EXISTS lead_metrics_summary CASCADE;
DROP VIEW IF EXISTS dashboard_summary CASCADE;

-- Lead summary view
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

-- Deal summary view
CREATE VIEW deal_summary AS
SELECT 
  d.id,
  d.title,
  d.status,
  d.stage,
  d.value,
  d.probability,
  d.expected_close_date,
  d.assigned_to,
  d.created_at,
  c.name as company_name,
  p.full_name as assigned_to_name,
  COUNT(da.id) as activity_count
FROM deals d
LEFT JOIN companies c ON d.company_id = c.id
LEFT JOIN profiles p ON d.assigned_to = p.id
LEFT JOIN deal_activities da ON d.id = da.deal_id
GROUP BY d.id, c.name, p.full_name;

-- Contact summary view
CREATE VIEW contact_summary AS
SELECT 
  c.id,
  c.first_name,
  c.last_name,
  c.email,
  c.phone,
  c.title,
  c.contact_type,
  c.assigned_to,
  c.created_at,
  comp.name as company_name,
  p.full_name as assigned_to_name
FROM contacts c
LEFT JOIN companies comp ON c.company_id = comp.id
LEFT JOIN profiles p ON c.assigned_to = p.id;

-- App trial summary view
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

-- Lead metrics summary view
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

-- Dashboard summary view
CREATE VIEW dashboard_summary AS
SELECT 
  (SELECT COUNT(*) FROM leads WHERE status = 'new') as new_leads,
  (SELECT COUNT(*) FROM leads WHERE status = 'app_interested') as app_interested,
  (SELECT COUNT(*) FROM leads WHERE status = 'demo_scheduled') as demo_scheduled,
  (SELECT COUNT(*) FROM leads WHERE status = 'trial_active') as trial_active,
  (SELECT COUNT(*) FROM leads WHERE status = 'app_converted') as app_converted,
  (SELECT COUNT(*) FROM deals WHERE status = 'prospecting') as prospecting_deals,
  (SELECT COUNT(*) FROM deals WHERE status = 'negotiation') as negotiating_deals,
  (SELECT COUNT(*) FROM deals WHERE status = 'closed_won') as won_deals,
  (SELECT COUNT(*) FROM contacts WHERE contact_type = 'customer') as customers,
  (SELECT COUNT(*) FROM tasks WHERE status = 'pending') as pending_tasks,
  (SELECT COUNT(*) FROM activities WHERE scheduled_date > NOW()) as upcoming_activities;

-- ============================================================================
-- SAMPLE DATA INSERTION
-- ============================================================================

-- Insert default lead sources
INSERT INTO lead_sources (name, source_type, description) VALUES
  ('Website', 'website', 'Leads from company website'),
  ('Referral', 'referral', 'Leads from customer referrals'),
  ('Social Media', 'social_media', 'Leads from social media platforms'),
  ('Events', 'events', 'Leads from trade shows and events'),
  ('Cold Outreach', 'cold_outreach', 'Leads from cold calling/emailing'),
  ('Advertising', 'advertising', 'Leads from paid advertising'),
  ('Partnership', 'partnership', 'Leads from business partnerships'),
  ('Other', 'other', 'Other lead sources')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE companies IS 'Enhanced companies table for CRM functionality';
COMMENT ON TABLE contacts IS 'Individual contacts and people in the CRM';
COMMENT ON TABLE leads IS 'Lead management for sales pipeline';
COMMENT ON TABLE deals IS 'Sales deals and opportunities';
COMMENT ON TABLE opportunities IS 'Sales opportunities and potential deals';
COMMENT ON TABLE activities IS 'All CRM activities (calls, emails, meetings)';
COMMENT ON TABLE tasks IS 'Follow-up tasks and to-dos';
COMMENT ON TABLE lead_activities IS 'Activities specific to leads';
COMMENT ON TABLE lead_stage_history IS 'History of lead stage changes';
COMMENT ON TABLE lead_sources IS 'Available lead sources';
COMMENT ON TABLE lead_response_logs IS 'Response time tracking for leads';
COMMENT ON TABLE app_trials IS 'App trial tracking for TropiTrack integration';
COMMENT ON TABLE lead_metrics IS 'Aggregated lead metrics for reporting';
COMMENT ON TABLE deal_stage_history IS 'History of deal stage changes';
COMMENT ON TABLE deal_activities IS 'Activities specific to deals';
COMMENT ON TABLE user_permissions IS 'User permissions and access control';
COMMENT ON TABLE crm_audit_trail IS 'Audit trail for all CRM actions';
COMMENT ON TABLE crm_audit_trail IS 'Complete audit trail for CRM system';

COMMENT ON VIEW lead_summary IS 'Summary view of leads with activity counts';
COMMENT ON VIEW deal_summary IS 'Summary view of deals with activity counts';
COMMENT ON VIEW contact_summary IS 'Summary view of contacts with company info';
COMMENT ON VIEW app_trial_summary IS 'Summary view of app trials with status';
COMMENT ON VIEW lead_metrics_summary IS 'Daily lead metrics for reporting';
COMMENT ON VIEW dashboard_summary IS 'Dashboard summary for main CRM view'; 