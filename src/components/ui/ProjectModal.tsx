'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Github, 
  ExternalLink, 
  Cpu, 
  Target, 
  Layers, 
  Activity, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { EnrichedProject } from '@/data/projects';

interface ProjectModalProps {
  project: EnrichedProject | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/[0.12] bg-[#0b0f19] p-6 sm:p-8 shadow-2xl backdrop-blur-2xl max-h-[90vh] overflow-y-auto text-left"
        >
          {/* Top Bar: Status, Category, Close */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[11px] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{project.status || 'PRODUCTION'}</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider px-2 py-0.5 rounded-md border border-white/[0.06] bg-white/[0.02]">
                PROJECT BLUEPRINT
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              title="Close (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Project Title & Tagline */}
          <div className="space-y-2 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* WHAT EXACTLY IS THIS FOR? (Mission & Problem Statement) */}
          <div className="mb-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/20 via-indigo-950/15 to-[#0b0f19] p-5 sm:p-6 relative overflow-hidden">
            <div className="flex items-center gap-2.5 text-purple-300 font-bold text-xs uppercase tracking-wider font-mono mb-2.5">
              <Target className="h-4 w-4 text-purple-400" />
              <span>What Exactly Is This For?</span>
            </div>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              {project.what_is_it_for}
            </p>
          </div>

          {/* ARCHITECTURE & SYSTEM DESIGN */}
          <div className="mb-6 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs uppercase tracking-wider font-mono">
              <Layers className="h-4 w-4 text-blue-400" />
              <span>Architecture &amp; Engineering Specs</span>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-[#030712]/70 p-4 sm:p-5 text-slate-300 text-xs sm:text-sm leading-relaxed">
              {project.architecture_summary}
            </div>
          </div>

          {/* TELEMETRY BENCHMARKS */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-6 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs uppercase tracking-wider font-mono">
                <Activity className="h-4 w-4 text-emerald-400" />
                <span>Performance Benchmarks &amp; Telemetry</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-white/[0.06] bg-black/40 font-mono">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider truncate mb-1">
                      {m.label}
                    </div>
                    <div className="text-base sm:text-lg font-black text-purple-300">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TECH STACK PILLS */}
          <div className="mb-8 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs uppercase tracking-wider font-mono">
              <Cpu className="h-4 w-4 text-amber-400" />
              <span>Technology Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-xl border border-white/[0.1] bg-white/[0.04] text-xs font-mono text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* MODAL ACTION BUTTONS */}
          <div className="pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Github className="h-4 w-4" />
                  <span>Inspect GitHub Repository</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
                </a>
              )}

              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-[#0b0f19] px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/[0.06] hover:border-purple-500/40 transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open Live Demo</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white font-mono transition-colors"
            >
              Close Blueprint ✕
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
