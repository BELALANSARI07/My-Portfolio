'use client';

import { useState } from 'react';
import CosmicNavbar from '@/components/navbar/CosmicNavbar';
import CosmicFooter from '@/components/sections/CosmicFooter';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'IDLE' | 'TRANSMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('TRANSMITTING');
    setStatusMsg('Transmitting message directly to Belal Ansari...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('SUCCESS');
        setStatusMsg('Message dispatched successfully! A copy has been delivered to Belal\'s inbox.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('ERROR');
        setStatusMsg(`Failed: ${data.error || 'Server unreachable'}`);
      }
    } catch (err: any) {
      setStatus('ERROR');
      setStatusMsg('Network telemetry error. Please try again or reach out directly.');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between">
      <CosmicNavbar />

      <main className="pt-28 pb-20 relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Sparkles className="h-3 w-3" />
            <span>INBOUND COMMUNICATIONS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact &amp; Transmission Channel
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Open to internships, research collaborations, machine learning engineering roles, and technical discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Endpoints (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <SpotlightCard className="p-5 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white tracking-tight pb-3 border-b border-white/[0.06]">
                Direct Coordinates
              </h2>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 uppercase">Primary Inbox</div>
                    <a href="mailto:belalansari000078@gmail.com" className="font-semibold text-white hover:text-purple-300 transition-colors">
                      belalansari000078@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 uppercase">Phone Endpoint</div>
                    <div className="font-semibold text-white">+91 7042181064</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 uppercase">Geographic Base</div>
                    <div className="font-semibold text-white">Delhi, India (Asia/Kolkata, UTC+05:30)</div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-white/[0.06]">
                <div className="text-xs font-mono text-slate-500 uppercase mb-3">Connect Online</div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/BELALANSARI07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.06] transition-all"
                    title="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/belal-ansari-7a2bb3303"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.06] transition-all"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.kaggle.com/belalansari07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-mono text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.06] transition-all"
                  >
                    Kaggle
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Contact Form (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-5 sm:p-10 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Send a Direct Transmission</h2>
                <p className="text-xs text-slate-400 mt-1">Dispatched directly via Resend to Belal's personal inbox</p>
              </div>

              {status !== 'IDLE' && (
                <div className={`p-4 rounded-xl border text-xs flex items-center gap-2.5 ${
                  status === 'SUCCESS' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' :
                  status === 'ERROR' ? 'border-rose-500/40 bg-rose-500/10 text-rose-400' :
                  'border-purple-500/40 bg-purple-500/10 text-purple-300'
                }`}>
                  {status === 'SUCCESS' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> :
                   status === 'ERROR' ? <AlertCircle className="h-4 w-4 shrink-0" /> :
                   <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping shrink-0" />}
                  <span>{statusMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Alex Mercer / OpenAI"
                    className="w-full rounded-xl border border-white/[0.08] bg-[#030712] px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-[#030712] px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">Message / Proposal *</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Discuss project requirements, open roles, or research ideas..."
                    className="w-full rounded-xl border border-white/[0.08] bg-[#030712] px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'TRANSMITTING'}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-3.5 text-xs font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{status === 'TRANSMITTING' ? 'Encrypting & Dispatching...' : 'Dispatch Message'}</span>
                </button>
              </form>
            </SpotlightCard>
          </div>
        </div>
      </main>

      <CosmicFooter profile={{ full_name: 'Belal Ansari', contact_email: 'belalansari000078@gmail.com' } as any} />
    </div>
  );
}
