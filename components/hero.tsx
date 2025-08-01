"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Zap, Cpu, Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <section className="pt-16 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-400/30 rounded-full glow-effect floating-animation"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 border border-green-400/30 rotate-45 glow-effect floating-animation"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-16 h-16 border border-orange-400/30 rounded-lg glow-effect floating-animation"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-20 h-20 border border-purple-400/30 rounded-full glow-effect floating-animation"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-3 holographic px-6 py-3 rounded-full text-sm font-medium text-cyan-300 neon-border mx-auto">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-mono">SERVING THE BAHAMAS & CARIBBEAN</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full pulse-glow"></div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 leading-tight orbitron-font">
              NEXT-GEN
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 orbitron-font">
                SOFTWARE
              </span>
              <br />
              SOLUTIONS
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
              Pioneering the future of business technology in the Caribbean with
              <span className="text-cyan-400 font-semibold"> AI-powered solutions</span>, quantum-ready architecture,
              and
              <span className="text-green-400 font-semibold"> revolutionary digital transformation</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-lg px-8 py-4 glow-effect font-semibold"
            >
              <Zap className="mr-2 w-5 h-5" />
              INITIATE PROJECT
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-2 border-cyan-400/50 bg-transparent text-cyan-300 hover:bg-cyan-400/10 neon-border"
            >
              <Cpu className="mr-2 w-5 h-5" />
              NEURAL CONSULTATION
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 pt-4">
            <div className="flex items-center space-x-3 text-gray-300 holographic px-4 py-2 rounded-lg">
              <Phone className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-cyan-300">+1.242.555.0123</span>
            </div>
            <div className="text-gray-500">|</div>
            <div className="text-gray-300 font-mono">
              <span className="text-green-400">●</span> QUANTUM-SECURE SUPPORT
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
