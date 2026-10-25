import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Layers, Cpu, Mail, User, ArrowUpRight, ShieldCheck, Terminal } from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch count telemetry
  const [{ count: projectCount }, { count: skillCount }, { count: messageCount }, { data: profile }] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('skills').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('full_name, headline, updated_at').single(),
  ]);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Welcome Telemetry */}
      <div className="border border-border-subtle bg-canvas-subtle p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-text-muted text-[11px] mb-1">
              <span className="text-telemetry-green">[SEC_LEVEL_0]</span>
              <span>ADMIN_DASHBOARD // CONTROL_PLANE</span>
            </div>
            <h1 className="text-2xl font-bold text-text-pure">
              TELEMETRY SUPERVISOR
            </h1>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-telemetry-green px-3 py-1.5 border border-telemetry-green/30 bg-telemetry-green/5">
            <ShieldCheck className="h-4 w-4" />
            <span>SESSION VALIDATED: belalansari000078@gmail.com</span>
          </div>
        </div>

        <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
          Dynamic Content Management Plane. Any mutations performed here update your public Data Canvas portfolio in real-time without recompilation or redeployment.
        </p>
      </div>

      {/* Metrics Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="canvas-card p-5 border border-border-subtle bg-canvas-subtle">
          <div className="flex items-center justify-between text-text-muted mb-2">
            <span>PROJECT_SPECS</span>
            <Layers className="h-4 w-4 text-telemetry-green" />
          </div>
          <div className="text-3xl font-extrabold text-text-pure mb-2 font-mono">
            {projectCount ?? 0}
          </div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1 text-[11px] text-text-secondary hover:text-text-pure"
          >
            <span>[ MANAGE SPECS ]</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="canvas-card p-5 border border-border-subtle bg-canvas-subtle">
          <div className="flex items-center justify-between text-text-muted mb-2">
            <span>SKILLS_MATRIX</span>
            <Cpu className="h-4 w-4 text-telemetry-green" />
          </div>
          <div className="text-3xl font-extrabold text-text-pure mb-2 font-mono">
            {skillCount ?? 0}
          </div>
          <Link
            href="/admin/skills"
            className="inline-flex items-center gap-1 text-[11px] text-text-secondary hover:text-text-pure"
          >
            <span>[ CONFIGURE MATRIX ]</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="canvas-card p-5 border border-border-subtle bg-canvas-subtle">
          <div className="flex items-center justify-between text-text-muted mb-2">
            <span>INBOUND_MSGS</span>
            <Mail className="h-4 w-4 text-telemetry-green" />
          </div>
          <div className="text-3xl font-extrabold text-text-pure mb-2 font-mono">
            {messageCount ?? 0}
          </div>
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-1 text-[11px] text-text-secondary hover:text-text-pure"
          >
            <span>[ VIEW TRANSMISSIONS ]</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="canvas-card p-5 border border-border-subtle bg-canvas-subtle">
          <div className="flex items-center justify-between text-text-muted mb-2">
            <span>IDENTITY_STATE</span>
            <User className="h-4 w-4 text-telemetry-green" />
          </div>
          <div className="text-sm font-bold text-text-pure truncate mb-2 font-mono">
            {profile?.full_name || 'Belal Ansari'}
          </div>
          <Link
            href="/admin/profile"
            className="inline-flex items-center gap-1 text-[11px] text-text-secondary hover:text-text-pure"
          >
            <span>[ EDIT PROFILE ]</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Quick Diagnostics Terminal */}
      <div className="border border-border-subtle bg-canvas-black p-5 font-mono text-xs">
        <div className="flex items-center gap-2 text-text-muted border-b border-border-subtle pb-3 mb-3">
          <Terminal className="h-4 w-4 text-telemetry-green" />
          <span>SYSTEM_LOGS // RUNTIME TELEMETRY</span>
        </div>
        <div className="space-y-1.5 text-text-secondary text-[11px]">
          <div>[INFO] Target Framework: Next.js 15 (App Router with Edge Middleware)</div>
          <div>[INFO] Database Engine: PostgreSQL (Supabase RLS active)</div>
          <div>[INFO] Storage Bucket: portfolio-assets (Public read, Admin write)</div>
          <div>[INFO] Contact Relay: Resend API + Supabase dual-write pipeline</div>
          <div className="text-telemetry-green">[READY] All administrative subroutines operational.</div>
        </div>
      </div>
    </div>
  );
}
