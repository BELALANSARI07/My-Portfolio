'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Sparkles, Layers, Target } from 'lucide-react';
import { Project } from '@/types/database.types';
import SpotlightCard from '@/components/ui/SpotlightCard';
import ProjectModal from '@/components/ui/ProjectModal';
import { EnrichedProject, mergeWithEnrichedProjects } from '@/data/projects';
import Link from 'next/link';

interface CosmicProjectsProps {
  projects: (Project | EnrichedProject)[];
}

export default function CosmicProjects({ projects }: CosmicProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<EnrichedProject | null>(null);

  // Use projects directly if already enriched, otherwise merge
  const enrichedProjects = (projects && projects.length > 0 && (projects[0] as EnrichedProject).what_is_it_for)
    ? (projects as EnrichedProject[])
    : mergeWithEnrichedProjects(projects as Project[]);

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 font-mono text-[11px] uppercase tracking-wider mb-2">
              <Sparkles className="h-3 w-3" />
              <span>FEATURED PORTFOLIO PROJECTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Applied AI/ML Systems
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Real-world engineering systems built by Belal Ansari. Click any card to inspect architectural specifications, telemetry, and source code.
            </p>
          </div>

          {/* Right Action */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.08] transition-all self-start md:self-end"
          >
            <span>Explore All Projects &amp; Repos</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Projects Cards Grid (Clean, picture-free, authentic specs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrichedProjects.slice(0, 4).map((project, idx) => (
            <SpotlightCard
              key={project.id || project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="flex flex-col justify-between group cursor-pointer hover:border-purple-500/40 transition-all p-6 sm:p-7 rounded-2xl bg-[#0b0f19]/80 border border-white/[0.08]"
            >
              <div className="space-y-4">
                {/* Top Bar: Status Badge and Category */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>● {project.status || 'PRODUCTION'}</span>
                  </span>

                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                    {project.repo_url ? 'GITHUB REPO' : 'SYSTEM ARCHITECTURE'}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-lg sm:text-xl text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stack.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[11px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.stack.length > 5 && (
                    <span className="px-2 py-1 rounded-lg border border-white/[0.04] bg-white/[0.02] text-[11px] font-mono text-slate-500">
                      +{project.stack.length - 5}
                    </span>
                  )}
                </div>

                {/* What is it for / Mission statement */}
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-purple-400 font-mono text-[10px] font-semibold uppercase tracking-wider">
                    <Target className="h-3 w-3" />
                    <span>What It Is Built For</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                    {project.what_is_it_for || project.architecture_summary}
                  </p>
                </div>

                {/* Real Benchmark Metrics (if available) */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-mono">
                    {project.metrics.slice(0, 3).map((m: any, mIdx: number) => (
                      <div key={mIdx} className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                        <div className="text-[10px] text-slate-500 uppercase truncate">{m.label}</div>
                        <div className="text-xs sm:text-sm font-bold text-purple-300 truncate">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: View Details & Direct Links */}
              <div className="pt-5 border-t border-white/[0.06] mt-6 flex items-center justify-between font-mono text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-sans text-xs font-semibold group/btn"
                >
                  <span>Inspect Details</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-1.5">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10 border border-white/[0.08] hover:border-emerald-500/30 transition-all text-xs"
                      title="Open Live Application"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span className="font-sans text-[11px]">Live Demo</span>
                    </a>
                  )}

                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all text-xs"
                      title="View GitHub Repository"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span className="font-sans text-[11px]">GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Interactive Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
}
