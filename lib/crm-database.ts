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

  // Get lead sources with counts
  async getLeadSourcesWithCounts() {
    const { data, error } = await crmClient
      .from('leads')
      .select('source, id')
      .not('source', 'is', null)
    
    if (error) return { data: null, error }
    
    // Count leads by source
    const sourceCounts = data?.reduce((acc: Record<string, number>, lead) => {
      const source = lead.source || 'other'
      acc[source] = (acc[source] || 0) + 1
      return acc
    }, {} as Record<string, number>) || {}
    
    // Get total leads
    const totalLeads = data?.length || 0
    
    // Calculate percentages
    const sourcesWithPercentages = Object.entries(sourceCounts).map(([source, count]) => ({
      source,
      count: count as number,
      percentage: totalLeads > 0 ? Math.round(((count as number) / totalLeads) * 100) : 0
    }))
    
    // Sort by count descending
    sourcesWithPercentages.sort((a, b) => b.count - a.count)
    
    return { data: sourcesWithPercentages, error: null }
  },

  // Get lead response time data
  async getLeadResponseTimeData() {
    const { data, error } = await crmClient
      .from('lead_response_logs')
      .select('response_time_minutes, created_at')
      .not('response_time_minutes', 'is', null)
      .order('created_at', { ascending: false })
      .limit(100)
    
    if (error) return { data: null, error }
    
    if (!data || data.length === 0) {
      return {
        data: {
          averageResponseTime: 0,
          fastestResponse: 0,
          slowestResponse: 0,
          targetResponseTime: 240, // 4 hours in minutes
          responseTimePercentage: 0
        },
        error: null
      }
    }
    
    const responseTimes = data.map(log => log.response_time_minutes).filter(time => time > 0)
    
    if (responseTimes.length === 0) {
      return {
        data: {
          averageResponseTime: 0,
          fastestResponse: 0,
          slowestResponse: 0,
          targetResponseTime: 240, // 4 hours in minutes
          responseTimePercentage: 0
        },
        error: null
      }
    }
    
    const averageResponseTime = Math.round(responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length)
    const fastestResponse = Math.min(...responseTimes)
    const slowestResponse = Math.max(...responseTimes)
    const targetResponseTime = 240 // 4 hours in minutes
    const responseTimePercentage = Math.round((averageResponseTime / targetResponseTime) * 100)
    
    return {
      data: {
        averageResponseTime,
        fastestResponse,
        slowestResponse,
        targetResponseTime,
        responseTimePercentage
      },
      error: null
    }
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
  },

  // Get contact engagement breakdown (last 30 days)
  async getContactEngagementStats() {
    // Get all activities for contacts in the last 30 days
    const since = new Date()
    since.setDate(since.getDate() - 30)
    const { data: activities, error } = await crmClient
      .from('activities')
      .select('contact_id')
      .not('contact_id', 'is', null)
      .gte('created_at', since.toISOString())

    if (error) return { data: null, error }
    if (!activities) return { data: null, error: null }

    // Count activities per contact
    const engagementMap: Record<string, number> = {}
    activities.forEach(a => {
      if (a.contact_id) {
        engagementMap[a.contact_id] = (engagementMap[a.contact_id] || 0) + 1
      }
    })

    // Get all contacts
    const { data: contacts } = await crmClient
      .from('contacts')
      .select('id')

    const totalContacts = contacts?.length || 0
    let high = 0, medium = 0, low = 0, inactive = 0
    contacts?.forEach(c => {
      const count = engagementMap[c.id] || 0
      if (count >= 5) high++
      else if (count >= 2) medium++
      else if (count === 1) low++
      else inactive++
    })
    return {
      data: {
        high,
        medium,
        low,
        inactive,
        totalContacts
      },
      error: null
    }
  },

  // Get contact growth stats (this month, last month, growth rate)
  async getContactGrowthStats() {
    const now = new Date()
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // This month
    const { data: thisMonthContacts } = await crmClient
      .from('contacts')
      .select('id')
      .gte('created_at', startOfThisMonth.toISOString())
    // Last month
    const { data: lastMonthContacts } = await crmClient
      .from('contacts')
      .select('id')
      .gte('created_at', startOfLastMonth.toISOString())
      .lte('created_at', endOfLastMonth.toISOString())

    const thisMonth = thisMonthContacts?.length || 0
    const lastMonth = lastMonthContacts?.length || 0
    const growthRate = lastMonth > 0 ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100) : 0
    return {
      data: {
        thisMonth,
        lastMonth,
        growthRate,
        target: 100 // Example target
      },
      error: null
    }
  },

  // Get opportunity metrics
  async getOpportunityMetrics() {
    // Get all opportunities
    const { data: opportunities, error } = await crmClient
      .from('opportunities')
      .select('*')
    if (error) return { data: null, error }
    if (!opportunities) return { data: null, error: null }
    const total = opportunities.length
    const pipelineValue = Math.round(opportunities.reduce((sum, o) => sum + (o.value || 0), 0) / 1000) // in K
    const won = opportunities.filter(o => o.status === 'closed_won').length
    const open = opportunities.filter(o => o.status === 'open').length
    const avgDealSize = won > 0 ? Math.round(opportunities.filter(o => o.status === 'closed_won').reduce((sum, o) => sum + (o.value || 0), 0) / won / 1000) : 0 // in K
    // Sales cycle: avg days from created_at to expected_close_date for closed_won
    const salesCycles = opportunities.filter(o => o.status === 'closed_won' && o.created_at && o.expected_close_date).map(o => {
      const created = new Date(o.created_at)
      const closed = new Date(o.expected_close_date)
      return Math.round((closed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
    })
    const salesCycle = salesCycles.length > 0 ? Math.round(salesCycles.reduce((a, b) => a + b, 0) / salesCycles.length) : 0
    const winRate = total > 0 ? Math.round((won / total) * 100) : 0
    const conversionRate = total > 0 ? Math.round((won / total) * 100) : 0
    const satisfaction = open > 0 ? Math.round((open / total) * 100) : 0
    return {
      data: {
        pipelineValue,
        winRate,
        avgDealSize,
        salesCycle,
        conversionRate,
        satisfaction
      },
      error: null
    }
  },

  // Get pipeline growth stats (this month, last month, growth rate, pipeline value, target)
  async getPipelineGrowthStats() {
    const now = new Date()
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    // This month
    const { data: thisMonthOpps } = await crmClient
      .from('opportunities')
      .select('id, value')
      .gte('created_at', startOfThisMonth.toISOString())
    // Last month
    const { data: lastMonthOpps } = await crmClient
      .from('opportunities')
      .select('id, value')
      .gte('created_at', startOfLastMonth.toISOString())
      .lte('created_at', endOfLastMonth.toISOString())
    const thisMonth = thisMonthOpps?.length || 0
    const lastMonth = lastMonthOpps?.length || 0
    const growthRate = lastMonth > 0 ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100) : 0
    const pipelineValue = Math.round((thisMonthOpps?.reduce((sum, o) => sum + (o.value || 0), 0) || 0) / 1000) // in K
    const target = 3000 // Example target in K
    return {
      data: {
        thisMonth,
        lastMonth,
        growthRate,
        pipelineValue,
        target
      },
      error: null
    }
  },

  // Get deal performance stats
  async getDealPerformanceStats() {
    // Get all deals
    const { data: deals, error } = await crmClient
      .from('deals')
      .select('*')
    if (error) return { data: null, error }
    if (!deals) return { data: null, error: null }
    const total = deals.length
    const won = deals.filter(d => d.status === 'closed_won').length
    const lost = deals.filter(d => d.status === 'closed_lost').length
    const avgDealSize = won > 0 ? Math.round(deals.filter(d => d.status === 'closed_won').reduce((sum, d) => sum + (d.value || 0), 0) / won / 1000) : 0 // in K
    // Sales cycle: avg days from created_at to expected_close_date for closed_won
    const salesCycles = deals.filter(d => d.status === 'closed_won' && d.created_at && d.expected_close_date).map(d => {
      const created = new Date(d.created_at)
      const closed = new Date(d.expected_close_date)
      return Math.round((closed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
    })
    const salesCycle = salesCycles.length > 0 ? Math.round(salesCycles.reduce((a, b) => a + b, 0) / salesCycles.length) : 0
    const winRate = total > 0 ? Math.round((won / total) * 100) : 0
    const closeRate = total > 0 ? Math.round(((won + lost) / total) * 100) : 0
    return {
      data: {
        winRate,
        avgDealSize,
        salesCycle,
        closeRate
      },
      error: null
    }
  },

  // Get revenue trends stats (this month, last month, growth rate, target)
  async getRevenueTrendsStats() {
    const now = new Date()
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    // This month
    const { data: thisMonthDeals } = await crmClient
      .from('deals')
      .select('value')
      .eq('status', 'closed_won')
      .gte('created_at', startOfThisMonth.toISOString())
    // Last month
    const { data: lastMonthDeals } = await crmClient
      .from('deals')
      .select('value')
      .eq('status', 'closed_won')
      .gte('created_at', startOfLastMonth.toISOString())
      .lte('created_at', endOfLastMonth.toISOString())
    const thisMonth = Math.round((thisMonthDeals?.reduce((sum, d) => sum + (d.value || 0), 0) || 0) / 1000) // in K
    const lastMonth = Math.round((lastMonthDeals?.reduce((sum, d) => sum + (d.value || 0), 0) || 0) / 1000) // in K
    const growthRate = lastMonth > 0 ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100) : 0
    const target = 500 // Example target in K
    return {
      data: {
        thisMonth,
        lastMonth,
        growthRate,
        target
      },
      error: null
    }
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
  stage?: string
  source?: string
  priority?: string
  assigned_to?: string
  created_at?: string
  updated_at?: string
  tropitrack_client_id?: string
  trial_status?: string
  trial_end_date?: string
  has_trial?: boolean
  description?: string
  estimated_value?: number
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