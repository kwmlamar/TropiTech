import { createClient } from '@supabase/supabase-js'

// CRM-specific database client
export const crmClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// CRM Database Functions
export const crmDatabase = {
  // ============================================================================
  // LEADS FUNCTIONS
  // ============================================================================

  // Get all leads
  async getLeads() {
    const { data, error } = await crmClient
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Get lead by ID
  async getLead(id: string) {
    const { data, error } = await crmClient
      .from('leads')
      .select('*')
      .eq('id', id)
      .single()
    
    return { data, error }
  },

  // Create new lead
  async createLead(lead: Partial<Lead>) {
    const { data, error } = await crmClient
      .from('leads')
      .insert(lead)
      .select()
      .single()
    
    return { data, error }
  },

  // Update lead
  async updateLead(id: string, updates: Partial<Lead>) {
    const { data, error } = await crmClient
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  // Get lead metrics
  async getLeadMetrics() {
    const { data, error } = await crmClient
      .from('lead_metrics')
      .select('*')
      .order('date', { ascending: false })
      .limit(30)
    
    return { data, error }
  },

  // Get app trials
  async getAppTrials() {
    const { data, error } = await crmClient
      .from('app_trials')
      .select('*')
      .order('trial_start_date', { ascending: false })
    
    return { data, error }
  },

  // ============================================================================
  // DEALS FUNCTIONS
  // ============================================================================

  // Get all deals
  async getDeals() {
    const { data, error } = await crmClient
      .from('deals')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Get deal by ID
  async getDeal(id: string) {
    const { data, error } = await crmClient
      .from('deals')
      .select('*')
      .eq('id', id)
      .single()
    
    return { data, error }
  },

  // Create new deal
  async createDeal(deal: Partial<Deal>) {
    const { data, error } = await crmClient
      .from('deals')
      .insert(deal)
      .select()
      .single()
    
    return { data, error }
  },

  // Update deal
  async updateDeal(id: string, updates: Partial<Deal>) {
    const { data, error } = await crmClient
      .from('deals')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  // ============================================================================
  // CONTACTS FUNCTIONS
  // ============================================================================

  // Get all contacts
  async getContacts() {
    const { data, error } = await crmClient
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Get contact by ID
  async getContact(id: string) {
    const { data, error } = await crmClient
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single()
    
    return { data, error }
  },

  // Create new contact
  async createContact(contact: Partial<Contact>) {
    const { data, error } = await crmClient
      .from('contacts')
      .insert(contact)
      .select()
      .single()
    
    return { data, error }
  },

  // Update contact
  async updateContact(id: string, updates: Partial<Contact>) {
    const { data, error } = await crmClient
      .from('contacts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  // ============================================================================
  // OPPORTUNITIES FUNCTIONS
  // ============================================================================

  // Get all opportunities
  async getOpportunities() {
    const { data, error } = await crmClient
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Get opportunity by ID
  async getOpportunity(id: string) {
    const { data, error } = await crmClient
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .single()
    
    return { data, error }
  },

  // Create new opportunity
  async createOpportunity(opportunity: Partial<Opportunity>) {
    const { data, error } = await crmClient
      .from('opportunities')
      .insert(opportunity)
      .select()
      .single()
    
    return { data, error }
  },

  // Update opportunity
  async updateOpportunity(id: string, updates: Partial<Opportunity>) {
    const { data, error } = await crmClient
      .from('opportunities')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  // ============================================================================
  // COMPANIES FUNCTIONS
  // ============================================================================

  // Get all companies
  async getCompanies() {
    const { data, error } = await crmClient
      .from('companies')
      .select('*')
      .order('name', { ascending: true })
    
    return { data, error }
  },

  // Get company by ID
  async getCompany(id: string) {
    const { data, error } = await crmClient
      .from('companies')
      .select(`
        *,
        contacts(*)
      `)
      .eq('id', id)
      .single()
    
    return { data, error }
  },

  // Create new company
  async createCompany(company: Partial<Company>) {
    const { data, error } = await crmClient
      .from('companies')
      .insert(company)
      .select()
      .single()
    
    return { data, error }
  },

  // Update company
  async updateCompany(id: string, updates: Partial<Company>) {
    const { data, error } = await crmClient
      .from('companies')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  // ============================================================================
  // ACTIVITIES FUNCTIONS
  // ============================================================================

  // Get all activities
  async getActivities() {
    const { data, error } = await crmClient
      .from('activities')
      .select('*')
      .order('scheduled_date', { ascending: true })
    
    return { data, error }
  },

  // Get activities for a specific entity
  async getEntityActivities(entityType: string, entityId: string) {
    const { data, error } = await crmClient
      .from('activities')
      .select('*')
      .eq(`${entityType}_id`, entityId)
      .order('scheduled_date', { ascending: true })
    
    return { data, error }
  },

  // Create new activity
  async createActivity(activity: Partial<Activity>) {
    const { data, error } = await crmClient
      .from('activities')
      .insert(activity)
      .select()
      .single()
    
    return { data, error }
  },

  // ============================================================================
  // TASKS FUNCTIONS
  // ============================================================================

  // Get all tasks
  async getTasks() {
    const { data, error } = await crmClient
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true })
    
    return { data, error }
  },

  // Get tasks for a specific entity
  async getEntityTasks(entityType: string, entityId: string) {
    const { data, error } = await crmClient
      .from('tasks')
      .select('*')
      .eq(`${entityType}_id`, entityId)
      .order('due_date', { ascending: true })
    
    return { data, error }
  },

  // Create new task
  async createTask(task: Partial<Task>) {
    const { data, error } = await crmClient
      .from('tasks')
      .insert(task)
      .select()
      .single()
    
    return { data, error }
  },

  // Update task
  async updateTask(id: string, updates: Partial<Task>) {
    const { data, error } = await crmClient
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  // ============================================================================
  // DASHBOARD FUNCTIONS
  // ============================================================================

  // Get dashboard summary
  async getDashboardSummary() {
    const { data, error } = await crmClient
      .from('dashboard_summary')
      .select('*')
      .single()
    
    return { data, error }
  },

  // Get lead summary
  async getLeadSummary() {
    const { data, error } = await crmClient
      .from('lead_summary')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    
    return { data, error }
  },

  // Get deal summary
  async getDealSummary() {
    const { data, error } = await crmClient
      .from('deal_summary')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    
    return { data, error }
  },

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  // Get lead sources
  async getLeadSources() {
    const { data, error } = await crmClient
      .from('lead_sources')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true })
    
    return { data, error }
  },

  // Get users for assignment
  async getUsers() {
    const { data, error } = await crmClient
      .from('profiles')
      .select('id, full_name, email, role')
      .eq('is_active', true)
      .order('full_name', { ascending: true })
    
    return { data, error }
  },

  // Search leads
  async searchLeads(query: string) {
    const { data, error } = await crmClient
      .from('leads')
      .select('*')
      .or(`company_name.ilike.%${query}%,contact_name.ilike.%${query}%,email.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Search deals
  async searchDeals(query: string) {
    const { data, error } = await crmClient
      .from('deals')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Search contacts
  async searchContacts(query: string) {
    const { data, error } = await crmClient
      .from('contacts')
      .select('*')
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    return { data, error }
  }
}

// Export types for TypeScript (using any for now until database types are updated)
// Define proper types for CRM entities
export interface Lead {
  id: string
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  company_name?: string
  status?: string
  source?: string
  priority?: string
  assigned_to?: string
  created_at?: string
  updated_at?: string
  tropitrack_client_id?: string
  trial_status?: string
  value?: number
}

export interface Deal {
  id: string
  name?: string
  company_id?: string
  company_name?: string
  value?: number
  status?: string
  stage?: string
  assigned_to?: string
  expected_close_date?: string
  created_at?: string
  updated_at?: string
}

export interface Contact {
  id: string
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  title?: string
  company_id?: string
  company_name?: string
  contact_type?: string
  status?: string
  assigned_to?: string
  created_at?: string
  updated_at?: string
}

export interface Company {
  id: string
  name?: string
  industry?: string
  website?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
  annual_revenue?: number
  employee_count?: number
  founded_year?: number
  description?: string
  status?: string
  created_at?: string
  updated_at?: string
}

export interface Opportunity {
  id: string
  name?: string
  company_id?: string
  company_name?: string
  value?: number
  status?: string
  stage?: string
  description?: string
  assigned_to?: string
  expected_close_date?: string
  created_at?: string
  updated_at?: string
}

export interface Activity {
  id: string
  type?: string
  subject?: string
  description?: string
  scheduled_date?: string
  assigned_to?: string
  lead_id?: string
  deal_id?: string
  contact_id?: string
  created_at?: string
  updated_at?: string
}

export interface Task {
  id: string
  title?: string
  description?: string
  status?: string
  priority?: string
  due_date?: string
  assigned_to?: string
  lead_id?: string
  deal_id?: string
  contact_id?: string
  created_at?: string
  updated_at?: string
}

export interface AppTrial {
  id: string
  lead_id?: string
  app_name?: string
  trial_start_date?: string
  trial_end_date?: string
  trial_status?: string
  created_at?: string
  updated_at?: string
}

export interface LeadMetric {
  id: string
  date?: string
  metric_name?: string
  metric_value?: number
  created_at?: string
  updated_at?: string
} 