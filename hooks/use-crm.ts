import { useState, useEffect, useCallback } from 'react'
import { crmDatabase, type Lead, type Deal, type Contact, type Company, type Opportunity, type Activity, type Task } from '@/lib/crm-database'

// ============================================================================
// LEADS HOOKS
// ============================================================================

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getLeads()
      
      if (error) {
        setError(error.message)
      } else {
        setLeads(data || [])
      }
    } catch (err) {
      setError('Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }, [])

  const createLead = useCallback(async (leadData: Partial<Lead>) => {
    try {
      const { data, error } = await crmDatabase.createLead(leadData)
      
      if (error) {
        throw new Error(error.message)
      }
      
      if (data) {
        setLeads(prev => [data, ...prev])
      }
      
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create lead' }
    }
  }, [])

  const updateLead = useCallback(async (id: string, updates: Partial<Lead>) => {
    try {
      const { data, error } = await crmDatabase.updateLead(id, updates)
      
      if (error) {
        throw new Error(error.message)
      }
      
      if (data) {
        setLeads(prev => prev.map(lead => lead.id === id ? data : lead))
      }
      
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update lead' }
    }
  }, [])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  return {
    leads,
    loading,
    error,
    fetchLeads,
    createLead,
    updateLead
  }
}

export const useLeadSources = () => {
  const [leadSources, setLeadSources] = useState<Array<{source: string, count: number, percentage: number}>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeadSources = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getLeadSourcesWithCounts()
      
      if (error) {
        setError(error.message)
      } else {
        setLeadSources(data || [])
      }
    } catch (err) {
      setError('Failed to fetch lead sources')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeadSources()
  }, [fetchLeadSources])

  return {
    leadSources,
    loading,
    error,
    fetchLeadSources
  }
}

export const useLeadResponseTime = () => {
  const [responseTimeData, setResponseTimeData] = useState<{
    averageResponseTime: number
    fastestResponse: number
    slowestResponse: number
    targetResponseTime: number
    responseTimePercentage: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchResponseTimeData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getLeadResponseTimeData()
      
      if (error) {
        setError(error.message)
      } else {
        setResponseTimeData(data)
      }
    } catch (err) {
      setError('Failed to fetch response time data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchResponseTimeData()
  }, [fetchResponseTimeData])

  return {
    responseTimeData,
    loading,
    error,
    fetchResponseTimeData
  }
}

export const useLead = (id: string) => {
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLead = useCallback(async () => {
    if (!id) return
    
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getLead(id)
      
      if (error) {
        setError(error.message)
      } else {
        setLead(data)
      }
    } catch (err) {
      setError('Failed to fetch lead')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchLead()
  }, [fetchLead])

  return { lead, loading, error, fetchLead }
}

// ============================================================================
// DEALS HOOKS
// ============================================================================

export const useDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDeals = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getDeals()
      
      if (error) {
        setError(error.message)
      } else {
        setDeals(data || [])
      }
    } catch (err) {
      setError('Failed to fetch deals')
    } finally {
      setLoading(false)
    }
  }, [])

  const createDeal = useCallback(async (dealData: Partial<Deal>) => {
    try {
      const { data, error } = await crmDatabase.createDeal(dealData)
      
      if (error) {
        throw new Error(error.message)
      }
      
      if (data) {
        setDeals(prev => [data, ...prev])
      }
      
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create deal' }
    }
  }, [])

  const updateDeal = useCallback(async (id: string, updates: Partial<Deal>) => {
    try {
      const { data, error } = await crmDatabase.updateDeal(id, updates)
      
      if (error) {
        throw new Error(error.message)
      }
      
      if (data) {
        setDeals(prev => prev.map(deal => deal.id === id ? data : deal))
      }
      
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update deal' }
    }
  }, [])

  useEffect(() => {
    fetchDeals()
  }, [fetchDeals])

  return {
    deals,
    loading,
    error,
    fetchDeals,
    createDeal,
    updateDeal
  }
}

export const useDeal = (id: string) => {
  const [deal, setDeal] = useState<Deal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDeal = useCallback(async () => {
    if (!id) return
    
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getDeal(id)
      
      if (error) {
        setError(error.message)
      } else {
        setDeal(data)
      }
    } catch (err) {
      setError('Failed to fetch deal')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchDeal()
  }, [fetchDeal])

  return { deal, loading, error, fetchDeal }
}

// ============================================================================
// OPPORTUNITIES HOOKS
// ============================================================================

