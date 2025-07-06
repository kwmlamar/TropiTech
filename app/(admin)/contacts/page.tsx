import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Filter, Download } from "lucide-react"

export default function ContactsPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="ml-4 text-3xl font-bold text-foreground">Contacts</h1>
      </div>

      {/* Main Content */}
      <Card className="bg-white/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Contact Management</CardTitle>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Recent Contacts */}
            <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">Recent Contacts</CardTitle>
                <CardDescription>Latest contacts added to the system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">John Smith</p>
                    <p className="text-sm text-gray-600">Project Manager</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">ABC Construction</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Site Supervisor</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">XYZ Builders</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">Mike Davis</p>
                    <p className="text-sm text-gray-600">Contractor</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">BuildRight Inc</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Categories */}
            <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">Contact Categories</CardTitle>
                <CardDescription>Contacts by type and role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Clients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">1,247</span>
                    <span className="text-xs text-gray-500">contacts</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Vendors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">456</span>
                    <span className="text-xs text-gray-500">contacts</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Contractors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">234</span>
                    <span className="text-xs text-gray-500">contacts</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Suppliers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">189</span>
                    <span className="text-xs text-gray-500">contacts</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Inactive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">89</span>
                    <span className="text-xs text-gray-500">contacts</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Activity */}
            <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">Contact Activity</CardTitle>
                <CardDescription>Recent interactions and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/70 border border-blue-200/50">
                  <div>
                    <p className="font-medium text-gray-800">Email sent</p>
                    <p className="text-sm text-gray-600">Project proposal to ABC Construction</p>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">Today</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50/70 border border-green-200/50">
                  <div>
                    <p className="font-medium text-gray-800">Meeting scheduled</p>
                    <p className="text-sm text-gray-600">Site visit with XYZ Builders</p>
                  </div>
                  <span className="text-xs text-green-600 font-medium">Tomorrow</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50/70 border border-orange-200/50">
                  <div>
                    <p className="font-medium text-gray-800">Contract signed</p>
                    <p className="text-sm text-gray-600">New agreement with BuildRight Inc</p>
                  </div>
                  <span className="text-xs text-orange-600 font-medium">2 days ago</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Grid */}
            <Card className="bg-transparent border border-white/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800 sr-only">Quick Stats</CardTitle>
                <CardDescription className="sr-only">Key contact metrics at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 grid-rows-3 gap-1 h-40">
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-blue-600">2,847</div>
                    <div className="text-xs text-gray-600">Total Contacts</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-green-600">2,134</div>
                    <div className="text-xs text-gray-600">Active</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-orange-600">456</div>
                    <div className="text-xs text-gray-600">Companies</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-purple-600">89</div>
                    <div className="text-xs text-gray-600">This Week</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-red-600">15%</div>
                    <div className="text-xs text-gray-600">Growth</div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-2 text-center flex flex-col justify-center">
                    <div className="text-sm font-bold text-indigo-600">75%</div>
                    <div className="text-xs text-gray-600">Engagement</div>
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