import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

const mockCompanies = [
  { 
    id: 1, 
    name: "Nassau Construction Ltd", 
    size: "Large", 
    workers: 45, 
    subscription: "Enterprise", 
    monthlyRevenue: "$1,200",
    projects: 12, 
    usage: 89,
    status: "Active"
  },
  { 
    id: 2, 
    name: "Atlantis Builders", 
    size: "Medium", 
    workers: 23, 
    subscription: "Premium", 
    monthlyRevenue: "$600",
    projects: 8, 
    usage: 76,
    status: "Active"
  },
  { 
    id: 3, 
    name: "Paradise Projects", 
    size: "Small", 
    workers: 12, 
    subscription: "Basic", 
    monthlyRevenue: "$200",
    projects: 4, 
    usage: 45,
    status: "Active"
  },
  { 
    id: 4, 
    name: "Coral Bay Construction", 
    size: "Medium", 
    workers: 28, 
    subscription: "Premium", 
    monthlyRevenue: "$600",
    projects: 6, 
    usage: 62,
    status: "Active"
  },
  { 
    id: 5, 
    name: "Freeport Builders", 
    size: "Large", 
    workers: 52, 
    subscription: "Enterprise", 
    monthlyRevenue: "$1,200",
    projects: 15, 
    usage: 94,
    status: "Trial"
  },
]

export default function CompanyManagement() {
  const getSubscriptionBadge = (subscription: string) => {
    const variants = {
      Enterprise: "bg-primary text-primary-foreground",
      Premium: "bg-accent text-accent-foreground",
      Basic: "bg-secondary text-secondary-foreground"
    }
    return <Badge className={variants[subscription as keyof typeof variants]}>{subscription}</Badge>
  }

  const getStatusBadge = (status: string) => {
    return status === "Active" 
      ? <Badge className="bg-success text-success-foreground">Active</Badge>
      : <Badge className="bg-warning text-warning-foreground">Trial</Badge>
  }

  const getSizeBadge = (size: string) => {
    const variants = {
      Large: "bg-primary text-primary-foreground",
      Medium: "bg-accent text-accent-foreground",
      Small: "bg-muted text-muted-foreground"
    }
    return <Badge variant="outline" className={variants[size as keyof typeof variants]}>{size}</Badge>
  }

  const totalRevenue = mockCompanies.reduce((sum, company) => 
    sum + parseInt(company.monthlyRevenue.replace('$', '').replace(',', '')), 0
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Company Management</h1>
        <p className="text-muted-foreground">Monitor and manage all registered companies</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Total Companies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">89</div>
            <div className="text-xs text-muted-foreground">+5 this month</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Monthly Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">+12% vs last month</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Total Workers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,247</div>
            <div className="text-xs text-muted-foreground">Across all companies</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Active Projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">342</div>
            <div className="text-xs text-muted-foreground">+18% this week</div>
          </CardContent>
        </Card>
      </div>

      {/* Companies Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Company Directory</CardTitle>
          <CardDescription>Complete overview of all registered companies and their usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Workers</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Monthly Revenue</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Platform Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{getSizeBadge(company.size)}</TableCell>
                    <TableCell>{company.workers}</TableCell>
                    <TableCell>{getSubscriptionBadge(company.subscription)}</TableCell>
                    <TableCell className="font-medium">{company.monthlyRevenue}</TableCell>
                    <TableCell>{company.projects}</TableCell>
                    <TableCell className="w-32">
                      <div className="space-y-1">
                        <Progress value={company.usage} className="h-2" />
                        <div className="text-xs text-muted-foreground">{company.usage}%</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(company.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Projects</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Subscription Distribution</CardTitle>
            <CardDescription>Breakdown of companies by subscription tier</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Enterprise</span>
                <span className="text-sm text-muted-foreground">25 companies</span>
              </div>
              <Progress value={28} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Premium</span>
                <span className="text-sm text-muted-foreground">38 companies</span>
              </div>
              <Progress value={43} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Basic</span>
                <span className="text-sm text-muted-foreground">26 companies</span>
              </div>
              <Progress value={29} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Company Size Distribution</CardTitle>
            <CardDescription>Companies grouped by workforce size</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Large (50+ workers)</span>
                <span className="text-sm text-muted-foreground">15 companies</span>
              </div>
              <Progress value={17} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Medium (20-49 workers)</span>
                <span className="text-sm text-muted-foreground">32 companies</span>
              </div>
              <Progress value={36} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Small (1-19 workers)</span>
                <span className="text-sm text-muted-foreground">42 companies</span>
              </div>
              <Progress value={47} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}