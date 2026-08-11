import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const next = searchParams.get('next')
      const targetUrl = next 
        ? `${origin}/profile?returnTo=${encodeURIComponent(next)}` 
        : `${origin}/profile`
      return NextResponse.redirect(targetUrl)
    }
  }

  // Return the user to an error page with some instructions
  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`)
}
