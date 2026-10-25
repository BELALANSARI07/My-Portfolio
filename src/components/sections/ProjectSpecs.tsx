import { Project } from '@/types/database.types';
import SectionHeader from '@/components/canvas/SectionHeader';
import { ExternalLink, Github, FileText, Activity, Layers, Cpu } from 'lucide-react';

interface ProjectSpecsProps {
  projects: Project[];
}

export default function ProjectSpecs({ projects }: ProjectSpecsProps) {
  return (
    <section id="specs" className="py-16 md:py-24 border-b border-border-subtle relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          idCode="02_PROJECT_SPECS"
          title="ENGINEERING SPECIFICATIONS & RFCS"
          subtitle="Architectural whitepapers, benchmark telemetry, and system implementations"
        />

        <div className="space-y-12">
          {projects.map((project, idx) => {
            const specId = `RFC-${String(idx + 1).padStart(3, '0')}`;
            return (
              <article
                key={project.id}
                className="canvas-card p-6 md:p-8 border border-border-subtle bg-canvas-subtle transition-all duration-200"
              >
                {/* Spec Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-4 mb-6 font-mono text-xs text-text-muted">
                  <div className="flex items-center gap-3">
                    <span className="text-telemetry-green font-semibold">[{specId}]</span>
                    <span className="text-text-primary uppercase tracking-wider">{project.slug}</span>
                    <span className="px-2 py-0.5 border border-border-subtle bg-canvas-surface text-text-secondary text-[11px]">
                      {project.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-pure transition-colors"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>SRC_CODE</span>
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-pure transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>LIVE_RUN</span>
                      </a>
                    )}
                    {project.paper_url && (
                      <a
                        href={project.paper_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-pure transition-colors"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        <span>WHITE_PAPER</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & One-Line Abstract */}
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-text-pure font-mono mb-2">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary font-mono text-xs sm:text-sm">
                    {project.tagline}
                  </p>
                </div>

                {/* Grid Layout: Architecture & Telemetry */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-6">
                  {/* Architecture Narrative */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="border border-border-subtle bg-canvas-black p-4 font-mono text-xs">
                      <div className="text-text-muted mb-2 flex items-center gap-2">
                        <Layers className="h-3.5 w-3.5 text-telemetry-green" />
                        <span>// ARCHITECTURAL DESIGN & INFERENCE PIPELINE</span>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {project.architecture_summary}
                      </p>
                    </div>

                    {/* Stack Matrix Tags */}
                    <div>
                      <div className="font-mono text-xs text-text-muted mb-2 flex items-center gap-2">
                        <Cpu className="h-3.5 w-3.5 text-text-muted" />
                        <span>SYSTEM_STACK:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="tech-tag"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Architecture Diagram & Benchmark Metrics */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* ASCII / Schematic Flow Box */}
                    {project.architecture_diagram && (
                      <div className="border border-border-subtle bg-canvas-black p-3.5 font-mono text-[11px] overflow-x-auto text-text-muted">
                        <div className="text-text-secondary font-semibold mb-2 flex items-center justify-between">
                          <span>SYSTEM_TOPOLOGY_MAP</span>
                          <span className="text-[10px] text-text-muted">DATA-FLOW</span>
                        </div>
                        <pre className="text-text-secondary leading-tight select-all">
                          {project.architecture_diagram}
                        </pre>
                      </div>
                    )}

                    {/* Benchmark Metrics Grid */}
                    {project.metrics && Array.isArray(project.metrics) && project.metrics.length > 0 && (
                      <div className="border border-border-subtle bg-canvas-surface p-4 font-mono text-xs">
                        <div className="text-text-muted mb-3 flex items-center gap-2">
                          <Activity className="h-3.5 w-3.5 text-telemetry-green" />
                          <span>BENCHMARK_TELEMETRY</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {project.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="border border-border-subtle bg-canvas-subtle p-2.5">
                              <div className="text-[10px] text-text-muted uppercase truncate mb-1">
                                {m.label}
                              </div>
                              <div className="text-base font-bold text-text-pure">
                                {m.value}
                              </div>
                              {m.delta && (
                                <div className="text-[10px] text-telemetry-green mt-0.5">
                                  {m.delta}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
