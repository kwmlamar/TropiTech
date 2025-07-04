'use client'

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
  return (
    <div className="min-h-screen flex flex-col w-full relative overflow-hidden bg-gray-200">
      {/* Background Circle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[1200px] h-[1200px] bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-foreground">TropiTech</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto relative z-10">
        {children}
      </main>
    </div>
  )
} 