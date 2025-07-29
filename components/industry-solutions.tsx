import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Building, DollarSign, Home, Heart, GraduationCap } from "lucide-react"

const industries = [
  {
    icon: Plane,
    title: "Tourism & Hospitality",
    description: "Booking systems, guest management, and analytics solutions for hotels, resorts, and tour operators.",
    solutions: ["Online Booking Platforms", "Guest Management Systems", "Revenue Analytics"],
  },
  {
    icon: Building,
    title: "Construction",
    description: "Project management, time tracking, and resource allocation tools for construction companies.",
    solutions: ["Project Management", "Time Tracking", "Resource Planning"],
  },
  {
    icon: DollarSign,
    title: "Financial Services",
    description: "Secure applications, compliance tools, and reporting systems for banks and financial institutions.",
    solutions: ["Compliance Management", "Risk Assessment", "Financial Reporting"],
  },
  {
    icon: Home,
    title: "Real Estate",
    description: "Property management, client portals, and market analysis tools for real estate professionals.",
    solutions: ["Property Management", "Client Portals", "Market Analytics"],
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Patient management, appointment systems, and electronic health records for medical practices.",
    solutions: ["Patient Management", "Appointment Scheduling", "Health Records"],
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Learning management systems, student portals, and administrative tools for educational institutions.",
    solutions: ["Learning Management", "Student Portals", "Administrative Tools"],
  },
]

export default function IndustrySolutions() {
  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Industry-Specific Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand the unique challenges of Bahamian businesses. Our solutions are tailored to meet the specific
            needs of key industries across The Bahamas and Caribbean.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <Card
              key={index}
              className="border-2 hover:border-green-200 transition-all duration-300 group hover:shadow-lg"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <industry.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{industry.title}</CardTitle>
                <CardDescription className="text-gray-600">{industry.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm">Key Solutions:</h4>
                  <ul className="space-y-1">
                    {industry.solutions.map((solution, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
