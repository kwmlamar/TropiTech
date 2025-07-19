import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'signup' | 'magiclink' | 'recovery' | 'email',
    })

    if (!error) {
      // Redirect to login page with success message
      return NextResponse.redirect(new URL('/login?message=email-confirmed', request.url))
    }
  }

  // Redirect to error page if something goes wrong
  return NextResponse.redirect(new URL('/error', request.url))
}