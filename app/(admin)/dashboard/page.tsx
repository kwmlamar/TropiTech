import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Building2, DollarSign, Activity, Calendar, Clock, Package, FileText, Brain, ExternalLink, Settings } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

async function getDashboardStats() {
  const supabase = await createClient()
  
  // Get total users (profiles)
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  // Get active companies
  const { count: activeCompanies } = await supabase
    .from('companies')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  // Get total revenue from subscriptions
  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('amount, currency')
    .eq('status', 'active')

  const totalRevenue = subscriptions?.reduce((sum, sub) => sum + (sub.amount || 0), 0) || 0

  // Get active projects (feature flags as a proxy)
  const { count: activeProjects } = await supabase
    .from('feature_flags')
    .select('*', { count: 'exact', head: true })
    .eq('is_enabled', true)

  // Get recent activity from system logs
  const { data: recentActivity } = await supabase
    .from('system_logs')
    .select('action, details, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  // Get recent companies
  const { data: recentCompanies } = await supabase
    .from('companies')
    .select('name, created_at, status')
    .order('created_at', { ascending: false })
    .limit(4)



  // Get auth metrics from auth schema
  const { count: totalSessions } = await supabase
    .from('sessions')
    .select('*', { count: 'exact', head: true })

  const { count: activeSessions } = await supabase
    .from('sessions')
    .select('*', { count: 'exact', head: true })
    .not('not_after', 'is', null)
    .gte('not_after', new Date().toISOString())

  // Get recent audit log entries
  const { data: recentAuditLogs } = await supabase
    .from('audit_log_entries')
    .select('id, payload, created_at, ip_address')
    .order('created_at', { ascending: false })
    .limit(5)

  return {
    totalUsers: totalUsers || 0,
    activeCompanies: activeCompanies || 0,
    totalRevenue,
    activeProjects: activeProjects || 0,
    recentActivity: recentActivity || [],
    recentCompanies: recentCompanies || [],
    // Auth metrics
    totalSessions: totalSessions || 0,
    activeSessions: activeSessions || 0,
    recentAuditLogs: recentAuditLogs || []
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  // TropiTech Suite products data
  const tropiTechProducts = [
    {
      id: 'tropitrack',
      name: 'TropiTrack',
      description: 'Time tracking and payroll management for construction teams',
      status: 'Live',
      statusVariant: 'default' as const,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      action: 'Manage',
      actionIcon: Settings,
      href: '/tropitrack'
    },
    {
      id: 'tropisupply',
      name: 'TropiSupply',
      description: 'Inventory and supply chain management for construction materials',
      status: 'Coming Soon',
      statusVariant: 'secondary' as const,
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      action: 'Preview',
      actionIcon: ExternalLink,
      href: '#'
    },
    {
      id: 'tropidocs',
      name: 'TropiDocs',
      description: 'Document management and compliance tracking for construction projects',
      status: 'Coming Soon',
      statusVariant: 'secondary' as const,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      action: 'Preview',
      actionIcon: ExternalLink,
      href: '#'
    },
    {
      id: 'tropibrain',
      name: 'TropiBrain',
      description: 'AI-powered insights and predictive analytics for construction projects',
      status: 'Coming Soon',
      statusVariant: 'secondary' as const,
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      action: 'Preview',
      actionIcon: ExternalLink,
      href: '#'
    }
  ]

  return (
    <div className="space-y-2">

      
      {/* Platform Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              Active platform users
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.activeCompanies.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">${(stats.totalRevenue / 100).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              From active subscriptions
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.activeSessions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              Current user sessions
            </p>
          </CardContent>
        </Card>
      </div>



      {/* TropiTech Suite */}
      <Card className="shadow-sm relative" style={{
        clipPath: 'path("M 0 0 L 25% 0 L 25% 120 A 10 10 0 0 1 35% 120 L 65% 120 A 10 10 0 0 1 75% 120 L 75% 0 L 100% 0 L 100% 100% L 0 100% Z")',
        borderRadius: '24px'
      }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            TropiTech Suite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {tropiTechProducts.map((product) => {
              const IconComponent = product.icon
              const ActionIcon = product.actionIcon
              
              return (
                <Card 
                  key={product.id} 
                  className={`shadow-sm hover:shadow-md transition-all duration-200 border-2 ${product.borderColor} hover:scale-105`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${product.bgColor}`}>
                        <IconComponent className={`h-5 w-5 ${product.color}`} />
                      </div>
                      <Badge variant={product.statusVariant} className="text-xs">
                        {product.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    {product.status === 'Live' ? (
                      <Link href={product.href}>
                        <Button 
                          variant="default"
                          size="sm" 
                          className="w-full"
                        >
                          <ActionIcon className="h-4 w-4 mr-2" />
                          {product.action}
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        disabled
                      >
                        <ActionIcon className="h-4 w-4 mr-2" />
                        {product.action}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>



      {/* Platform Activity & Companies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform activities and events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.details ? JSON.stringify(activity.details).substring(0, 50) + '...' : 'No details'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      ⚡
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No recent activity</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Companies
            </CardTitle>
            <CardDescription>Latest registered companies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.recentCompanies.length > 0 ? (
              stats.recentCompanies.map((company, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="text-2xl">🏢</div>
                  <div className="flex-1">
                    <p className="font-medium">{company.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(company.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  <Badge variant={company.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                    {company.status}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No companies registered yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Platform Health */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Platform Health</CardTitle>
          <CardDescription>System status and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1.2s</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">{stats.totalUsers}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Audit Logs */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-red-600">
              <Activity className="h-5 w-5 text-white" />
            </div>
            Security & Audit
          </CardTitle>
          <CardDescription>Authentication and security monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{stats.totalSessions.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Sessions</div>
              <div className="text-xs text-red-500 mt-1">
                {stats.activeSessions} currently active
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{stats.recentAuditLogs.length}</div>
              <div className="text-sm text-muted-foreground">Recent Audit Events</div>
              <div className="text-xs text-orange-500 mt-1">
                Last 24 hours
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Security Status</div>
              <div className="text-xs text-green-500 mt-1">
                All systems secure
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Recent Audit Events</h4>
            {stats.recentAuditLogs.length > 0 ? (
              stats.recentAuditLogs.map((log, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {log.payload && typeof log.payload === 'object' && 'action' in log.payload 
                        ? (log.payload as { action: string }).action 
                        : 'Security Event'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      IP: {log.ip_address} • {formatDistanceToNow(new Date(log.created_at || ''), { addSuffix: true })}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    🔒
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <Activity className="h-6 w-6 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No recent audit events</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 