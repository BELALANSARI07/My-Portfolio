'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  Sparkles, 
  Eye, 
  Hexagon, 
  Terminal,
  Code2
} from 'lucide-react';
import { Profile } from '@/types/database.types';

interface CosmicHeroProps {
  profile: Profile;
}

export default function CosmicHero({ profile }: CosmicHeroProps) {
  // Dynamic typing effect for headline
  const phrases = [
    "B.Tech CSE (AI/ML) student at Noida International University.",
    "Architecting intelligent Generative AI & Autonomous Agent pipelines.",
    "Engineering low-latency Computer Vision & Edge AI solutions.",
    "Turning ambitious research into practical, real-world systems."
  ];

  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIdx];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText.length < currentPhrase.length) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
      }, 40);
    } else if (!isDeleting && displayText.length === currentPhrase.length) {
      timer = setTimeout(() => setIsDeleting(true), 3000);
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
      }, 20);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setCurrentPhraseIdx((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentPhraseIdx]);

  return (
    <section id="home" className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & Primary CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/[0.06] text-blue-300 font-mono text-[11px] uppercase tracking-widest">
              <span>AI/ML ENGINEER</span>
              <span>•</span>
              <span>STUDENT</span>
              <span>•</span>
              <span>PROBLEM SOLVER</span>
            </div>

            {/* Display Title with Vibrant Gradient */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-4xl text-white font-normal tracking-tight">
                Hi, I'm
              </h2>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                <span className="text-white">Belal </span>
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]">
                  Ansari
                </span>
              </h1>
            </div>

            {/* Dynamic Typing Sub-headline */}
            <div className="min-h-[58px] sm:min-h-[52px]">
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                {displayText}
                <span className="typing-cursor" />
              </p>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg">
              {profile.bio || "I build intelligent systems at the intersection of Generative AI, Computer Vision, and real-world applications."}
            </p>

            {/* Action Buttons & Social Icons */}
            <div className="pt-2 space-y-5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
                >
                  <span>View My Work</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-[#0b0f19]/80 px-6 py-3.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-200 backdrop-blur-md hover:bg-white/[0.08] hover:border-purple-500/40 hover:text-white transition-all shadow-sm text-center"
                >
                  <span>Contact Me</span>
                </Link>
              </div>

              {/* Social Channels Row */}
              <div className="flex items-center gap-3 pt-1">
                {profile.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.06] transition-all shadow-sm"
                    title="GitHub Profile"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.06] transition-all shadow-sm"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                <a
                  href={`mailto:${profile.contact_email}`}
                  className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.06] transition-all shadow-sm"
                  title="Direct Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Center Column: Portrait with Cosmic Ring & Floating Pills */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-4 flex items-center justify-center relative min-h-[360px] sm:min-h-[420px] my-4 lg:my-0"
          >
            {/* Cosmic Orbital Halo Ring */}
            <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-purple-500/30 shadow-[0_0_60px_rgba(139,92,246,0.3)] animate-spin-slow pointer-events-none" />
            <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.2)] pointer-events-none" />

            {/* Glowing Backdrop behind Avatar */}
            <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-blue-600/30 to-purple-600/30 blur-2xl pointer-events-none" />

            {/* Profile Avatar Card / Frame */}
            <div className="relative z-10 w-56 h-72 sm:w-72 sm:h-96 rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md shadow-2xl">
              <img
                src={profile.avatar_url || "/belal-ansari.png"}
                alt={profile.full_name}
                className="w-full h-full object-cover object-top opacity-95 contrast-[1.05]"
              />
              {/* Subtle Bottom Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
            </div>

            {/* Floating Glass Pill 1: Generative AI */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 left-0 sm:-left-8 z-20 flex items-center gap-1.5 sm:gap-2 rounded-xl border border-purple-500/30 bg-[#0b0f19]/90 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-medium text-white shadow-lg shadow-purple-500/20 backdrop-blur-xl"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span>Generative AI</span>
            </motion.div>

            {/* Floating Glass Pill 2: Computer Vision */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 -left-2 sm:-left-12 -translate-y-1/2 z-20 flex items-center gap-1.5 sm:gap-2 rounded-xl border border-blue-500/30 bg-[#0b0f19]/90 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-medium text-white shadow-lg shadow-blue-500/20 backdrop-blur-xl"
            >
              <Eye className="h-3.5 w-3.5 text-blue-400" />
              <span>Computer Vision</span>
            </motion.div>

            {/* Floating Glass Pill 3: Real-world Apps */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-2 right-0 sm:right-auto sm:-left-6 z-20 flex items-center gap-1.5 sm:gap-2 rounded-xl border border-cyan-500/30 bg-[#0b0f19]/90 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-medium text-white shadow-lg shadow-cyan-500/20 backdrop-blur-xl"
            >
              <Hexagon className="h-3.5 w-3.5 text-cyan-400" />
              <span>Real-world Apps</span>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Code Window & Currently Exploring Radar */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Floating Code Editor Box */}
            <div className="relative group">
              {/* Handwritten-Style Italic Accent */}
              <div className="text-right text-xs font-sans italic text-slate-400 mb-1 tracking-wide">
                Build • Learn • Solve • Repeat
              </div>

              <div className="rounded-2xl border border-white/[0.1] bg-[#0b0f19]/90 backdrop-blur-xl p-4 shadow-xl shadow-black/50 text-left font-mono text-xs">
                {/* Window Dots */}
                <div className="flex items-center gap-1.5 pb-3 border-b border-white/[0.06] mb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-auto text-[10px] text-slate-500">routine.js</span>
                </div>

                {/* Code Body */}
                <pre className="text-slate-300 leading-relaxed font-mono text-[11px]">
                  <span className="text-purple-400 font-semibold">while</span> (learning) &#123;{'\n'}
                  {'  '}<span className="text-blue-400">build</span>();{'\n'}
                  {'  '}<span className="text-emerald-400">improve</span>();{'\n'}
                  {'  '}<span className="text-amber-400">solve</span>();{'\n'}
                  {'  '}<span className="text-pink-400">repeat</span>();{'\n'}
                  &#125;
                </pre>
              </div>
            </div>

            {/* Currently Exploring Radar Box */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0b0f19]/80 backdrop-blur-xl p-4 text-left shadow-lg">
              <div className="text-xs font-semibold text-white/90 mb-3 flex items-center justify-between">
                <span>Currently Exploring</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>LLMs &amp; RAG Architectures</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Computer Vision &amp; YOLOv11</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span>AI Agents &amp; Multi-Agent Swarms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <span>Open Source Contribution</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
