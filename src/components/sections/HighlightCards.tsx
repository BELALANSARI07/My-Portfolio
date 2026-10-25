'use client';

import { motion } from 'framer-motion';
import { Trophy, GraduationCap, Users, Cpu, ArrowUpRight } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Link from 'next/link';

export default function HighlightCards() {
  const highlights = [
    {
      metric: 'Top 3%',
      title: 'National AI Finalist',
      tag: 'Award Winner',
      desc: 'Selected out of 800+ national teams for Railway Object Detection & Emergency Stop prototype.',
      icon: Trophy,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
      glow: 'rgba(245, 158, 11, 0.15)',
      link: '/experience',
    },
    {
      metric: '8.65',
      title: 'CGPA • B.Tech CSE (AI/ML)',
      tag: 'NIU • Class of 2029',
      desc: 'Noida International University focusing on Deep Learning, Data Structures & Applied AI.',
      icon: GraduationCap,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20',
      glow: 'rgba(59, 130, 246, 0.15)',
      link: '/about',
    },
    {
      metric: '120+',
      title: 'VP, Gen AI Club',
      tag: 'Leadership',
      desc: 'Mentoring 120+ university students through practical LLM, Agentic AI, and CV workshops.',
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/20',
      glow: 'rgba(168, 85, 247, 0.15)',
      link: '/experience',
    },
    {
      metric: '< 15ms',
      title: 'Real-Time Edge Vision',
      tag: 'Applied Engineering',
      desc: 'Deploying low-latency YOLO object detection and quantized TensorRT pipelines for edge devices.',
      icon: Cpu,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
      glow: 'rgba(16, 185, 129, 0.15)',
      link: '/projects',
    },
  ];

  return (
    <section className="py-6 sm:py-8 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.link}>
                <SpotlightCard
                  spotlightColor={item.glow}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-5 flex flex-col justify-between h-full group hover:border-white/20 transition-all cursor-pointer relative"
                >
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl border ${item.bgColor} group-hover:scale-105 transition-transform`}>
                      <Icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.02]">
                      <span>{item.tag}</span>
                      <ArrowUpRight className="h-2.5 w-2.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </span>
                  </div>

                  {/* Metric + Title */}
                  <div className="mb-2">
                    <div className="text-2xl font-black text-white tracking-tight font-mono mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-slate-200 group-hover:to-purple-300 group-hover:bg-clip-text transition-all">
                      {item.metric}
                    </div>
                    <h3 className="font-semibold text-xs sm:text-sm text-slate-200 tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-xs leading-relaxed mt-auto">
                    {item.desc}
                  </p>
                </SpotlightCard>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
