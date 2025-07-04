"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockLogs = [
  {
    id: 1,
    timestamp: "2024-01-15 14:23:15",
    user: "john@nassauconstruction.bs",
    action: "User Login",
    details: "Successful login from 192.168.1.100",
    type: "Auth",
    severity: "Info"
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:25:30",
    user: "maria@atlantisbuilders.bs",
    action: "Clock In",
    details: "Clocked in at Paradise Island Project",
    type: "Time Tracking",
    severity: "Info"
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:28:45",
    user: "admin@tropitech.bs",
    action: "Feature Flag Toggle",
    details: "Enabled TropiBrain for Nassau Construction Ltd",
    type: "System",
    severity: "Info"
  },
  {
    id: 4,
    timestamp: "2024-01-15 14:30:12",
    user: "sarah@coralbayconstruction.bs",
    action: "Failed Login",
    details: "Failed login attempt - invalid password",
    type: "Auth",
    severity: "Warning"
  },
  {
    id: 5,
    timestamp: "2024-01-15 14:32:20",
    user: "david@paradiseprojects.bs",
    action: "Project Created",
    details: "Created new project: Cable Beach Resort Renovation",
    type: "Project Management",
    severity: "Info"
  },
  {
    id: 6,
    timestamp: "2024-01-15 14:35:55",
    user: "system",
    action: "Database Error",
    details: "Connection timeout to reporting database",
    type: "System",
    severity: "Error"
  },
  {
    id: 7,
    timestamp: "2024-01-15 14:38:10",
    user: "michael@freeportbuilders.bs",
    action: "Invoice Generated",
    details: "Generated invoice #INV-2024-001 for $15,250",
    type: "Billing",
    severity: "Info"
  },
  {
    id: 8,
    timestamp: "2024-01-15 14:40:25",
    user: "lisa@exumaprojects.bs",
    action: "Clock Out",
    details: "Clocked out from Staniel Cay Marina Project",
    type: "Time Tracking",
    severity: "Info"
  },
  {
    id: 9,
    timestamp: "2024-01-15 14:42:33",
    user: "admin@tropitech.bs",
    action: "User Deactivated",
    details: "Deactivated user account: former.employee@company.bs",
    type: "User Management",
    severity: "Warning"
  },
  {
    id: 10,
    timestamp: "2024-01-15 14:45:18",
    user: "system",
    action: "Backup Completed",
    details: "Daily database backup completed successfully",
    type: "System",
    severity: "Info"
  }
]

export default function SystemLogs() {
  const [logs] = useState(mockLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || log.type === typeFilter
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter
    
    return matchesSearch && matchesType && matchesSeverity
  })

  const getSeverityBadge = (severity: string) => {
    const variants = {
      Info: "bg-success text-success-foreground",
      Warning: "bg-warning text-warning-foreground",
      Error: "bg-destructive text-destructive-foreground"
    }
    return <Badge className={variants[severity as keyof typeof variants]}>{severity}</Badge>
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      Auth: "bg-primary text-primary-foreground",
      "Time Tracking": "bg-accent text-accent-foreground",
      System: "bg-muted text-muted-foreground",
      "Project Management": "bg-secondary text-secondary-foreground",
      Billing: "bg-success text-success-foreground",
      "User Management": "bg-warning text-warning-foreground"
    }
    return <Badge variant="outline" className={variants[type as keyof typeof variants] || ""}>{type}</Badge>
  }

  const errorCount = logs.filter(log => log.severity === "Error").length
  const warningCount = logs.filter(log => log.severity === "Warning").length
  const todayLogsCount = logs.length // Assuming all logs are from today for demo

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Logs</h1>
        <p className="text-muted-foreground">Monitor system activity and audit trails</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Today's Activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{todayLogsCount}</div>
            <div className="text-xs text-muted-foreground">Total logged events</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Errors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{errorCount}</div>
            <div className="text-xs text-muted-foreground">Requiring attention</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{warningCount}</div>
            <div className="text-xs text-muted-foreground">Security & access issues</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Success Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {Math.round(((todayLogsCount - errorCount) / todayLogsCount) * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">System reliability</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>View and filter system audit logs by user, action type, and date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:w-1/3"
            />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Auth">Authentication</SelectItem>
                <SelectItem value="Time Tracking">Time Tracking</SelectItem>
                <SelectItem value="System">System</SelectItem>
                <SelectItem value="Project Management">Project Management</SelectItem>
                <SelectItem value="Billing">Billing</SelectItem>
                <SelectItem value="User Management">User Management</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="md:w-40">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="Info">Info</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
                <SelectItem value="Error">Error</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 md:ml-auto">
              <Button variant="outline">Export Logs</Button>
              <Button variant="outline">Clear Filters</Button>
            </div>
          </div>

          {/* Logs Table */}
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{getTypeBadge(log.type)}</TableCell>
                    <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate">{log.details}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recent Security Events</CardTitle>
            <CardDescription>Authentication and access-related activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {logs.filter(log => log.type === "Auth" || log.type === "User Management").slice(0, 5).map((log) => (
              <div key={log.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{log.action}</div>
                  <div className="text-xs text-muted-foreground">{log.user}</div>
                </div>
                <div className="text-right">
                  {getSeverityBadge(log.severity)}
                  <div className="text-xs text-muted-foreground mt-1">{log.timestamp.split(' ')[1]}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Critical system events and errors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {logs.filter(log => log.severity === "Error" || log.severity === "Warning").slice(0, 5).map((log) => (
              <div key={log.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{log.action}</div>
                  <div className="text-xs text-muted-foreground truncate max-w-xs">{log.details}</div>
                </div>
                <div className="text-right">
                  {getSeverityBadge(log.severity)}
                  <div className="text-xs text-muted-foreground mt-1">{log.timestamp.split(' ')[1]}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}