export const useOpportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOpportunities = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getOpportunities()
      
      if (error) {
        setError(error.message)
      } else {
        setOpportunities(data || [])
      }
    } catch (err) {
      setError('Failed to fetch opportunities')
    } finally {
      setLoading(false)
    }
  }, [])

  const createOpportunity = useCallback(async (opportunityData: Partial<Opportunity>) => {
    try {
      const { data, error } = await crmDatabase.createOpportunity(opportunityData)
      
      if (error) {
        throw new Error(error.message)
      }
      
      if (data) {
        setOpportunities(prev => [data, ...prev])
      }
      
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create opportunity' }
    }
  }, [])

  const updateOpportunity = useCallback(async (id: string, updates: Partial<Opportunity>) => {
    try {
      const { data, error } = await crmDatabase.updateOpportunity(id, updates)
      
      if (error) {
        throw new Error(error.message)
      }
      
      if (data) {
        setOpportunities(prev => prev.map(opportunity => opportunity.id === id ? data : opportunity))
      }
      
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update opportunity' }
    }
  }, [])

  useEffect(() => {
    fetchOpportunities()
  }, [fetchOpportunities])

  return {
    opportunities,
    loading,
    error,
    fetchOpportunities,
    createOpportunity,
    updateOpportunity
  }
}

export const useOpportunity = (id: string) => {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOpportunity = useCallback(async () => {
    if (!id) return
    
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getOpportunity(id)
      
      if (error) {
        setError(error.message)
      } else {
        setOpportunity(data)
      }
    } catch (err) {
      setError('Failed to fetch opportunity')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchOpportunity()
  }, [fetchOpportunity])

  return { opportunity, loading, error, fetchOpportunity }
}

export const useOpportunityMetrics = () => {
  const [metrics, setMetrics] = useState<{
    pipelineValue: number
    winRate: number
    avgDealSize: number
    salesCycle: number
    conversionRate: number
    satisfaction: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getOpportunityMetrics()
      if (error) setError(String(error))
      else setMetrics(data)
    } catch (err) {
      setError('Failed to fetch opportunity metrics')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchMetrics() }, [fetchMetrics])

  return { metrics, loading, error, fetchMetrics }
}

export const usePipelineGrowth = () => {
  const [growth, setGrowth] = useState<{
    thisMonth: number
    lastMonth: number
    growthRate: number
    pipelineValue: number
    target: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGrowth = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getPipelineGrowthStats()
      if (error) setError(String(error))
      else setGrowth(data)
    } catch (err) {
      setError('Failed to fetch pipeline growth stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchGrowth() }, [fetchGrowth])

  return { growth, loading, error, fetchGrowth }
}

// ============================================================================
// CONTACTS HOOKS
// ============================================================================

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getContacts()
      
      if (error) {
        setError(error.message)
      } else {
        setContacts(data || [])
      }
    } catch (err) {
      setError('Failed to fetch contacts')
    } finally {
      setLoading(false)
    }
  }, [])

  const createContact = useCallback(async (contactData: Partial<Contact>) => {
    try {
      const { data, error } = await crmDatabase.createContact(contactData)
      
      if (error) {
        throw new Error(error.message)
      }
      
      if (data) {
        setContacts(prev => [data, ...prev])
      }
      
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create contact' }
    }
  }, [])

  const updateContact = useCallback(async (id: string, updates: Partial<Contact>) => {
    try {
      const { data, error } = await crmDatabase.updateContact(id, updates)
      
      if (error) {
        throw new Error(error.message)
      }
      
      if (data) {
        setContacts(prev => prev.map(contact => contact.id === id ? data : contact))
      }
      
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update contact' }
    }
  }, [])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    createContact,
    updateContact
  }
}

export const useContactEngagement = () => {
  const [engagement, setEngagement] = useState<{
    high: number
    medium: number
    low: number
    inactive: number
    totalContacts: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEngagement = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getContactEngagementStats()
      if (error) setError(String(error))
      else setEngagement(data)
    } catch (err) {
      setError('Failed to fetch engagement stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchEngagement() }, [fetchEngagement])

  return { engagement, loading, error, fetchEngagement }
}

export const useContactGrowth = () => {
  const [growth, setGrowth] = useState<{
    thisMonth: number
    lastMonth: number
    growthRate: number
    target: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGrowth = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getContactGrowthStats()
      if (error) setError(String(error))
      else setGrowth(data)
    } catch (err) {
      setError('Failed to fetch growth stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchGrowth() }, [fetchGrowth])

  return { growth, loading, error, fetchGrowth }
}

// ============================================================================
// COMPANIES HOOKS
// ============================================================================

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getCompanies()
      
      if (error) {
        setError(error.message)
      } else {
        setCompanies(data || [])
      }
    } catch (err) {
      setError('Failed to fetch companies')
    } finally {
      setLoading(false)
    }
  }, [])

  const createCompany = useCallback(async (companyData: Partial<Company>) => {
    try {
      const { data, error } = await crmDatabase.createCompany(companyData)
      
      if (error) {
        throw new Error(error.message)
      }
      
      if (data) {
        setCompanies(prev => [data, ...prev])
      }
      
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create company' }
    }
  }, [])

  const updateCompany = useCallback(async (id: string, updates: Partial<Company>) => {
    try {
      const { data, error } = await crmDatabase.updateCompany(id, updates)
      
      if (error) {
        throw new Error(error.message)
      }
      
      if (data) {
        setCompanies(prev => prev.map(company => company.id === id ? data : company))
      }
      
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update company' }
    }
  }, [])

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])

  return {
    companies,
    loading,
    error,
    fetchCompanies,
    createCompany,
    updateCompany
  }
}

