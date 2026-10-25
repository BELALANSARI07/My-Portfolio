'use client';

import { motion } from 'framer-motion';
import { 
  Code2, 
  GraduationCap, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  Bot, 
  Globe2, 
  Terminal, 
  Boxes,
  Users
} from 'lucide-react';
import { Skill, LeadershipHackathon } from '@/types/database.types';
import SpotlightCard from '@/components/ui/SpotlightCard';

interface CosmicMatrixProps {
  skills: Skill[];
  records: LeadershipHackathon[];
}

export default function CosmicMatrix({ skills, records }: CosmicMatrixProps) {
  const interests = [
    { label: 'Generative AI & LLM Systems', icon: Sparkles, color: 'text-purple-400' },
    { label: 'Computer Vision & YOLO Architectures', icon: Eye, color: 'text-blue-400' },
    { label: 'AI Agents & Multi-Agent Systems', icon: Bot, color: 'text-cyan-400' },
    { label: 'Open Source Contribution', icon: Globe2, color: 'text-emerald-400' },
    { label: 'Competitive Programming (ICPC)', icon: Terminal, color: 'text-amber-400' },
    { label: 'Real-world AI Applications', icon: Boxes, color: 'text-pink-400' },
  ];

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Technical Skills (lg:col-span-5) */}
          <SpotlightCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-6 text-white font-bold text-base">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Code2 className="h-4 w-4" />
                </div>
                <span>Technical Skills</span>
              </div>

              {/* Skills Interactive Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {skills.map((skill) => (
                  <span
                    key={skill.id || skill.name}
                    className="tech-pill text-xs font-mono py-1.5 px-3 hover:scale-105 active:scale-95"
                  >
                    {skill.highlighted && (
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                    )}
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>View Applied Projects</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </SpotlightCard>

          {/* Column 2: Education & Leadership (lg:col-span-4) */}
          <SpotlightCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-4 p-6 sm:p-7 space-y-6"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span>Education &amp; Leadership</span>
            </div>

            <div className="space-y-6">
              {/* Degree */}
              <div className="relative pl-6 border-l border-white/[0.1] space-y-1">
                <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <h4 className="font-semibold text-sm text-white">
                  B.Tech – Computer Science &amp; Engineering (AI/ML)
                </h4>
                <div className="text-xs text-purple-300">
                  Noida International University
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  2025 – 2029 • CGPA: 8.66
                </div>
              </div>

              {/* Leadership Role */}
              <div className="relative pl-6 border-l border-white/[0.1] space-y-1">
                <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                <div className="flex items-center gap-1.5 font-semibold text-sm text-white">
                  <Users className="h-3.5 w-3.5 text-blue-400" />
                  <span>Vice President, Gen AI Club</span>
                </div>
                <div className="text-xs text-blue-300">
                  Noida International University
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Organizing hands-on workshops, hackathons, and building an active student AI engineering community.
                </p>
              </div>

              {/* Hackathon Achievement */}
              {records.length > 0 && (
                <div className="relative pl-6 border-l border-white/[0.1] space-y-1">
                  <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <div className="font-semibold text-sm text-white">
                    {records[0].role_or_award}
                  </div>
                  <div className="text-xs text-emerald-400">
                    {records[0].title} ({records[0].date_str})
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {records[0].summary}
                  </p>
                </div>
              )}
            </div>
          </SpotlightCard>

          {/* Column 3: Interests (lg:col-span-3) */}
          <SpotlightCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 p-6 sm:p-7 space-y-6"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Zap className="h-4 w-4" />
              </div>
              <span>Interests</span>
            </div>

            <div className="space-y-3.5">
              {interests.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 text-xs text-slate-300 font-sans hover:text-white transition-colors group cursor-default"
                  >
                    <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] group-hover:border-purple-500/40 group-hover:scale-110 transition-all">
                      <Icon className={`h-3.5 w-3.5 ${item.color}`} />
                    </div>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
}
