import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  const { error } = await supabase
    .from('waitlist')
    .insert([{ email: email.trim().toLowerCase() }])

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: "You're already on the list!" }, { status: 409 })
    }
    return NextResponse.json({ error: 'Something went wrong. Try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
