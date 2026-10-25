'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Maximize2, 
  Cpu, 
  Sliders, 
  Radio, 
  BellRing, 
  ChevronRight, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';

interface PipelineNode {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: any;
  accent: string;
  borderGlow: string;
  specs: {
    technology: string;
    throughputOrLatency: string;
    details: string;
    hardwareTarget: string;
  };
}

const PIPELINE_NODES: PipelineNode[] = [
  {
    id: 'node-video',
    number: '01',
    title: 'VIDEO FEED (60 FPS)',
    subtitle: 'CSI-2 / RTSP Camera',
    icon: Camera,
    accent: 'text-cyan-400',
    borderGlow: 'hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]',
    specs: {
      technology: 'Sony IMX219 (Raspberry Pi Cam V2 / CSI-2)',
      throughputOrLatency: '60 FPS @ 1080p raw NV12 / Bayer',
      details: 'Zero-copy DMA ring-buffer in kernel memory to minimize frame drop during peak GPU bursts.',
      hardwareTarget: 'Jetson Nano 2-lane MIPI CSI-2 interface',
    },
  },
  {
    id: 'node-resize',
    number: '02',
    title: 'ON-DEVICE RESIZING',
    subtitle: 'V4L2 & OpenCV CUDA',
    icon: Maximize2,
    accent: 'text-blue-400',
    borderGlow: 'hover:border-blue-400/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]',
    specs: {
      technology: 'Hardware OpenCV CUDA / V4L2 scaler',
      throughputOrLatency: '1.2ms processing budget',
      details: 'Converts native sensor NV12 directly into 640x640x3 Float16 tensor with normalized [0, 1] range.',
      hardwareTarget: 'On-chip VIC (Video Image Compositor)',
    },
  },
  {
    id: 'node-inference',
    number: '03',
    title: 'YOLOv8-NANO INFERENCE',
    subtitle: 'ONNX Runtime / TensorRT',
    icon: Cpu,
    accent: 'text-purple-400',
    borderGlow: 'hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]',
    specs: {
      technology: 'ONNX Runtime 1.18 + TensorRT FP16 Engine',
      throughputOrLatency: '12ms to 18ms latency (avg 14.5ms)',
      details: 'Lightweight YOLOv8-nano neural backbone (3.2M params). FP16 precision maintains 84.6% mAP@0.5.',
      hardwareTarget: '128-core NVIDIA Maxwell GPU / ARM NEON',
    },
  },
  {
    id: 'node-postproc',
    number: '04',
    title: 'POST-PROCESSING',
    subtitle: 'Vectorized NMS & Thresholds',
    icon: Sliders,
    accent: 'text-emerald-400',
    borderGlow: 'hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]',
    specs: {
      technology: 'Cython-accelerated Non-Max Suppression',
      throughputOrLatency: '1.8ms execution budget',
      details: 'IoU threshold 0.45, detection confidence filter ≥ 0.85, and polygonal zone intersection filtering.',
      hardwareTarget: 'Quad-Core ARM Cortex-A57 (CPU threads)',
    },
  },
  {
    id: 'node-mqtt',
    number: '05',
    title: 'MQTT ALERTS TRIGGER',
    subtitle: 'Mosquitto Broker + GPIO',
    icon: Radio,
    accent: 'text-amber-400',
    borderGlow: 'hover:border-amber-400/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]',
    specs: {
      technology: 'Eclipse Mosquitto MQTT Broker (QoS 1)',
      throughputOrLatency: '3.4ms local socket publish',
      details: "Publishes JSON alert payload to 'alert/system/01' topic and sets GPIO 18 HIGH for 5V industrial relays.",
      hardwareTarget: 'Local Unix Socket & 40-pin GPIO Header',
    },
  },
  {
    id: 'node-hubs',
    number: '06',
    title: 'USER HUBS & SIRENS',
    subtitle: 'Real-Time Edge Response',
    icon: BellRing,
    accent: 'text-rose-400',
    borderGlow: 'hover:border-rose-400/60 hover:shadow-[0_0_20px_rgba(244,63,94,0.25)]',
    specs: {
      technology: 'FastAPI WebSockets + Strobe Sirens',
      throughputOrLatency: '< 50ms Total Loop Response',
      details: 'Local field operators receive sub-second visual alerts, audio sirens, and immediate telemetry snapshot.',
      hardwareTarget: 'Command Dashboard & Physical Alarm Sirens',
    },
  },
];

export default function EdgeAiPipelineFlow() {
  const [activeTooltip, setActiveTooltip] = useState<PipelineNode | null>(null);

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-purple-400" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            HARDWARE PIPELINE DIAGRAM (END-TO-END LATENCY &lt; 50ms)
          </h4>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Hover any stage to inspect hardware &amp; kernel specs
        </span>
      </div>

      {/* Interactive Horizontal Pipeline Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
        {PIPELINE_NODES.map((node, index) => {
          const IconComponent = node.icon;
          const isHovered = activeTooltip?.id === node.id;

          return (
            <motion.div
              key={node.id}
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={() => setActiveTooltip(node)}
              onMouseLeave={() => setActiveTooltip(null)}
              className={`relative p-3.5 rounded-xl border border-white/[0.08] bg-[#0b0f19]/90 backdrop-blur-xl transition-all cursor-pointer flex flex-col justify-between ${node.borderGlow} ${
                isHovered ? 'border-white/40 ring-1 ring-white/20' : ''
              }`}
            >
              {/* Step Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-slate-500 font-bold">
                  STAGE {node.number}
                </span>
                <IconComponent className={`h-4 w-4 ${node.accent}`} />
              </div>

              {/* Node Title & Subtitle */}
              <div>
                <h5 className="font-mono text-[11px] font-bold text-white tracking-tight leading-tight line-clamp-2">
                  {node.title}
                </h5>
                <p className="font-sans text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  {node.subtitle}
                </p>
              </div>

              {/* Connecting Laser Arrow (Visual connector between cards) */}
              {index < PIPELINE_NODES.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-600 pointer-events-none">
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Floating Detailed Spec Tooltip / Inspector */}
      <AnimatePresence>
        {activeTooltip ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="p-4 rounded-xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-xl shadow-[0_0_25px_rgba(168,85,247,0.15)] space-y-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-purple-500/20 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold">
                  STAGE {activeTooltip.number} SPEC
                </span>
                <span className="text-white font-bold text-xs font-mono">
                  {activeTooltip.title}
                </span>
              </div>
              <span className="text-emerald-400 font-mono text-xs font-semibold">
                ⏱ {activeTooltip.specs.throughputOrLatency}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs pt-1 font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">ENGINEERING STACK:</span>
                <span className="text-slate-200 text-[11px]">{activeTooltip.specs.technology}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">HARDWARE TARGET:</span>
                <span className="text-slate-200 text-[11px]">{activeTooltip.specs.hardwareTarget}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">SUBSYSTEM FUNCTION:</span>
                <span className="text-slate-300 text-[11px] font-sans">{activeTooltip.specs.details}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="p-3 rounded-xl border border-white/[0.05] bg-white/[0.01] text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span>Hover on any pipeline stage to view hardware execution parameters &amp; kernel specs.</span>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
