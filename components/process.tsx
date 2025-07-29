import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Code, Rocket, Headphones } from "lucide-react"

const processSteps = [
  {
    icon: Search,
    title: "Discovery & Planning",
    description:
      "We start by understanding your business needs, challenges, and goals through comprehensive consultation and analysis.",
    duration: "1-2 weeks",
    deliverables: ["Requirements Analysis", "Project Roadmap", "Technical Specifications"],
  },
  {
    icon: Code,
    title: "Development & Design",
    description:
      "Our expert team builds your solution using cutting-edge technologies and best practices, with regular updates and feedback sessions.",
    duration: "4-12 weeks",
    deliverables: ["Custom Development", "UI/UX Design", "Quality Assurance"],
  },
  {
    icon: Rocket,
    title: "Deployment & Launch",
    description:
      "We handle the complete deployment process, ensuring smooth launch with minimal disruption to your business operations.",
    duration: "1-2 weeks",
    deliverables: ["System Deployment", "User Training", "Go-Live Support"],
  },
  {
    icon: Headphones,
    title: "Support & Maintenance",
    description:
      "Ongoing support, updates, and maintenance to ensure your solution continues to perform optimally and evolve with your business.",
    duration: "Ongoing",
    deliverables: ["24/7 Support", "Regular Updates", "Performance Monitoring"],
  },
]

export default function Process() {
  return (
    <section id="process" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Proven Development Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From initial consultation to ongoing support, we follow a structured approach that ensures successful
            project delivery and long-term success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-2 hover:border-orange-200 transition-colors h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-bold text-orange-600 mb-2">STEP {index + 1}</div>
                  <CardTitle className="text-xl font-bold text-gray-900">{step.title}</CardTitle>
                  <CardDescription className="text-gray-600">{step.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      Duration: {step.duration}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Key Deliverables:</h4>
                    <ul className="space-y-1">
                      {step.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-orange-300 to-orange-500"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
