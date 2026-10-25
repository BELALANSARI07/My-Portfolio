import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/admin';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'belalansari000078@gmail.com').toLowerCase();
      const userEmail = (data.user.email || '').toLowerCase();

      if (userEmail !== adminEmail) {
        // Sign out unauthorized account immediately
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/login?error=unauthorized_principal`);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_exchange_failed`);
}
