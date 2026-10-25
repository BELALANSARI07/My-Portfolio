'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/types/database.types';
import { User, Save, Check } from 'lucide-react';

export default function ProfileManager() {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');

  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('profiles').select('*').single();
      if (data) setProfile(data as Profile);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('UPDATING IDENTITY TELEMETRY IN SUPABASE...');

    const { error } = await supabase
      .from('profiles')
      .update({
        ...profile,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.id);

    if (!error) {
      setStatusMsg('PROFILE RECORD SYNCHRONIZED.');
    } else {
      setStatusMsg(`ERROR: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="font-mono text-xs text-text-muted">LOADING PROFILE TELEMETRY...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl font-mono text-xs">
      <div className="border-b border-border-subtle pb-4">
        <h1 className="text-xl font-bold text-text-pure flex items-center gap-2">
          <User className="h-5 w-5 text-telemetry-green" />
          <span>IDENTITY & TELEMETRY CONFIGURATOR</span>
        </h1>
        <p className="text-text-muted text-[11px]">
          Update public headlines, biography, contact endpoints, and social coordinates.
        </p>
      </div>

      {statusMsg && (
        <div className="p-2.5 border border-border-active bg-canvas-subtle text-telemetry-green text-xs">
          {statusMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="canvas-card p-6 border border-border-subtle bg-canvas-subtle space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-text-muted text-[11px] block mb-1">FULL NAME *</label>
            <input
              type="text"
              required
              value={profile.full_name || ''}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
            />
          </div>

          <div>
            <label className="text-text-muted text-[11px] block mb-1">HEADLINE / SPECIALIZATION *</label>
            <input
              type="text"
              required
              value={profile.headline || ''}
              onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
              className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-text-muted text-[11px] block mb-1">BIOGRAPHY / PHILOSOPHY *</label>
            <textarea
              rows={4}
              required
              value={profile.bio || ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
            />
          </div>

          <div>
            <label className="text-text-muted text-[11px] block mb-1">LOCATION</label>
            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
            />
          </div>

          <div>
            <label className="text-text-muted text-[11px] block mb-1">CONTACT PHONE</label>
            <input
              type="text"
              value={profile.contact_number || ''}
              onChange={(e) => setProfile({ ...profile, contact_number: e.target.value })}
              className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
            />
          </div>

          <div>
            <label className="text-text-muted text-[11px] block mb-1">PUBLIC CONTACT EMAIL</label>
            <input
              type="email"
              value={profile.contact_email || ''}
              onChange={(e) => setProfile({ ...profile, contact_email: e.target.value })}
              className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
            />
          </div>

          <div>
            <label className="text-text-muted text-[11px] block mb-1">ADMIN WHITELIST EMAIL (PROTECTED)</label>
            <input
              type="email"
              disabled
              value={profile.admin_email || 'belalansari000078@gmail.com'}
              className="w-full bg-canvas-surface border border-border-subtle p-2 text-text-muted cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-text-muted text-[11px] block mb-1">GITHUB URL</label>
            <input
              type="url"
              value={profile.github_url || ''}
              onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
              className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
            />
          </div>

          <div>
            <label className="text-text-muted text-[11px] block mb-1">LINKEDIN URL</label>
            <input
              type="url"
              value={profile.linkedin_url || ''}
              onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
              className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
            />
          </div>

          <div>
            <label className="text-text-muted text-[11px] block mb-1">KAGGLE URL</label>
            <input
              type="url"
              value={profile.kaggle_url || ''}
              onChange={(e) => setProfile({ ...profile, kaggle_url: e.target.value })}
              className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
            />
          </div>

          <div>
            <label className="text-text-muted text-[11px] block mb-1">RESUME DOWNLOAD URL</label>
            <input
              type="text"
              value={profile.resume_url || ''}
              onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })}
              placeholder="e.g. /resume.pdf or Google Drive link"
              className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border-subtle flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 py-2 px-4 border border-border-active bg-canvas-surface hover:bg-canvas-card text-text-pure font-bold transition-all"
          >
            <Save className="h-4 w-4 text-telemetry-green" />
            <span>[ COMMIT CHANGES TO DB ]</span>
          </button>
        </div>
      </form>
    </div>
  );
}
