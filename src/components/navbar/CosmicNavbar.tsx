'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Download, Moon, Shield, Menu, X } from 'lucide-react';

interface CosmicNavbarProps {
  resumeUrl?: string | null;
}

export default function CosmicNavbar({ resumeUrl }: CosmicNavbarProps) {
  const [activeTab, setActiveTab] = useState('Home');
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
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-purple-500/30 text-white font-bold text-xs tracking-wider shadow-md shadow-purple-500/20 group-hover:border-purple-400 group-hover:scale-105 transition-all">
            BA
          </div>
          <span className="font-semibold text-sm tracking-tight text-white/90 group-hover:text-white transition-colors">
            Belal Ansari
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.06] bg-[#0b0f19]/60 backdrop-blur-md px-3 py-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveTab(item.name)}
                className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Subtle Admin Link */}
          <Link
            href="/admin"
            className="p-2 text-slate-400 hover:text-purple-300 transition-colors"
            title="Admin Control Plane"
          >
            <Shield className="h-4 w-4" />
          </Link>

          {/* Theme Icon (Visual Accent) */}
          <div className="p-2 text-slate-400 hover:text-slate-200 cursor-default">
            <Moon className="h-4 w-4" />
          </div>

          {/* Download Resume Button */}
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

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex sm:hidden p-2 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-white/[0.08] bg-[#030712]/95 backdrop-blur-2xl px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => {
                setActiveTab(item.name);
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
            <Link
              href="/admin"
              className="text-xs text-slate-400 hover:text-purple-300 flex items-center gap-1.5"
            >
              <Shield className="h-3.5 w-3.5" />
              <span>Admin Gate</span>
            </Link>
            <a
              href={resumeUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.1] text-xs text-white"
            >
              <Download className="h-3 w-3" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
