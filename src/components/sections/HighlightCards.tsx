'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Code2, Users, Rocket } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

export default function HighlightCards() {
  const highlights = [
    {
      title: 'Problem Solving',
      desc: 'Turning real-world problems into working solutions.',
      icon: Lightbulb,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
      glow: 'rgba(245, 158, 11, 0.12)',
    },
    {
      title: 'AI/ML Development',
      desc: 'Work with LLMs, embeddings, computer vision and more.',
      icon: Code2,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20',
      glow: 'rgba(59, 130, 246, 0.15)',
    },
    {
      title: 'Collaboration',
      desc: 'Active in tech communities and a club leader.',
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/20',
      glow: 'rgba(168, 85, 247, 0.15)',
    },
    {
      title: 'Continuous Learning',
      desc: 'Always exploring new tools, research and real-world applications.',
      icon: Rocket,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/20',
      glow: 'rgba(6, 182, 212, 0.15)',
    },
  ];

  return (
    <section className="py-8 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <SpotlightCard
                key={item.title}
                spotlightColor={item.glow}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 flex items-start gap-3.5 group cursor-default"
              >
                <div className={`p-3 rounded-2xl border ${item.bgColor} shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white/95 mb-1 tracking-tight">
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
