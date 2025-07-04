import { AdminLayoutClient } from "@/components/admin-layout-client"
import { createClient } from "@/utils/supabase/server"

async function getCurrentUser() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      // console.warn('No authenticated user found:', authError?.message)
      return null
    }

    // Get user profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('full_name, email, role')
      .eq('user_id', user.id)
      .single()

    if (profileError) {
      // console.warn('Error fetching profile:', profileError.message)
    }

    return {
      id: user.id,
      email: user.email || profile?.email || 'Unknown',
      name: profile?.full_name || user.user_metadata?.full_name || 'Admin User',
      role: profile?.role || 'admin'
    }
  } catch {
    // console.error('Error fetching user data:', error)
    return null
  }
}

export default async function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return <AdminLayoutClient user={user}>{children}</AdminLayoutClient>
}