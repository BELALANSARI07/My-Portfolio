import CosmicNavbar from '@/components/navbar/CosmicNavbar';
import CosmicFooter from '@/components/sections/CosmicFooter';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { createPublicClient } from '@/lib/supabase/public';
import { LeadershipHackathon } from '@/types/database.types';
import { Trophy, Users, Award, ExternalLink, Sparkles, Calendar, CheckCircle2 } from 'lucide-react';

export const revalidate = 60;

export default async function ExperiencePage() {
  let records: LeadershipHackathon[] = [];

  try {
    const supabase = createPublicClient();
    const { data } = await supabase.from('leadership_hackathons').select('*').order('display_order', { ascending: true });
    if (data && data.length > 0) records = data as LeadershipHackathon[];
  } catch (e) {}

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between">
      <CosmicNavbar />

      <main className="pt-28 pb-20 relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Sparkles className="h-3 w-3" />
            <span>MILESTONES &amp; INITIATIVES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Experience &amp; Leadership
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Record of competitive hackathon finishes, research evaluations, and AI community leadership.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-6">
          {records.map((item, idx) => (
            <SpotlightCard key={item.id} className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-white/[0.06] mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs text-purple-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{item.date_str}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {item.title}
                  </h2>
                  <div className="text-sm font-semibold text-blue-400">
                    {item.role_or_award} • {item.organization}
                  </div>
                </div>

                {item.metrics && (
                  <div className="self-start md:self-auto px-3.5 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold">
                    {item.metrics}
                  </div>
                )}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {item.summary}
              </p>

              {item.evidence_url && (
                <div className="pt-3 border-t border-white/[0.06] flex justify-end">
                  <a
                    href={item.evidence_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300"
                  >
                    <span>Inspect Evidence / Project</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </SpotlightCard>
          ))}
        </div>
      </main>

      <CosmicFooter profile={{ full_name: 'Belal Ansari', contact_email: 'belalansari000078@gmail.com' } as any} />
    </div>
  );
}
