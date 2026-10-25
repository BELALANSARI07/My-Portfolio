'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Moon, Shield, Menu, X, Activity } from 'lucide-react';

interface CosmicNavbarProps {
  resumeUrl?: string | null;
}

export default function CosmicNavbar({ resumeUrl }: CosmicNavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Progress', href: '/progress', isPulse: true },
    { name: 'Experience', href: '/experience' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/50'
          : 'bg-[#030712]/40 backdrop-blur-md border-b border-white/[0.04]'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-purple-500/30 text-white font-bold text-xs tracking-wider shadow-md shadow-purple-500/20 group-hover:border-purple-400 group-hover:scale-105 transition-all">
            BA
          </div>
          <span className="font-semibold text-sm tracking-tight text-white/90 group-hover:text-white transition-colors">
            Belal Ansari
          </span>
        </Link>

        {/* Center: Real Route Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.06] bg-[#0b0f19]/70 backdrop-blur-md px-3 py-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{item.name}</span>
                {item.isPulse && (
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 text-slate-400 hover:text-purple-300 transition-colors"
            title="Admin Control Plane"
          >
            <Shield className="h-4 w-4" />
          </Link>

          <div className="p-2 text-slate-400 hover:text-slate-200 cursor-default" title="Dark Canvas Mode">
            <Moon className="h-4 w-4" />
          </div>

          <a
            href={resumeUrl || 'https://drive.google.com/file/d/1XN3kU-m0nC1BwG-H8-7cR-6hG/view'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-md hover:bg-white/[0.08] hover:border-purple-500/40 hover:text-white transition-all shadow-sm"
          >
            <span>Download Resume</span>
            <Download className="h-3.5 w-3.5 text-slate-400" />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden p-2 rounded-xl border border-white/[0.1] bg-white/[0.04] text-slate-300 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5 text-purple-400" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#030712]/98 backdrop-blur-2xl px-4 py-5 space-y-2 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white font-semibold border border-purple-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                  {item.isPulse && (
                    <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full bg-emerald-500/10">
                      LIVE STATS
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
          <div className="pt-4 mt-2 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-slate-400 hover:text-purple-300 flex items-center gap-1.5 p-2 rounded-lg hover:bg-white/[0.04]"
            >
              <Shield className="h-4 w-4 text-purple-400" />
              <span>Admin Gate</span>
            </Link>
            <a
              href={resumeUrl || 'https://drive.google.com/file/d/1XN3kU-m0nC1BwG-H8-7cR-6hG/view'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/[0.12] bg-purple-600/20 text-xs font-semibold text-white shadow-sm"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
