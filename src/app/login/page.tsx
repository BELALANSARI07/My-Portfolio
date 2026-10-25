'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Shield, Lock, AlertTriangle, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('belalansari000078@gmail.com');
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const errorParam = searchParams.get('error');

  useEffect(() => {
    if (errorParam === 'unauthorized_principal') {
      setErrorMsg('ACCESS DENIED: The authenticated account is not in the authorized administrator whitelist.');
    } else if (errorParam === 'authentication_required') {
      setErrorMsg('SESSION REQUIRED: Please authenticate to access the system control plane.');
    } else if (errorParam === 'auth_exchange_failed') {
      setErrorMsg('AUTH FAILED: Token exchange timed out or was rejected.');
    }
  }, [errorParam]);

  // Option 1: Passwordless Magic Link (Works out-of-the-box in Supabase)
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'belalansari000078@gmail.com').toLowerCase();

    if (cleanEmail !== adminEmail) {
      setErrorMsg(`ACCESS DENIED: "${cleanEmail}" is not authorized. Only ${adminEmail} is permitted.`);
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      const supabase = createClient();
      const redirectOrigin = window.location.origin;

      const { error } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          emailRedirectTo: `${redirectOrigin}/auth/callback?next=/admin`,
        },
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setMagicLinkSent(true);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to dispatch magic link.');
    } finally {
      setLoading(false);
    }
  };

  // Option 2: Google OAuth
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const supabase = createClient();
      const redirectOrigin = window.location.origin;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${redirectOrigin}/auth/callback?next=/admin`,
        },
      });

      if (error) {
        if (error.message.includes('not enabled') || error.message.includes('validation_failed')) {
          setErrorMsg(
            'Google Provider is not enabled yet in your Supabase dashboard. Please use the Instant Magic Link below, or enable Google under Supabase Auth -> Providers.'
          );
        } else {
          setErrorMsg(error.message);
        }
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Authentication dispatch failed.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md canvas-card p-8 border border-border-subtle bg-canvas-subtle font-mono text-xs">
      {/* Top Security Banner */}
      <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6 text-text-muted">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-telemetry-green" />
          <span className="text-text-primary font-bold tracking-wider">RESTRICTED_GATE</span>
        </div>
        <span className="text-[11px] text-telemetry-amber">SEC_LEVEL: 0</span>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-text-pure mb-1">ADMINISTRATOR CONSOLE</h1>
        <p className="text-text-muted text-[11px]">
          Identity verification required for configuration write permissions.
        </p>
      </div>

      {/* Whitelist Advisory */}
      <div className="p-3 mb-6 border border-border-subtle bg-canvas-surface text-text-secondary text-[11px] space-y-1">
        <div className="text-text-muted uppercase">// AUTHORIZED PRINCIPAL:</div>
        <div className="font-bold text-text-pure">belalansari000078@gmail.com</div>
        <div className="text-text-muted text-[10px]">
          Strict email whitelist enforced at Next.js Edge Middleware & Postgres RLS.
        </div>
      </div>

      {/* Error Callout */}
      {errorMsg && (
        <div className="p-3 mb-6 border border-telemetry-red/50 bg-telemetry-red/10 text-telemetry-red flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span className="leading-tight">{errorMsg}</span>
        </div>
      )}

      {/* Success Notification */}
      {magicLinkSent ? (
        <div className="p-4 border border-telemetry-green/50 bg-telemetry-green/10 text-telemetry-green space-y-2 mb-6">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>MAGIC LINK DISPATCHED</span>
          </div>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            Check your inbox at <strong className="text-text-pure">{email}</strong>. Click the login link to immediately access the /admin dashboard!
          </p>
          <button
            onClick={() => setMagicLinkSent(false)}
            className="text-[10px] text-telemetry-green underline mt-2 block"
          >
            [ Send again or try different method ]
          </button>
        </div>
      ) : (
        <>
          {/* Method 1: Instant Magic Link (Default Supabase Auth) */}
          <form onSubmit={handleMagicLink} className="space-y-3 mb-6">
            <div>
              <label className="text-text-muted text-[11px] uppercase tracking-wider block mb-1">
                INSTANT MAGIC LINK (EMAIL OTP)
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="belalansari000078@gmail.com"
                className="w-full bg-canvas-black border border-border-subtle p-2.5 text-text-pure focus:border-border-active focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-border-active bg-canvas-surface hover:bg-canvas-card hover:border-text-primary text-text-pure font-bold transition-all disabled:opacity-50"
            >
              <Mail className="h-3.5 w-3.5 text-telemetry-green" />
              <span>{loading ? '[ DISPATCHING... ]' : '[ SEND MAGIC LINK TO INBOX ]'}</span>
            </button>
          </form>

          {/* Separator */}
          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-border-subtle" />
            <span className="text-text-muted text-[10px] uppercase font-mono">OR SIGN IN WITH OAUTH</span>
            <div className="h-px flex-1 bg-border-subtle" />
          </div>

          {/* Method 2: Google OAuth */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 border border-border-subtle bg-canvas-subtle hover:border-border-active hover:text-text-pure text-text-secondary font-bold transition-all disabled:opacity-50"
          >
            <Lock className="h-3.5 w-3.5 text-text-muted" />
            <span>[ AUTHENTICATE WITH GOOGLE ]</span>
          </button>
        </>
      )}

      {/* Return to Public Canvas */}
      <div className="mt-8 pt-4 border-t border-border-subtle text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors text-[11px]"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>[ RETURN TO PUBLIC TELEMETRY CANVAS ]</span>
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-canvas-black flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 data-canvas-grid opacity-20 pointer-events-none" />
      <Suspense fallback={<div className="font-mono text-xs text-text-muted">INITIALIZING SECURE PROTOCOL...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
