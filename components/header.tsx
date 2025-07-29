"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Cpu, Zap, Shield } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-cyan-400/20 z-50 neon-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center glow-effect">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 orbitron-font">
                TROPI
              </span>
              <span className="text-sm text-cyan-300 block leading-none font-mono">TECH.SYS</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm tracking-wider"
            >
              SERVICES
            </a>
            <a
              href="#solutions"
              className="text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm tracking-wider"
            >
              SOLUTIONS
            </a>
            <a
              href="#portfolio"
              className="text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm tracking-wider"
            >
              PORTFOLIO
            </a>
            <a
              href="#process"
              className="text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm tracking-wider"
            >
              PROCESS
            </a>
            <a
              href="#team"
              className="text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm tracking-wider"
            >
              NEURAL.NET
            </a>
            <Button variant="outline" className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 neon-border font-mono" asChild>
              <Link href="/login">
                <Shield className="w-4 h-4 mr-2" />
                ADMIN
              </Link>
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 glow-effect font-mono">
              <Zap className="w-4 h-4 mr-2" />
              ENGAGE
            </Button>
          </nav>

          <button className="md:hidden text-cyan-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyan-400/20">
            <nav className="flex flex-col space-y-4">
              <a
                href="#services"
                className="text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm tracking-wider"
              >
                SERVICES
              </a>
              <a
                href="#solutions"
                className="text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm tracking-wider"
              >
                SOLUTIONS
              </a>
              <a
                href="#portfolio"
                className="text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm tracking-wider"
              >
                PORTFOLIO
              </a>
              <a
                href="#process"
                className="text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm tracking-wider"
              >
                PROCESS
              </a>
              <a
                href="#team"
                className="text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm tracking-wider"
              >
                NEURAL.NET
              </a>
              <Button variant="outline" className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 neon-border font-mono w-full" asChild>
                <Link href="/login">
                  <Shield className="w-4 h-4 mr-2" />
                  ADMIN ACCESS
                </Link>
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 glow-effect font-mono w-full">
                <Zap className="w-4 h-4 mr-2" />
                ENGAGE
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
