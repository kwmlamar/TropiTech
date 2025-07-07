'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, Users, Building2, CreditCard, Flag, Settings, Brain, LayoutDashboard } from 'lucide-react'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AdminLayoutClientProps {
  children: React.ReactNode
  user: User | null
}

export function AdminLayoutClient({ children, user }: AdminLayoutClientProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const pathname = usePathname()

  const navigationItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "User Management", url: "/user-management", icon: Users },
    { title: "Company Management", url: "/company-management", icon: Building2 },
    { title: "Billing & Subscriptions", url: "/billing-subscriptions", icon: CreditCard },
    { title: "Feature Flags", url: "/feature-flags", icon: Flag },
    { title: "System Logs", url: "/system-logs", icon: Settings },
    { title: "TropiBrain", url: "/tropi-brain", icon: Brain },
  ]

  // const isActive = (path: string) => {
  //   if (path === "/dashboard") return pathname === "/dashboard"
  //   return pathname.startsWith(path)
  // }

  return (
    <div className="min-h-screen flex flex-col w-full relative overflow-hidden bg-gray-200">
      {/* Background Circle */}
      <div className="absolute inset-0 flex justify-center pointer-events-none" style={{ top: '200px' }}>
        <div className="w-[1200px] h-[1200px] bg-blue-500/15 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 relative z-10">
        <div className="flex items-center gap-3">
          
          <h1 className="text-xl text-foreground">
          <span className="font-bold">Tropi</span>
          <span className="font-normal">Tech</span>
        </h1>
        </div>

        <div className="flex items-center gap-6">
          <Link 
            href="/leads" 
            className={`text-sm font-medium px-4 py-2.5 rounded-3xl transition-all duration-200 ${
              pathname === '/leads' 
                ? 'bg-gray-900 text-white shadow-md' 
                : 'text-foreground hover:text-white hover:bg-gray-900'
            }`}
          >
            Leads
          </Link>
          <Link 
            href="/contacts" 
            className={`text-sm font-medium px-4 py-2.5 rounded-3xl transition-all duration-200 ${
              pathname === '/contacts' 
                ? 'bg-gray-900 text-white shadow-md' 
                : 'text-foreground hover:text-white hover:bg-gray-900'
            }`}
          >
            Contacts
          </Link>
          <Link 
            href="/opportunities" 
            className={`text-sm font-medium px-4 py-2.5 rounded-3xl transition-all duration-200 ${
              pathname === '/opportunities' 
                ? 'bg-gray-900 text-white shadow-md' 
                : 'text-foreground hover:text-white hover:bg-gray-900'
            }`}
          >
            Opportunities
          </Link>
          <Link 
            href="/deals" 
            className={`text-sm font-medium px-4 py-2.5 rounded-3xl transition-all duration-200 ${
              pathname === '/deals' 
                ? 'bg-gray-900 text-white shadow-md' 
                : 'text-foreground hover:text-white hover:bg-gray-900'
            }`}
          >
            Deals
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white/60 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div className="w-10 h-10 bg-white/60 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div className="w-10 h-10 bg-white/60 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="w-10 h-10 bg-white/60 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">
            {user?.name?.charAt(0) || 'A'}
          </div>
        </div>
      </header>

      {/* Main Content - Fixed Position */}
      <main className="absolute inset-0 top-16 left-0 right-0 overflow-auto transition-all duration-300 ease-in-out transform-gpu">
        <div className={`px-6 pt-6 pb-4 transition-all duration-300 ease-in-out transform-gpu ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          {children}
        </div>
      </main>

      {/* Sidebar - Fixed Position */}
      <aside className={`fixed top-16 left-0 h-full transition-all duration-300 ease-in-out transform-gpu z-20 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex flex-col h-full">
          {/* Collapse Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-12 h-12 mt-4 ml-5 mb-2 bg-white/60 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out transform-gpu hover:bg-white/80 hover:scale-105"
          >
            <div className="relative w-5 h-5">
              <ChevronRight className={`w-5 h-5 text-gray-600 transition-all duration-300 ease-in-out transform-gpu absolute inset-0 ${sidebarCollapsed ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              <ChevronLeft className={`w-5 h-5 text-gray-600 transition-all duration-300 ease-in-out transform-gpu absolute inset-0 ${sidebarCollapsed ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
            </div>
          </button>

          {/* Navigation Items */}
          <nav className="flex-1 px-3">
            {navigationItems.map((item) => {
              const IconComponent = item.icon

              return (
                <div key={item.title} className="mb-1">
                  {sidebarCollapsed ? (
                    // Collapsed state - icon only button
                    <Link
                      href={item.url}
                      className="group flex items-center gap-3 px-2 py-1 rounded-xl transition-all duration-200 text-gray-600 hover:scale-105"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-white/60 transition-all duration-200 group-hover:scale-110">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </Link>
                  ) : (
                    // Expanded state - icon + text button
                    <Link
                      href={item.url}
                      className="group flex items-center gap-3 px-2 py-1 rounded-xl transition-all duration-200 text-gray-600 hover:bg-white/60 hover:scale-105"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-white/60 transition-all duration-200 group-hover:scale-110">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-medium whitespace-nowrap">
                        {item.title}
                      </span>
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </aside>


    </div>
  )
} 