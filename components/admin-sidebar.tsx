'use client'

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Brain, Building2, Calendar, CreditCard, Flag, Settings, Users, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const adminTools = [
  { title: "Dashboard", url: "/dashboard", icon: Calendar },
  { title: "User Management", url: "/user-management", icon: Users },
  { title: "Company Management", url: "/company-management", icon: Building2 },
  { title: "Billing & Subscriptions", url: "/billing-subscriptions", icon: CreditCard },
  { title: "Feature Flags", url: "/feature-flags", icon: Flag },
  { title: "System Logs", url: "/system-logs", icon: Settings },
]

export function AdminSidebar() {
  const { collapsed } = useSidebar()
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(path)
  }

  const getNavCls = (isActive: boolean) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-secondary/80 text-foreground"

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
    >
      <SidebarContent className="bg-card/80 backdrop-blur-sm border-r border-border/50">
        {/* Header */}
        <div className={`p-4 border-b border-border/50 ${collapsed ? "px-2" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-foreground">TropiTech</h2>
                <p className="text-xs text-muted-foreground">Construction Tech Suite</p>
              </div>
            )}
          </div>
        </div>

        {/* Admin Tools Section */}
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className={collapsed ? "sr-only" : "text-xs font-semibold text-muted-foreground uppercase tracking-wider"}>
            Admin Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminTools.map((item) => {
                const active = isActive(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        href={item.url} 
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${getNavCls(active)}`}
                      >
                        <item.icon className="w-4 h-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}