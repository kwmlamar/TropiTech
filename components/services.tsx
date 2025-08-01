import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Brain, Smartphone, Globe, Database, Cog, Zap, Cpu } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Custom Development",
    description:
      "Next-generation applications built with modern architecture and cutting-edge technologies for unprecedented performance.",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Advanced artificial intelligence systems with machine learning capabilities that evolve and adapt to your business needs.",
  },
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "Immersive web experiences with modern interfaces and real-time data synchronization across multiple platforms.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Revolutionary mobile applications with modern UI/UX and secure authentication protocols.",
  },
  {
    icon: Database,
    title: "CRM Systems",
    description:
      "Intelligent customer relationship management powered by predictive analytics and automated workflows.",
  },
  {
    icon: Cog,
    title: "Process Automation",
    description: "Autonomous business workflows with self-optimizing algorithms and real-time performance monitoring.",
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 bg-gray-50 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Cpu className="w-4 h-4" />
            <span>Our Services</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Tech Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From custom development to AI integration, we deploy cutting-edge technologies that transform your business
            into a <span className="text-blue-600 font-semibold">digital powerhouse</span> ready for the future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group"
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {service.description}
                </CardDescription>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>Modern & Scalable</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
