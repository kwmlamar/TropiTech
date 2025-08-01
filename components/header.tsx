"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Cpu } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">
                Tropi
              </span>
              <span className="text-sm text-gray-500 block leading-none">Tech</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
            >
              Services
            </a>
            <a
              href="#solutions"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
            >
              Solutions
            </a>
            <a
              href="#portfolio"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
            >
              Portfolio
            </a>
            <a
              href="#process"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
            >
              Process
            </a>
            <a
              href="#team"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
            >
              Team
            </a>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium" asChild>
              <Link href="/login">
                Admin
              </Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Get Started
            </Button>
          </nav>

          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a
                href="#services"
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
              >
                Services
              </a>
              <a
                href="#solutions"
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
              >
                Solutions
              </a>
              <a
                href="#portfolio"
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
              >
                Portfolio
              </a>
              <a
                href="#process"
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
              >
                Process
              </a>
              <a
                href="#team"
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
              >
                Team
              </a>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium w-full" asChild>
                <Link href="/login">
                  Admin Access
                </Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium w-full">
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
