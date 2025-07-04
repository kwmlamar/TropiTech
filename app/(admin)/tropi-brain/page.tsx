"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Brain } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

type Insight = {
  id: string
  problem_summary: string
  proposed_feature: string
  source: string
  impact_score: number
  status: string
  category?: string
  created_at: string
  updated_at: string
}

export default function TropiBrain() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    fetchInsights()
  }, [])

  const fetchInsights = async () => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('tropibrain_insights')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setInsights(data || [])
    } catch {
      toast.error("Failed to fetch insights from database")
    }
  }

  const generateNewIdeas = async () => {
    setGenerating(true)
    try {
      const supabase = await createClient()
      const newInsight = {
        problem_summary: "Coordination issues between subcontractors causing delays",
        proposed_feature: "Real-time collaboration platform with task dependencies",
        source: "Project management data, communication logs",
        impact_score: 78,
        status: "New",
        category: "Collaboration"
      }

      const { data, error } = await supabase
        .from('tropibrain_insights')
        .insert([newInsight])
        .select()

      if (error) throw error
      
      if (data) {
        setInsights([data[0], ...insights])
        toast.success("Successfully created a new market insight")
      }
    } catch {
      toast.error("Failed to create new insight")
    } finally {
      setGenerating(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      "In Development": "bg-primary text-primary-foreground",
      "Prioritized": "bg-accent text-accent-foreground",
      "Research": "bg-warning text-warning-foreground",
      "Backlog": "bg-muted text-muted-foreground",
      "New": "bg-success text-success-foreground"
    }
    return <Badge className={variants[status as keyof typeof variants] || "bg-muted"}>{status}</Badge>
  }

  const getCategoryBadge = (category?: string) => {
    if (!category) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-800">Uncategorized</Badge>
    }
    const variants = {
      "Weather Management": "bg-blue-100 text-blue-800",
      "Cost Management": "bg-green-100 text-green-800",
      "Productivity": "bg-purple-100 text-purple-800",
      "Equipment": "bg-orange-100 text-orange-800",
      "Compliance": "bg-red-100 text-red-800",
      "Safety": "bg-yellow-100 text-yellow-800",
      "Collaboration": "bg-indigo-100 text-indigo-800"
    }
    return <Badge variant="outline" className={variants[category as keyof typeof variants] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  const getImpactColor = (score: number) => {
    if (score >= 85) return "text-destructive"
    if (score >= 70) return "text-warning"
    return "text-success"
  }

  const averageImpact = Math.round(insights.reduce((sum, insight) => sum + insight.impact_score, 0) / insights.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Brain className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">🧠 TropiBrain</h1>
          <p className="text-muted-foreground">AI-powered insights for Bahamian construction market</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Total Insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{insights.length}</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>In Development</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {insights.filter(i => i.status === "In Development").length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>Average Impact Score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getImpactColor(averageImpact)}`}>
              {averageImpact}
            </div>
            <div className="text-xs text-muted-foreground">Out of 100</div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardDescription>High Priority Items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {insights.filter(i => i.impact_score >= 85).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Generation */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Insight Generation
          </CardTitle>
          <CardDescription>Generate new construction market insights using OpenAI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              onClick={generateNewIdeas}
              disabled={generating}
              className="flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              {generating ? "Generating..." : "Generate New Ideas"}
            </Button>
            <Button variant="outline">Analyze Market Trends</Button>
            <Button variant="outline">Export Insights Report</Button>
          </div>
        </CardContent>
      </Card>

      {/* Insights Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Construction Market Insights</CardTitle>
          <CardDescription>AI-scraped problems and proposed feature solutions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Problem Summary</TableHead>
                  <TableHead>Proposed Feature</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Impact Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insights.map((insight) => (
                  <TableRow key={insight.id}>
                    <TableCell className="max-w-xs">
                      <div className="font-medium truncate">{insight.problem_summary}</div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate">{insight.proposed_feature}</div>
                    </TableCell>
                    <TableCell>{getCategoryBadge(insight.category)}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="text-xs text-muted-foreground truncate">{insight.source}</div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-bold ${getImpactColor(insight.impact_score)}`}>
                        {insight.impact_score}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(insight.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Details</Button>
                        <Button variant="outline" size="sm">Promote</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Categories Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Insights by Category</CardTitle>
            <CardDescription>Breakdown of problems by construction domain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[...new Set(insights.map(i => i.category).filter(Boolean))].map(category => {
              const count = insights.filter(i => i.category === category).length
              const avgImpact = Math.round(
                insights.filter(i => i.category === category)
                  .reduce((sum, i) => sum + i.impact_score, 0) / count
              )
              return (
                <div key={category} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium">{category}</div>
                    <div className="text-xs text-muted-foreground">{count} insights</div>
                  </div>
                  <div className={`font-bold ${getImpactColor(avgImpact)}`}>
                    {avgImpact}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Development Pipeline</CardTitle>
            <CardDescription>Feature development status breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["In Development", "Prioritized", "Research", "Backlog", "New"].map(status => {
              const count = insights.filter(i => i.status === status).length
              return (
                <div key={status} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-medium">{status}</div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{count}</span>
                    {getStatusBadge(status)}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}