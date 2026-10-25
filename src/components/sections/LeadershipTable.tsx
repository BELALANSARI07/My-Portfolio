'use client';

import { useState } from 'react';
import { LeadershipHackathon } from '@/types/database.types';
import SectionHeader from '@/components/canvas/SectionHeader';
import { Award, ExternalLink, Calendar, Users } from 'lucide-react';

interface LeadershipTableProps {
  records: LeadershipHackathon[];
}

export default function LeadershipTable({ records }: LeadershipTableProps) {
  const [filter, setFilter] = useState<'ALL' | 'HACKATHON' | 'LEADERSHIP'>('ALL');

  const filtered = records.filter((r) => {
    if (filter === 'ALL') return true;
    if (filter === 'HACKATHON') return r.title.toLowerCase().includes('hack') || r.title.toLowerCase().includes('challenge');
    if (filter === 'LEADERSHIP') return r.role_or_award.toLowerCase().includes('lead') || r.organization.toLowerCase().includes('club');
    return true;
  });

  return (
    <section id="records" className="py-16 md:py-24 border-b border-border-subtle relative bg-canvas-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          idCode="04_HONORS_AND_LEADERSHIP"
          title="COMPETITIONS & INITIATIVES"
          subtitle="Tabular audit log of hackathon finishes, research evaluations, and organizational leadership"
        />

        {/* Filter Bar */}
        <div className="flex items-center gap-2 mb-6 font-mono text-xs">
          <span className="text-text-muted">FILTER_LOG:</span>
          {(['ALL', 'HACKATHON', 'LEADERSHIP'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 border transition-colors ${
                filter === f
                  ? 'border-border-active bg-canvas-surface text-text-pure font-semibold'
                  : 'border-border-subtle bg-canvas-subtle text-text-muted hover:text-text-secondary'
              }`}
            >
              [{f}]
            </button>
          ))}
        </div>

        {/* High-Density Data Canvas Table */}
        <div className="border border-border-subtle bg-canvas-subtle overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-border-subtle bg-canvas-surface text-text-muted text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">EPOCH</th>
                <th className="py-3 px-4 font-semibold">INITIATIVE / EVENT</th>
                <th className="py-3 px-4 font-semibold">ROLE / DESIGNATION</th>
                <th className="py-3 px-4 font-semibold">ORGANIZATION</th>
                <th className="py-3 px-4 font-semibold">EVALUATION METRICS</th>
                <th className="py-3 px-4 font-semibold text-right">EVIDENCE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-text-secondary">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-canvas-surface/60 transition-colors"
                >
                  <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
                    {item.date_str}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-text-pure">
                    {item.title}
                  </td>
                  <td className="py-3.5 px-4 text-telemetry-green">
                    {item.role_or_award}
                  </td>
                  <td className="py-3.5 px-4 text-text-muted">
                    {item.organization}
                  </td>
                  <td className="py-3.5 px-4 text-text-secondary text-[11px]">
                    {item.metrics || '// Nominal Execution'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {item.evidence_url ? (
                      <a
                        href={item.evidence_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-text-muted hover:text-text-pure transition-colors"
                      >
                        <span>[VERIFY]</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-border-active">[ON_RECORD]</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
