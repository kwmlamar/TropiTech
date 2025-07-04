'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardErrorProps {
  error: Error
  reset: () => void
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>
      
      {/* Error Card */}
      <Card className="shadow-sm border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Dashboard Error
          </CardTitle>
          <CardDescription>
            There was an error loading the dashboard data. This might be due to a database connection issue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-2">Error Details:</p>
            <p className="text-sm text-muted-foreground font-mono">
              {error.message}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={reset} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>If this error persists, please check:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Your Supabase connection settings</li>
              <li>Environment variables are properly configured</li>
              <li>Database tables exist and are accessible</li>
              <li>Network connectivity to Supabase</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 