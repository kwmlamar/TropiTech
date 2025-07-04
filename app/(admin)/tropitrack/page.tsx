import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, Plus, BarChart3, Timer, CheckCircle, Play, Eye, Edit, Target, DollarSign } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { format } from "date-fns"

async function getTropiTrackStats() {
  const supabase = await createClient()
  
  // Get total time entries
  const { count: totalTimeEntries } = await supabase
    .from('time_entries')
    .select('*', { count: 'exact', head: true })

  // Get active time entries (currently tracking)
  const { count: activeTimeEntries } = await supabase
    .from('time_entries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  // Get paused time entries
  const { count: pausedTimeEntries } = await supabase
    .from('time_entries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'paused')

  // Get completed time entries
  const { count: completedTimeEntries } = await supabase
    .from('time_entries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed')

  // Get total projects
  const { count: totalProjects } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })

  // Get active projects
  const { count: activeTropiProjects } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  // Get completed projects
  const { count: completedProjects } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed')

  // Get on-hold projects
  const { count: onHoldProjects } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'on_hold')

  // Get total tasks
  const { count: totalTasks } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })

  // Get completed tasks
  const { count: completedTasks } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed')

  // Get in-progress tasks
  const { count: inProgressTasks } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'in_progress')

  // Get pending tasks
  const { count: pendingTasks } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  // Get total payroll entries
  const { count: totalPayrollEntries } = await supabase
    .from('payroll_entries')
    .select('*', { count: 'exact', head: true })

  // Get pending payroll entries
  const { count: pendingPayrollEntries } = await supabase
    .from('payroll_entries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  // Get approved payroll entries
  const { count: approvedPayrollEntries } = await supabase
    .from('payroll_entries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved')

  // Get paid payroll entries
  const { count: paidPayrollEntries } = await supabase
    .from('payroll_entries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'paid')

  // Get total payroll amount
  const { data: payrollData } = await supabase
    .from('payroll_entries')
    .select('total_pay')
    .eq('status', 'paid')

  const totalPayrollAmount = payrollData?.reduce((sum, entry) => sum + (entry.total_pay || 0), 0) || 0

  // Get total hours tracked
  const { data: timeData } = await supabase
    .from('time_entries')
    .select('duration_minutes')
    .eq('status', 'completed')

  const totalHoursTracked = timeData?.reduce((sum, entry) => sum + (entry.duration_minutes || 0), 0) || 0

  // Get recent time entries with full details
  const { data: recentTimeEntries } = await supabase
    .from('time_entries')
    .select(`
      id,
      start_time,
      end_time,
      duration_minutes,
      description,
      status,
      profiles(full_name, email),
      projects(name),
      tasks(name)
    `)
    .order('start_time', { ascending: false })
    .limit(10)

  // Get all projects with details
  const { data: allProjects } = await supabase
    .from('projects')
    .select(`
      id,
      name,
      description,
      status,
      budget,
      start_date,
      end_date,
      created_at,
      companies(name)
    `)
    .order('created_at', { ascending: false })

  // Get all tasks with details
  const { data: allTasks } = await supabase
    .from('tasks')
    .select(`
      id,
      name,
      description,
      status,
      priority,
      estimated_hours,
      created_at,
      projects(name)
    `)
    .order('created_at', { ascending: false })

  // Get all payroll entries with details
  const { data: allPayrollEntries } = await supabase
    .from('payroll_entries')
    .select(`
      id,
      pay_period_start,
      pay_period_end,
      total_hours,
      hourly_rate,
      total_pay,
      status,
      created_at,
      profiles(full_name, email)
    `)
    .order('pay_period_end', { ascending: false })

  // Get time tracking by user
  const { data: timeByUser } = await supabase
    .from('time_entries')
    .select(`
      duration_minutes,
      profiles(full_name)
    `)
    .eq('status', 'completed')

  // Get project budgets
  const { data: projectBudgets } = await supabase
    .from('projects')
    .select('budget, status')

  const totalBudget = projectBudgets?.reduce((sum, project) => sum + (project.budget || 0), 0) || 0
  const activeBudget = projectBudgets?.filter(p => p.status === 'active').reduce((sum, project) => sum + (project.budget || 0), 0) || 0

  return {
    // Time tracking metrics
    totalTimeEntries: totalTimeEntries || 0,
    activeTimeEntries: activeTimeEntries || 0,
    pausedTimeEntries: pausedTimeEntries || 0,
    completedTimeEntries: completedTimeEntries || 0,
    totalHoursTracked: Math.round(totalHoursTracked / 60 * 10) / 10, // Convert minutes to hours
    
    // Project metrics
    totalProjects: totalProjects || 0,
    activeTropiProjects: activeTropiProjects || 0,
    completedProjects: completedProjects || 0,
    onHoldProjects: onHoldProjects || 0,
    totalBudget: totalBudget / 100, // Convert cents to dollars
    activeBudget: activeBudget / 100,
    
    // Task metrics
    totalTasks: totalTasks || 0,
    completedTasks: completedTasks || 0,
    inProgressTasks: inProgressTasks || 0,
    pendingTasks: pendingTasks || 0,
    
    // Payroll metrics
    totalPayrollEntries: totalPayrollEntries || 0,
    pendingPayrollEntries: pendingPayrollEntries || 0,
    approvedPayrollEntries: approvedPayrollEntries || 0,
    paidPayrollEntries: paidPayrollEntries || 0,
    totalPayrollAmount: totalPayrollAmount / 100,
    
    // Detailed data
    recentTimeEntries: recentTimeEntries || [],
    allProjects: allProjects || [],
    allTasks: allTasks || [],
    allPayrollEntries: allPayrollEntries || [],
    timeByUser: timeByUser || []
  }
}

export default async function TropiTrackPage() {
  const stats = await getTropiTrackStats()

  // Calculate user time tracking
  const userTimeMap = new Map()
  stats.timeByUser.forEach(entry => {
    const userName = entry.profiles && Array.isArray(entry.profiles) && entry.profiles[0]?.full_name 
      ? entry.profiles[0].full_name 
      : 'Unknown User'
    const currentTime = userTimeMap.get(userName) || 0
    userTimeMap.set(userName, currentTime + (entry.duration_minutes || 0))
  })

  const topUsers = Array.from(userTimeMap.entries())
    .map(([name, minutes]) => ({ name, hours: Math.round(minutes / 60 * 10) / 10 }))
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
            <Clock className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">TropiTrack</h1>
            <p className="text-xl text-muted-foreground">
              Time tracking and payroll management for construction teams
            </p>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="flex gap-4 flex-wrap">
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Time Entry
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Payroll Entry
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          View Reports
        </Button>
      </div>

      {/* Comprehensive Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Tracking</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalTimeEntries.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Play className="h-3 w-3 text-green-500" />
              {stats.activeTimeEntries} active • {stats.pausedTimeEntries} paused
            </p>
            <p className="text-xs text-blue-600 mt-1">
              {stats.totalHoursTracked}h total tracked
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.totalProjects.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              {stats.activeTropiProjects} active • {stats.completedProjects} completed
            </p>
            <p className="text-xs text-green-600 mt-1">
              ${stats.activeBudget.toLocaleString()} active budget
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.totalTasks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <CheckCircle className="h-3 w-3 text-success" />
              {stats.completedTasks} completed • {stats.inProgressTasks} in progress
            </p>
            <p className="text-xs text-purple-600 mt-1">
              {stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${stats.totalPayrollAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <DollarSign className="h-3 w-3 text-success" />
              {stats.paidPayrollEntries} paid • {stats.pendingPayrollEntries} pending
            </p>
            <p className="text-xs text-orange-600 mt-1">
              {stats.totalPayrollEntries} total entries
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Tracking Status */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Time Tracking Status</CardTitle>
            <CardDescription>Current time entry distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active</span>
                <span className="font-medium">{stats.activeTimeEntries}</span>
              </div>
              <Progress value={stats.totalTimeEntries > 0 ? (stats.activeTimeEntries / stats.totalTimeEntries) * 100 : 0} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Paused</span>
                <span className="font-medium">{stats.pausedTimeEntries}</span>
              </div>
              <Progress value={stats.totalTimeEntries > 0 ? (stats.pausedTimeEntries / stats.totalTimeEntries) * 100 : 0} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span className="font-medium">{stats.completedTimeEntries}</span>
              </div>
              <Progress value={stats.totalTimeEntries > 0 ? (stats.completedTimeEntries / stats.totalTimeEntries) * 100 : 0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Project Status */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Project Status</CardTitle>
            <CardDescription>Project status distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active</span>
                <span className="font-medium">{stats.activeTropiProjects}</span>
              </div>
              <Progress value={stats.totalProjects > 0 ? (stats.activeTropiProjects / stats.totalProjects) * 100 : 0} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span className="font-medium">{stats.completedProjects}</span>
              </div>
              <Progress value={stats.totalProjects > 0 ? (stats.completedProjects / stats.totalProjects) * 100 : 0} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>On Hold</span>
                <span className="font-medium">{stats.onHoldProjects}</span>
              </div>
              <Progress value={stats.totalProjects > 0 ? (stats.onHoldProjects / stats.totalProjects) * 100 : 0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Top Time Trackers */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Top Time Trackers</CardTitle>
            <CardDescription>Users with most hours tracked</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topUsers.length > 0 ? (
              topUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{user.hours}h</span>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <Clock className="h-6 w-6 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No time tracking data</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Time Entries Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Time Entries
            </CardTitle>
            <CardDescription>Latest time tracking activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentTimeEntries.length > 0 ? (
                  stats.recentTimeEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">
                        {entry.profiles && Array.isArray(entry.profiles) && entry.profiles[0]?.full_name 
                          ? entry.profiles[0].full_name 
                          : 'Unknown User'}
                      </TableCell>
                      <TableCell>
                        {entry.projects && Array.isArray(entry.projects) && entry.projects[0]?.name 
                          ? entry.projects[0].name 
                          : 'No Project'}
                      </TableCell>
                      <TableCell>
                        {entry.duration_minutes 
                          ? `${Math.floor(entry.duration_minutes / 60)}h ${entry.duration_minutes % 60}m`
                          : 'Active'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={entry.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                          {entry.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      <Clock className="h-6 w-6 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No time entries found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Projects Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Projects Overview
            </CardTitle>
            <CardDescription>All projects and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.allProjects.length > 0 ? (
                  stats.allProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>
                        {project.companies && Array.isArray(project.companies) && project.companies[0]?.name 
                          ? project.companies[0].name 
                          : 'Unknown Company'}
                      </TableCell>
                      <TableCell>
                        {project.budget ? `$${(project.budget / 100).toLocaleString()}` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={project.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      <Target className="h-6 w-6 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No projects found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Additional Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Tasks Overview
            </CardTitle>
            <CardDescription>All tasks and their progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.allTasks.length > 0 ? (
                  stats.allTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.name}</TableCell>
                      <TableCell>
                        {task.projects && Array.isArray(task.projects) && task.projects[0]?.name 
                          ? task.projects[0].name 
                          : 'Unknown Project'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={task.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-6 w-6 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No tasks found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payroll Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payroll Overview
            </CardTitle>
            <CardDescription>All payroll entries and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.allPayrollEntries.length > 0 ? (
                  stats.allPayrollEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">
                        {entry.profiles && Array.isArray(entry.profiles) && entry.profiles[0]?.full_name 
                          ? entry.profiles[0].full_name 
                          : 'Unknown Employee'}
                      </TableCell>
                      <TableCell>
                        {format(new Date(entry.pay_period_start), 'MMM dd')} - {format(new Date(entry.pay_period_end), 'MMM dd')}
                      </TableCell>
                      <TableCell>{entry.total_hours}h</TableCell>
                      <TableCell>${(entry.total_pay / 100).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={entry.status === 'paid' ? 'default' : 'secondary'} className="text-xs">
                          {entry.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      <DollarSign className="h-6 w-6 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No payroll entries found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key performance indicators and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.totalTimeEntries > 0 ? Math.round((stats.activeTimeEntries / stats.totalTimeEntries) * 100) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Active Time Tracking</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Task Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stats.totalProjects > 0 ? Math.round((stats.activeTropiProjects / stats.totalProjects) * 100) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {stats.totalPayrollEntries > 0 ? Math.round(((stats.totalPayrollEntries - stats.pendingPayrollEntries) / stats.totalPayrollEntries) * 100) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Payroll Processed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 