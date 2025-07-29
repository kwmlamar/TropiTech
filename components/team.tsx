import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Users, Globe, Shield } from "lucide-react"

const teamHighlights = [
  {
    icon: Users,
    title: "Local Expertise",
    description: "Deep understanding of Bahamian business culture, regulations, and market dynamics.",
  },
  {
    icon: Award,
    title: "Technical Excellence",
    description: "Certified professionals with expertise in cutting-edge technologies and industry best practices.",
  },
  {
    icon: Globe,
    title: "Global Standards",
    description: "International quality standards combined with local knowledge and personalized service.",
  },
  {
    icon: Shield,
    title: "Trusted Partnership",
    description: "Committed to long-term relationships, data security, and confidential business practices.",
  },
]

export default function Team() {
  return (
    <section id="team" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Local Expertise,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                  Global Standards
                </span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Our team combines deep local knowledge of The Bahamas business environment with world-class technical
                expertise. We understand the unique challenges and opportunities facing Caribbean businesses in the
                digital age.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {teamHighlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <highlight.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                    <p className="text-gray-600 text-sm">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-blue-100">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Certified & Experienced</h3>
                  <p className="text-gray-600 text-sm">Industry certifications and proven track record</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-xs text-gray-600">Projects Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-xs text-gray-600">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">5+</div>
                  <div className="text-xs text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <Card className="border-2 border-green-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
                <CardTitle>Meet Our Team</CardTitle>
                <CardDescription className="text-green-100">
                  Passionate professionals dedicated to your success
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">JS</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">John Smith</h4>
                      <p className="text-sm text-gray-600">Lead Developer & Co-Founder</p>
                      <p className="text-xs text-gray-500">10+ years in software development</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">MJ</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Maria Johnson</h4>
                      <p className="text-sm text-gray-600">AI Solutions Architect</p>
                      <p className="text-xs text-gray-500">Specialist in machine learning & automation</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">DW</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">David Williams</h4>
                      <p className="text-sm text-gray-600">Project Manager & Business Analyst</p>
                      <p className="text-xs text-gray-500">Expert in Caribbean business processes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
