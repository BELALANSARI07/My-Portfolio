'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin,
  X
} from 'lucide-react';
import { Profile } from '@/types/database.types';

interface CosmicFooterProps {
  profile: Profile;
}

export default function CosmicFooter({ profile }: CosmicFooterProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'IDLE' | 'TRANSMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [statusMsg, setStatusMsg] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('TRANSMITTING');
    setStatusMsg('Dispatching payload to Belal Ansari...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('SUCCESS');
        setStatusMsg('Message dispatched successfully! Belal will respond promptly.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setStatus('IDLE');
          setModalOpen(false);
        }, 4000);
      } else {
        setStatus('ERROR');
        setStatusMsg(`Failed: ${data.error || 'Server unreachable'}`);
      }
    } catch (err: any) {
      setStatus('ERROR');
      setStatusMsg('Network telemetry error. Please try again or email directly.');
    }
  };

  return (
    <footer id="contact" className="relative z-10 pt-16 pb-12 border-t border-white/[0.08] bg-[#030712]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Callout Banner (From Reference Image) */}
        <div className="rounded-3xl border border-white/[0.1] bg-gradient-to-r from-blue-950/30 via-purple-950/30 to-indigo-950/20 p-8 sm:p-12 mb-16 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow inside Card */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 font-mono text-[11px] uppercase tracking-wider">
                <span>LET'S CONNECT</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Open to <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">internships</span> and exciting opportunities.
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Feel free to reach out for internships, collaborations or just a chat about AI, technology and interesting ideas.
              </p>
            </div>

            {/* Banner Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Contact Me</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href={profile.resume_url || 'https://drive.google.com/file/d/1XN3kU-m0nC1BwG-H8-7cR-6hG/view'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-[#0b0f19]/80 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-200 backdrop-blur-md hover:bg-white/[0.08] hover:border-purple-500/40 hover:text-white transition-all shadow-sm"
              >
                <span>Download Resume</span>
                <Download className="h-4 w-4 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Global Bottom Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-sans font-medium">Belal Ansari</span>
            <span>•</span>
            <span>AI/ML Engineering Student (Class of 2029)</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/BELALANSARI07" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/belal-ansari-7a2bb3303" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              LinkedIn
            </a>
            <a href="https://www.kaggle.com/belalansari07" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              Kaggle
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Contact Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-lg rounded-3xl border border-white/[0.12] bg-[#0b0f19] p-6 sm:p-8 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Transmit Message</h3>
                  <p className="text-xs text-slate-400">Direct delivery to Belal Ansari's inbox</p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {status !== 'IDLE' && (
                <div className={`p-3 rounded-xl border mb-4 text-xs flex items-center gap-2 ${
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

              <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="w-full rounded-xl border border-white/[0.08] bg-[#030712] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-[#030712] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter project proposal, opportunity, or collaboration idea..."
                    className="w-full rounded-xl border border-white/[0.08] bg-[#030712] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'TRANSMITTING'}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-3 text-xs font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{status === 'TRANSMITTING' ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
