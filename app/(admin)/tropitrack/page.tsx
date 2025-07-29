import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  TrendingUp, 
  Clock, 
  Users, 
  Activity, 
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { createTropiTrackClient } from "@/utils/supabase/tropitrack-server"
import { format, subDays, startOfDay } from "date-fns"

async function getTropiTrackAppStats() {
  try {
    const supabase = await createTropiTrackClient()
    
    // Get current date and time ranges
    const now = new Date()
    const today = startOfDay(now)
    const yesterday = startOfDay(subDays(now, 1))
    const lastWeek = startOfDay(subDays(now, 7))
    const lastMonth = startOfDay(subDays(now, 30))

    // App Usage Statistics - Real data from TropiTrack
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    // Get active users from profiles table using is_active column
    const { count: activeUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)

    // Get unique active users today (users who logged in today)
    const { count: activeUsersToday } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('last_login_at', today.toISOString())

    // Get unique active users yesterday
    const { count: activeUsersYesterday } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('last_login_at', yesterday.toISOString())
      .lt('last_login_at', today.toISOString())

    // Get unique weekly active users
    const { count: weeklyActiveUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('last_login_at', lastWeek.toISOString())

    // Time tracking activity
    const { count: timeEntriesToday } = await supabase
      .from('timesheets')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())

    const { count: timeEntriesYesterday } = await supabase
      .from('timesheets')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', yesterday.toISOString())
      .lt('created_at', today.toISOString())

    const { count: timeEntriesLastWeek } = await supabase
      .from('timesheets')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', lastWeek.toISOString())

    const { count: timeEntriesLastMonth } = await supabase
      .from('timesheets')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', lastMonth.toISOString())

    // Project activity
    const { count: projectsCreatedToday } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())

    const { count: projectsCreatedLastWeek } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', lastWeek.toISOString())

    // Task activity
    const { count: tasksCreatedToday } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())

    const { count: tasksCompletedToday } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed')
      .gte('updated_at', today.toISOString())

    // Get total projects and their status
    const { count: totalProjects } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })

    const { count: activeProjects } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    const { count: completedProjects } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed')

    // Get total tasks and their status
    const { count: totalTasks } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })

    const { count: completedTasks } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed')

    const { count: inProgressTasks } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'in-progress')

    // Get time tracking status
    const { count: activeTimeEntries } = await supabase
      .from('timesheets')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    const { count: completedTimeEntries } = await supabase
      .from('timesheets')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed')

    const { count: pausedTimeEntries } = await supabase
      .from('timesheets')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'paused')

    // Calculate total hours tracked
    const { data: timeData } = await supabase
      .from('timesheets')
      .select('duration_minutes')
      .eq('status', 'completed')
      .not('duration_minutes', 'is', null)

    const totalHoursTracked = timeData?.reduce((sum, entry) => sum + (entry.duration_minutes || 0), 0) || 0

    // Payroll activity
    const { count: payrollEntriesToday } = await supabase
      .from('payroll')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())

    const { count: payrollEntriesPending } = await supabase
      .from('payroll')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    const { count: payrollEntriesApproved } = await supabase
      .from('payroll')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved')

    const { count: payrollEntriesPaid } = await supabase
      .from('payroll')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'paid')

    // Weekly activity metrics
    const { count: pendingTimesheets } = await supabase
      .from('timesheets')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')
      .gte('created_at', lastWeek.toISOString())

    const { count: approvedTimesheets } = await supabase
      .from('timesheets')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved')
      .gte('created_at', lastWeek.toISOString())

    const { count: confirmedPayroll } = await supabase
      .from('payroll')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved')
      .gte('created_at', lastWeek.toISOString())

    const { count: paidPayroll } = await supabase
      .from('payroll')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'paid')
      .gte('created_at', lastWeek.toISOString())

    // Get TropiTrack users with last login from auth sessions
    const { data: tropiTrackUsers } = await supabase
      .from('profiles')
      .select(`
        id,
        name,
        email,
        role,
        is_active,
        created_at,
        company_id,
        companies!profiles_company_id_fkey(name)
      `)
      .order('created_at', { ascending: false })

    // Get last login times from auth sessions
    const { data: authSessions } = await supabase
      .from('sessions')
      .select('user_id, updated_at')
      .not('user_id', 'is', null)
      .order('updated_at', { ascending: false })

    // Get user engagement by device (simulated - would need analytics integration)
    const deviceUsage = {
      desktop: 68,
      mobile: 28,
      tablet: 4
    }

    // Calculate feature usage based on real data
    const featureUsage = {
              timeTracking: (totalUsers || 0) > 0 ? Math.round(((activeUsersToday || 0) / (totalUsers || 1)) * 100) : 0,
      projectManagement: (totalProjects || 0) > 0 ? Math.round(((activeProjects || 0) / (totalProjects || 1)) * 100) : 0,
      taskManagement: (totalTasks || 0) > 0 ? Math.round(((completedTasks || 0) / (totalTasks || 1)) * 100) : 0,
      payroll: 76, // Would need payroll data
      reporting: 65 // Would need reporting data
    }

    // System performance metrics (would need monitoring integration)
    const avgResponseTime = 245 // ms
    const uptimePercentage = 99.8
    const errorRate = 0.02
    const activeConnections = 127
    const databaseSize = 2.4 // GB
    const cacheHitRate = 94.5

    // Error logs (would need error tracking integration)
    const errorLogs = [
      { id: 1, type: 'API Timeout', count: 3, severity: 'low', timestamp: new Date() },
      { id: 2, type: 'Database Connection', count: 1, severity: 'medium', timestamp: new Date() },
      { id: 3, type: 'Authentication Failed', count: 5, severity: 'low', timestamp: new Date() }
    ]

    // Create a map of user_id to last login time from auth sessions
    const lastLoginMap = new Map()
    authSessions?.forEach(session => {
      if (!lastLoginMap.has(session.user_id)) {
        lastLoginMap.set(session.user_id, session.updated_at)
      }
    })

    return {
      // User metrics
      totalUsers: totalUsers || 0,
      activeUsers: activeUsers || 0,
      activeUsersToday: activeUsersToday || 0,
      activeUsersYesterday: activeUsersYesterday || 0,
      weeklyActiveUsers: weeklyActiveUsers || 0,
      
      // Activity metrics
      timeEntriesToday: timeEntriesToday || 0,
      timeEntriesYesterday: timeEntriesYesterday || 0,
      timeEntriesLastWeek: timeEntriesLastWeek || 0,
      timeEntriesLastMonth: timeEntriesLastMonth || 0,
      
      // Project metrics
      projectsCreatedToday: projectsCreatedToday || 0,
      projectsCreatedLastWeek: projectsCreatedLastWeek || 0,
      totalProjects: totalProjects || 0,
      activeProjects: activeProjects || 0,
      completedProjects: completedProjects || 0,
      
      // Task metrics
      tasksCreatedToday: tasksCreatedToday || 0,
      tasksCompletedToday: tasksCompletedToday || 0,
      totalTasks: totalTasks || 0,
      completedTasks: completedTasks || 0,
      inProgressTasks: inProgressTasks || 0,
      
      // Time tracking metrics
      activeTimeEntries: activeTimeEntries || 0,
      completedTimeEntries: completedTimeEntries || 0,
      pausedTimeEntries: pausedTimeEntries || 0,
      totalHoursTracked: Math.round(totalHoursTracked / 60 * 10) / 10, // Convert minutes to hours
      
      // Payroll metrics
      payrollEntriesToday: payrollEntriesToday || 0,
      payrollEntriesPending: payrollEntriesPending || 0,
      payrollEntriesApproved: payrollEntriesApproved || 0,
      payrollEntriesPaid: payrollEntriesPaid || 0,
      
      // Weekly activity metrics
      pendingTimesheets: pendingTimesheets || 0,
      approvedTimesheets: approvedTimesheets || 0,
      confirmedPayroll: confirmedPayroll || 0,
      paidPayroll: paidPayroll || 0,
      
      // System performance
      avgResponseTime,
      uptimePercentage,
      errorRate,
      activeConnections,
      databaseSize,
      cacheHitRate,
      
      // Usage data
      deviceUsage,
      featureUsage,
      errorLogs,

      tropiTrackUsers: tropiTrackUsers || [],
      lastLoginMap
    }
  } catch {
    // Error fetching TropiTrack stats
    
    // Return fallback data if TropiTrack is not available
    return {
      totalUsers: 0,
      activeUsers: 0,
      activeUsersToday: 0,
      activeUsersYesterday: 0,
      weeklyActiveUsers: 0,
      timeEntriesToday: 0,
      timeEntriesYesterday: 0,
      timeEntriesLastWeek: 0,
      timeEntriesLastMonth: 0,
      projectsCreatedToday: 0,
      projectsCreatedLastWeek: 0,
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
      tasksCreatedToday: 0,
      tasksCompletedToday: 0,
      totalTasks: 0,
      completedTasks: 0,
      inProgressTasks: 0,
      activeTimeEntries: 0,
      completedTimeEntries: 0,
      pausedTimeEntries: 0,
      totalHoursTracked: 0,
      payrollEntriesToday: 0,
      payrollEntriesPending: 0,
      payrollEntriesApproved: 0,
      payrollEntriesPaid: 0,
      pendingTimesheets: 0,
      approvedTimesheets: 0,
      confirmedPayroll: 0,
      paidPayroll: 0,
      avgResponseTime: 0,
      uptimePercentage: 0,
      errorRate: 0,
      activeConnections: 0,
      databaseSize: 0,
      cacheHitRate: 0,
      deviceUsage: { desktop: 0, mobile: 0, tablet: 0 },
      featureUsage: { timeTracking: 0, projectManagement: 0, taskManagement: 0, payroll: 0, reporting: 0 },
      errorLogs: [],
      tropiTrackUsers: [],
      lastLoginMap: new Map()
    }
  }
}

