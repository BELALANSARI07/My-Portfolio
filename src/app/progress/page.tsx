'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Code2, 
  Trophy, 
  ExternalLink, 
  RefreshCw,
  Star,
  Activity,
  Calendar,
  Sparkles,
  GitCommit,
  CheckCircle2
} from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import ContributionHeatmap from '@/components/ui/ContributionHeatmap';
import CosmicNavbar from '@/components/navbar/CosmicNavbar';
import CosmicFooter from '@/components/sections/CosmicFooter';

export default function ProgressPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({
    github: {
      username: 'BELALANSARI07',
      public_repos: 10,
      followers: 2,
      profile_url: 'https://github.com/BELALANSARI07',
      repos: [
        { name: 'Multi-Modal-RAG-Knowledge-Engine', description: 'Enterprise RAG with late interaction multi-vector embeddings', language: 'Python', stars: 0, url: 'https://github.com/BELALANSARI07/Multi-Modal-RAG-Knowledge-Engine' },
        { name: 'My-Portfolio', description: 'Cosmic Glassmorphic Portfolio in Next.js 15 & Supabase', language: 'TypeScript', stars: 1, url: 'https://github.com/BELALANSARI07/My-Portfolio' },
        { name: 'relieflink-ai', description: 'Disaster response and emergency intelligence framework', language: 'Python', stars: 0, url: 'https://github.com/BELALANSARI07' },
        { name: 'NeuroFlow-HiDevs', description: 'Neural workflow execution graph and model runtime', language: 'Python', stars: 0, url: 'https://github.com/BELALANSARI07' },
      ],
    },
    codeforces: {
      handle: 'Belal_Ansari',
      rating: 401,
      maxRating: 401,
      rank: 'newbie',
      maxRank: 'newbie',
      contribution: 0,
      profile_url: 'https://codeforces.com/profile/Belal_Ansari',
    },
    leetcode: {
      username: 'Belal_Ansari07',
      totalSolved: 28,
      easySolved: 17,
      mediumSolved: 11,
      hardSolved: 0,
      ranking: '3,888,703',
      profile_url: 'https://leetcode.com/u/Belal_Ansari07/',
      calendar: {},
    },
  });

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/coding-stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.warn('Using snapshot data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between">
      <CosmicNavbar />

      <main className="pt-28 pb-20 relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE CODING &amp; ALGORITHMIC TELEMETRY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Progress &amp; Contribution Radar
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Track live algorithmic problem-solving milestones on LeetCode, competitive programming ratings on Codeforces, and open-source GitHub commit heatmaps.
            </p>
          </div>

          <button
            onClick={fetchStats}
            disabled={loading}
            className="self-stretch sm:self-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-xl border border-white/[0.1] bg-[#0b0f19] text-xs font-mono text-slate-300 hover:text-white hover:border-purple-500/40 transition-all disabled:opacity-50 w-full md:w-auto"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-purple-400' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh Telemetry'}</span>
          </button>
        </div>

        {/* 3 Major Profiles Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: LeetCode */}
          <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.2)" className="p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">LeetCode</h3>
                    <div className="text-xs font-mono text-amber-400">@{stats.leetcode.username}</div>
                  </div>
                </div>
                <a
                  href={stats.leetcode.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
                  title="Open LeetCode Profile"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Total Count */}
              <div className="p-4 rounded-xl border border-white/[0.06] bg-black/40 mb-4 flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] font-mono text-slate-400">SOLVED PROBLEMS</div>
                  <div className="text-3xl font-extrabold text-white font-mono mt-1">
                    {stats.leetcode.totalSolved}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-500">GLOBAL RANK</div>
                  <div className="text-xs font-mono text-amber-400 font-bold mt-1">
                    #{stats.leetcode.ranking}
                  </div>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="space-y-2.5 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-emerald-400 font-semibold">Easy</span>
                    <span className="text-slate-300">{stats.leetcode.easySolved}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${Math.min(100, (stats.leetcode.easySolved / 30) * 100)}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-amber-400 font-semibold">Medium</span>
                    <span className="text-slate-300">{stats.leetcode.mediumSolved}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${Math.min(100, (stats.leetcode.mediumSolved / 25) * 100)}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-rose-400 font-semibold">Hard</span>
                    <span className="text-slate-300">{stats.leetcode.hardSolved}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400 rounded-full" style={{ width: `${Math.min(100, (stats.leetcode.hardSolved / 10) * 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] mt-6">
              <a
                href={stats.leetcode.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-medium text-slate-200 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <span>View LeetCode Profile</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SpotlightCard>

          {/* Card 2: Codeforces */}
          <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.2)" className="p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Codeforces</h3>
                    <div className="text-xs font-mono text-purple-400">@{stats.codeforces.handle}</div>
                  </div>
                </div>
                <a
                  href={stats.codeforces.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
                  title="Open Codeforces Profile"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Codeforces Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-5 font-mono">
                <div className="p-3 rounded-xl border border-white/[0.06] bg-black/40">
                  <div className="text-[11px] text-slate-400 mb-1">CURRENT RATING</div>
                  <div className="text-2xl font-bold text-white">{stats.codeforces.rating}</div>
                </div>
                <div className="p-3 rounded-xl border border-white/[0.06] bg-black/40">
                  <div className="text-[11px] text-slate-400 mb-1">MAX RATING</div>
                  <div className="text-2xl font-bold text-purple-300">{stats.codeforces.maxRating}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/5 mb-3 flex items-center justify-between">
                <span className="text-xs text-slate-400">Division Rank:</span>
                <span className="px-2.5 py-0.5 rounded-md border border-purple-500/30 bg-purple-500/15 text-xs font-mono uppercase text-purple-300 font-bold">
                  {stats.codeforces.rank}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Active in competitive algorithmic problem solving, binary search manifolds, and Div. 3 contests.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] mt-6">
              <a
                href={stats.codeforces.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-medium text-slate-200 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <span>View Codeforces Profile</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SpotlightCard>

          {/* Card 3: GitHub */}
          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)" className="p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">GitHub</h3>
                    <div className="text-xs font-mono text-blue-400">@{stats.github.username}</div>
                  </div>
                </div>
                <a
                  href={stats.github.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
                  title="Open GitHub Profile"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* GitHub Counters */}
              <div className="grid grid-cols-2 gap-3 mb-6 font-mono">
                <div className="p-3 rounded-xl border border-white/[0.06] bg-black/40">
                  <div className="text-[11px] text-slate-400 mb-1">PUBLIC REPOS</div>
                  <div className="text-2xl font-bold text-white">{stats.github.public_repos}</div>
                </div>
                <div className="p-3 rounded-xl border border-white/[0.06] bg-black/40">
                  <div className="text-[11px] text-slate-400 mb-1">FOLLOWERS</div>
                  <div className="text-2xl font-bold text-white">{stats.github.followers}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs text-slate-300">
                Primary stack: <strong className="text-white">Python, TypeScript, C++</strong> for multi-modal machine learning.
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] mt-6">
              <a
                href={stats.github.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-medium text-slate-200 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <span>View GitHub Profile</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SpotlightCard>

        </div>

        {/* CONTRIBUTION CHARTS SECTION */}
        <div className="space-y-8 mb-12">
          <div className="flex items-center gap-2.5 text-white font-bold text-xl">
            <Activity className="h-5 w-5 text-purple-400" />
            <span>Contribution Heatmaps &amp; Activity Charts</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LeetCode Heatmap */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2 text-amber-400 font-semibold">
                  <Code2 className="h-4 w-4" />
                  <span>LeetCode Daily Submissions Heatmap</span>
                </span>
                <span className="text-slate-500">@{stats.leetcode.username}</span>
              </div>
              <ContributionHeatmap
                calendarData={stats.leetcode.calendar}
                totalSubmissions={stats.leetcode.totalSolved}
                colorVariant="emerald"
                title="LeetCode Active Submission Frequency"
              />
            </div>

            {/* GitHub Contribution Heatmap */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2 text-blue-400 font-semibold">
                  <Github className="h-4 w-4" />
                  <span>GitHub Contributions Calendar</span>
                </span>
                <span className="text-slate-500">@{stats.github.username}</span>
              </div>
              
              <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#0b0f19]/80 backdrop-blur-xl flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06] text-xs">
                  <span className="font-semibold text-white tracking-tight">GitHub Annual Commit Matrix</span>
                  <span className="text-slate-400 font-mono text-[11px]">Active Contributor</span>
                </div>
                
                {/* Embedded Live GitHub Chart */}
                <div className="overflow-x-auto py-2">
                  <img
                    src={`https://ghchart.rshah.org/8b5cf6/${stats.github.username}`}
                    alt="GitHub Contributions Chart"
                    className="w-full min-w-[580px] filter contrast-125 brightness-110"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.04] text-[10px] text-slate-500 font-mono">
                  <span>Synced with GitHub GraphQL Events API</span>
                  <a
                    href={stats.github.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    View commit history &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pinned Repositories Grid */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-6">
            <GitCommit className="h-5 w-5 text-purple-400" />
            <span>Featured Open Source Repositories</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.github.repos.map((repo: any) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl border border-white/[0.08] bg-[#0b0f19]/80 backdrop-blur-xl hover:border-purple-500/40 hover:bg-[#0e1422] transition-all block group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-sm text-white group-hover:text-blue-300 transition-colors flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-purple-400" />
                    <span>{repo.name}</span>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </div>

                <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                  {repo.description || 'Open source engineering repository maintained by Belal Ansari.'}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      <span>{repo.language}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-400" />
                    <span>{repo.stars}</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </main>

      <CosmicFooter profile={{ full_name: 'Belal Ansari', contact_email: 'belalansari000078@gmail.com' } as any} />
    </div>
  );
}
