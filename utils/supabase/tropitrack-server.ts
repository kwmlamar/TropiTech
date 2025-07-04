import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// TropiTrack specific environment variables
const tropiTrackUrl = process.env.NEXT_PUBLIC_TROPITRACK_SUPABASE_URL
const tropiTrackAnonKey = process.env.NEXT_PUBLIC_TROPITRACK_SUPABASE_ANON_KEY
const tropiTrackServiceKey = process.env.TROPITRACK_SUPABASE_SERVICE_ROLE_KEY

if (!tropiTrackUrl || !tropiTrackAnonKey) {
  throw new Error('Missing TropiTrack Supabase environment variables')
}

export async function createTropiTrackClient() {
  const cookieStore = await cookies()

  return createServerClient(
    tropiTrackUrl!,
    tropiTrackAnonKey!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// Service role client for admin operations (use with caution)
export function createTropiTrackServiceClient() {
  if (!tropiTrackServiceKey) {
    throw new Error('Missing TropiTrack service role key')
  }

  return createClient(
    tropiTrackUrl!,
    tropiTrackServiceKey!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// TropiTrack server-side API functions
export const tropiTrackServerApi = {
  // Time tracking functions
  async startTimeEntry(userId: string, projectId: string, taskId?: string, description?: string) {
    const supabase = await createTropiTrackClient()
    
    const { data, error } = await supabase
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
    const supabase = await createTropiTrackClient()
    const endTime = new Date().toISOString()
    
    const { data, error } = await supabase
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
    const supabase = await createTropiTrackClient()
    
    const { data, error } = await supabase
      .from('time_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()

    return { data, error }
  },

  async getTimeEntries(userId: string, startDate?: string, endDate?: string) {
    const supabase = await createTropiTrackClient()
    
    let query = supabase
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
    const supabase = await createTropiTrackClient()
    
    let query = supabase
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
    const supabase = await createTropiTrackClient()
    
    const { data, error } = await supabase
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
    const supabase = await createTropiTrackClient()
    
    let query = supabase
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
    const supabase = await createTropiTrackClient()
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('is_active', true)
      .order('full_name', { ascending: true })

    return { data, error }
  },

  async getUser(userId: string) {
    const supabase = await createTropiTrackClient()
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    return { data, error }
  },

  // Client functions
  async getClients() {
    const supabase = await createTropiTrackClient()
    
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('status', 'active')
      .order('name', { ascending: true })

    return { data, error }
  },

  // Reporting functions
  async getTimeReport(projectId?: string, startDate?: string, endDate?: string) {
    const supabase = await createTropiTrackClient()
    
    let query = supabase
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
    const supabase = await createTropiTrackClient()
    
    let query = supabase
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
  },

  // Admin functions (using service role)
  async getAllTimeEntries(startDate?: string, endDate?: string) {
    const supabase = createTropiTrackServiceClient()
    
    let query = supabase
      .from('time_entries')
      .select(`
        *,
        users(full_name, email),
        projects(name),
        tasks(name)
      `)
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

  async getAllProjects() {
    const supabase = createTropiTrackServiceClient()
    
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        clients(*),
        time_entries(count)
      `)
      .order('created_at', { ascending: false })

    return { data, error }
  },

  async getAllUsers() {
    const supabase = createTropiTrackServiceClient()
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('full_name', { ascending: true })

    return { data, error }
  }
} 