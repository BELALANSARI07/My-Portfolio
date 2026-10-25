import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields (name, email, message)' },
        { status: 400 }
      );
    }

    // 1. Dual Strategy: Archive in Supabase contact_messages table
    try {
      const supabase = await createClient();
      await supabase.from('contact_messages').insert({
        name,
        email,
        message,
        user_agent: req.headers.get('user-agent') || 'unknown',
        status: 'UNREAD',
      });
    } catch (dbErr) {
      console.warn('Database archival note:', dbErr);
    }

    // 2. Direct Inbox Dispatch via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const destinationEmail = process.env.CONTACT_RECEIVER_EMAIL || 'belalansari000078@gmail.com';

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: 'Portfolio Telemetry <onboarding@resend.dev>',
        to: destinationEmail,
        replyTo: email,
        subject: `[PORTFOLIO_TELEMETRY] Incoming transmission from ${name}`,
        html: `
          <div style="font-family: monospace; background: #08090A; color: #F0F3F6; padding: 24px; border: 1px solid #23272B;">
            <div style="color: #38EF7D; margin-bottom: 16px; font-weight: bold;">
              // INBOUND TRANSMISSION DISPATCH
            </div>
            <p><strong>SENDER:</strong> ${name} &lt;${email}&gt;</p>
            <p><strong>TIMESTAMP:</strong> ${new Date().toISOString()}</p>
            <hr style="border: 0; border-top: 1px solid #23272B; margin: 16px 0;" />
            <div style="background: #111315; padding: 16px; border: 1px solid #23272B;">
              <strong>PAYLOAD:</strong><br />
              <p style="white-space: pre-wrap; color: #9EA8B3;">${message}</p>
            </div>
            <hr style="border: 0; border-top: 1px solid #23272B; margin: 16px 0;" />
            <p style="font-size: 11px; color: #6C747E;">
              Delivered via Belal Ansari Portfolio Data Canvas Pipeline.
            </p>
          </div>
        `,
      });
    } else {
      console.log('RESEND_API_KEY not configured. Message archived in database only.');
    }

    return NextResponse.json({
      success: true,
      message: 'Transmission received and archived successfully.',
    });
  } catch (error: any) {
    console.error('Contact transmission error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal transmission error' },
      { status: 500 }
    );
  }
}
