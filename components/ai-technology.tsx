import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Zap, TrendingUp, Shield, Cpu, Brain } from "lucide-react"

const aiFeatures = [
  {
    icon: Bot,
    title: "Smart Automation",
    description:
      "Self-learning automation systems that continuously evolve and optimize your business processes through advanced machine learning algorithms.",
  },
  {
    icon: Zap,
    title: "Real-time Analytics",
    description:
      "Real-time data processing with lightning-fast analytics that provide instantaneous insights and predictive intelligence.",
  },
  {
    icon: TrendingUp,
    title: "Predictive AI",
    description:
      "Advanced forecasting systems using deep learning networks to predict market trends and customer behavior with high accuracy.",
  },
  {
    icon: Shield,
    title: "AI Security",
    description:
      "Advanced encryption and AI-powered threat detection systems that protect your data with enterprise-grade security protocols.",
  },
]

export default function AITechnology() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                <Brain className="w-4 h-4" />
                <span>AI-Powered Solutions</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Transform Your Business
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  with AI
                </span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Harness the power of next-generation artificial intelligence to create
                <span className="text-blue-600 font-semibold"> autonomous business ecosystems</span>. Our AI solutions
                are engineered for Caribbean enterprises, featuring
                <span className="text-purple-600 font-semibold"> advanced processing</span>
                and adaptive learning capabilities.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold"
            >
              <Cpu className="mr-2 w-5 h-5" />
              Explore AI Solutions
            </Button>
          </div>

          <div className="relative">
            <Card className="bg-white border border-gray-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <CardTitle className="flex items-center gap-3">
                  <Brain className="w-6 h-6" />
                  <span>AI Dashboard</span>
                </CardTitle>
                <CardDescription className="text-purple-100 text-sm">
                  Real-time Intelligence & Automation
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Processing Speed</span>
                  <span className="text-green-600 font-bold">+2847%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="text-blue-600 font-bold">-98.5%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Efficiency</span>
                  <span className="text-purple-600 font-bold">+∞</span>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-700 text-xs mb-1 font-medium">System Status</div>
                  <div className="text-green-800 font-bold">AI Network Online</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