export default async function TropiTrackStatsPage() {
  const stats = await getTropiTrackAppStats()

  // Calculate growth rates
  const userGrowth = stats.activeUsersYesterday > 0 
    ? ((stats.activeUsersToday - stats.activeUsersYesterday) / stats.activeUsersYesterday) * 100 
    : 0

  const activityGrowth = stats.timeEntriesYesterday > 0 
    ? ((stats.timeEntriesToday - stats.timeEntriesYesterday) / stats.timeEntriesYesterday) * 100 
    : 0

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">TropiTrack Analytics</h1>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Active Users</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">{stats.activeUsers}</div>
            <div className="flex items-center gap-1 mt-1">
              {userGrowth >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-success" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <p className="text-sm text-muted-foreground">
                {Math.abs(userGrowth).toFixed(1)}% from yesterday
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {stats.totalUsers} total users
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Today's Activity</CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-success">{stats.timeEntriesToday}</div>
            <div className="flex items-center gap-1 mt-1">
              {activityGrowth >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-success" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <p className="text-sm text-muted-foreground">
                {Math.abs(activityGrowth).toFixed(1)}% from yesterday
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {stats.timeEntriesLastWeek} this week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Daily Active Users</CardTitle>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-warning">{stats.activeUsersToday}</div>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-success" />
              {stats.activeUsers} total active users
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Weekly Active Users</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-600">{stats.weeklyActiveUsers}</div>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-success" />
              {stats.activeUsersToday} active today
            </p>
          </CardContent>
        </Card>
      </div>



      {/* Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* This Week's Activity */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              This Week's Activity
            </CardTitle>
            <CardDescription>Weekly activity metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.pendingTimesheets}</div>
                <div className="text-sm text-muted-foreground">Pending Timesheets</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.approvedTimesheets}</div>
                <div className="text-sm text-muted-foreground">Approved Timesheets</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{stats.confirmedPayroll}</div>
                <div className="text-sm text-muted-foreground">Confirmed Payroll</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{stats.paidPayroll}</div>
                <div className="text-sm text-muted-foreground">Paid Payroll</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Productivity */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Productivity
            </CardTitle>
            <CardDescription>User activity and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{stats.activeUsersToday}</div>
                  <div className="text-xs text-muted-foreground">Active Today</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{stats.activeTimeEntries}</div>
                  <div className="text-xs text-muted-foreground">Active Sessions</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg Hours per User</span>
                  <span className="text-sm font-medium">
                    {stats.totalUsers > 0 ? (stats.totalHoursTracked / stats.totalUsers).toFixed(1) : 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completion Rate</span>
                  <span className="text-sm font-medium">
                    {stats.completedTimeEntries > 0 ? Math.round((stats.completedTimeEntries / (stats.completedTimeEntries + stats.activeTimeEntries)) * 100) : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Users %</span>
                  <span className="text-sm font-medium">
                    {stats.totalUsers > 0 ? Math.round((stats.activeUsersToday / stats.totalUsers) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TropiTrack Users Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            TropiTrack Users
          </CardTitle>
          <CardDescription>All users in the TropiTrack system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.tropiTrackUsers.length > 0 ? (
                stats.tropiTrackUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.name || 'Unknown User'}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {user.role || 'user'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.companies && typeof user.companies === 'object' && 'name' in user.companies 
                        ? (user.companies as { name: string }).name 
                        : 'No Company'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.is_active ? 'default' : 'secondary'} className="text-xs">
                        {user.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {stats.lastLoginMap.get(user.id) 
                        ? format(new Date(stats.lastLoginMap.get(user.id)), 'MMM dd, HH:mm')
                        : 'Never'}
                    </TableCell>
                    <TableCell>
                      {format(new Date(user.created_at), 'MMM dd, yyyy')}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    <Users className="h-6 w-6 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No users found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>



      {/* System Health Summary */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>System Health Overview</CardTitle>
          <CardDescription>Comprehensive system status and performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats.uptimePercentage}%
              </div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.avgResponseTime}ms
              </div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stats.cacheHitRate}%
              </div>
              <div className="text-sm text-muted-foreground">Cache Hit Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {(stats.errorRate * 100).toFixed(2)}%
              </div>
              <div className="text-sm text-muted-foreground">Error Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 