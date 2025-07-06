import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Filter, Download } from "lucide-react"

export default function OpportunitiesPage() {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div>
        <h1 className="ml-4 text-3xl font-bold text-foreground">Opportunities</h1>
      </div>

      {/* Main Content */}
      <Card className="bg-white/30 backdrop-blur-sm">
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
            {/* Recent Opportunities */}
            <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Recent Opportunities</CardTitle>
                <CardDescription className="sr-only">Latest opportunities added to pipeline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Hospital Expansion</p>
                    <p className="text-sm text-gray-600">City Medical Center</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">$250,000</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">University Campus</p>
                    <p className="text-sm text-gray-600">State University</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">$180,000</p>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Tech Park</p>
                    <p className="text-sm text-gray-600">Innovation Corp</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">$95,000</p>
                    <p className="text-xs text-gray-500">2 weeks ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sales Pipeline */}
            <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Sales Pipeline</CardTitle>
                <CardDescription className="sr-only">Opportunities by stage and value</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Prospecting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">$850K</span>
                    <span className="text-xs text-gray-500">23 opps</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Qualification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">$620K</span>
                    <span className="text-xs text-gray-500">18 opps</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Proposal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">$480K</span>
                    <span className="text-xs text-gray-500">12 opps</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Negotiation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">$320K</span>
                    <span className="text-xs text-gray-500">8 opps</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Closed Won</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">$180K</span>
                    <span className="text-xs text-gray-500">6 opps</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Win Probability */}
            <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Win Probability</CardTitle>
                <CardDescription className="sr-only">High-probability opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50/70 border border-green-200/50">
                  <div>
                    <p className="font-medium text-gray-800">Hospital Expansion</p>
                    <p className="text-sm text-gray-600">90% probability</p>
                  </div>
                  <span className="text-xs text-green-600 font-medium">$250K</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/70 border border-blue-200/50">
                  <div>
                    <p className="font-medium text-gray-800">University Campus</p>
                    <p className="text-sm text-gray-600">75% probability</p>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">$180K</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50/70 border border-orange-200/50">
                  <div>
                    <p className="font-medium text-gray-800">Tech Park</p>
                    <p className="text-sm text-gray-600">60% probability</p>
                  </div>
                  <span className="text-xs text-orange-600 font-medium">$95K</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Grid */}
            <Card className="bg-transparent border border-white/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800 sr-only">Quick Stats</CardTitle>
                <CardDescription className="sr-only">Key opportunity metrics at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 grid-rows-3 gap-1 h-40">
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-blue-600">567</div>
                    <div className="text-xs text-gray-600">Total Opps</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-green-600">$2.4M</div>
                    <div className="text-xs text-gray-600">Pipeline</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-orange-600">34%</div>
                    <div className="text-xs text-gray-600">Win Rate</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-purple-600">$42K</div>
                    <div className="text-xs text-gray-600">Avg Deal</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-red-600">23%</div>
                    <div className="text-xs text-gray-600">Growth</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-indigo-600">67</div>
                    <div className="text-xs text-gray-600">Days Avg</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Additional Opportunity Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Opportunity Metrics</CardTitle>
            <CardDescription className="sr-only">Key performance indicators for opportunities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Win Rate</span>
              <span className="text-sm font-bold text-green-600">34%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Avg Deal Size</span>
              <span className="text-sm font-bold text-blue-600">$42K</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Sales Cycle</span>
              <span className="text-sm font-bold text-purple-600">67 days</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Conversion Rate</span>
              <span className="text-sm font-bold text-orange-600">28%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Pipeline Growth</CardTitle>
            <CardDescription className="sr-only">Opportunity pipeline performance trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">This Month</span>
              <span className="text-sm font-bold text-blue-600">+23</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Pipeline Value</span>
              <span className="text-sm font-bold text-green-600">$2.4M</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Growth Rate</span>
              <span className="text-sm font-bold text-purple-600">+18%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Target</span>
              <span className="text-sm font-bold text-orange-600">$3.0M</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 