'use client';

import { useState, useEffect } from 'react';
import CosmicNavbar from '@/components/navbar/CosmicNavbar';
import CosmicFooter from '@/components/sections/CosmicFooter';
import SpotlightCard from '@/components/ui/SpotlightCard';
import ProjectModal from '@/components/ui/ProjectModal';
import { Project } from '@/types/database.types';
import { Sparkles, Search, ExternalLink, Github, Target, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { EnrichedProject, PORTFOLIO_PROJECTS, mergeWithEnrichedProjects } from '@/data/projects';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<EnrichedProject[]>(PORTFOLIO_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<EnrichedProject | null>(null);
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });
        if (data && data.length > 0) {
          setProjects(mergeWithEnrichedProjects(data as Project[]));
        }
      } catch (e) {
        // Graceful fallback to rich local projects
        setProjects(PORTFOLIO_PROJECTS);
      }
    }
    load();
  }, []);

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
    } else if (slug.includes('eduresearch') || slug.includes('agent')) {
      return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
    }
    return [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80'
    ][idx % 3];
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.what_is_it_for.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (filter === 'ALL') return true;
    if (filter === 'VISION') return p.stack.some(s => s.toLowerCase().includes('yolo') || s.toLowerCase().includes('opencv') || s.toLowerCase().includes('vision'));
    if (filter === 'RAG_LLM') return p.stack.some(s => s.toLowerCase().includes('rag') || s.toLowerCase().includes('transform') || s.toLowerCase().includes('langchain') || s.toLowerCase().includes('gemini'));
    if (filter === 'EDGE') return p.stack.some(s => s.toLowerCase().includes('edge') || s.toLowerCase().includes('tensorrt') || s.toLowerCase().includes('esp32') || s.toLowerCase().includes('c++'));
    return true;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between">
      <CosmicNavbar />

      <main className="pt-28 pb-20 relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Page Header */}
        <div className="mb-10 pb-6 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Sparkles className="h-3 w-3" />
            <span>PORTFOLIO SPECIFICATIONS &amp; BLUEPRINTS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering Projects &amp; Systems
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Applied Computer Vision, Multi-Modal RAG architectures, low-latency edge inference, and intelligent autonomous agents. Click any project to inspect its architectural purpose and telemetry.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {[
              { id: 'ALL', label: 'All Projects' },
              { id: 'VISION', label: 'Computer Vision' },
              { id: 'RAG_LLM', label: 'Generative AI & RAG' },
              { id: 'EDGE', label: 'Edge & Embedded' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md shadow-purple-500/20'
                    : 'border border-white/[0.08] bg-[#0b0f19] text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, mission, or specs..."
              className="w-full rounded-xl border border-white/[0.08] bg-[#0b0f19] pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <SpotlightCard
              key={project.id || project.slug}
              onClick={() => setSelectedProject(project)}
              className="flex flex-col justify-between group cursor-pointer hover:border-purple-500/40 transition-all"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-slate-900">
                  <img
                    src={getProjectImage(project.slug, idx)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md border border-white/10 bg-black/60 backdrop-blur-md text-[10px] font-mono text-emerald-400">
                    ● {project.status || 'PRODUCTION'}
                  </div>

                  {/* Hover Prompt */}
                  <div className="absolute bottom-2 left-3 text-[10px] font-mono text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    <span>Click to view what it's for</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((t) => (
                      <span key={t} className="tech-pill text-[10px]">
                        {t}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="tech-pill text-[10px] opacity-70">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {project.what_is_it_for || project.tagline}
                  </p>

                  {/* Benchmark Metrics */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="pt-2 border-t border-white/[0.06] grid grid-cols-2 gap-2 font-mono">
                      {project.metrics.slice(0, 2).map((m: any, mIdx: number) => (
                        <div key={mIdx} className="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                          <div className="text-[10px] text-slate-500 uppercase truncate">{m.label}</div>
                          <div className="text-xs font-bold text-purple-300">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-xs font-semibold"
                >
                  <span>Inspect Blueprint</span>
                  <ArrowRight className="h-3 w-3" />
                </button>

                <div className="flex items-center gap-1.5">
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
                      title="GitHub Repository"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </main>

      {/* Interactive Project Blueprint Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CosmicFooter profile={{ full_name: 'Belal Ansari', contact_email: 'belalansari000078@gmail.com' } as any} />
    </div>
  );
}
