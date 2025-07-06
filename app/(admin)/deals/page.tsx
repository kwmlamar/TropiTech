import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Filter, Download } from "lucide-react"

export default function DealsPage() {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div>
        <h1 className="ml-4 text-3xl font-bold text-foreground">Deals</h1>
      </div>

      {/* Main Content */}
      <Card className="bg-white/30 backdrop-blur-sm">
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
            {/* Recent Deals */}
            <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Recent Deals</CardTitle>
                <CardDescription className="sr-only">Latest deals closed this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Office Complex</p>
                    <p className="text-sm text-gray-600">ABC Construction</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">$125,000</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Residential Tower</p>
                    <p className="text-sm text-gray-600">XYZ Builders</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">$89,500</p>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Shopping Center</p>
                    <p className="text-sm text-gray-600">BuildRight Inc</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">$67,800</p>
                    <p className="text-xs text-gray-500">2 weeks ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deal Pipeline */}
            <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Deal Pipeline</CardTitle>
                <CardDescription className="sr-only">Deals by stage and value</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Qualified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">$450K</span>
                    <span className="text-xs text-gray-500">12 deals</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Proposal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">$320K</span>
                    <span className="text-xs text-gray-500">8 deals</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Negotiation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">$180K</span>
                    <span className="text-xs text-gray-500">5 deals</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Closed Won</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">$1.2M</span>
                    <span className="text-xs text-gray-500">28 deals</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Closed Lost</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">$95K</span>
                    <span className="text-xs text-gray-500">3 deals</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Tracking */}
            <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Revenue Tracking</CardTitle>
                <CardDescription className="sr-only">Monthly revenue performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50/70 border border-green-200/50">
                  <div>
                    <p className="font-medium text-gray-800">This Month</p>
                    <p className="text-sm text-gray-600">Target: $500K</p>
                  </div>
                  <span className="text-xs text-green-600 font-medium">$456K</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/70 border border-blue-200/50">
                  <div>
                    <p className="font-medium text-gray-800">Last Month</p>
                    <p className="text-sm text-gray-600">+27% growth</p>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">$358K</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50/70 border border-purple-200/50">
                  <div>
                    <p className="font-medium text-gray-800">Q4 Target</p>
                    <p className="text-sm text-gray-600">$1.5M goal</p>
                  </div>
                  <span className="text-xs text-purple-600 font-medium">$1.2M</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Grid */}
            <Card className="bg-transparent border border-white/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800 sr-only">Quick Stats</CardTitle>
                <CardDescription className="sr-only">Key deal metrics at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 grid-rows-3 gap-1 h-40">
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-blue-600">234</div>
                    <div className="text-xs text-gray-600">Total Deals</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-green-600">$1.8M</div>
                    <div className="text-xs text-gray-600">Revenue</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-orange-600">$7.7K</div>
                    <div className="text-xs text-gray-600">Avg Deal</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-purple-600">31%</div>
                    <div className="text-xs text-gray-600">Growth</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-red-600">91%</div>
                    <div className="text-xs text-gray-600">Win Rate</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-indigo-600">45</div>
                    <div className="text-xs text-gray-600">Days Avg</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Additional Deal Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Deal Performance</CardTitle>
            <CardDescription className="sr-only">Key performance indicators for deals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Win Rate</span>
              <span className="text-sm font-bold text-green-600">91%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Avg Deal Size</span>
              <span className="text-sm font-bold text-blue-600">$7.7K</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Sales Cycle</span>
              <span className="text-sm font-bold text-purple-600">45 days</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span className="font-medium text-gray-800">Close Rate</span>
              <span className="text-sm font-bold text-orange-600">67%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
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