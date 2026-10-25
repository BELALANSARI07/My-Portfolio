'use client';

import React, { useMemo } from 'react';

interface ContributionHeatmapProps {
  calendarData?: Record<string, number>; // epoch seconds -> count
  colorVariant?: 'purple' | 'emerald';
  title?: string;
  totalSubmissions?: number;
}

export default function ContributionHeatmap({
  calendarData = {},
  colorVariant = 'purple',
  title = 'Submission Activity',
  totalSubmissions,
}: ContributionHeatmapProps) {
  // Generate the last 24 weeks (approx 6 months) of daily cells
  const { weeks, activeDaysCount } = useMemo(() => {
    const today = new Date();
    const days: Array<{ date: string; count: number; dateObj: Date }> = [];
    const totalDays = 24 * 7; // 24 weeks
    let activeDays = 0;

    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 1000;

      // Match timestamp or check within the day
      let count = calendarData[String(Math.floor(startOfDay))] || 0;
      if (!count) {
        // Find if any entry falls on this day
        const dayEntries = Object.entries(calendarData).filter(([ts]) => {
          const t = Number(ts) * 1000;
          const entryDate = new Date(t);
          return (
            entryDate.getFullYear() === d.getFullYear() &&
            entryDate.getMonth() === d.getMonth() &&
            entryDate.getDate() === d.getDate()
          );
        });
        count = dayEntries.reduce((sum, [, c]) => sum + c, 0);
      }

      if (count > 0) activeDays++;
      days.push({
        date: d.toISOString().split('T')[0],
        count,
        dateObj: d,
      });
    }

    // Group into 7-day columns (weeks)
    const weeksArr: Array<typeof days> = [];
    for (let i = 0; i < days.length; i += 7) {
      weeksArr.push(days.slice(i, i + 7));
    }

    return { weeks: weeksArr, activeDaysCount: activeDays };
  }, [calendarData]);

  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-white/[0.04] border border-white/[0.04]';

    if (colorVariant === 'emerald') {
      if (count <= 1) return 'bg-emerald-600/50 border border-emerald-500/40';
      if (count <= 3) return 'bg-emerald-500/80 border border-emerald-400/60 shadow-[0_0_8px_rgba(16,185,129,0.4)]';
      return 'bg-emerald-400 border border-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.7)]';
    } else {
      if (count <= 1) return 'bg-purple-600/50 border border-purple-500/40';
      if (count <= 3) return 'bg-purple-500/80 border border-purple-400/60 shadow-[0_0_8px_rgba(168,85,247,0.4)]';
      return 'bg-purple-400 border border-purple-300 shadow-[0_0_12px_rgba(192,132,252,0.7)]';
    }
  };

  return (
    <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#0b0f19]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06] text-xs">
        <span className="font-semibold text-white tracking-tight">{title}</span>
        <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
          <span>{totalSubmissions !== undefined ? `${totalSubmissions} Total Solved` : `${activeDaysCount} Active Days`}</span>
          <span className="text-slate-600">•</span>
          <span>Last 6 Months</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1.5 min-w-[580px]">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1.5">
              {week.map((day, dIdx) => (
                <div
                  key={dIdx}
                  title={`${day.date}: ${day.count} submission${day.count === 1 ? '' : 's'}`}
                  className={`w-3 h-3 rounded-sm transition-all duration-200 hover:scale-125 cursor-pointer ${getColorClass(
                    day.count
                  )}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.04] text-[10px] text-slate-500 font-mono">
        <span>Less</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-white/[0.04] border border-white/[0.04]" />
          <span className={`w-2.5 h-2.5 rounded-sm ${colorVariant === 'emerald' ? 'bg-emerald-600/50' : 'bg-purple-600/50'}`} />
          <span className={`w-2.5 h-2.5 rounded-sm ${colorVariant === 'emerald' ? 'bg-emerald-500/80' : 'bg-purple-500/80'}`} />
          <span className={`w-2.5 h-2.5 rounded-sm ${colorVariant === 'emerald' ? 'bg-emerald-400' : 'bg-purple-400'}`} />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
