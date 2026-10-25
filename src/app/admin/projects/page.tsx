'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Project } from '@/types/database.types';
import { Plus, Edit2, Trash2, Check, X, Layers, Activity } from 'lucide-react';

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const supabase = createClient();

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setProjects(data as Project[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.slug) return;

    setStatusMsg('SAVING SPECIFICATION TO DATABASE...');

    const payload = {
      ...editingProject,
      updated_at: new Date().toISOString(),
    };

    if (isNew) {
      const { error } = await supabase.from('projects').insert([payload]);
      if (error) {
        setStatusMsg(`ERR: ${error.message}`);
        return;
      }
    } else {
      const { error } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', editingProject.id);
      if (error) {
        setStatusMsg(`ERR: ${error.message}`);
        return;
      }
    }

    setStatusMsg('SPECIFICATION COMMITTED.');
    setEditingProject(null);
    setIsNew(false);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('CONFIRM DELETION: Remove this project spec from public canvas?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) {
      fetchProjects();
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h1 className="text-xl font-bold text-text-pure flex items-center gap-2">
            <Layers className="h-5 w-5 text-telemetry-green" />
            <span>PROJECT SPECS & RFCS MANAGER</span>
          </h1>
          <p className="text-text-muted text-[11px]">
            Manage technical project whitepapers, architecture diagrams, and benchmark metrics.
          </p>
        </div>

        <button
          onClick={() => {
            setIsNew(true);
            setEditingProject({
              title: '',
              slug: '',
              tagline: '',
              architecture_summary: '',
              architecture_diagram: '',
              stack: ['Python', 'PyTorch'],
              metrics: [{ label: 'Latency', value: '12ms', delta: '-30%' }],
              status: 'PRODUCTION',
              featured: true,
              display_order: projects.length + 1,
            });
          }}
          className="flex items-center gap-1.5 px-3 py-2 border border-border-active bg-canvas-surface hover:bg-canvas-card text-text-pure text-xs font-bold transition-all"
        >
          <Plus className="h-3.5 w-3.5 text-telemetry-green" />
          <span>[ ADD NEW RFC SPEC ]</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-3 border border-border-active bg-canvas-subtle text-telemetry-green text-xs font-mono">
          {statusMsg}
        </div>
      )}

      {/* Editing Modal / Drawer */}
      {editingProject && (
        <form
          onSubmit={handleSave}
          className="canvas-card p-6 border border-border-active bg-canvas-subtle font-mono text-xs space-y-4 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-border-subtle pb-3 text-text-muted">
            <span className="font-bold text-text-pure">
              {isNew ? 'INITIALIZE NEW SPECIFICATION' : `EDIT SPEC: ${editingProject.slug}`}
            </span>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="hover:text-text-pure"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-text-muted text-[11px] block mb-1">PROJECT TITLE *</label>
              <input
                type="text"
                required
                value={editingProject.title || ''}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
              />
            </div>

            <div>
              <label className="text-text-muted text-[11px] block mb-1">SLUG (URL KEY) *</label>
              <input
                type="text"
                required
                value={editingProject.slug || ''}
                onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-text-muted text-[11px] block mb-1">TAGLINE / ABSTRACT *</label>
              <input
                type="text"
                required
                value={editingProject.tagline || ''}
                onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-text-muted text-[11px] block mb-1">ARCHITECTURE SUMMARY *</label>
              <textarea
                rows={3}
                required
                value={editingProject.architecture_summary || ''}
                onChange={(e) => setEditingProject({ ...editingProject, architecture_summary: e.target.value })}
                className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-text-muted text-[11px] block mb-1">ASCII / TOPOLOGY SCHEMATIC</label>
              <textarea
                rows={4}
                value={editingProject.architecture_diagram || ''}
                onChange={(e) => setEditingProject({ ...editingProject, architecture_diagram: e.target.value })}
                className="w-full bg-canvas-black border border-border-subtle p-2 text-text-secondary font-mono text-[11px] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-text-muted text-[11px] block mb-1">STACK (COMMA SEPARATED)</label>
              <input
                type="text"
                value={editingProject.stack?.join(', ') || ''}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    stack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
              />
            </div>

            <div>
              <label className="text-text-muted text-[11px] block mb-1">STATUS</label>
              <select
                value={editingProject.status || 'PRODUCTION'}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    status: e.target.value as any,
                  })
                }
                className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
              >
                <option value="PRODUCTION">PRODUCTION</option>
                <option value="RESEARCH">RESEARCH</option>
                <option value="EXPERIMENT">EXPERIMENT</option>
              </select>
            </div>

            <div>
              <label className="text-text-muted text-[11px] block mb-1">GITHUB REPO URL</label>
              <input
                type="url"
                value={editingProject.repo_url || ''}
                onChange={(e) => setEditingProject({ ...editingProject, repo_url: e.target.value })}
                className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
              />
            </div>

            <div>
              <label className="text-text-muted text-[11px] block mb-1">LIVE RUN URL</label>
              <input
                type="url"
                value={editingProject.live_url || ''}
                onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
              />
            </div>

            {/* EDGE AI REAL-TIME TELEMETRY & SPECS CONTROLS */}
            <div className="md:col-span-2 border-t border-border-subtle pt-4 mt-2">
              <div className="flex items-center gap-2 mb-3 text-telemetry-green font-bold">
                <Activity className="h-4 w-4" />
                <span>DYNAMIC EDGE TELEMETRY &amp; HARDWARE METRICS</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-text-muted text-[10px] block mb-1">INFERENCE LATENCY (ms)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingProject.latency_ms ?? 14.5}
                    onChange={(e) => setEditingProject({ ...editingProject, latency_ms: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-text-muted text-[10px] block mb-1">ACCURACY (% mAP@0.5)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingProject.accuracy_pct ?? 84.6}
                    onChange={(e) => setEditingProject({ ...editingProject, accuracy_pct: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-text-muted text-[10px] block mb-1">POWER DRAW (WATTS)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingProject.power_draw_w ?? 7.5}
                    onChange={(e) => setEditingProject({ ...editingProject, power_draw_w: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="mockStreamActive"
                  checked={editingProject.mock_stream_active ?? true}
                  onChange={(e) => setEditingProject({ ...editingProject, mock_stream_active: e.target.checked })}
                  className="rounded border-border-subtle bg-canvas-black text-telemetry-green"
                />
                <label htmlFor="mockStreamActive" className="text-text-muted text-[11px] cursor-pointer">
                  MOCK STREAM &amp; LIVE INFERENCE HUD ACTIVE
                </label>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-text-muted text-[10px] block mb-1">ALERT THRESHOLDS (JSON)</label>
                  <textarea
                    rows={4}
                    value={
                      typeof editingProject.alert_thresholds === 'object'
                        ? JSON.stringify(editingProject.alert_thresholds, null, 2)
                        : editingProject.alert_thresholds || ''
                    }
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        setEditingProject({ ...editingProject, alert_thresholds: parsed });
                      } catch {
                        // Allow typing
                      }
                    }}
                    className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure font-mono text-[11px] focus:outline-none"
                    placeholder='{"confidence": 0.85, "iou": 0.45, "cooldown_s": 2}'
                  />
                </div>

                <div>
                  <label className="text-text-muted text-[10px] block mb-1">MOCK LOG FEED (NEWLINE SEPARATED)</label>
                  <textarea
                    rows={4}
                    value={
                      Array.isArray(editingProject.mock_logs)
                        ? editingProject.mock_logs.join('\n')
                        : editingProject.mock_logs || ''
                    }
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        mock_logs: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                      })
                    }
                    className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure font-mono text-[11px] focus:outline-none"
                    placeholder="[02:14:02] Camera-01 stream initialized."
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="text-text-muted text-[10px] block mb-1">EDGE HARDWARE SPECIFICATIONS (JSON / METADATA)</label>
                <textarea
                  rows={4}
                  value={
                    typeof editingProject.edge_specs === 'object'
                      ? JSON.stringify(editingProject.edge_specs, null, 2)
                      : editingProject.edge_specs || ''
                  }
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setEditingProject({ ...editingProject, edge_specs: parsed });
                    } catch {
                      // Allow typing
                    }
                  }}
                  className="w-full bg-canvas-black border border-border-subtle p-2 text-text-pure font-mono text-[11px] focus:outline-none"
                  placeholder='{"target_hardware": "NVIDIA Jetson Nano", "inference_latency": "14.5ms"}'
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="px-3 py-1.5 border border-border-subtle text-text-muted hover:text-text-pure"
            >
              [ CANCEL ]
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 border border-border-active bg-canvas-surface hover:bg-canvas-card text-text-pure font-bold"
            >
              [ COMMIT TO DATABASE ]
            </button>
          </div>
        </form>
      )}

      {/* Projects List Table */}
      <div className="border border-border-subtle bg-canvas-subtle overflow-x-auto font-mono text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border-subtle bg-canvas-surface text-text-muted text-[11px]">
              <th className="p-3">ORDER</th>
              <th className="p-3">SLUG</th>
              <th className="p-3">TITLE</th>
              <th className="p-3">STACK</th>
              <th className="p-3">STATUS</th>
              <th className="p-3 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-text-secondary">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-canvas-surface/40">
                <td className="p-3 font-bold text-text-muted">#{p.display_order}</td>
                <td className="p-3 text-telemetry-green font-mono">{p.slug}</td>
                <td className="p-3 text-text-pure font-medium">{p.title}</td>
                <td className="p-3 text-[11px] text-text-muted">{p.stack.slice(0, 3).join(', ')}</td>
                <td className="p-3 text-[11px]">{p.status}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => {
                      setIsNew(false);
                      setEditingProject(p);
                    }}
                    className="p-1 text-text-secondary hover:text-text-pure"
                    title="Edit"
                  >
                    <Edit2 className="h-3.5 w-3.5 inline" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-1 text-text-muted hover:text-telemetry-red"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
