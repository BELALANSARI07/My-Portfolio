'use client';

import { useState } from 'react';
import SectionHeader from '@/components/canvas/SectionHeader';
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { Profile } from '@/types/database.types';

interface ContactCanvasProps {
  profile: Profile;
}

export default function ContactCanvas({ profile }: ContactCanvasProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'IDLE' | 'TRANSMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('TRANSMITTING');
    setStatusMessage('ENCRYPTING & DISPATCHING PACKET...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('SUCCESS');
        setStatusMessage('STATUS: 200 OK — TRANSMISSION DISPATCHED TO INBOX & DB');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('ERROR');
        setStatusMessage(`ERR_DISPATCH_FAILURE: ${data.error || 'Check network telemetry'}`);
      }
    } catch (err: any) {
      setStatus('ERROR');
      setStatusMessage('TRANSMISSION_ERROR: Connection refused or server unreachable');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative bg-canvas-black border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          idCode="05_INBOUND_TELEMETRY"
          title="CONTACT TRANSMISSION INTERFACE"
          subtitle="Direct payload delivery to inbox and telemetry database"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Endpoints & Verified Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="canvas-card p-6 border border-border-subtle bg-canvas-subtle font-mono text-xs">
              <div className="border-b border-border-subtle pb-3 mb-4 text-text-muted flex items-center justify-between">
                <span>COMMUNICATION_CHANNELS</span>
                <span className="text-telemetry-green">[SECURE]</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-text-muted mt-0.5" />
                  <div>
                    <div className="text-text-muted text-[11px]">PRIMARY_INBOX</div>
                    <a
                      href={`mailto:${profile.contact_email}`}
                      className="text-text-primary hover:text-text-pure transition-colors"
                    >
                      {profile.contact_email}
                    </a>
                  </div>
                </div>

                {profile.contact_number && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-text-muted mt-0.5" />
                    <div>
                      <div className="text-text-muted text-[11px]">DIRECT_LINE</div>
                      <span className="text-text-primary">
                        +91 {profile.contact_number}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-text-muted mt-0.5" />
                  <div>
                    <div className="text-text-muted text-[11px]">GEOGRAPHIC_BASE</div>
                    <span className="text-text-primary">
                      {profile.location} ({profile.timezone})
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-6 pt-4 border-t border-border-subtle flex flex-wrap gap-3">
                {profile.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border-subtle bg-canvas-surface hover:border-border-active text-text-secondary hover:text-text-pure transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>GITHUB</span>
                  </a>
                )}
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border-subtle bg-canvas-surface hover:border-border-active text-text-secondary hover:text-text-pure transition-colors"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    <span>LINKEDIN</span>
                  </a>
                )}
                {profile.kaggle_url && (
                  <a
                    href={profile.kaggle_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border-subtle bg-canvas-surface hover:border-border-active text-text-secondary hover:text-text-pure transition-colors"
                  >
                    <span>KAGGLE</span>
                  </a>
                )}
              </div>
            </div>

            {/* Terminal PGP / Hash Callout */}
            <div className="border border-border-subtle bg-canvas-subtle p-4 font-mono text-[11px] text-text-muted">
              <div className="text-text-secondary mb-1 font-semibold">// SECURITY_INTEGRITY</div>
              <p className="leading-relaxed">
                Transmissions are sanitized and relayed directly to {profile.admin_email} via Resend TLS endpoints. No tracking pixels or telemetry cookies are injected.
              </p>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="canvas-card p-6 md:p-8 border border-border-subtle bg-canvas-subtle font-mono text-xs space-y-5"
            >
              <div className="border-b border-border-subtle pb-3 flex items-center justify-between text-text-muted">
                <span>PAYLOAD_TRANSMISSION_FORM</span>
                <span>DEST: BELAL_ANSARI</span>
              </div>

              {/* Status Alert Banner */}
              {status !== 'IDLE' && (
                <div
                  className={`p-3 border flex items-center gap-2 ${
                    status === 'SUCCESS'
                      ? 'border-telemetry-green/50 bg-telemetry-green/10 text-telemetry-green'
                      : status === 'ERROR'
                      ? 'border-telemetry-red/50 bg-telemetry-red/10 text-telemetry-red'
                      : 'border-border-active bg-canvas-surface text-text-secondary'
                  }`}
                >
                  {status === 'SUCCESS' ? (
                    <CheckCircle className="h-4 w-4 shrink-0" />
                  ) : status === 'ERROR' ? (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-telemetry-amber animate-pulse shrink-0" />
                  )}
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-text-muted text-[11px] uppercase tracking-wider block">
                  ORIGIN_IDENTIFIER [NAME] *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Alex Mercer / OpenAI Research"
                  className="w-full bg-canvas-black border border-border-subtle px-3.5 py-2.5 text-text-pure placeholder-text-muted focus:border-border-active focus:outline-none transition-colors"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-text-muted text-[11px] uppercase tracking-wider block">
                  RETURN_ADDRESS [EMAIL] *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@organization.com"
                  className="w-full bg-canvas-black border border-border-subtle px-3.5 py-2.5 text-text-pure placeholder-text-muted focus:border-border-active focus:outline-none transition-colors"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label className="text-text-muted text-[11px] uppercase tracking-wider block">
                  PAYLOAD_MESSAGE [TRANSMISSION] *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter technical query, collaboration proposal, or project discussion..."
                  className="w-full bg-canvas-black border border-border-subtle px-3.5 py-2.5 text-text-pure placeholder-text-muted focus:border-border-active focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'TRANSMITTING'}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-border-active bg-canvas-surface hover:bg-canvas-card hover:border-text-primary text-text-pure font-bold tracking-wider transition-all disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                <span>
                  {status === 'TRANSMITTING' ? '[ TRANSMITTING_PACKET... ]' : '[ DISPATCH TRANSMISSION ]'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
