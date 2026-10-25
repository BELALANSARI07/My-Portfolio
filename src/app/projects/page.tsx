'use client';

import { useState, useEffect } from 'react';
import CosmicNavbar from '@/components/navbar/CosmicNavbar';
import CosmicFooter from '@/components/sections/CosmicFooter';
import SpotlightCard from '@/components/ui/SpotlightCard';
import ProjectModal from '@/components/ui/ProjectModal';
import { Project } from '@/types/database.types';
import { Sparkles, Search, ExternalLink, Github, Target, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { EnrichedProject, PORTFOLIO_PROJECTS } from '@/data/projects';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<EnrichedProject[]>(PORTFOLIO_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<EnrichedProject | null>(null);
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null);

  const fetchSyncedProjects = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects);
          setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          return;
        }
      }
    } catch (e) {
      console.warn('Project auto-sync fallback:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchSyncedProjects();
  }, []);

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
    if (filter === 'GITHUB') return Boolean(p.repo_url && p.repo_url.includes('github.com'));
    return true;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between">
      <CosmicNavbar />

      <main className="pt-28 pb-20 relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Page Header */}
        <div className="mb-10 pb-6 border-b border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
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

          {/* GitHub Auto-Sync Telemetry Badge */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            <div className="flex items-center justify-center gap-2 px-3.5 py-2 sm:py-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>GitHub Auto-Sync Live</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">@BELALANSARI07</span>
            </div>

            <button
              onClick={fetchSyncedProjects}
              disabled={isSyncing}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-xl border border-white/[0.1] bg-white/[0.04] text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all disabled:opacity-50"
              title="Refresh project list from GitHub"
            >
              <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin text-purple-400' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync GitHub'}</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {[
              { id: 'ALL', label: 'All Projects' },
              { id: 'VISION', label: 'Computer Vision' },
              { id: 'RAG_LLM', label: 'Generative AI & RAG' },
              { id: 'EDGE', label: 'Edge & Embedded' },
              { id: 'GITHUB', label: 'GitHub Repositories' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
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
              className="w-full rounded-xl border border-white/[0.08] bg-[#0b0f19] pl-9 pr-4 py-2.5 sm:py-2 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <SpotlightCard
              key={project.id || project.slug}
              onClick={() => setSelectedProject(project)}
              className="flex flex-col justify-between group cursor-pointer hover:border-purple-500/40 transition-all p-5 sm:p-6 rounded-2xl bg-[#0b0f19]/80 border border-white/[0.08]"
            >
              <div className="space-y-4">
                {/* Top Bar: Status Badge and Category */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>● {project.status || 'PRODUCTION'}</span>
                  </span>

                  <span className="hidden sm:inline-block font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                    {project.repo_url ? 'GITHUB REPO' : 'SYSTEM ARCHITECTURE'}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stack.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[11px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="px-2 py-1 rounded-lg border border-white/[0.04] bg-white/[0.02] text-[11px] font-mono text-slate-500">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                {/* What It Is Built For */}
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-purple-400 font-mono text-[10px] font-semibold uppercase tracking-wider">
                    <Target className="h-3 w-3" />
                    <span>What It Is Built For</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                    {project.what_is_it_for || project.architecture_summary}
                  </p>
                </div>

                {/* Benchmark Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                    {project.metrics.slice(0, 2).map((m: any, mIdx: number) => (
                      <div key={mIdx} className="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                        <div className="text-[10px] text-slate-500 uppercase truncate">{m.label}</div>
                        <div className="text-xs font-bold text-purple-300 truncate">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-white/[0.06] mt-5 flex flex-wrap items-center justify-between gap-2.5 font-mono text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-sans text-xs font-semibold group/btn"
                >
                  <span>Inspect Blueprint</span>
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
                      title="Live Demo"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span className="font-sans text-[11px]">Demo</span>
                    </a>
                  )}

                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all text-xs"
                      title="GitHub Repository"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span className="font-sans text-[11px]">Code</span>
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
