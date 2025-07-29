import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Users, UserCheck, Shield, UserPlus } from "lucide-react"
import UserManagementClient from "./user-management-client"
import { tropiTrackServerApi } from "@/utils/supabase/tropitrack-server"
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

declare global {
  var process: {
    env: {
      NEXT_PUBLIC_TROPITRACK_SUPABASE_URL?: string;
      NEXT_PUBLIC_TROPITRACK_SUPABASE_ANON_KEY?: string;
    };
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function createServiceClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase service role environment variables')
  }
  
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

async function getUserManagementData() {
  const supabase = createServiceClient()
  
  // Get all profiles with company information from TropiTech
  const { data: tropiTechUsers, error: usersError } = await supabase
    .from('profiles')
    .select(`
      id,
      user_id,
      full_name,
      first_name,
      last_name,
      email,
      role,
      is_active,
      last_login_at,
      created_at,
      company_id,
      companies!profiles_company_id_fkey (
        id,
        name,
        status
      )
    `)
    .order('created_at', { ascending: false })

  if (usersError) {
    // Error fetching TropiTech users
  }

  // Test simple count query to verify database connection
  const { error: countError } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
  
  if (countError) {
    // Error counting profiles
  }

  // Get users from TropiTrack (with error handling)
  let tropiTrackUsers = null
  // let tropiTrackError = null // Unused variable
  
  // Check if TropiTrack environment variables are available
  const tropiTrackUrl = process.env.NEXT_PUBLIC_TROPITRACK_SUPABASE_URL
  const tropiTrackAnonKey = process.env.NEXT_PUBLIC_TROPITRACK_SUPABASE_ANON_KEY
  
  if (tropiTrackUrl && tropiTrackAnonKey) {
    try {
      const result = await tropiTrackServerApi.getAllUsers()
      tropiTrackUsers = result.data
    } catch {
      // Error fetching TropiTrack users
    }
  }

  // Transform TropiTrack users to match the format
  const transformedTropiTrackUsers = tropiTrackUsers ? tropiTrackUsers.map(user => ({
    id: `tropitrack_${user.id}`,
    full_name: user.name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'No Name',
    email: user.email,
    role: user.role || 'user',
    status: user.is_active ? 'active' : 'inactive',
    last_login: user.last_login_at || null,
    created_at: user.created_at,
    company_id: user.company_id,
    companies: user.companies ? {
      ...user.companies,
      status: (user.companies as { state?: string, [key: string]: any }).state // Map state to status for consistency
    } : null,
    source: 'TropiTrack' as const
  })) : []

  // Transform TropiTech users to include source
  const transformedTropiTechUsers = (tropiTechUsers || []).map(user => ({
    ...user,
    source: 'TropiTech' as const
  }))



  // Combine users from both sources
  const allUsers = [...transformedTropiTechUsers, ...transformedTropiTrackUsers]

  // Get statistics from TropiTech
  const { count: tropiTechTotalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { count: tropiTechActiveUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  const { count: tropiTechAdminUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'admin')

  // Get users created this month from TropiTech
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { count: tropiTechNewThisMonth } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startOfMonth.toISOString())



  // Calculate combined statistics
  const tropiTrackTotalUsers = tropiTrackUsers ? tropiTrackUsers.length : 0
  const tropiTrackActiveUsers = tropiTrackUsers ? tropiTrackUsers.filter(u => u.is_active).length : 0
  const tropiTrackAdminUsers = tropiTrackUsers ? tropiTrackUsers.filter(u => u.role === 'admin').length : 0
  const tropiTrackNewThisMonth = tropiTrackUsers ? tropiTrackUsers.filter(u => 
    new Date(u.created_at) >= startOfMonth
  ).length : 0

  return {
    users: allUsers,
    stats: {
      totalUsers: (tropiTechTotalUsers || 0) + tropiTrackTotalUsers,
      activeUsers: (tropiTechActiveUsers || 0) + tropiTrackActiveUsers,
      adminUsers: (tropiTechAdminUsers || 0) + tropiTrackAdminUsers,
      newThisMonth: (tropiTechNewThisMonth || 0) + tropiTrackNewThisMonth
    }
  }
}

export default async function UserManagement() {
  const { users, stats } = await getUserManagementData()

  return (
    <div className="space-y-2">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground mt-2">Manage users, roles, and permissions across all companies</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <CardDescription>Total Users</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-success" />
              <CardDescription>Active Users</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.activeUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <CardDescription>Admins</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.adminUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-muted-foreground" />
              <CardDescription>New This Month</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.newThisMonth.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Client Component */}
      <UserManagementClient users={users} />
    </div>
  )
}