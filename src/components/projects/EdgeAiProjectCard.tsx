'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  AlertTriangle, 
  Cpu, 
  Activity, 
  Camera, 
  Zap, 
  Maximize2, 
  Terminal, 
  ExternalLink, 
  Github, 
  ArrowRight,
  Target
} from 'lucide-react';
import { EnrichedProject } from '@/data/projects';
import EdgeAiScatterChart from './EdgeAiScatterChart';
import EdgeAiPipelineFlow from './EdgeAiPipelineFlow';

interface EdgeAiProjectCardProps {
  project: EnrichedProject;
  onOpenModal: () => void;
}

export default function EdgeAiProjectCard({ project, onOpenModal }: EdgeAiProjectCardProps) {
  const [activeView, setActiveView] = useState<'FEED' | 'PIPELINE' | 'LOGS' | 'CHART'>('FEED');
  const [runMockInference, setRunMockInference] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(45.2);
  const [cpu, setCpu] = useState<number>(42);
  const [vram, setVram] = useState<string>('1.1GB');
  const [latency, setLatency] = useState<number>(14.5);
  const [timestamp, setTimestamp] = useState<string>('02:14:15');

  const [logs, setLogs] = useState<string[]>([
    '[02:14:02] Camera-01 stream initialized.',
    '[02:14:03] ONNX runtime loading FP16 model quantized on-edge.',
    '[02:14:04] INFERENCE ACTIVE: fps_avg=45.2, latency_avg=14.2ms.',
    '[02:14:15] ALERT: Pedestrian detected (conf=0.91) in region A-2. Triggering Edge GPIO...',
    "[02:14:15] MQTT message published to 'alert/system/01'.",
  ]);

  const logRef = useRef<HTMLDivElement>(null);

  // Dynamic telemetry oscillation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTimestamp(now.toTimeString().split(' ')[0]);
      if (runMockInference) {
        setFps(parseFloat((45.2 + (Math.random() * 0.6 - 0.3)).toFixed(1)));
        setLatency(parseFloat((14.5 + (Math.random() * 0.5 - 0.25)).toFixed(1)));
        setCpu(Math.floor(42 + (Math.random() * 4 - 2)));
      }
    }, 1400);

    return () => clearInterval(interval);
  }, [runMockInference]);

  const handleTestAlert = (e: React.MouseEvent) => {
    e.stopPropagation();
    const t = new Date().toTimeString().split(' ')[0];
    setLogs((prev) => [
      ...prev,
      `[${t}] ALERT: Anomaly in Sector A-2 (conf=0.93). Edge GPIO 18 triggered.`,
      `[${t}] MQTT published to 'alert/system/01'.`,
    ]);
  };

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#0c1222] via-[#080d1a] to-[#04060d] p-5 shadow-2xl backdrop-blur-2xl flex flex-col justify-between hover:border-cyan-400/50 transition-all group">
      
      {/* Card Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-mono text-[10px] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>PROJECT: 02 // EDGE AI</span>
            </span>
            <span className="font-mono text-[10px] text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded">
              ● {project.status || 'PRODUCTION'}
            </span>
          </div>

          {/* Mini Interactive View Tabs */}
          <div className="flex items-center gap-1 bg-black/50 border border-white/[0.08] p-1 rounded-xl font-mono text-[10px]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveView('FEED');
              }}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                activeView === 'FEED'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LIVE HUD
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveView('PIPELINE');
              }}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                activeView === 'PIPELINE'
                  ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              PIPELINE
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveView('LOGS');
              }}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                activeView === 'LOGS'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LOGS
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveView('CHART');
              }}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                activeView === 'CHART'
                  ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              BENCHMARKS
            </button>
          </div>
        </div>

        {/* Title and Tagline */}
        <div className="mb-4">
          <h3 className="font-black text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-300 text-xs mt-1 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* VIEW 1: LIVE FPS & TELEMETRY HUD */}
        {activeView === 'FEED' && (
          <div className="space-y-3">
            {/* Visual Camera Panel */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-cyan-500/30 bg-[#060913] select-none shadow-inner">
              
              {/* Synthetic Camera Scene */}
              <svg viewBox="0 0 640 360" className="w-full h-full object-cover">
                <defs>
                  <linearGradient id="cardSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#080d1a" />
                    <stop offset="100%" stopColor="#020408" />
                  </linearGradient>
                  <linearGradient id="cardRoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#090d16" />
                  </linearGradient>
                </defs>

                <rect width="640" height="200" fill="url(#cardSky)" />
                <polygon points="260,200 380,200 600,360 40,360" fill="url(#cardRoad)" />
                <line x1="320" y1="200" x2="320" y2="360" stroke="#facc15" strokeWidth="2.5" strokeDasharray="14 10" opacity="0.6" />
                <line x1="280" y1="200" x2="160" y2="360" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="10 8" opacity="0.3" />
                <line x1="360" y1="200" x2="480" y2="360" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="10 8" opacity="0.3" />

                {/* Simulated Vehicle in Lane */}
                <rect x="350" y="225" width="110" height="60" rx="8" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
                <circle cx="450" cy="265" r="4" fill="#ef4444" opacity="0.9" />
                <circle cx="450" cy="245" r="4" fill="#ef4444" opacity="0.9" />

                {/* Simulated Pedestrian in Crosswalk */}
                <circle cx="150" cy="240" r="7" fill="#cbd5e1" />
                <line x1="150" y1="247" x2="150" y2="275" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
                <line x1="150" y1="275" x2="142" y2="300" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                <line x1="150" y1="275" x2="158" y2="300" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
              </svg>

              {/* Active CRT Scanline Sweep */}
              <motion.div
                animate={{ y: ['0%', '350%', '0%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-cyan-400/[0.12] to-transparent pointer-events-none"
              />

              {/* Camera Overlays */}
              <div className="absolute top-2.5 left-2.5 font-mono text-[10px] text-cyan-300 bg-black/75 px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>CAMERA_01 // HIGHWAY_CAM</span>
              </div>

              {/* Real-time Telemetry HUD metrics overlay */}
              <div className="absolute top-2.5 right-2.5 font-mono text-[10px] text-slate-300 bg-black/75 px-2 py-0.5 rounded border border-white/10 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">FPS: {fps}</span>
                <span>//</span>
                <span className="text-slate-300">CPU: {cpu}%</span>
                <span>//</span>
                <span className="text-purple-300">VRAM: {vram}</span>
              </div>

              {/* Mock Inference Bounding Boxes */}
              <AnimatePresence>
                {runMockInference && (
                  <>
                    {/* [PERSON: 0.91] */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute border-2 border-emerald-400 bg-emerald-500/10 rounded-sm shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                      style={{ left: '20%', top: '58%', width: '13%', height: '32%' }}
                    >
                      <div className="absolute -top-5 left-0 px-1 py-0.2 rounded-t bg-emerald-500 text-black font-mono text-[9px] font-black whitespace-nowrap">
                        [PERSON: 0.91]
                      </div>
                    </motion.div>

                    {/* [VEHICLE: 0.88] */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute border-2 border-cyan-400 bg-cyan-500/10 rounded-sm shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      style={{ left: '53%', top: '56%', width: '25%', height: '26%' }}
                    >
                      <div className="absolute -top-5 left-0 px-1 py-0.2 rounded-t bg-cyan-400 text-black font-mono text-[9px] font-black whitespace-nowrap">
                        [VEHICLE: 0.88]
                      </div>
                    </motion.div>

                    {/* Flashing Hazard Banner */}
                    <div className="absolute bottom-2 inset-x-2 p-1.5 rounded-lg bg-rose-950/80 border border-rose-500/40 font-mono text-[10px] text-rose-300 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-rose-400 animate-bounce" />
                        <strong>ALERT: Pedestrian detected (conf=0.91) in region A-2.</strong>
                      </span>
                      <span className="text-white font-bold">GPIO 18 HIGH</span>
                    </div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Run Mock Inference Toggle & Test Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRunMockInference(!runMockInference);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                    runMockInference
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                      : 'bg-white/[0.08] text-white hover:bg-white/[0.12] border border-white/20'
                  }`}
                >
                  {runMockInference ? (
                    <>
                      <Pause className="h-3 w-3" />
                      <span>INFERENCE ACTIVE</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3" />
                      <span>RUN MOCK INFERENCE</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleTestAlert}
                  className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 flex items-center gap-1"
                >
                  <AlertTriangle className="h-3 w-3" />
                  <span>TEST ALERT</span>
                </button>
              </div>

              <div className="text-[11px] text-cyan-400 font-mono">
                Latency: <strong>{latency}ms</strong> (ONNX FP16)
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PIPELINE FLOW */}
        {activeView === 'PIPELINE' && (
          <div className="py-1">
            <EdgeAiPipelineFlow />
          </div>
        )}

        {/* VIEW 3: SYSTEM LOG FEED */}
        {activeView === 'LOGS' && (
          <div className="p-3 rounded-xl border border-white/[0.08] bg-[#05070e] font-mono text-xs space-y-1.5 shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/[0.06] pb-1.5 mb-2">
              <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <Terminal className="h-3.5 w-3.5" />
                <span>ACTIVE TELEMETRY LOGS</span>
              </span>
              <span className="text-[10px] text-emerald-400">● 45.2 FPS</span>
            </div>

            <div ref={logRef} className="max-h-48 overflow-y-auto space-y-1 pr-1 text-[11px] leading-relaxed">
              {logs.map((line, idx) => (
                <div
                  key={idx}
                  className={`${
                    line.includes('ALERT:')
                      ? 'text-rose-400 font-bold bg-rose-500/10 p-0.5 rounded'
                      : line.includes('MQTT')
                      ? 'text-purple-300'
                      : 'text-emerald-400/90'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: BENCHMARKS SCATTER */}
        {activeView === 'CHART' && (
          <div className="py-1">
            <EdgeAiScatterChart />
          </div>
        )}

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/[0.06] font-mono text-center">
          <div className="p-2 rounded-xl bg-black/40 border border-white/[0.04]">
            <span className="text-[9px] text-slate-400 block uppercase">Precision</span>
            <span className="text-xs sm:text-sm font-bold text-cyan-400">84.6% mAP</span>
          </div>
          <div className="p-2 rounded-xl bg-black/40 border border-white/[0.04]">
            <span className="text-[9px] text-slate-400 block uppercase">Inference</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-400">14.5ms</span>
          </div>
          <div className="p-2 rounded-xl bg-black/40 border border-white/[0.04]">
            <span className="text-[9px] text-slate-400 block uppercase">Power Draw</span>
            <span className="text-xs sm:text-sm font-bold text-purple-400">~7.5W</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Open Full Blueprint Modal & GitHub Link */}
      <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs">
        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold group/btn"
        >
          <span>Launch Full Telemetry Console</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              title="View GitHub Repository"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

    </div>
  );
}
