'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  // Check environment variables first
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return redirect('/login?error=' + encodeURIComponent('Configuration error: Missing Supabase credentials'))
  }
  
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  if (!data.email || !data.password) {
    return redirect('/login?error=' + encodeURIComponent('Please provide both email and password'))
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // Redirect back to login with error message
    return redirect('/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  return redirect('/dashboard')
}