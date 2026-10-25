'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CosmicBackground() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Obsidian Base */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Primary Top-Center Cosmic Glow (Purple / Indigo) */}
      <div 
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[650px] rounded-full opacity-35 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, rgba(99, 102, 241, 0.25) 50%, transparent 75%)',
        }}
      />

      {/* Top-Right Secondary Electric Blue Glow */}
      <div 
        className="absolute top-[5%] right-[-10%] w-[650px] h-[550px] rounded-full opacity-25 blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(6, 182, 212, 0.15) 60%, transparent 80%)',
        }}
      />

      {/* Center-Left Violet Nebula */}
      <div 
        className="absolute top-[45%] left-[-10%] w-[550px] h-[500px] rounded-full opacity-20 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, transparent 70%)',
        }}
      />

      {/* Interactive Cursor Spotlight (Desktop only, hidden on mobile touchscreens) */}
      <motion.div
        className="hidden md:block absolute w-[500px] h-[500px] rounded-full blur-[90px] opacity-20 pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)',
        }}
      />

      {/* Subtle Micro-Starlight Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
}
