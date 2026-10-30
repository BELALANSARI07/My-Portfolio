import { Skill, SkillCategory } from '@/types/database.types';
import SectionHeader from '@/components/canvas/SectionHeader';
import { Cpu, Terminal, Database, Server, Wrench } from 'lucide-react';

interface TechMatrixProps {
  skills: Skill[];
}

const CATEGORY_MAP: Record<
  SkillCategory,
  { label: string; icon: React.ComponentType<{ className?: string }>; desc: string }
> = {
  ML_FOUNDATIONS: {
    label: 'ML_FOUNDATIONS',
    icon: Terminal,
    desc: 'Core linear algebra, probability, loss manifolds, and foundational tensors',
  },
  DEEP_LEARNING_LLM: {
    label: 'DEEP_LEARNING_LLM',
    icon: Cpu,
    desc: 'Transformer attention, vision architectures, and multi-modal synthesis',
  },
  SYS_ENGINEERING: {
    label: 'SYS_ENGINEERING',
    icon: Server,
    desc: 'Low-latency IPC, concurrent queues, Docker, and distributed microservices',
  },
  FULL_STACK_APIS: {
    label: 'FULL_STACK_APIS',
    icon: Database,
    desc: 'Next.js 15, PostgreSQL, Supabase RLS, and high-density interface canvases',
  },
  HARDWARE_TOOLING: {
    label: 'HARDWARE_TOOLING',
    icon: Wrench,
    desc: 'ONNX runtime, OpenCV, Linux kernel profiling, and Git CI/CD telemetry',
  },
};

export default function TechMatrix({ skills }: TechMatrixProps) {
  // Group skills by category
  const categories = Object.keys(CATEGORY_MAP) as SkillCategory[];

  return (
    <section id="stack" className="py-16 md:py-24 border-b border-border-subtle relative bg-canvas-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          idCode="03_SYSTEM_CAPABILITIES"
          title="CLASSIFIED TECH MATRIX"
          subtitle="Hardware, model pipelines, distributed runtimes, and engineering tooling"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((catKey) => {
            const config = CATEGORY_MAP[catKey];
            const Icon = config.icon;
            const categorySkills = skills
              .filter((s) => s.category === catKey)
              .sort((a, b) => a.display_order - b.display_order);

            if (categorySkills.length === 0) return null;

            return (
              <div
                key={catKey}
                className="canvas-card p-5 border border-border-subtle bg-canvas-subtle flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-2 font-mono text-xs text-text-muted mb-2 border-b border-border-subtle pb-3">
                    <Icon className="h-4 w-4 text-telemetry-green" />
                    <span className="text-text-primary font-bold uppercase tracking-wider">
                      {config.label}
                    </span>
                  </div>

                  <p className="font-mono text-[11px] text-text-muted mb-4 leading-relaxed">
                    // {config.desc}
                  </p>

                  {/* Skills Telemetry List */}
                  <div className="space-y-3 font-mono text-xs">
                    {categorySkills.map((skill) => {
                      const isCore = skill.highlighted || skill.proficiency_level >= 90;
                      const isApplied = skill.proficiency_level >= 85;
                      const activeSegments = isCore ? 3 : isApplied ? 2 : 1;

                      return (
                        <div key={skill.id} className="space-y-1.5">
                          <div className="flex items-center justify-between text-text-secondary">
                            <span className="flex items-center gap-1.5">
                              {skill.highlighted && (
                                <span className="h-1.5 w-1.5 bg-telemetry-green rounded-full animate-pulse" />
                              )}
                              <span className={skill.highlighted ? "text-text-pure font-medium" : ""}>
                                {skill.name}
                              </span>
                            </span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                              isCore 
                                ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'
                                : isApplied
                                ? 'border-purple-500/30 text-purple-300 bg-purple-500/10'
                                : 'border-slate-700 text-slate-400 bg-slate-800/40'
                            }`}>
                              {isCore ? 'CORE' : isApplied ? 'APPLIED' : 'BASE'}
                            </span>
                          </div>

                          {/* 3-Segment Telemetry Bar */}
                          <div className="flex items-center gap-1">
                            {[1, 2, 3].map((seg) => (
                              <div
                                key={seg}
                                className={`h-1 flex-1 rounded-full ${
                                  seg <= activeSegments
                                    ? isCore
                                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                                      : 'bg-gradient-to-r from-purple-500 to-indigo-400'
                                    : 'bg-white/[0.06]'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-border-subtle flex items-center justify-between font-mono text-[10px] text-text-muted">
                  <span>CAPACITY: VERIFIED</span>
                  <span>COUNT: {categorySkills.length}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
