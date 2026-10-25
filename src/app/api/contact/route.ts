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
    let dbSuccess = false;
    try {
      const supabase = await createClient();
      const { error: dbErr } = await supabase.from('contact_messages').insert({
        name,
        email,
        message,
        user_agent: req.headers.get('user-agent') || 'unknown',
        status: 'UNREAD',
      });
      if (dbErr) {
        console.warn('Database archival note:', dbErr.message);
      } else {
        dbSuccess = true;
      }
    } catch (dbErr) {
      console.warn('Database archival note:', dbErr);
    }

    // 2. Direct Inbox Dispatch via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const destinationEmail = process.env.CONTACT_RECEIVER_EMAIL || 'belalansari000078@gmail.com';

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY is not configured in environment variables.');
      return NextResponse.json(
        {
          success: dbSuccess,
          warning: 'RESEND_NOT_CONFIGURED',
          message: dbSuccess
            ? 'Your message was archived in our database, but email delivery is not yet configured. Please set RESEND_API_KEY in Vercel or contact belalansari000078@gmail.com directly.'
            : 'Email service is not yet configured. Please contact belalansari000078@gmail.com directly.',
        },
        { status: dbSuccess ? 200 : 503 }
      );
    }

    const resend = new Resend(resendApiKey);

    const { data, error: sendError } = await resend.emails.send({
      from: 'Portfolio Telemetry <onboarding@resend.dev>',
      to: [destinationEmail],
      replyTo: email,
      subject: `[PORTFOLIO TRANSMISSION] New message from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #08090A; color: #F0F3F6; padding: 32px; border-radius: 12px; border: 1px solid #23272B; max-width: 600px; margin: 0 auto;">
          <div style="margin-bottom: 20px;">
            <span style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase;">
              PORTFOLIO TELEMETRY
            </span>
          </div>
          
          <h2 style="color: #FFFFFF; font-size: 20px; font-weight: 700; margin: 0 0 16px 0;">
            Incoming Message from ${name}
          </h2>

          <div style="background: #11151F; border: 1px solid #1E293B; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="color: #94A3B8; padding: 6px 0; width: 90px;"><strong>Sender:</strong></td>
                <td style="color: #F1F5F9; padding: 6px 0;">${name}</td>
              </tr>
              <tr>
                <td style="color: #94A3B8; padding: 6px 0;"><strong>Email:</strong></td>
                <td style="color: #60A5FA; padding: 6px 0;"><a href="mailto:${email}" style="color: #60A5FA; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="color: #94A3B8; padding: 6px 0;"><strong>Time:</strong></td>
                <td style="color: #CBD5E1; padding: 6px 0; font-family: monospace;">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST</td>
              </tr>
            </table>
          </div>

          <div style="background: #0D1117; border-left: 3px solid #8B5CF6; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
            <div style="font-size: 11px; text-transform: uppercase; color: #A78BFA; font-weight: 600; margin-bottom: 8px; letter-spacing: 0.05em;">
              Message Content
            </div>
            <p style="white-space: pre-wrap; color: #E2E8F0; line-height: 1.6; font-size: 14px; margin: 0;">${message}</p>
          </div>

          <div style="border-top: 1px solid #1E293B; padding-top: 20px; text-align: center;">
            <a href="mailto:${email}?subject=Re: Your message via Belal Ansari Portfolio" style="display: inline-block; background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">
              Reply Directly to ${name}
            </a>
            <p style="font-size: 11px; color: #64748B; margin-top: 16px; margin-bottom: 0;">
              Delivered via Belal Ansari Portfolio System Pipeline • <a href="https://www.belalansari.me" style="color: #818CF8; text-decoration: none;">belalansari.me</a>
            </p>
          </div>
        </div>
      `,
    });

    if (sendError) {
      console.error('Resend dispatch error:', sendError);
      return NextResponse.json(
        { error: `Email dispatch failed: ${sendError.message}` },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      dispatchId: data?.id || null,
      message: 'Transmission received and dispatched to inbox successfully.',
    });
  } catch (error: any) {
    console.error('Contact transmission error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal transmission error' },
      { status: 500 }
    );
  }
}
