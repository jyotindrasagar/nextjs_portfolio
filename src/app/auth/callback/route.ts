import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: authData, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && authData?.session?.user) {
      const next = searchParams.get('next') || '/'
      
      // Check if user has completed profile (username exists)
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', authData.session.user.id)
        .single()
        
      if (profile && profile.username) {
        // Has profile, go straight to next
        return NextResponse.redirect(`${origin}${next}`)
      } else {
        // Needs profile setup
        return NextResponse.redirect(`${origin}/profile?returnTo=${encodeURIComponent(next)}`)
      }
    }
  }

  // Return the user to an error page with some instructions
  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`)
}
