'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Filter, Download } from "lucide-react"
import { useContacts, useCompanies } from "@/hooks/use-crm"
import { useEffect, useState } from "react"

export default function ContactsPage() {
  const { contacts, loading: contactsLoading, error: contactsError } = useContacts()
  const { companies, loading: companiesLoading } = useCompanies()
  const [contactStats, setContactStats] = useState({
    totalContacts: 0,
    activeUsers: 0,
    trialing: 0,
    satisfaction: 0
  })

  useEffect(() => {
    if (contacts && companies) {
      // Calculate contact statistics
      const totalContacts = contacts.length
      const activeUsers = contacts.filter(c => c.status === 'active').length
      const trialing = contacts.filter(c => c.status === 'trialing').length
      const satisfaction = Math.round((activeUsers / totalContacts) * 100) || 0

      setContactStats({
        totalContacts,
        activeUsers,
        trialing,
        satisfaction
      })
    }
  }, [contacts, companies])

  // Get recent contacts for display
  const recentContacts = contacts?.slice(0, 3) || []
  
  // Get company statistics (for future use)
  // const companyStats = companies?.reduce((acc, company) => {
  //   const status = company.status || 'active'
  //   acc[status] = (acc[status] || 0) + 1
  //   return acc
  // }, {} as Record<string, number>) || {}

  if (contactsLoading || companiesLoading) {
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

  if (contactsError) {
    return (
      <div className="space-y-2">
        <div>
          <h1 className="ml-4 text-3xl font-bold text-foreground">Customer Journeys</h1>
        </div>
        <Card className="bg-white/40 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center text-red-600">
              Error loading contacts: {contactsError}
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
                <CardTitle className="text-lg font-bold">Contact Management</CardTitle>
                <CardDescription className="sr-only">View and manage all contacts and their information</CardDescription>
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
            {/* App Decision Makers */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                {recentContacts.map((contact, index) => (
                  <div key={contact.id || index} className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                    <div>
                      <p className="font-medium text-gray-800">{contact.first_name} {contact.last_name}</p>
                      <p className="text-sm text-gray-600">{contact.title || 'Contact'}, {contact.company_name || 'Company'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">{contact.status || 'Active'}</p>
                      <p className="text-xs text-gray-500">
                        {contact.created_at ? new Date(contact.created_at).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  </div>
                ))}
                {recentContacts.length === 0 && (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No contacts found
                  </div>
                )}
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">App Decision Makers</h3>
            </div>

            {/* App Prospects */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Interested</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      {contacts?.filter(c => c.status === 'interested').length || 0}
                    </span>
                    <span className="text-xs text-gray-500">companies</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Trialing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      {contacts?.filter(c => c.status === 'trialing').length || 0}
                    </span>
                    <span className="text-xs text-gray-500">companies</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Active Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      {contacts?.filter(c => c.status === 'active').length || 0}
                    </span>
                    <span className="text-xs text-gray-500">companies</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Expanded</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      {contacts?.filter(c => c.status === 'expanded').length || 0}
                    </span>
                    <span className="text-xs text-gray-500">companies</span>
                  </div>
                </div>
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">App Prospects</h3>
            </div>

            {/* User Teams */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                {companies?.slice(0, 3).map((company, index) => (
                  <div key={company.id || index} className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                    <div>
                      <p className="font-medium text-gray-800">{company.name}</p>
                      <p className="text-sm text-gray-600">
                        {company.employee_count || 'Unknown'} users, {company.industry || 'Industry'}
                      </p>
                    </div>
                    <span className="text-xs text-blue-600 font-medium">{company.status || 'Active'}</span>
                  </div>
                ))}
                {(!companies || companies.length === 0) && (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No companies found
                  </div>
                )}
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">User Teams</h3>
            </div>

            {/* Contact Metrics */}
            <div>
              <div className="flex flex-col space-y-3 p-3 rounded-[32px] bg-white/60 h-80 overflow-hidden">
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Total Contacts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-blue-600">{contactStats.totalContacts}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Active Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-green-600">{contactStats.activeUsers}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Trialing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-orange-600">{contactStats.trialing}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-[32px] bg-transparent hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Satisfaction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-purple-600">{contactStats.satisfaction}%</span>
                  </div>
                </div>
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mt-2">Contact Metrics</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Card className="bg-white/40 backdrop-blur-sm border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Contact Engagement</CardTitle>
            <CardDescription className="sr-only">How often contacts interact with your business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* High Engagement */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">High Engagement</span>
                <span className="text-sm font-bold text-green-600">1,247</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            {/* Medium Engagement */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Medium Engagement</span>
                <span className="text-sm font-bold text-blue-600">856</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '31%' }}></div>
              </div>
            </div>

            {/* Low Engagement */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Low Engagement</span>
                <span className="text-sm font-bold text-orange-600">432</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div className="bg-orange-500 h-3 rounded-full" style={{ width: '16%' }}></div>
              </div>
            </div>

            {/* Inactive */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Inactive</span>
                <span className="text-sm font-bold text-red-600">312</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full" style={{ width: '11%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/40 backdrop-blur-sm border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Contact Growth</CardTitle>
            <CardDescription className="sr-only">Monthly contact acquisition trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">This Month</span>
              <span className="text-sm font-bold text-blue-600">+89</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Last Month</span>
              <span className="text-sm font-bold text-green-600">+76</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Growth Rate</span>
              <span className="text-sm font-bold text-purple-600">+15%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Target</span>
              <span className="text-sm font-bold text-orange-600">+100</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 