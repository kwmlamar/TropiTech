import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Users, TrendingUp, Clock } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Resort Management System",
    category: "Tourism & Hospitality",
    description:
      "Complete booking and guest management solution for a luxury resort in Nassau, featuring real-time availability, automated check-in/out, and integrated payment processing.",
    image: "/placeholder.svg?height=300&width=400&text=Resort+Management+Dashboard",
    results: [
      { icon: Users, label: "Guest Satisfaction", value: "+35%" },
      { icon: TrendingUp, label: "Revenue Increase", value: "+28%" },
      { icon: Clock, label: "Check-in Time", value: "-60%" },
    ],
  },
  {
    title: "Construction Project Tracker",
    category: "Construction",
    description:
      "AI-powered project management platform for a major construction company, featuring resource allocation, timeline optimization, and real-time progress tracking.",
    image: "/placeholder.svg?height=300&width=400&text=Construction+Project+Dashboard",
    results: [
      { icon: Clock, label: "Project Completion", value: "+22%" },
      { icon: TrendingUp, label: "Cost Savings", value: "15%" },
      { icon: Users, label: "Team Efficiency", value: "+40%" },
    ],
  },
  {
    title: "Financial Compliance Portal",
    category: "Financial Services",
    description:
      "Secure compliance management system for a local bank, featuring automated reporting, risk assessment, and regulatory compliance tracking.",
    image: "/placeholder.svg?height=300&width=400&text=Financial+Compliance+Dashboard",
    results: [
      { icon: TrendingUp, label: "Compliance Score", value: "98%" },
      { icon: Clock, label: "Report Generation", value: "-75%" },
      { icon: Users, label: "Risk Reduction", value: "45%" },
    ],
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Success Stories & Portfolio</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped Bahamian businesses transform their operations with innovative software solutions and
            measurable results.
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden border-2 hover:border-blue-200 transition-colors">
              <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <div className="space-y-6">
                    <div>
                      <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                        {project.category}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{project.description}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {project.results.map((result, idx) => (
                        <div key={idx} className="text-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <result.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-lg font-bold text-gray-900">{result.value}</div>
                          <div className="text-xs text-gray-600">{result.label}</div>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-fit bg-transparent">
                      View Case Study
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
