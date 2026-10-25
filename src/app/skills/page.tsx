import CosmicNavbar from '@/components/navbar/CosmicNavbar';
import CosmicFooter from '@/components/sections/CosmicFooter';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { createPublicClient } from '@/lib/supabase/public';
import { Skill, SkillCategory } from '@/types/database.types';
import { Cpu, Terminal, Database, Server, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';

export const revalidate = 60;

const CATEGORIES: Record<SkillCategory, { label: string; icon: any; desc: string }> = {
  ML_FOUNDATIONS: {
    label: 'ML Foundations & Mathematics',
    icon: Terminal,
    desc: 'Linear algebra, calculus manifolds, loss optimization, and foundational tensor manipulation.',
  },
  DEEP_LEARNING_LLM: {
    label: 'Deep Learning & LLM Systems',
    icon: Cpu,
    desc: 'Multi-modal transformers, YOLO architectures, late-interaction RAG, and fine-tuning pipelines.',
  },
  SYS_ENGINEERING: {
    label: 'Systems Engineering & Runtimes',
    icon: Server,
    desc: 'Low-latency IPC, concurrent queues, Docker containerization, and microservices.',
  },
  FULL_STACK_APIS: {
    label: 'Full-Stack Delivery & Interfaces',
    icon: Database,
    desc: 'Next.js 15, PostgreSQL, Supabase RLS, and high-density responsive canvas interfaces.',
  },
  HARDWARE_TOOLING: {
    label: 'Hardware & Edge Deployment Tooling',
    icon: Wrench,
    desc: 'ONNX runtime, OpenCV vision acceleration, Linux kernel profiling, and Git CI/CD.',
  },
};

export default async function SkillsPage() {
  let skills: Skill[] = [];

  try {
    const supabase = createPublicClient();
    const { data } = await supabase.from('skills').select('*').order('display_order', { ascending: true });
    if (data && data.length > 0) skills = data as Skill[];
  } catch (e) {}

  const catKeys = Object.keys(CATEGORIES) as SkillCategory[];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between">
      <CosmicNavbar />

      <main className="pt-28 pb-20 relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Sparkles className="h-3 w-3" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Classified Skills Matrix
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Categorized audit of machine learning libraries, deep learning vision models, systems engineering, and hardware acceleration tooling.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {catKeys.map((catKey) => {
            const conf = CATEGORIES[catKey];
            const Icon = conf.icon;
            const catSkills = skills.filter((s) => s.category === catKey);
            if (catSkills.length === 0) return null;

            return (
              <SpotlightCard key={catKey} className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06] mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-white">{conf.label}</h2>
                      <p className="text-xs text-slate-400">{conf.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-purple-300 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 self-start sm:self-auto">
                    {catSkills.length} SKILLS
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catSkills.map((s) => (
                    <div
                      key={s.id || s.name}
                      className="p-4 rounded-xl border border-white/[0.06] bg-black/30 hover:border-purple-500/30 transition-all space-y-2 group"
                    >
                      <div className="flex items-center justify-between text-xs font-medium text-white">
                        <span className="flex items-center gap-2">
                          {s.highlighted && <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />}
                          <span className="group-hover:text-purple-300 transition-colors">{s.name}</span>
                        </span>
                        <span className="font-mono text-slate-400 text-[11px]">{s.proficiency_level}%</span>
                      </div>

                      <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${s.proficiency_level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </main>

      <CosmicFooter profile={{ full_name: 'Belal Ansari', contact_email: 'belalansari000078@gmail.com' } as any} />
    </div>
  );
}
