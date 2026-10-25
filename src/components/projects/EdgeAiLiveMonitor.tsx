'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  Cpu, 
  Activity, 
  Radio, 
  Camera, 
  Sliders, 
  Terminal, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  Zap, 
  Eye, 
  ShieldAlert, 
  FileText,
  Copy,
  Check
} from 'lucide-react';
import EdgeAiScatterChart from './EdgeAiScatterChart';
import EdgeAiPipelineFlow from './EdgeAiPipelineFlow';

interface EdgeAiLiveMonitorProps {
  initialLatency?: number;
  initialAccuracy?: number;
  initialPower?: number;
  onAlertTriggered?: (alert: any) => void;
  className?: string;
}

export default function EdgeAiLiveMonitor({
  initialLatency = 14.5,
  initialAccuracy = 84.6,
  initialPower = 7.5,
  className = '',
}: EdgeAiLiveMonitorProps) {
  // Tabs: 'MONITOR' | 'PIPELINE' | 'BENCHMARKS' | 'SPECS'
  const [activeTab, setActiveTab] = useState<'MONITOR' | 'PIPELINE' | 'BENCHMARKS' | 'SPECS'>('MONITOR');

  // Live Simulation States
  const [isInferenceActive, setIsInferenceActive] = useState<boolean>(true);
  const [activeCamera, setActiveCamera] = useState<string>('CAMERA_01 // HIGHWAY_CAM');
  const [isAlertFlashing, setIsAlertFlashing] = useState<boolean>(true);
  const [selectedDetection, setSelectedDetection] = useState<string | null>('PERSON: 0.91');

  // Real-time jittering telemetry numbers for hyper-realistic HUD feel
  const [fps, setFps] = useState<number>(45.2);
  const [cpuLoad, setCpuLoad] = useState<number>(42);
  const [vram, setVram] = useState<string>('1.1GB');
  const [latency, setLatency] = useState<number>(initialLatency);
  const [timestamp, setTimestamp] = useState<string>('02:14:15');

  // Log Feed
  const [logs, setLogs] = useState<string[]>([
    '[02:14:02] Camera-01 stream initialized.',
    '[02:14:03] ONNX runtime loading FP16 model quantized on-edge.',
    '[02:14:04] INFERENCE ACTIVE: fps_avg=45.2, latency_avg=14.2ms.',
    '[02:14:15] ALERT: Pedestrian detected (conf=0.91) in region A-2. Triggering Edge GPIO...',
    "[02:14:15] MQTT message published to 'alert/system/01'.",
  ]);

  const logContainerRef = useRef<HTMLDivElement>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Auto-update timestamp & subtle telemetry jitter
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      setTimestamp(timeStr);

      if (isInferenceActive) {
        // Minor dynamic jitter around 45.2 FPS and 14.5ms
        setFps(parseFloat((45.2 + (Math.random() * 0.8 - 0.4)).toFixed(1)));
        setLatency(parseFloat((14.5 + (Math.random() * 0.6 - 0.3)).toFixed(1)));
        setCpuLoad(Math.floor(42 + (Math.random() * 4 - 2)));
      }
    }, 1200);

    return () => clearInterval(timer);
  }, [isInferenceActive]);

  // Scroll to bottom of logs when updated
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Handle Trigger Manual Anomaly Alert
  const handleTriggerManualAlert = () => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    const newLogs = [
      ...logs,
      `[${timeStr}] ALERT: Hazard boundary breach (conf=0.94) in region A-2.`,
      `[${timeStr}] GPIO 18 set HIGH -> Industrial Relay energized.`,
      `[${timeStr}] MQTT publish -> 'alert/system/01' payload: {"zone": "A-2", "conf": 0.94, "lat": 13.8ms}`,
    ];
    setLogs(newLogs);
    setIsAlertFlashing(true);
  };

  const handleClearLogs = () => {
    setLogs([`[${new Date().toTimeString().split(' ')[0]}] System log buffer cleared.`]);
  };

  const handleCopySpec = () => {
    const specMarkdown = `### PROJECT: 02 // LOW-LATENCY EDGE AI ALERT SYSTEM
- Target Hardware: NVIDIA Jetson Nano / Raspberry Pi 4 (8GB) with Camera Module V2.
- Core Stack: PyTorch, YOLOv8 (nano/small), OpenCV, ONNX Runtime (CPU/EdgeGPU optimized), Mosquitto (MQTT), FastAPI.
- Inference Latency: 12ms to 18ms on-device using TensorRT/ONNX optimizations.
- Alert Response: < 50ms total latency from frame capture to MQTT-triggered IO/alert.
- Precision: 84.6% mAP@0.5 (FP16 Quantized)`;

    navigator.clipboard.writeText(specMarkdown);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className={`rounded-3xl border border-white/[0.12] bg-[#0b0f19]/95 backdrop-blur-2xl shadow-2xl p-4 sm:p-6 text-left ${className}`}>
      
      {/* Top Bar: Title, Project Badge, Status & Tab Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>PROJECT: 02 // EDGE AI</span>
            </span>
            <span className="font-mono text-[11px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md">
              YOLOv8-NANO ONNX FP16
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>LOW-LATENCY EDGE AI ALERT SYSTEM</span>
          </h3>
          <p className="text-slate-400 text-xs mt-1 max-w-2xl leading-relaxed">
            Edge-Deployed Computer Vision System for High-Speed Object Detection &amp; Local Real-Time Alert Triggering.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1.5 bg-black/40 border border-white/[0.08] p-1 rounded-xl self-start lg:self-center">
          <button
            onClick={() => setActiveTab('MONITOR')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'MONITOR'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="h-3.5 w-3.5" />
            <span>LIVE MONITOR HUD</span>
          </button>

          <button
            onClick={() => setActiveTab('PIPELINE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'PIPELINE'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>PIPELINE FLOW</span>
          </button>

          <button
            onClick={() => setActiveTab('BENCHMARKS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'BENCHMARKS'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>BENCHMARKS</span>
          </button>

          <button
            onClick={() => setActiveTab('SPECS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'SPECS'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>SPEC SHEET</span>
          </button>
        </div>
      </div>

      {/* 3 PERFORMANCE COMPARISON BENCHMARK STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3.5 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 to-transparent backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono mb-1">
            <span>PRECISION BENCHMARK</span>
            <span className="text-cyan-400">mAP@0.5</span>
          </div>
          <div className="text-2xl font-black text-white font-mono tracking-tight flex items-baseline gap-2">
            <span>84.6%</span>
            <span className="text-xs text-cyan-400 font-sans font-medium">FP16 Quantized</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Tiny 1.8% accuracy drop vs FP32 while doubling frames per second.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/20 to-transparent backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono mb-1">
            <span>INFERENCE LATENCY</span>
            <span className="text-emerald-400">&lt; 15ms GOAL</span>
          </div>
          <div className="text-2xl font-black text-white font-mono tracking-tight flex items-baseline gap-2">
            <span>{latency}ms</span>
            <span className="text-xs text-emerald-400 font-sans font-medium">On-Device Edge</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Sub-15ms frame budget on NVIDIA Jetson Nano / Raspberry Pi 4.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 to-transparent backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono mb-1">
            <span>POWER ENVELOPE</span>
            <span className="text-amber-400">PEAK EDGE</span>
          </div>
          <div className="text-2xl font-black text-white font-mono tracking-tight flex items-baseline gap-2">
            <span>~7.5W</span>
            <span className="text-xs text-amber-300 font-sans font-medium">5V / 3A DC Input</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Sustained autonomous deployment with zero thermal throttling.
          </p>
        </div>
      </div>

      {/* TAB 1: LIVE MONITOR HUD */}
      {activeTab === 'MONITOR' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Visual Camera Feed Panel (8 cols on lg) */}
            <div className="lg:col-span-8 flex flex-col space-y-3">
              {/* Camera Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="font-bold text-white tracking-wide">{activeCamera}</span>
                  <span className="text-[10px] text-slate-500 border border-white/10 px-1.5 py-0.5 rounded">
                    1080p@60FPS CSI-2
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-emerald-400">FPS: {fps}</span>
                  <span className="text-slate-400">CPU: {cpuLoad}%</span>
                  <span className="text-purple-400">VRAM: {vram}</span>
                  <span className="text-cyan-400 font-bold">LAT: {latency}ms</span>
                </div>
              </div>

              {/* Simulated Camera Feed Viewport */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/[0.12] bg-[#05070e] select-none shadow-[0_0_35px_rgba(0,0,0,0.8)]">
                
                {/* SVG Synthetic Scene (Highway / Crosswalk / Night Surveillance) */}
                <svg
                  viewBox="0 0 640 360"
                  className="w-full h-full object-cover"
                >
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#080c18" />
                      <stop offset="60%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#030712" />
                    </linearGradient>
                    <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#090d16" />
                    </linearGradient>
                    <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Horizon & Sky */}
                  <rect x="0" y="0" width="640" height="200" fill="url(#skyGrad)" />

                  {/* Distant City Skyline / Industrial Hub */}
                  <path
                    d="M 20 200 L 20 160 L 60 160 L 60 140 L 90 140 L 90 200 L 140 200 L 140 170 L 180 170 L 180 200 L 450 200 L 450 155 L 490 155 L 490 175 L 540 175 L 540 200 L 620 200"
                    fill="#1e1b4b"
                    opacity="0.5"
                  />

                  {/* Roadway Perspective */}
                  <polygon points="260,200 380,200 600,360 40,360" fill="url(#roadGrad)" />

                  {/* Lane Dividers */}
                  <line x1="320" y1="200" x2="320" y2="360" stroke="#facc15" strokeWidth="2.5" strokeDasharray="14 10" opacity="0.7" />
                  <line x1="280" y1="200" x2="160" y2="360" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="10 8" opacity="0.4" />
                  <line x1="360" y1="200" x2="480" y2="360" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="10 8" opacity="0.4" />

                  {/* Streetlamp Posts with Light Cones */}
                  <circle cx="110" cy="170" r="45" fill="url(#lampGlow)" />
                  <line x1="110" y1="170" x2="110" y2="290" stroke="#475569" strokeWidth="2" />
                  <circle cx="530" cy="170" r="45" fill="url(#lampGlow)" />
                  <line x1="530" y1="170" x2="530" y2="290" stroke="#475569" strokeWidth="2" />

                  {/* Simulated Moving Vehicle */}
                  <g className="transition-transform duration-700">
                    {/* Vehicle Body in Lane 1 */}
                    <rect x="340" y="220" width="120" height="65" rx="10" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
                    <rect x="360" y="210" width="70" height="25" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
                    {/* Headlights / Taillights */}
                    <circle cx="450" cy="265" r="4" fill="#ef4444" opacity="0.9" />
                    <circle cx="450" cy="235" r="4" fill="#ef4444" opacity="0.9" />
                    <circle cx="345" cy="265" r="5" fill="#fef08a" opacity="0.9" />
                    <circle cx="345" cy="235" r="5" fill="#fef08a" opacity="0.9" />
                  </g>

                  {/* Simulated Moving Pedestrian */}
                  <g>
                    {/* Head */}
                    <circle cx="150" cy="235" r="7" fill="#cbd5e1" />
                    {/* Torso */}
                    <line x1="150" y1="242" x2="150" y2="270" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
                    {/* Legs */}
                    <line x1="150" y1="270" x2="142" y2="295" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                    <line x1="150" y1="270" x2="158" y2="295" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                  </g>

                  {/* Camera Reticle & Alignment Crosshairs */}
                  <g stroke="#00f0ff" strokeWidth="1" opacity="0.25">
                    <circle cx="320" cy="180" r="40" fill="none" strokeDasharray="3 3" />
                    <line x1="320" y1="130" x2="320" y2="230" />
                    <line x1="270" y1="180" x2="370" y2="180" />
                    {/* Corner Markers */}
                    <path d="M 20 40 L 20 20 L 40 20" fill="none" strokeWidth="2" />
                    <path d="M 620 40 L 620 20 L 600 20" fill="none" strokeWidth="2" />
                    <path d="M 20 320 L 20 340 L 40 340" fill="none" strokeWidth="2" />
                    <path d="M 620 320 L 620 340 L 600 340" fill="none" strokeWidth="2" />
                  </g>
                </svg>

                {/* CRT Scanline Beam Animation */}
                <motion.div
                  animate={{ y: ['0%', '400%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
                  className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/[0.08] to-transparent pointer-events-none"
                />

                {/* Fine CRT Scanline Texture */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 4px)',
                  }}
                />

                {/* Camera Feed Watermark / Timestamp */}
                <div className="absolute top-3 left-3 font-mono text-[10px] text-cyan-400 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-cyan-500/30 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>EDGE_CV // STREAM_LIVE</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-white font-bold">{timestamp}</span>
                </div>

                {/* ACTIVE INFERENCE BOUNDING BOXES (Toggled by "Run Mock Inference") */}
                <AnimatePresence>
                  {isInferenceActive && (
                    <>
                      {/* Box 1: [PERSON: 0.91] */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedDetection('PERSON: 0.91')}
                        className="absolute cursor-pointer border-2 border-emerald-400 rounded-sm bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all hover:border-emerald-300"
                        style={{
                          left: '20%',
                          top: '58%',
                          width: '12%',
                          height: '32%',
                        }}
                      >
                        {/* Corner Reticles */}
                        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white" />
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white" />

                        {/* Tag Label */}
                        <div className="absolute -top-6 left-0 px-1.5 py-0.5 rounded-t bg-emerald-500 text-black font-mono text-[10px] font-black tracking-wider flex items-center gap-1 shadow-md whitespace-nowrap">
                          <span>[PERSON: 0.91]</span>
                          <span className="text-[9px] bg-black/20 px-1 rounded">A-2</span>
                        </div>
                      </motion.div>

                      {/* Box 2: [VEHICLE: 0.88] */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedDetection('VEHICLE: 0.88')}
                        className="absolute cursor-pointer border-2 border-cyan-400 rounded-sm bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all hover:border-cyan-300"
                        style={{
                          left: '52%',
                          top: '56%',
                          width: '26%',
                          height: '24%',
                        }}
                      >
                        {/* Corner Reticles */}
                        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white" />
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white" />

                        {/* Tag Label */}
                        <div className="absolute -top-6 left-0 px-1.5 py-0.5 rounded-t bg-cyan-400 text-black font-mono text-[10px] font-black tracking-wider flex items-center gap-1 shadow-md whitespace-nowrap">
                          <span>[VEHICLE: 0.88]</span>
                          <span className="text-[9px] bg-black/20 px-1 rounded">LANE-1</span>
                        </div>
                      </motion.div>

                      {/* Active Flashing Hazard Banner (Pedestrian detected in Zone A-2) */}
                      {isAlertFlashing && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl border border-rose-500/50 bg-rose-950/80 backdrop-blur-md text-white font-mono text-xs flex items-center justify-between shadow-[0_0_25px_rgba(244,63,94,0.4)]"
                        >
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-rose-400 animate-bounce" />
                            <div>
                              <strong className="text-rose-300 font-bold">HAZARD ALERT TRIGGERED:</strong>
                              <span className="ml-1 text-slate-200 text-[11px]">
                                Pedestrian in Zone A-2 (conf: 0.91) &bull; GPIO 18 Active &bull; MQTT &lt;50ms
                              </span>
                            </div>
                          </div>
                          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px]">
                            RELAY #01 ENGAGED
                          </span>
                        </motion.div>
                      )}
                    </>
                  )}
                </AnimatePresence>

                {/* When Inference is paused */}
                {!isInferenceActive && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center font-mono space-y-2">
                      <Pause className="h-8 w-8 text-amber-400 mx-auto opacity-80" />
                      <div className="text-sm font-bold text-white tracking-widest">
                        INFERENCE ENGINE PAUSED
                      </div>
                      <p className="text-xs text-slate-400">
                        Camera stream running in standby mode. Click &apos;Run Mock Inference&apos; to resume.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Feed Control Bar: Toggle Inference, Camera Selectors, Trigger Anomaly */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  {/* RUN MOCK INFERENCE TOGGLE BUTTON */}
                  <button
                    onClick={() => setIsInferenceActive(!isInferenceActive)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 shadow-lg ${
                      isInferenceActive
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20'
                        : 'bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/20'
                    }`}
                  >
                    {isInferenceActive ? (
                      <>
                        <Pause className="h-3.5 w-3.5" />
                        <span>[ INFERENCE RUNNING // TOGGLE ]</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        <span>[ RUN MOCK INFERENCE ]</span>
                      </>
                    )}
                  </button>

                  {/* Manual Alert Trigger Button */}
                  <button
                    onClick={handleTriggerManualAlert}
                    className="px-3 py-2 rounded-xl text-xs font-mono font-semibold bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition-all flex items-center gap-1.5"
                    title="Simulate edge event hazard detection"
                  >
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                    <span>TEST HAZARD ALERT</span>
                  </button>
                </div>

                {/* Camera Feed Switcher Buttons */}
                <div className="flex items-center gap-1 bg-black/40 border border-white/[0.08] p-1 rounded-xl">
                  {['CAMERA_01 // HIGHWAY_CAM', 'CAMERA_02 // PERIMETER', 'CAMERA_03 // CROSSWALK'].map((cam) => (
                    <button
                      key={cam}
                      onClick={() => setActiveCamera(cam)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                        activeCamera === cam
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cam.split(' // ')[1]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-Time "Log Feed" & Edge Device Status (4 cols on lg) */}
            <div className="lg:col-span-4 flex flex-col space-y-3">
              
              {/* Telemetry Summary Card */}
              <div className="p-3.5 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/[0.06] pb-2">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                    <span>JETSON NANO TELEMETRY</span>
                  </span>
                  <span className="text-emerald-400 font-bold">● ONLINE</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 block">DEVICE</span>
                    <span className="text-slate-200">Jetson Nano 4GB</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">FRAMEWORK</span>
                    <span className="text-slate-200">ONNX FP16</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">BROKER</span>
                    <span className="text-slate-200">Mosquitto (1883)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">ALERT BUS</span>
                    <span className="text-emerald-400">&lt; 50ms (QoS 1)</span>
                  </div>
                </div>
              </div>

              {/* REAL-TIME "LOG FEED" MONOSPACE COMPONENT */}
              <div className="flex-1 flex flex-col rounded-2xl border border-white/[0.08] bg-[#05070e] p-3.5 font-mono text-xs shadow-inner">
                {/* Log Terminal Header */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="text-slate-300 font-bold">EDGE_SYSTEM_LOGS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleClearLogs}
                      className="text-[10px] text-slate-500 hover:text-white transition-colors"
                      title="Clear log feed"
                    >
                      CLEAR
                    </button>
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                  </div>
                </div>

                {/* Log Stream Body */}
                <div
                  ref={logContainerRef}
                  className="space-y-1.5 overflow-y-auto max-h-56 pr-1 text-[11px] font-mono leading-relaxed"
                >
                  {logs.map((log, idx) => {
                    const isAlert = log.includes('ALERT:');
                    const isMqtt = log.includes('MQTT');
                    const isInit = log.includes('stream initialized');

                    return (
                      <div
                        key={idx}
                        className={`transition-all ${
                          isAlert
                            ? 'text-rose-400 font-bold bg-rose-500/10 p-1 rounded border-l-2 border-rose-500'
                            : isMqtt
                            ? 'text-purple-300'
                            : isInit
                            ? 'text-cyan-300'
                            : 'text-emerald-400/90'
                        }`}
                      >
                        {log}
                      </div>
                    );
                  })}
                </div>

                {/* Log Footer */}
                <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-500">
                  <span>Topic: &apos;alert/system/01&apos;</span>
                  <span className="text-emerald-400">Buffer: 0 dropped</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HARDWARE PIPELINE FLOW */}
      {activeTab === 'PIPELINE' && (
        <div className="py-2">
          <EdgeAiPipelineFlow />
        </div>
      )}

      {/* TAB 3: TELEMETRY METRICS VISUALIZER (INFERENCE TIME VS. ACCURACY) */}
      {activeTab === 'BENCHMARKS' && (
        <div className="py-2">
          <EdgeAiScatterChart />
        </div>
      )}

      {/* TAB 4: ARCHITECTURE SPECIFICATION MARKDOWN SPEC-SHEET */}
      {activeTab === 'SPECS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                ARCHITECTURE SPECIFICATION (MARKDOWN SPEC-SHEET)
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Target hardware, neural stack, latency budgets, and MQTT alert bus topology.
              </p>
            </div>

            <button
              onClick={handleCopySpec}
              className="px-3 py-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all flex items-center gap-1.5"
            >
              {copiedCode ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>COPY SPEC</span>
                </>
              )}
            </button>
          </div>

          {/* Markdown Spec Table & Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl border border-white/[0.08] bg-black/40 space-y-3 font-mono text-xs">
              <span className="text-cyan-400 font-bold block border-b border-white/[0.06] pb-1.5">
                1. HARDWARE &amp; ACCELERATION TARGETS
              </span>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <strong className="text-white">Target Hardware:</strong> NVIDIA Jetson Nano / Raspberry Pi 4 (8GB) with Camera Module V2 (Sony IMX219 sensor).
                </li>
                <li>
                  <strong className="text-white">Inference Engine:</strong> ONNX Runtime 1.18 (CPU/EdgeGPU optimized) &amp; TensorRT FP16 Execution Provider.
                </li>
                <li>
                  <strong className="text-white">Neural Model:</strong> YOLOv8-nano (3.2M parameters, 8.7 GFLOPs at 640x640 resolution).
                </li>
                <li>
                  <strong className="text-white">Operating Voltage:</strong> 5V/3A DC Barrel Jack, ~7.5W max under peak GPU inference load.
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.08] bg-black/40 space-y-3 font-mono text-xs">
              <span className="text-purple-400 font-bold block border-b border-white/[0.06] pb-1.5">
                2. LATENCY &amp; ALERT RESPONSE BUDGETS
              </span>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <strong className="text-white">Inference Latency:</strong> 12ms to 18ms on-device using TensorRT/ONNX optimizations (avg 14.5ms).
                </li>
                <li>
                  <strong className="text-white">Alert Response:</strong> &lt; 50ms total latency from frame capture to MQTT-triggered IO/alert.
                </li>
                <li>
                  <strong className="text-white">Precision Benchmark:</strong> 84.6% mAP@0.5 (FP16 quantization retains 98% of full precision).
                </li>
                <li>
                  <strong className="text-white">Communication Bus:</strong> Eclipse Mosquitto (MQTT QoS 1), topic &apos;alert/system/01&apos; with GPIO 18 trigger.
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 p-4 rounded-xl border border-white/[0.08] bg-black/40 font-mono text-xs space-y-2">
              <span className="text-emerald-400 font-bold block border-b border-white/[0.06] pb-1.5">
                3. MQTT TELEMETRY JSON SCHEMA
              </span>
              <pre className="p-3 rounded-lg bg-[#05070e] border border-white/[0.06] text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
{`{
  "timestamp": "2026-10-25T16:45:02.124Z",
  "camera_id": "CAMERA_01",
  "zone": "REGION_A2_CROSSWALK",
  "alert_type": "PEDESTRIAN_HAZARD",
  "confidence": 0.914,
  "bounding_box": [120, 80, 180, 320],
  "telemetry": {
    "inference_ms": 14.2,
    "fps": 45.2,
    "quantization": "FP16_ONNX",
    "hardware_power_w": 7.42
  },
  "action": {
    "gpio_pin": 18,
    "gpio_state": "HIGH",
    "relay_duration_ms": 1500
  }
}`}
              </pre>
            </div>

          </div>
        </div>
      )}

      {/* Footer Info & GitHub Link */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          <span>Repository: <strong className="text-slate-200">BELALANSARI07/-Low-Latency-Edge-AI-Alert-System.</strong></span>
        </div>

        <a
          href="https://github.com/BELALANSARI07/-Low-Latency-Edge-AI-Alert-System."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 hover:underline font-semibold"
        >
          <span>Open GitHub Edge Repository</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

    </div>
  );
}
