import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Filter, Download } from "lucide-react"

export default function LeadsPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
        <div>
          <h1 className="ml-4 text-3xl font-bold text-foreground">Leads</h1>
          </div>


      {/* Main Content */}
      <Card className="bg-white/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lead Management</CardTitle>
              <CardDescription className="sr-only">View and manage all leads in your pipeline</CardDescription>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Recent Leads */}
            <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">Recent Leads</CardTitle>
                <CardDescription>Latest leads added to the system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">John Doe</p>
                    <p className="text-sm text-gray-600">Construction Manager</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">$25,000</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Sarah Miller</p>
                    <p className="text-sm text-gray-600">Project Director</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">$45,000</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Robert Johnson</p>
                    <p className="text-sm text-gray-600">Site Supervisor</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">$18,000</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lead Pipeline */}
            <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">Lead Pipeline</CardTitle>
                <CardDescription>Leads by stage in your sales funnel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">New</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">12</span>
                    <span className="text-xs text-gray-500">leads</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Qualified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">8</span>
                    <span className="text-xs text-gray-500">leads</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Proposal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">5</span>
                    <span className="text-xs text-gray-500">leads</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Negotiation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">3</span>
                    <span className="text-xs text-gray-500">leads</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Closed Lost</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">2</span>
                    <span className="text-xs text-gray-500">leads</span>
                  </div>
                </div>
              </CardContent>
            </Card>



            {/* Follow-up Reminders */}
            <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">Follow-up Reminders</CardTitle>
                <CardDescription>Leads requiring attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50/70 border border-yellow-200/50">
                  <div>
                    <p className="font-medium text-gray-800">Mike Wilson</p>
                    <p className="text-sm text-gray-600">Follow up on proposal</p>
                  </div>
                  <span className="text-xs text-yellow-600 font-medium">Today</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50/70 border border-orange-200/50">
                  <div>
                    <p className="font-medium text-gray-800">Lisa Chen</p>
                    <p className="text-sm text-gray-600">Schedule demo call</p>
                  </div>
                  <span className="text-xs text-orange-600 font-medium">Tomorrow</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/70 border border-blue-200/50">
                  <div>
                    <p className="font-medium text-gray-800">David Brown</p>
                    <p className="text-sm text-gray-600">Send pricing quote</p>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">In 2 days</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Grid */}
            <Card className="bg-transparent border border-white/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800 sr-only">Quick Stats</CardTitle>
                <CardDescription className="sr-only">Key lead metrics at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 grid-rows-3 gap-1 h-40">
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-blue-600">24</div>
                    <div className="text-xs text-gray-600">New Leads</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-green-600">$156K</div>
                    <div className="text-xs text-gray-600">Pipeline Value</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-orange-600">8</div>
                    <div className="text-xs text-gray-600">Follow-ups</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-purple-600">67%</div>
                    <div className="text-xs text-gray-600">Conversion</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-red-600">3</div>
                    <div className="text-xs text-gray-600">Overdue</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-indigo-600">12</div>
                    <div className="text-xs text-gray-600">Meetings</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 