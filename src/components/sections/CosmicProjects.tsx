'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Sparkles, Target } from 'lucide-react';
import { Project } from '@/types/database.types';
import SpotlightCard from '@/components/ui/SpotlightCard';
import ProjectModal from '@/components/ui/ProjectModal';
import { EnrichedProject, mergeWithEnrichedProjects } from '@/data/projects';
import EdgeAiProjectCard from '@/components/projects/EdgeAiProjectCard';
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

  // Fallback thumbnails with AI/ML visual relevance
  const getProjectImage = (slug: string, idx: number) => {
    if (slug.includes('railway')) {
      return 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80';
    } else if (slug.includes('rag') || slug.includes('multimodal')) {
      return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80';
    } else if (slug.includes('edge') || slug.includes('alert')) {
      return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';
    } else if (slug.includes('spendsmart') || slug.includes('finance')) {
      return 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80';
    } else if (slug.includes('relieflink') || slug.includes('disaster')) {
      return 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80';
    }
    return [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80'
    ][idx % 3];
  };

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
              Click any project card to inspect what exactly it is built for, architecture blueprints, and GitHub repositories.
            </p>
          </div>

          {/* Right Action */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.08] transition-all self-start md:self-end"
          >
            <span>Explore All Projects &amp; RFCs</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {enrichedProjects.slice(0, 4).map((project, idx) => {
            const isEdgeAi = project.slug.includes('edge') || project.slug.includes('alert');

            if (isEdgeAi) {
              return (
                <EdgeAiProjectCard
                  key={project.id || project.slug}
                  project={project}
                  onOpenModal={() => setSelectedProject(project)}
                />
              );
            }

            return (
              <SpotlightCard
                key={project.id || project.slug}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                onClick={() => setSelectedProject(project)}
                className="flex flex-col justify-between group cursor-pointer hover:border-purple-500/40 transition-all"
              >
                <div>
                  {/* Project Image Frame */}
                  <div className="relative h-44 w-full overflow-hidden rounded-t-xl bg-slate-900/60">
                    <img
                      src={getProjectImage(project.slug, idx)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-90" />
                    
                    {/* Status Indicator */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md border border-white/10 bg-black/60 backdrop-blur-md text-[10px] font-mono text-emerald-400">
                      ● {project.status || 'PRODUCTION'}
                    </div>

                    {/* Quick Blueprint Hint on Hover */}
                    <div className="absolute bottom-2 left-3 text-[10px] font-mono text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      <span>Click to view details</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 3).map((tag) => (
                        <span key={tag} className="tech-pill text-[10px]">
                          {tag}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="tech-pill text-[10px] opacity-70">
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                      {project.what_is_it_for || project.tagline || project.architecture_summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer: View Details & Direct GitHub Link */}
                <div className="p-5 pt-0 border-t border-white/[0.06] mt-4 flex items-center justify-between font-mono text-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-sans text-xs font-semibold group/btn"
                  >
                    <span>Inspect Details</span>
                    <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center gap-1">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-white/[0.06] transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}

                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
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
