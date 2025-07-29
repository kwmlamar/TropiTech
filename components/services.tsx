import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Brain, Smartphone, Globe, Database, Cog, Zap, Cpu } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "QUANTUM DEVELOPMENT",
    description:
      "Next-generation applications built with quantum-ready architecture and neural network integration for unprecedented performance.",
  },
  {
    icon: Brain,
    title: "AI NEURAL NETWORKS",
    description:
      "Advanced artificial intelligence systems with machine learning capabilities that evolve and adapt to your business ecosystem.",
  },
  {
    icon: Globe,
    title: "CYBER APPLICATIONS",
    description:
      "Immersive web experiences with holographic interfaces and real-time data synchronization across multiple dimensions.",
  },
  {
    icon: Smartphone,
    title: "MOBILE MATRIX",
    description:
      "Revolutionary mobile applications with augmented reality integration and biometric security protocols.",
  },
  {
    icon: Database,
    title: "NEURAL CRM SYSTEMS",
    description:
      "Intelligent customer relationship management powered by predictive analytics and automated decision engines.",
  },
  {
    icon: Cog,
    title: "PROCESS AUTOMATION",
    description: "Autonomous business workflows with self-optimizing algorithms and real-time performance monitoring.",
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-black via-gray-900 to-blue-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 holographic px-4 py-2 rounded-full text-sm font-mono text-cyan-300 mb-6">
            <Cpu className="w-4 h-4" />
            <span>ADVANCED TECHNOLOGY SUITE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6 orbitron-font">
            COMPREHENSIVE TECH SOLUTIONS
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From quantum computing to neural networks, we deploy cutting-edge technologies that transform your business
            into a<span className="text-cyan-400"> digital powerhouse</span> ready for the future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-black/40 border-2 border-cyan-400/20 hover:border-cyan-400/60 transition-all duration-300 group holographic neon-border"
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform glow-effect">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-cyan-300 font-mono tracking-wider">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  {service.description}
                </CardDescription>
                <div className="mt-4 flex items-center text-cyan-400 text-sm font-mono">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>QUANTUM READY</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
