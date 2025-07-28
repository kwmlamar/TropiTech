'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter, Download, Eye, Edit, Trash2 } from "lucide-react"
import { useLeads, useLeadSources, useLeadResponseTime } from "@/hooks/use-crm"
import { useMemo, useState } from "react"
import { AddLeadDialogSimple } from "@/components/add-lead-dialog-simple"
import { EditLeadDialogSimple } from "@/components/edit-lead-dialog-simple"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { Lead } from "@/lib/crm-database"

export default function LeadsPage() {
  const { leads, loading, error, deleteLead } = useLeads()
  const { leadSources, loading: sourcesLoading, error: sourcesError } = useLeadSources()
  const { responseTimeData, loading: responseLoading, error: responseError } = useLeadResponseTime()

  // Edit dialog state
  const [editingLead, setEditingLead] = useState<Lead | null>(null)

  // Action handlers
  const handleViewLead = (leadId: string) => {
    console.log('View lead:', leadId)
    toast.info('View lead functionality coming soon!')
    // TODO: Implement view lead functionality
    // This could open a modal or navigate to a detail page
  }

  const handleEditLead = (leadId: string) => {
    const lead = leads.find(l => l.id === leadId)
    if (lead) {
      setEditingLead(lead)
    }
  }

  const handleDeleteLead = async (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      try {
        const result = await deleteLead(leadId)
        if (result.success) {
          toast.success('Lead deleted successfully')
          // The leads list is automatically updated by the hook
        } else {
          toast.error(`Failed to delete lead: ${result.error}`)
        }
      } catch (error) {
        toast.error('Failed to delete lead')
        console.error('Failed to delete lead:', error)
      }
    }
  }

  // Calculate metrics from real data
  const metrics = useMemo(() => {
    if (!leads.length) return {
      totalLeads: 0,
      appInterested: 0,
      demoScheduled: 0,
      trialActive: 0,
      appConverted: 0,
      trialsStarted: 0,
      conversions: 0,
      conversionRate: 0
    }

    const appInterested = leads.filter(lead => lead.status === 'app_interested').length
    const demoScheduled = leads.filter(lead => lead.status === 'demo_scheduled').length
    const trialActive = leads.filter(lead => lead.status === 'trial_active').length
    const appConverted = leads.filter(lead => lead.status === 'app_converted').length
    const trialsStarted = leads.filter(lead => lead.has_trial === true).length
    const conversions = appConverted
    const conversionRate = leads.length > 0 ? Math.round((conversions / leads.length) * 100) : 0

    return {
      totalLeads: leads.length,
      appInterested,
      demoScheduled,
      trialActive,
      appConverted,
      trialsStarted,
      conversions,
      conversionRate
    }
  }, [leads])

  // Get recent leads for display
  const recentLeads = useMemo(() => {
    return leads.slice(0, 3).map(lead => ({
      company: lead.company_name || 'Unknown Company',
      description: lead.description || 'No description provided',
      value: lead.estimated_value || 0,
      timeAgo: getTimeAgo(lead.created_at || '')
    }))
  }, [leads])

  // Get trial users
  const trialUsers = useMemo(() => {
    return leads
      .filter(lead => lead.has_trial === true)
      .slice(0, 3)
      .map(lead => ({
        company: lead.company_name || 'Unknown Company',
        status: getTrialStatus(lead.trial_end_date || null),
        description: getTrialDescription(lead.trial_end_date || null)
      }))
  }, [leads])

  if (loading) {
    return (
      <div className="space-y-2">
        <div>
          <h1 className="ml-4 text-3xl font-bold text-foreground">Customer Journeys</h1>
        </div>
        <Card className="bg-white/40 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading leads...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-2">
        <div>
          <h1 className="ml-4 text-3xl font-bold text-foreground">Customer Journeys</h1>
        </div>
        <Card className="bg-white/40 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-red-600 mb-2">Error loading leads</p>
              <p className="text-gray-600 text-sm">{error}</p>
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
              <CardTitle className="text-lg font-bold">Lead Management</CardTitle>
              <CardDescription className="sr-only">View and manage all leads in your pipeline</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <AddLeadDialogSimple onLeadAdded={() => {
                // Refresh leads data when a new lead is added
                if (typeof window !== 'undefined') {
                  window.location.reload()
                }
              }} />
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
            {/* App Leads */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                {recentLeads.length > 0 ? (
                  recentLeads.map((lead, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                      <div>
                        <p className="font-medium text-gray-800">{lead.company}</p>
                        <p className="text-sm text-gray-600">{lead.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">${lead.value}/mo</p>
                        <p className="text-xs text-gray-500">{lead.timeAgo}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 text-sm">No leads yet</p>
                  </div>
                )}
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">App Leads</h3>
            </div>

            {/* App Adoption */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">App Interested</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">{metrics.appInterested}</span>
                    <span className="text-xs text-gray-500">companies</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Demo Scheduled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">{metrics.demoScheduled}</span>
                    <span className="text-xs text-gray-500">companies</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Trial Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">{metrics.trialActive}</span>
                    <span className="text-xs text-gray-500">companies</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">App Converted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">{metrics.appConverted}</span>
                    <span className="text-xs text-gray-500">companies</span>
                  </div>
                </div>
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">App Adoption</h3>
            </div>

            {/* Trial Users */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                {trialUsers.length > 0 ? (
                  trialUsers.map((trial, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                      <div>
                        <p className="font-medium text-gray-800">{trial.company}</p>
                        <p className="text-sm text-gray-600">{trial.description}</p>
                      </div>
                      <span className={`text-xs font-medium ${getStatusColor(trial.status)}`}>{trial.status}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 text-sm">No trial users</p>
                  </div>
                )}
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">Trial Users</h3>
            </div>

            {/* Lead Metrics */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">App Leads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-blue-600">{metrics.totalLeads}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Trials Started</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-green-600">{metrics.trialsStarted}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">App Conversions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-orange-600">{metrics.conversions}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Conversion Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-purple-600">{metrics.conversionRate}%</span>
                  </div>
                </div>
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">Lead Metrics</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Lead Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Card className="bg-white/40 backdrop-blur-sm border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Top Lead Sources</CardTitle>
            <CardDescription className="sr-only">Where your best leads are coming from</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {sourcesLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              </div>
            ) : sourcesError ? (
              <div className="text-center text-red-600 text-sm">
                Error loading lead sources
              </div>
            ) : leadSources.length > 0 ? (
              <div className="space-y-4">
                {leadSources.slice(0, 4).map((source, index) => {
                  const colors = ['blue', 'green', 'purple', 'orange', 'red', 'yellow']
                  const color = colors[index % colors.length]
                  const colorClass = `text-${color}-600`
                  const bgColorClass = `bg-${color}-500`
                  
                  return (
                    <div key={source.source}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {source.source.replace('_', ' ')}
                        </span>
                        <span className={`text-sm font-bold ${colorClass}`}>
                          {source.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-3">
                        <div 
                          className={`${bgColorClass} h-3 rounded-full`} 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm">
                No lead sources data available
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="bg-white/40 backdrop-blur-sm border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Lead Response Time</CardTitle>
            <CardDescription className="sr-only">How quickly your team responds to new leads</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {responseLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              </div>
            ) : responseError ? (
              <div className="text-center text-red-600 text-sm">
                Error loading response time data
              </div>
            ) : responseTimeData ? (
              <>
                {/* Gauge Chart */}
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background circle */}
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-white/30" strokeWidth="3"></circle>
                    {/* Progress circle */}
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="16" 
                      fill="none" 
                      className={`${responseTimeData.responseTimePercentage <= 100 ? 'stroke-green-500' : 'stroke-red-500'}`} 
                      strokeWidth="3" 
                      strokeDasharray="100 100" 
                      strokeDashoffset={Math.max(0, 100 - responseTimeData.responseTimePercentage)} 
                      strokeLinecap="round"
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800">
                        {Math.round(responseTimeData.averageResponseTime / 60 * 10) / 10}
                      </div>
                      <div className="text-xs text-gray-600">hours</div>
                    </div>
                  </div>
                </div>
                
                {/* Target indicator */}
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600">
                    Target: {Math.round(responseTimeData.targetResponseTime / 60)} hours
                  </div>
                  <div className={`text-xs font-medium ${
                    responseTimeData.responseTimePercentage <= 100 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {responseTimeData.responseTimePercentage <= 100 ? 'Good performance' : 'Needs improvement'}
                  </div>
                </div>
                
                {/* Additional metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 rounded-lg bg-white/50">
                    <div className="text-sm font-bold text-green-600">
                      {Math.round(responseTimeData.fastestResponse / 60 * 10) / 10} hrs
                    </div>
                    <div className="text-xs text-gray-600">Fastest</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/50">
                    <div className="text-sm font-bold text-red-600">
                      {Math.round(responseTimeData.slowestResponse / 60 * 10) / 10} hrs
                    </div>
                    <div className="text-xs text-gray-600">Slowest</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 text-sm">
                No response time data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Lead Table */}
      <Card className="bg-white/40 backdrop-blur-sm border border-gray-200/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">All Leads</CardTitle>
              <CardDescription>Complete overview of all leads in your pipeline</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <AddLeadDialogSimple onLeadAdded={() => {
                // Refresh leads data when a new lead is added
                if (typeof window !== 'undefined') {
                  window.location.reload()
                }
              }} />
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
          <div className="rounded-lg border border-gray-200/50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Created</TableHead>
                                     <TableHead>Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length > 0 ? (
                  leads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-white/10">
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold text-gray-900">{lead.company_name || 'Unknown Company'}</div>
                          {lead.description && (
                            <div className="text-sm text-gray-600 truncate max-w-xs">{lead.description}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {lead.contact_name && (
                            <div className="text-sm font-medium text-gray-900">{lead.contact_name}</div>
                          )}
                          {lead.email && (
                            <div className="text-xs text-gray-600">{lead.email}</div>
                          )}
                          {lead.phone && (
                            <div className="text-xs text-gray-600">{lead.phone}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(lead.status || 'new')} className="text-xs">
                          {formatStatus(lead.status || 'new')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs capitalize">
                          {lead.source ? lead.source.replace('_', ' ') : 'Unknown'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900">
                          {lead.estimated_value ? `$${(lead.estimated_value / 1000).toFixed(1)}K` : 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {lead.created_at ? getTimeAgo(lead.created_at) : 'Unknown'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {lead.updated_at ? getTimeAgo(lead.updated_at) : 'Unknown'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => handleViewLead(lead.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                            onClick={() => handleEditLead(lead.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDeleteLead(lead.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <Filter className="h-4 w-4 text-gray-500" />
                        </div>
                        <p className="text-sm font-medium">No leads found</p>
                        <p className="text-xs text-gray-500">Start by adding your first lead</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Lead Dialog */}
      <EditLeadDialogSimple
        lead={editingLead}
        onLeadUpdated={() => {
          // The leads list will be automatically updated by the hook
          setEditingLead(null)
        }}
        onClose={() => {
          setEditingLead(null)
        }}
      />
    </div>
  )
}

// Helper functions
function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours} hours ago`
  if (diffInHours < 48) return '1 day ago'
  return `${Math.floor(diffInHours / 24)} days ago`
}

function getTrialStatus(trialEndDate: string | null): string {
  if (!trialEndDate) return 'Unknown'
  
  const endDate = new Date(trialEndDate)
  const now = new Date()
  const diffInDays = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffInDays < 0) return 'Expired'
  if (diffInDays <= 1) return 'Expiring'
  if (diffInDays <= 7) return 'Active'
  return 'New'
}

function getTrialDescription(trialEndDate: string | null): string {
  if (!trialEndDate) return 'No trial data'
  
  const endDate = new Date(trialEndDate)
  const now = new Date()
  const diffInDays = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffInDays < 0) return 'Trial expired'
  if (diffInDays <= 1) return `Trial ends in ${diffInDays} day`
  if (diffInDays <= 7) return `Trial ends in ${diffInDays} days`
  return 'Trial active'
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'Active':
    case 'New':
      return 'text-green-600'
    case 'Expiring':
      return 'text-yellow-600'
    case 'Expired':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

function formatStatus(status: string): string {
  return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case 'new':
      return 'secondary'
    case 'app_interested':
    case 'demo_scheduled':
      return 'default'
    case 'trial_active':
      return 'outline'
    case 'app_converted':
      return 'default'
    case 'lost':
      return 'destructive'
    default:
      return 'secondary'
  }
} 