import CosmicNavbar from '@/components/navbar/CosmicNavbar';
import CosmicFooter from '@/components/sections/CosmicFooter';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { createPublicClient } from '@/lib/supabase/public';
import { Skill, SkillCategory } from '@/types/database.types';
import { Cpu, Terminal, Database, Server, Wrench, Sparkles, CheckCircle2, Layers } from 'lucide-react';

export const revalidate = 60;

const CATEGORIES: Record<SkillCategory, { label: string; icon: any; desc: string }> = {
  ML_FOUNDATIONS: {
    label: 'ML Foundations & Mathematics',
    icon: Terminal,
    desc: 'Linear algebra, matrix operations, tensor calculus, loss optimization, and NumPy acceleration.',
  },
  DEEP_LEARNING_LLM: {
    label: 'Deep Learning & LLM Systems',
    icon: Cpu,
    desc: 'Multi-modal transformers, YOLO visual detection, late-interaction RAG, and vector similarity engines.',
  },
  SYS_ENGINEERING: {
    label: 'Systems Engineering & Runtimes',
    icon: Server,
    desc: 'Asynchronous FastAPI, RESTful services, Docker containerization, PostgreSQL, and high-concurrency pipelines.',
  },
  FULL_STACK_APIS: {
    label: 'Full-Stack Delivery & Interfaces',
    icon: Database,
    desc: 'Next.js 15, TypeScript, Tailwind CSS, Supabase SSR, and responsive cosmic canvas design systems.',
  },
  HARDWARE_TOOLING: {
    label: 'Hardware & Edge Deployment Tooling',
    icon: Wrench,
    desc: 'ESP32 microcontroller integration, OpenCV video streams, ultrasonic sensors, ONNX runtime, and Git CI/CD.',
  },
};

const DEFAULT_SKILLS: Skill[] = [
  { id: '1', name: 'Python', category: 'ML_FOUNDATIONS', proficiency_level: 95, years_experience: 3.0, highlighted: true, display_order: 1, created_at: '' },
  { id: '2', name: 'C++', category: 'SYS_ENGINEERING', proficiency_level: 82, years_experience: 2.0, highlighted: false, display_order: 2, created_at: '' },
  { id: '3', name: 'PyTorch', category: 'ML_FOUNDATIONS', proficiency_level: 90, years_experience: 2.5, highlighted: true, display_order: 3, created_at: '' },
  { id: '4', name: 'OpenCV', category: 'HARDWARE_TOOLING', proficiency_level: 92, years_experience: 2.5, highlighted: true, display_order: 4, created_at: '' },
  { id: '5', name: 'Ultralytics YOLO', category: 'DEEP_LEARNING_LLM', proficiency_level: 94, years_experience: 2.5, highlighted: true, display_order: 5, created_at: '' },
  { id: '6', name: 'FAISS Vector Indexing', category: 'DEEP_LEARNING_LLM', proficiency_level: 86, years_experience: 1.5, highlighted: false, display_order: 6, created_at: '' },
  { id: '7', name: 'Sentence Transformers', category: 'DEEP_LEARNING_LLM', proficiency_level: 88, years_experience: 2.0, highlighted: true, display_order: 7, created_at: '' },
  { id: '8', name: 'Semantic Search & RAG', category: 'DEEP_LEARNING_LLM', proficiency_level: 92, years_experience: 2.0, highlighted: true, display_order: 8, created_at: '' },
  { id: '9', name: 'FastAPI', category: 'SYS_ENGINEERING', proficiency_level: 90, years_experience: 2.0, highlighted: true, display_order: 9, created_at: '' },
  { id: '10', name: 'Docker', category: 'SYS_ENGINEERING', proficiency_level: 82, years_experience: 1.5, highlighted: false, display_order: 10, created_at: '' },
  { id: '11', name: 'Next.js & React', category: 'FULL_STACK_APIS', proficiency_level: 88, years_experience: 2.0, highlighted: true, display_order: 11, created_at: '' },
  { id: '12', name: 'Tailwind CSS', category: 'FULL_STACK_APIS', proficiency_level: 90, years_experience: 2.0, highlighted: false, display_order: 12, created_at: '' },
  { id: '13', name: 'PostgreSQL & Supabase', category: 'SYS_ENGINEERING', proficiency_level: 86, years_experience: 2.0, highlighted: true, display_order: 13, created_at: '' },
  { id: '14', name: 'Git & GitHub', category: 'HARDWARE_TOOLING', proficiency_level: 92, years_experience: 3.0, highlighted: false, display_order: 14, created_at: '' },
  { id: '15', name: 'ONNX Runtime', category: 'HARDWARE_TOOLING', proficiency_level: 84, years_experience: 1.5, highlighted: false, display_order: 15, created_at: '' },
  { id: '16', name: 'ESP32 & Sensors', category: 'HARDWARE_TOOLING', proficiency_level: 90, years_experience: 2.0, highlighted: true, display_order: 16, created_at: '' },
  { id: '17', name: 'TypeScript', category: 'FULL_STACK_APIS', proficiency_level: 88, years_experience: 2.0, highlighted: true, display_order: 17, created_at: '' },
  { id: '18', name: 'ChromaDB', category: 'DEEP_LEARNING_LLM', proficiency_level: 88, years_experience: 1.5, highlighted: false, display_order: 18, created_at: '' },
  { id: '19', name: 'PyMuPDF', category: 'DEEP_LEARNING_LLM', proficiency_level: 86, years_experience: 1.5, highlighted: false, display_order: 19, created_at: '' },
];

