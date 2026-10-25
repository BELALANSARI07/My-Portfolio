'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Code2, 
  Trophy, 
  Activity, 
  ExternalLink, 
  Flame, 
  CheckCircle2, 
  Layers, 
  BarChart3, 
  RefreshCw,
  GitFork,
  Star,
  Sparkles
} from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import CosmicNavbar from '@/components/navbar/CosmicNavbar';
import CosmicFooter from '@/components/sections/CosmicFooter';

export default function ProgressPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({
    github: {
      username: 'BELALANSARI07',
      public_repos: 10,
      followers: 2,
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
      avatar: 'https://userpic.codeforces.org/5699619/avatar/9d10d40ee89f8073.jpg',
    },
    leetcode: {
      username: 'Belal_Ansari',
      totalSolved: 12,
      easySolved: 8,
      mediumSolved: 4,
      hardSolved: 0,
      ranking: '5,000,000+',
      acceptanceRate: '68.5%',
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
      console.warn('Using initial telemetry snapshot');
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
              <span>LIVE CODING TELEMETRY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Coding &amp; Problem Solving
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Real-time progress telemetry aggregating GitHub repositories, LeetCode algorithmic solutions, and Codeforces competitive programming ratings.
            </p>
          </div>

          <button
            onClick={fetchStats}
            disabled={loading}
            className="self-start md:self-end inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.1] bg-[#0b0f19] text-xs font-mono text-slate-300 hover:text-white hover:border-purple-500/40 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-purple-400' : ''}`} />
            <span>{loading ? 'Syncing...' : 'Sync Telemetry'}</span>
          </button>
        </div>

        {/* 3 Major Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: GitHub Profile */}
          <SpotlightCard
            spotlightColor="rgba(59, 130, 246, 0.2)"
            className="p-6 flex flex-col justify-between"
          >
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
                  href={`https://github.com/${stats.github.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
                  title="View on GitHub"
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

              <div className="space-y-1.5 text-xs text-slate-400 leading-relaxed font-sans">
                <p>Focuses on open-source machine learning frameworks, multi-modal search engines, and physical AI prototypes.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] mt-6">
              <a
                href={`https://github.com/${stats.github.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-medium text-slate-200 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <span>Inspect GitHub Repositories</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SpotlightCard>

          {/* Card 2: LeetCode Profile */}
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.2)"
            className="p-6 flex flex-col justify-between"
          >
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
                  href={`https://leetcode.com/${stats.leetcode.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
                  title="View on LeetCode"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* LeetCode Total Solved */}
              <div className="p-4 rounded-xl border border-white/[0.06] bg-black/40 mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-slate-400">TOTAL PROBLEMS SOLVED</div>
                  <div className="text-3xl font-extrabold text-white font-mono mt-1">
                    {stats.leetcode.totalSolved}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-500">ACCEPTANCE</div>
                  <div className="text-xs font-mono text-emerald-400 font-bold mt-1">
                    {stats.leetcode.acceptanceRate}
                  </div>
                </div>
              </div>

              {/* Easy / Med / Hard Breakdown Bars */}
              <div className="space-y-2.5 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-emerald-400 font-semibold">Easy</span>
                    <span className="text-slate-300">{stats.leetcode.easySolved}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${Math.min(100, (stats.leetcode.easySolved / 20) * 100)}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-amber-400 font-semibold">Medium</span>
                    <span className="text-slate-300">{stats.leetcode.mediumSolved}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${Math.min(100, (stats.leetcode.mediumSolved / 20) * 100)}%` }} />
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
                href={`https://leetcode.com/${stats.leetcode.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-medium text-slate-200 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <span>View LeetCode Profile</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SpotlightCard>

          {/* Card 3: Codeforces Profile */}
          <SpotlightCard
            spotlightColor="rgba(168, 85, 247, 0.2)"
            className="p-6 flex flex-col justify-between"
          >
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
                  href={`https://codeforces.com/profile/${stats.codeforces.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
                  title="View on Codeforces"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Codeforces Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-5 font-mono">
                <div className="p-3 rounded-xl border border-white/[0.06] bg-black/40">
                  <div className="text-[11px] text-slate-400 mb-1">CURRENT RATING</div>
                  <div className="text-2xl font-bold text-white flex items-center gap-1.5">
                    <span>{stats.codeforces.rating}</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-white/[0.06] bg-black/40">
                  <div className="text-[11px] text-slate-400 mb-1">MAX RATING</div>
                  <div className="text-2xl font-bold text-purple-300">{stats.codeforces.maxRating}</div>
                </div>
              </div>

              {/* Rank Badge */}
              <div className="p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/5 mb-3 flex items-center justify-between">
                <span className="text-xs text-slate-400">Division Rank:</span>
                <span className="px-2.5 py-0.5 rounded-md border border-purple-500/30 bg-purple-500/15 text-xs font-mono uppercase text-purple-300 font-bold">
                  {stats.codeforces.rank}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Practicing algorithmic thinking, dynamic programming, and competitive problem solving in contests.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] mt-6">
              <a
                href={`https://codeforces.com/profile/${stats.codeforces.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-medium text-slate-200 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <span>View Codeforces Contests</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SpotlightCard>

        </div>

        {/* Featured Live Repositories Grid */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-6">
            <Github className="h-5 w-5 text-blue-400" />
            <span>Active Repositories &amp; Source Artifacts</span>
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
