'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
  try {
    // Check if environment variables are set
    console.log('Environment check:', {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      urlLength: process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
      keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0
    })
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables')
      redirect('/signup?error=configuration-error')
    }

    console.log('Creating Supabase client...')
    const supabase = await createClient()
    console.log('Supabase client created successfully')

    // Extract form data
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    }

    console.log('Form data extracted:', { 
      firstName: data.firstName, 
      lastName: data.lastName, 
      email: data.email,
      hasPassword: !!data.password,
      hasConfirmPassword: !!data.confirmPassword
    })

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

    console.log('Starting Supabase signup...')
    
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

    console.log('Supabase signup response:', { authData, signUpError })

    if (signUpError) {
      console.error('Signup error:', signUpError)
      redirect('/signup?error=signup-failed')
    }

    // Check if user was created successfully
    if (!authData.user) {
      console.error('No user data returned from signup')
      redirect('/signup?error=signup-failed')
    }

    // If email confirmation is required, redirect to a confirmation page
    if (!authData.user.email_confirmed_at) {
      console.log('User created, email confirmation required')
      // Redirect back to signup page with success message
      redirect('/signup?message=check-email')
    }

    // If user is immediately confirmed, redirect to dashboard
    console.log('User created and confirmed, redirecting to dashboard')
    revalidatePath('/', 'layout')
  } catch (error) {
    console.error('Unexpected error during signup:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    })
    redirect('/signup?error=unexpected-error')
  }
  
  // If we get here, the signup was successful
  redirect('/')
} 