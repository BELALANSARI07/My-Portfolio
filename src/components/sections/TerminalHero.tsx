'use client';

import { useState } from 'react';
import { Terminal, Download, ArrowRight, CornerDownLeft } from 'lucide-react';
import { Profile } from '@/types/database.types';

interface TerminalHeroProps {
  profile: Profile;
}

export default function TerminalHero({ profile }: TerminalHeroProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: 'sys --status',
      output: `[OK] Belal Ansari kernel online\n[OK] Specialization: Generative AI, Computer Vision, Low-Latency Edge Inference\n[OK] Current Status: B.Tech CSE (AI & ML) - Class of 2029\n[OK] Location: ${profile.location} (${profile.timezone})`,
    },
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputVal.trim().toLowerCase();
    if (!cleanCmd) return;

    let reply = '';
    switch (cleanCmd) {
      case 'help':
        reply = 'Available diagnostics commands:\n- status       : Display runtime telemetry and active system stats\n- about        : Print engineering philosophy and vision\n- stack        : Jump to Technical Capability Matrix\n- specs        : View technical project specifications & RFCs\n- contact      : Transmit packet to Belal Ansari\n- clear        : Clear terminal output buffer';
        break;
      case 'status':
        reply = `Status: NOMINAL | Identity: ${profile.full_name}\nHeadline: ${profile.headline}\nAdmin Whitelist: ${profile.admin_email} [ENFORCED]`;
        break;
      case 'about':
        reply = profile.bio;
        break;
      case 'stack':
        document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' });
        reply = 'Routing viewport to #stack...';
        break;
      case 'specs':
      case 'projects':
        document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' });
        reply = 'Routing viewport to #specs...';
        break;
      case 'contact':
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        reply = 'Routing viewport to #contact transmission interface...';
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        reply = `Command not recognized: "${cleanCmd}". Type "help" for a list of valid routines.`;
    }

    setHistory((prev) => [...prev, { cmd: inputVal, output: reply }]);
    setInputVal('');
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border-subtle">
      {/* Background Subtle Coordinate Overlay */}
      <div className="absolute inset-0 data-canvas-grid opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Terminal Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-text-muted mb-4 border-b border-border-subtle pb-2">
          <div className="flex items-center gap-2">
            <span className="text-telemetry-green">[SYS_BOOT: 0x7F2A]</span>
            <span>DATA_CANVAS // ARCHITECTURE_V1</span>
          </div>
          <div className="flex items-center gap-3">
            <span>COORDINATES: 28.6139° N, 77.2090° E</span>
            <span>ENV: PRODUCTION</span>
          </div>
        </div>

        {/* Hero Identity Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-4 border border-border-subtle bg-canvas-subtle font-mono text-xs text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-telemetry-green" />
              <span>{profile.headline}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-pure font-mono mb-4">
              {profile.full_name}
            </h1>

            <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
              {profile.bio}
            </p>

            {/* Quick Action Matrix */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <a
                href="#specs"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border-active bg-canvas-surface hover:bg-canvas-subtle hover:border-text-primary text-text-pure transition-all"
              >
                <span>[ INSPECT_SPECS ]</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border-subtle bg-canvas-subtle hover:border-border-active text-text-secondary hover:text-text-pure transition-all"
              >
                <span>[ TRANSMIT_MESSAGE ]</span>
              </a>

              {profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border-subtle bg-canvas-subtle hover:border-border-active text-text-muted hover:text-text-pure transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>[ RESUME_PDF ]</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: High-Density Telemetry Box */}
          <div className="lg:col-span-4 border border-border-subtle bg-canvas-subtle p-5 font-mono text-xs">
            <div className="border-b border-border-subtle pb-3 mb-3 flex items-center justify-between text-text-muted">
              <span>TELEMETRY_BLOCK</span>
              <span className="text-telemetry-green">● ACTIVE</span>
            </div>
            <div className="space-y-2.5 text-text-secondary">
              <div className="flex justify-between">
                <span className="text-text-muted">PRINCIPAL:</span>
                <span className="text-text-pure">{profile.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">GRADUATION:</span>
                <span className="text-text-pure">CLASS OF 2029</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">CORE_FOCUS:</span>
                <span className="text-text-pure">CV / GEN-AI / EDGE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">LOCATION:</span>
                <span className="text-text-pure">{profile.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">PHONE_ENDPOINT:</span>
                <span className="text-text-pure">{profile.contact_number || 'PROTECTED'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">ADMIN_GATE:</span>
                <span className="text-telemetry-green">WHITELIST_ENABLED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive CLI Diagnostic Box */}
        <div className="border border-border-subtle bg-canvas-black shadow-2xl font-mono text-xs">
          {/* CLI Window Titlebar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle bg-canvas-subtle">
            <div className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-telemetry-green" />
              <span className="text-text-muted">telemetry@belal-ansari:~$</span>
            </div>
            <span className="text-text-muted text-[11px]">Type "help" for interactive commands</span>
          </div>

          {/* Terminal History */}
          <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-text-secondary">
                  <span className="text-telemetry-green">&gt;</span>
                  <span className="text-text-pure">{item.cmd}</span>
                </div>
                <pre className="text-text-muted whitespace-pre-wrap pl-4 font-mono text-xs leading-relaxed">
                  {item.output}
                </pre>
              </div>
            ))}

            {/* Input Form */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
              <span className="text-telemetry-green">&gt;</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type command (e.g. 'help', 'status', 'specs', 'contact', 'clear')..."
                className="flex-1 bg-transparent text-text-pure placeholder-text-muted focus:outline-none font-mono text-xs"
              />
              <button
                type="submit"
                className="text-text-muted hover:text-text-pure px-2 py-0.5 border border-border-subtle bg-canvas-subtle text-[11px]"
              >
                <CornerDownLeft className="h-3 w-3" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
