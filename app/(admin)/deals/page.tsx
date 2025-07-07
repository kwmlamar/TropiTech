'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Filter, Download } from "lucide-react"
import { useDeals, useCompanies } from "@/hooks/use-crm"
import { useEffect, useState } from "react"

export default function DealsPage() {
  const { deals, loading: dealsLoading, error: dealsError } = useDeals()
  const { companies, loading: companiesLoading } = useCompanies()
  const [dealStats, setDealStats] = useState({
    mrr: 0,
    activeUsers: 0,
    newTrials: 0,
    satisfaction: 0
  })

  useEffect(() => {
    if (deals && companies) {
      // Calculate deal statistics
      const totalValue = deals.reduce((sum, deal) => sum + (deal.value || 0), 0)
      const mrr = Math.round(totalValue / 12) // Monthly recurring revenue
      const activeUsers = deals.filter(d => d.status === 'closed_won').length
      const newTrials = deals.filter(d => d.status === 'prospecting').length
      const satisfaction = Math.round((activeUsers / deals.length) * 100) || 0

      setDealStats({
        mrr,
        activeUsers,
        newTrials,
        satisfaction
      })
    }
  }, [deals, companies])

  // Get recent deals for display
  const recentDeals = deals?.slice(0, 3) || []
  
  // Get subscription statistics (for future use)
  // const subscriptionStats = deals?.reduce((acc, deal) => {
  //   const stage = deal.stage || 'prospecting'
  //   acc[stage] = (acc[stage] || 0) + 1
  //   return acc
  // }, {} as Record<string, number>) || {}

  if (dealsLoading || companiesLoading) {
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

  if (dealsError) {
    return (
      <div className="space-y-2">
        <div>
          <h1 className="ml-4 text-3xl font-bold text-foreground">Customer Journeys</h1>
        </div>
        <Card className="bg-white/40 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center text-red-600">
              Error loading deals: {dealsError}
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
                <CardTitle className="text-lg font-bold">Deal Management</CardTitle>
                <CardDescription className="sr-only">View and manage all closed deals and revenue data</CardDescription>
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
            {/* App Deals */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                {recentDeals.map((deal, index) => (
                  <div key={deal.id || index} className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                    <div>
                      <p className="font-medium text-gray-800">{deal.company_name || 'Company'}</p>
                      <p className="text-sm text-gray-600">{deal.stage || 'Stage'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">
                        ${deal.value ? (deal.value / 1000).toFixed(1) + 'K' : '0'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {deal.created_at ? new Date(deal.created_at).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  </div>
                ))}
                {recentDeals.length === 0 && (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No deals found
                  </div>
                )}
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">App Deals</h3>
            </div>

            {/* App Subscriptions */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      {deals?.filter(d => d.stage === 'discovery').length || 0}
                    </span>
                    <span className="text-xs text-gray-500">companies</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Basic Plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      {deals?.filter(d => d.stage === 'qualification').length || 0}
                    </span>
                    <span className="text-xs text-gray-500">companies</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Pro Plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      {deals?.filter(d => d.stage === 'proposal').length || 0}
                    </span>
                    <span className="text-xs text-gray-500">companies</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Enterprise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      {deals?.filter(d => d.stage === 'closing').length || 0}
                    </span>
                    <span className="text-xs text-gray-500">companies</span>
                  </div>
                </div>
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">App Subscriptions</h3>
            </div>

            {/* Subscription Revenue */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Monthly Revenue</p>
                    <p className="text-sm text-gray-600">${dealStats.mrr}K this month</p>
                  </div>
                  <span className="text-xs text-green-600 font-medium">+15%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Annual Revenue</p>
                    <p className="text-sm text-gray-600">${dealStats.mrr * 12}K this year</p>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">+23%</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">New Subscriptions</p>
                    <p className="text-sm text-gray-600">{dealStats.newTrials} this month</p>
                  </div>
                  <span className="text-xs text-orange-600 font-medium">+8%</span>
                </div>
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">Subscription Revenue</h3>
            </div>

            {/* Deal Metrics */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">MRR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-blue-600">${dealStats.mrr}K</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Active Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-green-600">{dealStats.activeUsers}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">New Trials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-orange-600">{dealStats.newTrials}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Satisfaction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-purple-600">{dealStats.satisfaction}%</span>
                  </div>
                </div>
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">Deal Metrics</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Deal Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Card className="bg-white/40 backdrop-blur-sm border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Deal Performance</CardTitle>
            <CardDescription className="sr-only">Key performance indicators for deals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Win Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Win Rate</span>
                <span className="text-sm font-bold text-green-600">91%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '91%' }}></div>
              </div>
            </div>

            {/* Avg Deal Size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Avg Deal Size</span>
                <span className="text-sm font-bold text-blue-600">$7.7K</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '77%' }}></div>
              </div>
            </div>

            {/* Sales Cycle */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Sales Cycle</span>
                <span className="text-sm font-bold text-purple-600">45 days</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            {/* Close Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Close Rate</span>
                <span className="text-sm font-bold text-orange-600">67%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div className="bg-orange-500 h-3 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/40 backdrop-blur-sm border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Revenue Trends</CardTitle>
            <CardDescription className="sr-only">Monthly revenue performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">This Month</span>
              <span className="text-sm font-bold text-blue-600">$456K</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Last Month</span>
              <span className="text-sm font-bold text-green-600">$358K</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Growth</span>
              <span className="text-sm font-bold text-purple-600">+27%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Target</span>
              <span className="text-sm font-bold text-orange-600">$500K</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 