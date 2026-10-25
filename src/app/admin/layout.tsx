'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { 
  Shield, 
  Layers, 
  Cpu, 
  User, 
  Mail, 
  LogOut, 
  Terminal,
  ExternalLink
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navLinks = [
    { href: '/admin', label: 'SYS_OVERVIEW', icon: Terminal },
    { href: '/admin/projects', label: 'PROJECT_SPECS', icon: Layers },
    { href: '/admin/skills', label: 'TECH_MATRIX', icon: Cpu },
    { href: '/admin/profile', label: 'PROFILE_DATA', icon: User },
    { href: '/admin/messages', label: 'TELEMETRY_LOGS', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-canvas-black text-text-primary flex flex-col font-mono text-xs">
      {/* Top Admin Telemetry Header */}
      <header className="border-b border-border-subtle bg-canvas-subtle h-12 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-text-pure">
            <Shield className="h-4 w-4 text-telemetry-green" />
            <span>SYS_CONTROL_PLANE // ROOT</span>
          </Link>
          <span className="text-border-subtle">|</span>
          <span className="text-text-muted text-[11px] hidden sm:inline-block">
            ACTIVE_SESSION: belalansari000078@gmail.com
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-text-secondary hover:text-text-pure transition-colors text-[11px]"
          >
            <span>[ PUBLIC_CANVAS ]</span>
            <ExternalLink className="h-3 w-3" />
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-1.5 px-2.5 py-1 border border-border-subtle bg-canvas-surface hover:border-telemetry-red hover:text-telemetry-red transition-all"
          >
            <LogOut className="h-3 w-3" />
            <span>{loggingOut ? 'EXITING...' : 'DISCONNECT'}</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Side Navigation Rail */}
        <aside className="w-56 border-r border-border-subtle bg-canvas-subtle p-4 hidden md:block shrink-0">
          <div className="text-[10px] uppercase text-text-muted mb-3 font-semibold tracking-wider">
            SYSTEM_MODULES
          </div>
          <nav className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 border transition-all ${
                    isActive
                      ? 'border-border-active bg-canvas-surface text-text-pure font-bold'
                      : 'border-transparent text-text-secondary hover:text-text-pure hover:bg-canvas-surface/50'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-telemetry-green' : 'text-text-muted'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-4 border-t border-border-subtle text-[11px] text-text-muted space-y-2">
            <div>DB_ENGINE: PostgreSQL 16</div>
            <div>AUTH_PROVIDER: Supabase SSR</div>
            <div>STATUS: NOMINAL</div>
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Mobile Navigation Tabs */}
          <div className="flex md:hidden overflow-x-auto gap-2 pb-3 mb-4 border-b border-border-subtle">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 border whitespace-nowrap text-xs ${
                    isActive
                      ? 'border-border-active bg-canvas-surface text-text-pure font-bold'
                      : 'border-border-subtle bg-canvas-subtle text-text-muted'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
