import { createClient } from '@supabase/supabase-js'

// TropiTrack specific environment variables
const tropiTrackUrl = process.env.NEXT_PUBLIC_TROPITRACK_SUPABASE_URL
const tropiTrackAnonKey = process.env.NEXT_PUBLIC_TROPITRACK_SUPABASE_ANON_KEY

if (!tropiTrackUrl || !tropiTrackAnonKey) {
  throw new Error('Missing TropiTrack Supabase environment variables')
}

// Create TropiTrack specific Supabase client
export const tropiTrackClient = createClient(tropiTrackUrl, tropiTrackAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'tropitrack-web'
    }
  }
})

// TropiTrack specific types
export interface TropiTrackTimeEntry {
  id: string
  user_id: string
  project_id: string
  task_id?: string
  start_time: string
  end_time?: string
  duration_minutes?: number
  description?: string
  status: 'active' | 'paused' | 'completed'
  created_at: string
  updated_at: string
}

export interface TropiTrackProject {
  id: string
  name: string
  description?: string
  client_id: string
  status: 'active' | 'completed' | 'on-hold'
  start_date: string
  end_date?: string
  budget?: number
  created_at: string
  updated_at: string
}

export interface TropiTrackTask {
  id: string
  project_id: string
  name: string
  description?: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  estimated_hours?: number
  actual_hours?: number
  assigned_to?: string
  created_at: string
  updated_at: string
}

export interface TropiTrackUser {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'manager' | 'worker'
  hourly_rate?: number
  department?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface TropiTrackClient {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  company_size?: 'small' | 'medium' | 'large'
  industry?: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

// TropiTrack specific functions
export const tropiTrackApi = {
  // Time tracking functions
  async startTimeEntry(userId: string, projectId: string, taskId?: string, description?: string) {
    const { data, error } = await tropiTrackClient
      .from('time_entries')
      .insert({
        user_id: userId,
        project_id: projectId,
        task_id: taskId,
        start_time: new Date().toISOString(),
        description,
        status: 'active'
      })
      .select()
      .single()

    return { data, error }
  },

  async stopTimeEntry(entryId: string) {
    const endTime = new Date().toISOString()
    
    const { data, error } = await tropiTrackClient
      .from('time_entries')
      .update({
        end_time: endTime,
        status: 'completed',
        duration_minutes: 0 // Calculate this based on start_time and end_time
      })
      .eq('id', entryId)
      .select()
      .single()

    return { data, error }
  },

  async getActiveTimeEntry(userId: string) {
    const { data, error } = await tropiTrackClient
      .from('time_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()

    return { data, error }
  },

  async getTimeEntries(userId: string, startDate?: string, endDate?: string) {
    let query = tropiTrackClient
      .from('time_entries')
      .select(`
        *,
        projects(name),
        tasks(name)
      `)
      .eq('user_id', userId)
      .order('start_time', { ascending: false })

    if (startDate) {
      query = query.gte('start_time', startDate)
    }
    if (endDate) {
      query = query.lte('start_time', endDate)
    }

    const { data, error } = await query
    return { data, error }
  },

  // Project functions
  async getProjects(userId?: string) {
    let query = tropiTrackClient
      .from('projects')
      .select(`
        *,
        clients(name, email)
      `)
      .order('created_at', { ascending: false })

    if (userId) {
      // Filter projects where user has time entries or is assigned
      query = query.or(`user_id.eq.${userId},id.in.(select distinct project_id from time_entries where user_id = ${userId})`)
    }

    const { data, error } = await query
    return { data, error }
  },

  async getProject(projectId: string) {
    const { data, error } = await tropiTrackClient
      .from('projects')
      .select(`
        *,
        clients(*),
        tasks(*),
        time_entries(*)
      `)
      .eq('id', projectId)
      .single()

    return { data, error }
  },

  // Task functions
  async getTasks(projectId?: string) {
    let query = tropiTrackClient
      .from('tasks')
      .select(`
        *,
        projects(name)
      `)
      .order('created_at', { ascending: false })

    if (projectId) {
      query = query.eq('project_id', projectId)
    }

    const { data, error } = await query
    return { data, error }
  },

  // User functions
  async getUsers() {
    const { data, error } = await tropiTrackClient
      .from('users')
      .select('*')
      .eq('is_active', true)
      .order('full_name', { ascending: true })

    return { data, error }
  },

  async getUser(userId: string) {
    const { data, error } = await tropiTrackClient
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    return { data, error }
  },

  // Client functions
  async getClients() {
    const { data, error } = await tropiTrackClient
      .from('clients')
      .select('*')
      .eq('status', 'active')
      .order('name', { ascending: true })

    return { data, error }
  },

  // Reporting functions
  async getTimeReport(projectId?: string, startDate?: string, endDate?: string) {
    let query = tropiTrackClient
      .from('time_entries')
      .select(`
        *,
        users(full_name, hourly_rate),
        projects(name),
        tasks(name)
      `)
      .eq('status', 'completed')

    if (projectId) {
      query = query.eq('project_id', projectId)
    }
    if (startDate) {
      query = query.gte('start_time', startDate)
    }
    if (endDate) {
      query = query.lte('start_time', endDate)
    }

    const { data, error } = await query
    return { data, error }
  },

  async getPayrollReport(userId?: string, startDate?: string, endDate?: string) {
    let query = tropiTrackClient
      .from('time_entries')
      .select(`
        duration_minutes,
        users(full_name, hourly_rate)
      `)
      .eq('status', 'completed')

    if (userId) {
      query = query.eq('user_id', userId)
    }
    if (startDate) {
      query = query.gte('start_time', startDate)
    }
    if (endDate) {
      query = query.lte('start_time', endDate)
    }

    const { data, error } = await query
    return { data, error }
  }
}

export default tropiTrackClient 