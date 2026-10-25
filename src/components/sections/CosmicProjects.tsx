'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { Project } from '@/types/database.types';
import SpotlightCard from '@/components/ui/SpotlightCard';

interface CosmicProjectsProps {
  projects: Project[];
}

export default function CosmicProjects({ projects }: CosmicProjectsProps) {
  const [scrollIdx, setScrollIdx] = useState(0);

  // Fallback thumbnails with AI/ML visual relevance if none in database
  const getProjectImage = (slug: string, idx: number) => {
    if (slug.includes('railway')) {
      return 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80';
    } else if (slug.includes('rag') || slug.includes('multimodal')) {
      return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80';
    } else if (slug.includes('edge') || slug.includes('alert')) {
      return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';
    } else if (slug.includes('safebite') || slug.includes('food')) {
      return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
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
              <span>FEATURED PROJECTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Projects
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              A few projects I've worked on, combining AI/ML with real-world applications.
            </p>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setScrollIdx((prev) => Math.max(0, prev - 1))}
                className="p-2 rounded-xl border border-white/[0.08] bg-[#0b0f19] text-slate-400 hover:text-white hover:border-purple-500/40 transition-colors"
                title="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setScrollIdx((prev) => prev + 1)}
                className="p-2 rounded-xl border border-white/[0.08] bg-[#0b0f19] text-slate-400 hover:text-white hover:border-purple-500/40 transition-colors"
                title="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <a
              href="https://github.com/BELALANSARI07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.08] transition-all"
            >
              <span>View All Projects</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, idx) => (
            <SpotlightCard
              key={project.id || project.slug}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="flex flex-col justify-between group"
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
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Tech Pills */}
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
                    {project.tagline || project.architecture_summary}
                  </p>
                </div>
              </div>

              {/* Card Footer Links */}
              <div className="p-5 pt-0 border-t border-white/[0.06] mt-4 flex items-center justify-between font-mono text-xs">
                {project.live_url ? (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-sans text-xs font-semibold group/link"
                  >
                    <span>View Project</span>
                    <ArrowRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                ) : (
                  <a
                    href={project.repo_url || `https://github.com/BELALANSARI07/${project.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-sans text-xs font-semibold group/link"
                  >
                    <span>View Project</span>
                    <ArrowRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                )}

                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                    title="Source Code"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}
