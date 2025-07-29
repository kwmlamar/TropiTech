'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
  try {
    // Check if environment variables are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      redirect('/signup?error=configuration-error')
    }

    const supabase = await createClient()

    // Extract form data
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    }

    // Basic validation
    if (!data.email || !data.password || !data.firstName || !data.lastName) {
      redirect('/signup?error=missing-fields')
    }

    if (data.password !== data.confirmPassword) {
      redirect('/signup?error=password-mismatch')
    }

    if (data.password.length < 8) {
      redirect('/signup?error=password-too-short')
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      redirect('/signup?error=invalid-email')
    }

    // Sign up the user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          full_name: `${data.firstName} ${data.lastName}`,
        }
      }
    })

    if (signUpError) {
      redirect('/signup?error=signup-failed')
    }

    // Check if user was created successfully
    if (!authData.user) {
      redirect('/signup?error=signup-failed')
    }

    // If email confirmation is required, redirect to a confirmation page
    if (!authData.user.email_confirmed_at) {
      // Redirect back to signup page with success message
      redirect('/signup?message=check-email')
    }

    // If user is immediately confirmed, redirect to dashboard
    revalidatePath('/', 'layout')
  } catch {
    redirect('/signup?error=unexpected-error')
  }
  
  // If we get here, the signup was successful
  redirect('/')
} 