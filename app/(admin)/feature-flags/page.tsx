"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockFeatureFlags = [
  { 
    id: 1, 
    name: "Enable TropiBrain", 
    description: "AI assistant for construction insights", 
    companies: ["Nassau Construction Ltd", "Atlantis Builders"], 
    enabled: true,
    impact: "High"
  },
  { 
    id: 2, 
    name: "Inventory Management Beta", 
    description: "Advanced inventory tracking and management", 
    companies: ["Paradise Projects"], 
    enabled: false,
    impact: "Medium"
  },
  { 
    id: 3, 
    name: "Advanced Reporting Dashboard", 
    description: "Enhanced analytics and reporting features", 
    companies: ["Nassau Construction Ltd", "Coral Bay Construction", "Freeport Builders"], 
    enabled: true,
    impact: "High"
  },
  { 
    id: 4, 
    name: "Mobile Time Tracking", 
    description: "Native mobile app for time tracking", 
    companies: ["Atlantis Builders", "Paradise Projects"], 
    enabled: true,
    impact: "Medium"
  },
  { 
    id: 5, 
    name: "Automated Invoice Generation", 
    description: "AI-powered invoice creation from time entries", 
    companies: [], 
    enabled: false,
    impact: "High"
  },
  { 
    id: 6, 
    name: "Weather Integration", 
    description: "Weather-based project timeline adjustments", 
    companies: ["Exuma Projects"], 
    enabled: false,
    impact: "Low"
  },
]

export default function FeatureFlags() {
  const [flags, setFlags] = useState(mockFeatureFlags)

  const toggleFlag = (id: number) => {
    setFlags(flags.map(flag => 
      flag.id === id ? { ...flag, enabled: !flag.enabled } : flag
    ))
  }

  const getImpactBadge = (impact: string) => {
    const variants = {
      High: "bg-destructive text-destructive-foreground",
      Medium: "bg-warning text-warning-foreground",
      Low: "bg-success text-success-foreground"
    }
    return <Badge className={variants[impact as keyof typeof variants]}>{impact}</Badge>
  }

  const getStatusBadge = (enabled: boolean) => {
    return enabled 
      ? <Badge className="bg-success text-success-foreground">Enabled</Badge>
      : <Badge variant="secondary">Disabled</Badge>
  }

  const enabledCount = flags.filter(flag => flag.enabled).length
  const totalCompaniesWithFlags = new Set(flags.flatMap(flag => flag.companies)).size

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Feature Flags</h1>
        <p className="text-muted-foreground">Manage beta features and company-specific toggles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Total Feature Flags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{flags.length}</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Currently Enabled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{enabledCount}</div>
            <div className="text-xs text-muted-foreground">Out of {flags.length} flags</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Companies with Beta Features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalCompaniesWithFlags}</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>High Impact Features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {flags.filter(flag => flag.impact === "High").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Flags Management */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Feature Flag Management</CardTitle>
          <CardDescription>Toggle beta features on/off for specific companies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <Button>Create New Feature Flag</Button>
          </div>

          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Enabled Companies</TableHead>
                  <TableHead>Toggle</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flags.map((flag) => (
                  <TableRow key={flag.id}>
                    <TableCell className="font-medium">{flag.name}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate">{flag.description}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(flag.enabled)}</TableCell>
                    <TableCell>{getImpactBadge(flag.impact)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {flag.companies.length > 0 ? (
                          flag.companies.slice(0, 2).map((company, index) => (
                            <div key={index} className="text-xs bg-muted px-2 py-1 rounded">
                              {company}
                            </div>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">No companies</span>
                        )}
                        {flag.companies.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{flag.companies.length - 2} more
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={flag.enabled}
                        onCheckedChange={() => toggleFlag(flag.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Assign</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common feature flag operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Enable TropiBrain for All Enterprise Companies
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Disable All Beta Features
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Export Feature Usage Report
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Bulk Assign Features to Company
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Feature Release Pipeline</CardTitle>
            <CardDescription>Upcoming features in development</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="font-medium text-sm">🚧 In Development</div>
              <div className="text-xs text-muted-foreground">• Equipment Maintenance Tracking</div>
              <div className="text-xs text-muted-foreground">• Real-time GPS Tracking</div>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-sm">🧪 Testing</div>
              <div className="text-xs text-muted-foreground">• Automated Safety Compliance</div>
              <div className="text-xs text-muted-foreground">• Advanced Cost Analytics</div>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-sm">🎯 Ready for Beta</div>
              <div className="text-xs text-muted-foreground">• Document Management System</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}