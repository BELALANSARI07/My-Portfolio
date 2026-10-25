'use client';

import { Trophy, GraduationCap, Users, Rocket } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

export default function HighlightCards() {
  const highlights = [
    {
      title: 'Makers Conclave by NIAT',
      desc: 'Finalist through Railway Project (Obstacle Detection & Emergency Stop).',
      badge: 'Finalist',
      icon: Trophy,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
      glow: 'rgba(245, 158, 11, 0.15)',
    },
    {
      title: '8.66 CGPA • NIU',
      desc: 'B.Tech Computer Science & Engineering (AI/ML), Class of 2029.',
      badge: 'Academics',
      icon: GraduationCap,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20',
      glow: 'rgba(59, 130, 246, 0.15)',
    },
    {
      title: 'Collaboration',
      desc: 'Active in tech communities and a club leader.',
      badge: 'Leadership',
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/20',
      glow: 'rgba(168, 85, 247, 0.15)',
    },
    {
      title: 'Continuous Learning',
      desc: 'Always exploring new tools, research and real-world applications.',
      badge: 'Exploration',
      icon: Rocket,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/20',
      glow: 'rgba(6, 182, 212, 0.15)',
    },
  ];

  return (
    <section className="py-6 sm:py-8 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <SpotlightCard
                key={item.title}
                spotlightColor={item.glow}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-5 flex flex-col justify-between h-full group hover:border-white/20 transition-all cursor-default relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`p-2.5 rounded-xl border ${item.bgColor} group-hover:scale-105 transition-transform`}>
                      <Icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 px-2.5 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.02]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white mb-1.5 tracking-tight group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
