import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Zap, TrendingUp, Shield, Cpu, Brain } from "lucide-react"

const aiFeatures = [
  {
    icon: Bot,
    title: "NEURAL AUTOMATION",
    description:
      "Self-learning automation systems that continuously evolve and optimize your business processes through advanced machine learning algorithms.",
  },
  {
    icon: Zap,
    title: "QUANTUM ANALYTICS",
    description:
      "Real-time data processing with quantum-speed analytics that provide instantaneous insights and predictive intelligence.",
  },
  {
    icon: TrendingUp,
    title: "PREDICTIVE AI",
    description:
      "Advanced forecasting systems using deep learning networks to predict market trends and customer behavior with 99.7% accuracy.",
  },
  {
    icon: Shield,
    title: "CYBER SECURITY",
    description:
      "Military-grade encryption and AI-powered threat detection systems that protect your data with quantum-resistant security protocols.",
  },
]

export default function AITechnology() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl floating-animation"></div>
      <div
        className="absolute bottom-1/4 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl floating-animation"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 holographic px-6 py-3 rounded-full text-sm font-mono text-purple-300 neon-border">
                <Brain className="w-4 h-4 text-purple-400" />
                <span>ARTIFICIAL INTELLIGENCE CORE</span>
                <div className="w-2 h-2 bg-purple-400 rounded-full pulse-glow"></div>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 orbitron-font">
                TRANSFORM WITH
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                  NEURAL AI
                </span>
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                Harness the power of next-generation artificial intelligence to create
                <span className="text-cyan-400 font-semibold"> autonomous business ecosystems</span>. Our AI solutions
                are engineered for Caribbean enterprises, featuring
                <span className="text-purple-400 font-semibold"> quantum-enhanced processing</span>
                and adaptive learning capabilities.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 holographic p-4 rounded-xl neon-border">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 glow-effect">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cyan-300 mb-2 font-mono text-sm">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 glow-effect font-mono"
            >
              <Cpu className="mr-2 w-5 h-5" />
              ACTIVATE AI SYSTEMS
            </Button>
          </div>

          <div className="relative">
            <Card className="bg-black/60 border-2 border-purple-400/30 shadow-2xl holographic neon-border">
              <CardHeader className="bg-gradient-to-r from-purple-600/80 to-cyan-600/80 text-white">
                <CardTitle className="flex items-center space-x-3 font-mono">
                  <Brain className="w-6 h-6" />
                  <span>AI NEURAL DASHBOARD</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
                </CardTitle>
                <CardDescription className="text-purple-100 font-mono text-sm">
                  REAL-TIME INTELLIGENCE & AUTOMATION
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center p-4 holographic rounded-lg neon-border">
                  <span className="text-sm font-mono text-gray-300">NEURAL PROCESSING</span>
                  <span className="text-green-400 font-bold font-mono">+2,847%</span>
                </div>
                <div className="flex justify-between items-center p-4 holographic rounded-lg neon-border">
                  <span className="text-sm font-mono text-gray-300">RESPONSE OPTIMIZATION</span>
                  <span className="text-cyan-400 font-bold font-mono">-98.5%</span>
                </div>
                <div className="flex justify-between items-center p-4 holographic rounded-lg neon-border">
                  <span className="text-sm font-mono text-gray-300">QUANTUM EFFICIENCY</span>
                  <span className="text-purple-400 font-bold font-mono">+∞</span>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-lg border border-green-400/30">
                  <div className="text-green-400 font-mono text-xs mb-1">SYSTEM STATUS</div>
                  <div className="text-green-300 font-bold font-mono">QUANTUM NEURAL NETWORK ONLINE</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