function getSkillTier(skill: Skill) {
  if (skill.highlighted || skill.proficiency_level >= 90) {
    return {
      label: 'CORE PRODUCTION',
      badgeClass: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      activeSegments: 3,
      desc: 'Daily Driver · Production Pipeline',
    };
  }
  if (skill.proficiency_level >= 85) {
    return {
      label: 'APPLIED SYSTEM',
      badgeClass: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
      activeSegments: 2,
      desc: 'Architecture & System Integration',
    };
  }
  return {
    label: 'FOUNDATIONAL',
    badgeClass: 'text-slate-400 border-slate-700 bg-slate-800/60',
    activeSegments: 1,
    desc: 'Core Concepts & Academic Base',
  };
}

export default async function SkillsPage() {
  let skills: Skill[] = DEFAULT_SKILLS;

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
            <span>TECHNICAL CAPABILITIES MATRIX</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Classified Skills &amp; Stack
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Authentic, tiered audit of machine learning libraries, computer vision architectures, systems runtimes, and hardware acceleration tooling.
          </p>

          {/* Proficiency Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="text-slate-500">STANDARDS:</span>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Core Production (Daily Driver)</span>
            </div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border border-purple-500/20 bg-purple-500/5 text-purple-300">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              <span>Applied System (Active Projects)</span>
            </div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800/40 text-slate-400">
              <span className="h-2 w-2 rounded-full bg-slate-500" />
              <span>Foundational (Academic Base)</span>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {catKeys.map((catKey) => {
            const conf = CATEGORIES[catKey];
            const Icon = conf.icon;
            const catSkills = skills.filter((s) => s.category === catKey);
            if (catSkills.length === 0) return null;

            return (
              <SpotlightCard key={catKey} className="p-5 sm:p-8">
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
                    {catSkills.length} VERIFIED TOOLS
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catSkills.map((s) => {
                    const tier = getSkillTier(s);
                    return (
                      <div
                        key={s.id || s.name}
                        className="p-4 rounded-xl border border-white/[0.08] bg-black/40 hover:border-purple-500/40 hover:bg-white/[0.02] transition-all space-y-3 group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            {s.highlighted ? (
                              <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                            ) : (
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
                            )}
                            <span className="font-semibold text-sm text-white group-hover:text-purple-300 transition-colors truncate">
                              {s.name}
                            </span>
                          </div>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border shrink-0 ${tier.badgeClass}`}>
                            {tier.label}
                          </span>
                        </div>

                        {/* 3-Segment Telemetry Matrix */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3].map((seg) => (
                              <div
                                key={seg}
                                className={`h-1.5 flex-1 rounded-full transition-all ${
                                  seg <= tier.activeSegments
                                    ? tier.activeSegments === 3
                                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                                      : 'bg-gradient-to-r from-purple-500 to-indigo-400'
                                    : 'bg-white/[0.06]'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                            <span>{tier.desc}</span>
                            <span>{s.years_experience ? `${s.years_experience} yrs` : 'Active'}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
