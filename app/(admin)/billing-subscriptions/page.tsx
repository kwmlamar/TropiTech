import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockSubscriptions = [
  { 
    id: "sub_1234567890", 
    company: "Nassau Construction Ltd", 
    plan: "Enterprise", 
    amount: "$1,200", 
    status: "Active",
    nextBilling: "2024-02-15",
    created: "2023-02-15"
  },
  { 
    id: "sub_1234567891", 
    company: "Atlantis Builders", 
    plan: "Premium", 
    amount: "$600", 
    status: "Active",
    nextBilling: "2024-02-12",
    created: "2023-05-12"
  },
  { 
    id: "sub_1234567892", 
    company: "Paradise Projects", 
    plan: "Basic", 
    amount: "$200", 
    status: "Active",
    nextBilling: "2024-02-20",
    created: "2023-08-20"
  },
  { 
    id: "sub_1234567893", 
    company: "Coral Bay Construction", 
    plan: "Premium", 
    amount: "$600", 
    status: "Past Due",
    nextBilling: "2024-01-28",
    created: "2023-01-28"
  },
]

const mockInvoices = [
  { id: "inv_001", company: "Nassau Construction Ltd", amount: "$1,200", date: "2024-01-15", status: "Paid" },
  { id: "inv_002", company: "Atlantis Builders", amount: "$600", date: "2024-01-12", status: "Paid" },
  { id: "inv_003", company: "Coral Bay Construction", amount: "$600", date: "2024-01-28", status: "Failed" },
  { id: "inv_004", company: "Paradise Projects", amount: "$200", date: "2024-01-20", status: "Paid" },
  { id: "inv_005", company: "Freeport Builders", amount: "$1,200", date: "2024-01-18", status: "Paid" },
]

export default function BillingSubscriptions() {
  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "bg-success text-success-foreground",
      "Past Due": "bg-destructive text-destructive-foreground",
      Cancelled: "bg-muted text-muted-foreground"
    }
    return <Badge className={variants[status as keyof typeof variants] || "bg-muted text-muted-foreground"}>{status}</Badge>
  }

  const getInvoiceStatusBadge = (status: string) => {
    const variants = {
      Paid: "bg-success text-success-foreground",
      Failed: "bg-destructive text-destructive-foreground",
      Pending: "bg-warning text-warning-foreground"
    }
    return <Badge className={variants[status as keyof typeof variants] || "bg-muted text-muted-foreground"}>{status}</Badge>
  }

  const getPlanBadge = (plan: string) => {
    const variants = {
      Enterprise: "bg-primary text-primary-foreground",
      Premium: "bg-accent text-accent-foreground",
      Basic: "bg-secondary text-secondary-foreground"
    }
    return <Badge className={variants[plan as keyof typeof variants]}>{plan}</Badge>
  }

  const totalMRR = mockSubscriptions
    .filter(sub => sub.status === "Active")
    .reduce((sum, sub) => sum + parseInt(sub.amount.replace('$', '').replace(',', '')), 0)

  return (
    <div className="space-y-2">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Billing & Subscriptions</h1>
        <p className="text-muted-foreground">Monitor Stripe subscriptions and billing history</p>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Monthly Recurring Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${totalMRR.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">+8% vs last month</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Active Subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {mockSubscriptions.filter(s => s.status === "Active").length}
            </div>
            <div className="text-xs text-muted-foreground">Out of {mockSubscriptions.length} total</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Churn Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">2.1%</div>
            <div className="text-xs text-muted-foreground">This month</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Failed Payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <div className="text-xs text-muted-foreground">Requires attention</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Subscriptions */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
          <CardDescription>All Stripe subscriptions with current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subscription ID</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Billing</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSubscriptions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-mono text-sm">{sub.id}</TableCell>
                    <TableCell className="font-medium">{sub.company}</TableCell>
                    <TableCell>{getPlanBadge(sub.plan)}</TableCell>
                    <TableCell className="font-medium">{sub.amount}</TableCell>
                    <TableCell>{getStatusBadge(sub.status)}</TableCell>
                    <TableCell>{sub.nextBilling}</TableCell>
                    <TableCell>{sub.created}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View in Stripe</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Latest billing activity and payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                    <TableCell className="font-medium">{invoice.company}</TableCell>
                    <TableCell className="font-medium">{invoice.amount}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{getInvoiceStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Download PDF</Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}