// ============================================================================
// ACTIVITIES HOOKS
// ============================================================================

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getActivities()
      
      if (error) {
        setError(error.message)
      } else {
        setActivities(data || [])
      }
    } catch (err) {
      setError('Failed to fetch activities')
    } finally {
      setLoading(false)
    }
  }, [])

  const createActivity = useCallback(async (activityData: Partial<Activity>) => {
    try {
      const { data, error } = await crmDatabase.createActivity(activityData)
      
      if (error) {
        throw new Error(error.message)
      }
      
      if (data) {
        setActivities(prev => [data, ...prev])
      }
      
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create activity' }
    }
  }, [])

  useEffect(() => {
    fetchActivities()
  }, [fetchActivities])

  return {
    activities,
    loading,
    error,
    fetchActivities,
    createActivity
  }
}

// ============================================================================
// TASKS HOOKS
// ============================================================================

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getTasks()
      
      if (error) {
        setError(error.message)
      } else {
        setTasks(data || [])
      }
    } catch (err) {
      setError('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }, [])

  const createTask = useCallback(async (taskData: Partial<Task>) => {
    try {
      const { data, error } = await crmDatabase.createTask(taskData)
      
      if (error) {
        throw new Error(error.message)
      }
      
      if (data) {
        setTasks(prev => [data, ...prev])
      }
      
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create task' }
    }
  }, [])

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await crmDatabase.updateTask(id, updates)
      
      if (error) {
        throw new Error(error.message)
      }
      
      if (data) {
        setTasks(prev => prev.map(task => task.id === id ? data : task))
      }
      
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update task' }
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask
  }
}

// ============================================================================
// DASHBOARD HOOKS
// ============================================================================

export const useDashboard = () => {
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getDashboardSummary()
      
      if (error) {
        setError(error.message)
      } else {
        setSummary(data)
      }
    } catch (err) {
      setError('Failed to fetch dashboard summary')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSummary()
  }, [fetchSummary])

  return { summary, loading, error, fetchSummary }
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchLeads = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.searchLeads(query)
      
      if (error) {
        setError(error.message)
      } else {
        setSearchResults(data || [])
      }
    } catch (err) {
      setError('Failed to search leads')
    } finally {
      setLoading(false)
    }
  }, [])

  const searchDeals = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.searchDeals(query)
      
      if (error) {
        setError(error.message)
      } else {
        setSearchResults(data || [])
      }
    } catch (err) {
      setError('Failed to search deals')
    } finally {
      setLoading(false)
    }
  }, [])

  const searchContacts = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.searchContacts(query)
      
      if (error) {
        setError(error.message)
      } else {
        setSearchResults(data || [])
      }
    } catch (err) {
      setError('Failed to search contacts')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    searchResults,
    loading,
    error,
    searchLeads,
    searchDeals,
    searchContacts
  }
} 

export const useDealPerformance = () => {
  const [performance, setPerformance] = useState<{
    winRate: number
    avgDealSize: number
    salesCycle: number
    closeRate: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPerformance = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getDealPerformanceStats()
      if (error) setError(String(error))
      else setPerformance(data)
    } catch (err) {
      setError('Failed to fetch deal performance stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPerformance() }, [fetchPerformance])

  return { performance, loading, error, fetchPerformance }
}

export const useRevenueTrends = () => {
  const [trends, setTrends] = useState<{
    thisMonth: number
    lastMonth: number
    growthRate: number
    target: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrends = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await crmDatabase.getRevenueTrendsStats()
      if (error) setError(String(error))
      else setTrends(data)
    } catch (err) {
      setError('Failed to fetch revenue trends stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchTrends() }, [fetchTrends])

  return { trends, loading, error, fetchTrends }
} 