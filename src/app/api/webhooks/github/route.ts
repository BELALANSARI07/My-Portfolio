import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const event = req.headers.get('x-github-event') || 'unknown';
    const signature = req.headers.get('x-hub-signature-256');

    // Optional secret verification if configured
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;
    if (webhookSecret && signature) {
      const hmac = crypto.createHmac('sha256', webhookSecret);
      const digest = `sha256=${hmac.update(rawBody).digest('hex')}`;
      if (digest !== signature) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
      }
    }

    // Handle initial webhook test ping from GitHub
    if (event === 'ping') {
      return NextResponse.json({
        message: 'GitHub webhook ping received successfully. Live auto-sync active!',
      });
    }

    // Revalidate ISR cache immediately on repository lifecycle and push events
    try {
      revalidateTag('github-projects');
      revalidatePath('/');
      revalidatePath('/projects');
    } catch (revalidateErr) {
      console.warn('Revalidation warning:', revalidateErr);
    }

    return NextResponse.json({
      success: true,
      message: `Triggered live sync for GitHub event: ${event}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('GitHub webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
