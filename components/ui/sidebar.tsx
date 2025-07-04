'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [collapsed, setCollapsed] = React.useState(false)
  
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

interface SidebarProps {
  children: React.ReactNode
  className?: string
}

export function Sidebar({ children, className }: SidebarProps) {
  const { collapsed } = useSidebar()
  
  return (
    <aside className={cn(
      "flex flex-col border-r bg-background transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {children}
    </aside>
  )
}

export function SidebarContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      {children}
    </div>
  )
}

export function SidebarGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      {children}
    </div>
  )
}

export function SidebarGroupLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider", className)}>
      {children}
    </div>
  )
}

export function SidebarGroupContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col">{children}</div>
}

export function SidebarMenu({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {children}
    </nav>
  )
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

interface SidebarMenuButtonProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

export function SidebarMenuButton({ children, className, asChild }: SidebarMenuButtonProps) {
  if (asChild) {
    return <>{children}</>
  }
  
  return (
    <Button variant="ghost" className={cn("w-full justify-start", className)}>
      {children}
    </Button>
  )
}

export function SidebarTrigger() {
  const { collapsed, setCollapsed } = useSidebar()
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setCollapsed(!collapsed)}
      className="h-8 w-8 p-0"
    >
      {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
} 