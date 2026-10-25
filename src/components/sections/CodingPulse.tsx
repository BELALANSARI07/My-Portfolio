'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Trophy, Github, ExternalLink, ArrowRight, Activity, Flame, Sparkles } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

export default function CodingPulse() {
  const [stats, setStats] = useState({
    leetcode: {
      username: 'Belal_Ansari07',
      totalSolved: 28,
      easySolved: 17,
      mediumSolved: 11,
      hardSolved: 0,
      ranking: '3,888,703',
      profile_url: 'https://leetcode.com/u/Belal_Ansari07/',
    },
    codeforces: {
      handle: 'Belal_Ansari',
      rating: 401,
      maxRating: 401,
      rank: 'newbie',
      profile_url: 'https://codeforces.com/profile/Belal_Ansari',
    },
    github: {
      username: 'BELALANSARI07',
      public_repos: 10,
      followers: 2,
      profile_url: 'https://github.com/BELALANSARI07',
    },
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/coding-stats');
        if (res.ok) {
          const data = await res.json();
          setStats((prev) => ({
            leetcode: { ...prev.leetcode, ...data.leetcode },
            codeforces: { ...prev.codeforces, ...data.codeforces },
            github: { ...prev.github, ...data.github },
          }));
        }
      } catch (e) {}
    }
    load();
  }, []);

  return (
    <section className="py-14 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 font-mono text-[11px] uppercase tracking-wider mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE COMPETITIVE PULSE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Algorithmic &amp; Open Source Telemetry
            </h2>
          </div>

          <Link
            href="/progress"
            className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-xs font-semibold text-purple-300 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.08] transition-all shadow-sm"
          >
            <span>Inspect Full Contribution Heatmaps</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 3 Telemetry Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* LeetCode Card */}
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.18)"
            className="p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">LeetCode</h3>
                    <div className="text-[11px] font-mono text-amber-400">@{stats.leetcode.username}</div>
                  </div>
                </div>

                <a
                  href={stats.leetcode.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-slate-400 hover:text-white"
                  title="Open LeetCode Profile"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Total Count */}
              <div className="p-3.5 rounded-xl border border-white/[0.06] bg-black/40 mb-3 flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-400">SOLVED PROBLEMS</div>
                  <div className="text-2xl font-extrabold text-white font-mono mt-0.5">
                    {stats.leetcode.totalSolved}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-500">GLOBAL RANK</div>
                  <div className="text-xs font-mono text-purple-300 font-bold mt-0.5">
                    #{stats.leetcode.ranking}
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-emerald-400 font-bold">{stats.leetcode.easySolved}</div>
                  <div className="text-[9px] text-slate-400">Easy</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="text-amber-400 font-bold">{stats.leetcode.mediumSolved}</div>
                  <div className="text-[9px] text-slate-400">Medium</div>
                </div>
                <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                  <div className="text-rose-400 font-bold">{stats.leetcode.hardSolved}</div>
                  <div className="text-[9px] text-slate-400">Hard</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Daily DSA Practice</span>
              <a
                href={stats.leetcode.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold"
              >
                <span>View Profile</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SpotlightCard>

          {/* Codeforces Card */}
          <SpotlightCard
            spotlightColor="rgba(168, 85, 247, 0.18)"
            className="p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <Trophy className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Codeforces</h3>
                    <div className="text-[11px] font-mono text-purple-400">@{stats.codeforces.handle}</div>
                  </div>
                </div>

                <a
                  href={stats.codeforces.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-slate-400 hover:text-white"
                  title="Open Codeforces Profile"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Rating Count */}
              <div className="p-3.5 rounded-xl border border-white/[0.06] bg-black/40 mb-3 flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-400">CURRENT RATING</div>
                  <div className="text-2xl font-extrabold text-white font-mono mt-0.5">
                    {stats.codeforces.rating}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-500">MAX RATING</div>
                  <div className="text-xs font-mono text-purple-300 font-bold mt-0.5">
                    {stats.codeforces.maxRating}
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl border border-purple-500/20 bg-purple-500/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Competitive Division:</span>
                <span className="px-2 py-0.5 rounded-md border border-purple-500/30 bg-purple-500/20 text-[10px] font-mono uppercase text-purple-300 font-bold">
                  {stats.codeforces.rank}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Active in Div. 3 / Div. 4</span>
              <a
                href={stats.codeforces.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-semibold"
              >
                <span>View Contests</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SpotlightCard>

          {/* GitHub Card */}
          <SpotlightCard
            spotlightColor="rgba(59, 130, 246, 0.18)"
            className="p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Github className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">GitHub</h3>
                    <div className="text-[11px] font-mono text-blue-400">@{stats.github.username}</div>
                  </div>
                </div>

                <a
                  href={stats.github.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-slate-400 hover:text-white"
                  title="Open GitHub Profile"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* GitHub Count */}
              <div className="p-3.5 rounded-xl border border-white/[0.06] bg-black/40 mb-3 flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-400">PUBLIC REPOSITORIES</div>
                  <div className="text-2xl font-extrabold text-white font-mono mt-0.5">
                    {stats.github.public_repos}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-500">FOLLOWERS</div>
                  <div className="text-xs font-mono text-blue-300 font-bold mt-0.5">
                    {stats.github.followers}
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Primary Languages:</span>
                <span className="text-[11px] font-mono text-blue-300 font-medium">
                  Python • TypeScript • C++
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Open Source AI Architectures</span>
              <a
                href={stats.github.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
              >
                <span>View Repositories</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
}
