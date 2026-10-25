'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Shield, ArrowUpRight, Cpu } from 'lucide-react';

interface TelemetryBarProps {
  adminEmail?: string;
}

export default function TelemetryBar({ adminEmail }: TelemetryBarProps) {
  const [time, setTime] = useState<string>('');
  const [ping, setPing] = useState<number>(14);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
    };

    update();
    const timer = setInterval(update, 1000);
    // Simulate real-time edge network telemetry fluctuation
    const pingTimer = setInterval(() => {
      setPing(Math.floor(12 + Math.random() * 6));
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(pingTimer);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-canvas-black/90 backdrop-blur-md font-mono text-xs text-text-muted">
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Node Identifier */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-text-primary hover:text-text-pure transition-colors">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-telemetry-green animate-pulse" />
            </span>
            <span className="font-semibold tracking-wider">BELAL_ANSARI // AI-CORE</span>
          </Link>
          <span className="hidden md:inline-block text-border-subtle">|</span>
          <span className="hidden md:flex items-center gap-1.5 text-text-secondary">
            <Cpu className="h-3.5 w-3.5 text-text-muted" />
            <span>EPOCH: 2025-2029</span>
          </span>
        </div>

        {/* Center: Live Telemetry */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-text-muted">LATENCY:</span>
            <span className="text-text-primary font-medium">{ping}ms</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-muted">SYS_CLOCK:</span>
            <span className="text-text-primary font-medium">{time || '--:--:-- IST'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-muted">STATE:</span>
            <span className="text-telemetry-green font-medium">READY_FOR_DEPLOY</span>
          </div>
        </div>

        {/* Right: Navigation & Admin Gate */}
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-3">
            <a href="#specs" className="hover:text-text-primary transition-colors">[PROJECTS]</a>
            <a href="#stack" className="hover:text-text-primary transition-colors">[STACK]</a>
            <a href="#records" className="hover:text-text-primary transition-colors">[RECORDS]</a>
            <a href="#contact" className="hover:text-text-primary transition-colors">[CONTACT]</a>
          </nav>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-2.5 py-1 border border-border-subtle bg-canvas-subtle hover:border-border-active hover:text-text-pure transition-all"
            title="Restricted Admin Control Plane"
          >
            <Shield className="h-3 w-3 text-text-muted" />
            <span>SYS_ADMIN</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
