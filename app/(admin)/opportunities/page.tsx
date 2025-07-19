'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Filter, Download } from "lucide-react"
import { useOpportunities, useCompanies, useOpportunityMetrics, usePipelineGrowth } from "@/hooks/use-crm"
import { useEffect, useState } from "react"

export default function OpportunitiesPage() {
  const { opportunities, loading: opportunitiesLoading, error: opportunitiesError } = useOpportunities()
  const { companies, loading: companiesLoading } = useCompanies()
  const { metrics, loading: metricsLoading, error: metricsError } = useOpportunityMetrics()
  const { growth, loading: growthLoading, error: growthError } = usePipelineGrowth()
  const [opportunityStats, setOpportunityStats] = useState({
    pipelineValue: 0,
    activeUsers: 0,
    growthRate: 0,
    satisfaction: 0
  })

  useEffect(() => {
    if (opportunities && companies) {
      // Calculate opportunity statistics
      const totalValue = opportunities.reduce((sum, opp) => sum + (opp.value || 0), 0)
      const pipelineValue = Math.round(totalValue / 1000) // Convert to K
      const activeUsers = opportunities.filter(o => o.status === 'open').length
      const growthRate = Math.round((activeUsers / opportunities.length) * 100) || 0
      const satisfaction = Math.round((activeUsers / opportunities.length) * 100) || 0

      setOpportunityStats({
        pipelineValue,
        activeUsers,
        growthRate,
        satisfaction
      })
    }
  }, [opportunities, companies])

  // Get recent opportunities for display
  const recentOpportunities = opportunities?.slice(0, 3) || []
  
  // Get expansion statistics (for future use)
  // const expansionStats = opportunities?.reduce((acc, opp) => {
  //   const status = opp.status || 'open'
  //   acc[status] = (acc[status] || 0) + 1
  //   return acc
  // }, {} as Record<string, number>) || {}

  if (opportunitiesLoading || companiesLoading) {
    return (
      <div className="space-y-2">
        <div>
          <h1 className="ml-4 text-3xl font-bold text-foreground">Customer Journeys</h1>
        </div>
        <Card className="bg-white/40 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded-[32px]"></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (opportunitiesError) {
    return (
      <div className="space-y-2">
        <div>
          <h1 className="ml-4 text-3xl font-bold text-foreground">Customer Journeys</h1>
        </div>
        <Card className="bg-white/40 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center text-red-600">
              Error loading opportunities: {opportunitiesError}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {/* Header */}
        <div>
        <h1 className="ml-4 text-3xl font-bold text-foreground">Customer Journeys</h1>
      </div>

      {/* Main Content */}
      <Card className="bg-white/40 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Opportunity Management</CardTitle>
              <CardDescription className="sr-only">View and manage all sales opportunities in your pipeline</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border border-gray-300 hover:bg-white/20 transition-all duration-200">
                <Plus className="h-4 w-4 text-gray-600" />
              </div>
              <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border border-gray-300 hover:bg-white/20 transition-all duration-200">
                <Filter className="h-4 w-4 text-gray-600" />
              </div>
              <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border border-gray-300 hover:bg-white/20 transition-all duration-200">
                <Download className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {/* App Opportunities */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                {recentOpportunities.map((opportunity, index) => (
                  <div key={opportunity.id || index} className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                    <div>
                      <p className="font-medium text-gray-800">{opportunity.company_name || 'Company'}</p>
                      <p className="text-sm text-gray-600">{opportunity.description || 'Opportunity'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">
                        ${opportunity.value ? (opportunity.value / 1000).toFixed(1) + 'K' : '0'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {opportunity.created_at ? new Date(opportunity.created_at).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  </div>
                ))}
                {recentOpportunities.length === 0 && (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No opportunities found
                  </div>
                )}
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">App Opportunities</h3>
            </div>

            {/* App Expansion */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">New Markets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      {opportunities?.filter(o => o.status === 'open').length || 0}
                    </span>
                    <span className="text-xs text-gray-500">regions</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Feature Requests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      {opportunities?.filter(o => o.status === 'qualified').length || 0}
                    </span>
                    <span className="text-xs text-gray-500">requests</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Partnerships</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      {opportunities?.filter(o => o.status === 'proposal').length || 0}
                    </span>
                    <span className="text-xs text-gray-500">opportunities</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Enterprise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      {opportunities?.filter(o => o.status === 'negotiation').length || 0}
                    </span>
                    <span className="text-xs text-gray-500">leads</span>
                  </div>
                </div>
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">App Expansion</h3>
            </div>

            {/* Feature Requests */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Time Tracking</p>
                    <p className="text-sm text-gray-600">90% requested</p>
                  </div>
                  <span className="text-xs text-green-600 font-medium">High</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Mobile App</p>
                    <p className="text-sm text-gray-600">75% requested</p>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">Medium</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">API Integration</p>
                    <p className="text-sm text-gray-600">60% requested</p>
                  </div>
                  <span className="text-xs text-orange-600 font-medium">Low</span>
                </div>
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">Feature Requests</h3>
            </div>

            {/* Opportunity Metrics */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Pipeline Value</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-blue-600">${opportunityStats.pipelineValue}K</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Active Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-green-600">{opportunityStats.activeUsers}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Growth Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-orange-600">{opportunityStats.growthRate}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Satisfaction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-purple-600">{opportunityStats.satisfaction}%</span>
                  </div>
                </div>
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">Opportunity Metrics</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Opportunity Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Opportunity Metrics Card (detailed) */}
        <Card className="bg-white/40 backdrop-blur-sm border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Opportunity Metrics</CardTitle>
            <CardDescription className="sr-only">Key performance indicators for opportunities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {metricsLoading ? (
              <div className="flex items-center justify-center h-24">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              </div>
            ) : metricsError ? (
              <div className="text-center text-red-600 text-sm">Error loading metrics</div>
            ) : metrics ? (
              <>
                {/* Win Rate */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Win Rate</span>
                    <span className="text-sm font-bold text-green-600">{metrics.winRate}%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: `${metrics.winRate}%` }}></div>
                  </div>
                </div>
                {/* Avg Deal Size */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Avg Deal Size</span>
                    <span className="text-sm font-bold text-blue-600">${metrics.avgDealSize}K</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${metrics.avgDealSize}%` }}></div>
                  </div>
                </div>
                {/* Sales Cycle */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Sales Cycle</span>
                    <span className="text-sm font-bold text-purple-600">{metrics.salesCycle} days</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full" style={{ width: `${metrics.salesCycle > 100 ? 100 : metrics.salesCycle}%` }}></div>
                  </div>
                </div>
                {/* Conversion Rate */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Conversion Rate</span>
                    <span className="text-sm font-bold text-orange-600">{metrics.conversionRate}%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3">
                    <div className="bg-orange-500 h-3 rounded-full" style={{ width: `${metrics.conversionRate}%` }}></div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 text-sm">No metrics data available</div>
            )}
          </CardContent>
        </Card>
        {/* Pipeline Growth Card */}
        <Card className="bg-white/40 backdrop-blur-sm border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Pipeline Growth</CardTitle>
            <CardDescription className="sr-only">Opportunity pipeline performance trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {growthLoading ? (
              <div className="flex items-center justify-center h-24">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              </div>
            ) : growthError ? (
              <div className="text-center text-red-600 text-sm">Error loading pipeline growth data</div>
            ) : growth ? (
              <>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
                  <span className="font-medium text-gray-800">This Month</span>
                  <span className="text-sm font-bold text-blue-600">+{growth.thisMonth}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
                  <span className="font-medium text-gray-800">Pipeline Value</span>
                  <span className="text-sm font-bold text-green-600">${growth.pipelineValue}K</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
                  <span className="font-medium text-gray-800">Growth Rate</span>
                  <span className="text-sm font-bold text-purple-600">{growth.growthRate > 0 ? '+' : ''}{growth.growthRate}%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
                  <span className="font-medium text-gray-800">Target</span>
                  <span className="text-sm font-bold text-orange-600">${growth.target}K</span>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 text-sm">No pipeline growth data available</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 