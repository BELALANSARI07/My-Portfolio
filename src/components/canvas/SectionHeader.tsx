import React from 'react';

interface SectionHeaderProps {
  idCode: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ idCode, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8 border-b border-border-subtle pb-4">
      <div className="flex items-center gap-2 font-mono text-xs text-text-muted mb-1">
        <span className="text-telemetry-green">[ {idCode} ]</span>
        <span className="tracking-widest uppercase">SECTION_SPECIFICATION</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-pure font-mono">
          {title}
        </h2>
        {subtitle && (
          <p className="font-mono text-xs text-text-secondary max-w-xl">
            // {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
