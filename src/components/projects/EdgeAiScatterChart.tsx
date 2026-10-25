'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Activity, Info, Sparkles, Cpu } from 'lucide-react';

interface ModelBenchmark {
  id: string;
  name: string;
  quantization: 'FP32' | 'FP16' | 'INT8';
  latency: number; // in ms
  map50: number; // in %
  params: string;
  power: string;
  deployed?: boolean;
  notes: string;
}

const BENCHMARKS: ModelBenchmark[] = [
  {
    id: 'yolov8n-int8',
    name: 'YOLOv8 Nano (INT8)',
    quantization: 'INT8',
    latency: 10.4,
    map50: 81.2,
    params: '3.2M',
    power: '6.2W',
    notes: 'Quantized INT8 engine via TensorRT calibration. Ultra-low latency, slight loss in mAP.',
  },
  {
    id: 'yolov8n-fp16',
    name: 'YOLOv8 Nano (FP16)',
    quantization: 'FP16',
    latency: 14.5,
    map50: 84.6,
    params: '3.2M',
    power: '7.5W',
    deployed: true,
    notes: 'CURRENT DEPLOYED SYSTEM: The ideal edge sweetspot. High 84.6% mAP with 14.5ms sub-frame latency.',
  },
  {
    id: 'yolov5-tiny',
    name: 'YOLOv5 Tiny (FP16)',
    quantization: 'FP16',
    latency: 16.2,
    map50: 78.4,
    params: '7.5M',
    power: '8.1W',
    notes: 'Legacy tiny backbone. Slower than v8-nano and scores lower precision.',
  },
  {
    id: 'yolov8s-fp16',
    name: 'YOLOv8 Small (FP16)',
    quantization: 'FP16',
    latency: 24.8,
    map50: 86.8,
    params: '11.2M',
    power: '9.8W',
    notes: 'Slightly higher mAP (+2.2%) but breaks 15ms hard latency budget on embedded Jetson.',
  },
  {
    id: 'yolov8m-fp32',
    name: 'YOLOv8 Medium (FP32)',
    quantization: 'FP32',
    latency: 48.0,
    map50: 89.1,
    params: '25.9M',
    power: '14.2W',
    notes: 'Standard FP32 format. Exceeds edge thermal and power envelopes.',
  },
  {
    id: 'yolov8x-fp32',
    name: 'YOLOv8 Extra-Large (FP32)',
    quantization: 'FP32',
    latency: 82.5,
    map50: 91.2,
    params: '68.2M',
    power: '22.0W',
    notes: 'Server-grade model. Infeasible for battery/edge deployment (<12 FPS).',
  },
];

export default function EdgeAiScatterChart() {
  const [selectedModel, setSelectedModel] = useState<ModelBenchmark>(
    BENCHMARKS.find((b) => b.deployed) || BENCHMARKS[1]
  );
  const [hoveredModel, setHoveredModel] = useState<ModelBenchmark | null>(null);

  // SVG Chart bounds
  const minX = 5;
  const maxX = 90;
  const minY = 75;
  const maxY = 95;

  const width = 640;
  const height = 300;
  const padding = { top: 30, right: 30, bottom: 45, left: 55 };

  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const scaleX = (latency: number) => padding.left + ((latency - minX) / (maxX - minX)) * plotW;
  const scaleY = (map50: number) => padding.top + plotH - ((map50 - minY) / (maxY - minY)) * plotH;

  const activeModel = hoveredModel || selectedModel;

  return (
    <div className="space-y-4">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-cyan-400" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            INFERENCE TIME VS. ACCURACY (QUANTIZATION TRADEOFF)
          </h4>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <strong className="text-emerald-400">Deployed Target (&lt;15ms)</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-purple-400" />
            <span>Candidate Models</span>
          </span>
        </div>
      </div>

      {/* SVG Interactive Plot */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md p-2 overflow-hidden">
        {/* Subtle grid gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-purple-500/5 to-transparent pointer-events-none" />

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
        >
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#a855f7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
            </linearGradient>
            <radialGradient id="highlightGlow">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid lines (Latency / X) */}
          {[15, 30, 45, 60, 75].map((val) => {
            const x = scaleX(val);
            return (
              <g key={`x-${val}`}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={padding.top + plotH}
                  stroke="#ffffff"
                  strokeOpacity="0.07"
                  strokeDasharray="4 4"
                />
                <text
                  x={x}
                  y={height - 18}
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {val}ms
                </text>
              </g>
            );
          })}

          {/* 15ms Target Hard-Limit Threshold Line */}
          <line
            x1={scaleX(15)}
            y1={padding.top}
            x2={scaleX(15)}
            y2={padding.top + plotH}
            stroke="#10b981"
            strokeOpacity="0.6"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text
            x={scaleX(15) - 6}
            y={padding.top + 14}
            fill="#10b981"
            fontSize="9"
            fontFamily="monospace"
            textAnchor="end"
            fontWeight="bold"
          >
            TARGET 15ms MAX
          </text>

          {/* Grid lines (Accuracy / Y) */}
          {[78, 82, 86, 90].map((val) => {
            const y = scaleY(val);
            return (
              <g key={`y-${val}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + plotW}
                  y2={y}
                  stroke="#ffffff"
                  strokeOpacity="0.07"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Axes Titles */}
          <text
            x={padding.left + plotW / 2}
            y={height - 2}
            fill="#cbd5e1"
            fontSize="10"
            fontFamily="monospace"
            textAnchor="middle"
            letterSpacing="1"
          >
            INFERENCE LATENCY (ms) → LOWER IS FASTER
          </text>
          <text
            transform={`rotate(-90)`}
            x={-(padding.top + plotH / 2)}
            y={14}
            fill="#cbd5e1"
            fontSize="10"
            fontFamily="monospace"
            textAnchor="middle"
            letterSpacing="1"
          >
            PRECISION mAP@0.5 (%)
          </text>

          {/* Trend line through models */}
          <path
            d={`M ${scaleX(10.4)} ${scaleY(81.2)} Q ${scaleX(20)} ${scaleY(85)}, ${scaleX(24.8)} ${scaleY(86.8)} T ${scaleX(82.5)} ${scaleY(91.2)}`}
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth="2"
            strokeDasharray="5 3"
            opacity="0.6"
          />

          {/* Data Points */}
          {BENCHMARKS.map((m) => {
            const cx = scaleX(m.latency);
            const cy = scaleY(m.map50);
            const isSelected = activeModel.id === m.id;
            const isDeployed = m.deployed;

            return (
              <g
                key={m.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredModel(m)}
                onMouseLeave={() => setHoveredModel(null)}
                onClick={() => setSelectedModel(m)}
              >
                {/* Deployed Pulse Ring */}
                {isDeployed && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 18 : 14}
                    fill="url(#highlightGlow)"
                    className="animate-ping opacity-40"
                  />
                )}

                {/* Outer halo on hover */}
                {isSelected && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="12"
                    fill={isDeployed ? '#00f0ff22' : '#a855f722'}
                    stroke={isDeployed ? '#00f0ff' : '#a855f7'}
                    strokeWidth="1.5"
                  />
                )}

                {/* Point Circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isDeployed ? 7 : 5}
                  fill={isDeployed ? '#10b981' : isSelected ? '#a855f7' : '#818cf8'}
                  stroke="#0b0f19"
                  strokeWidth="2"
                  className="transition-all duration-200"
                />

                {/* Model Tag on hover/deployed */}
                {(isDeployed || isSelected) && (
                  <text
                    x={cx}
                    y={cy - 12}
                    fill={isDeployed ? '#34d399' : '#c084fc'}
                    fontSize="9.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {m.name.split(' ')[0]} {m.quantization}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Model Spec Card Detail (Floating or Docked) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModel.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
          className={`p-4 rounded-xl border ${
            activeModel.deployed
              ? 'border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
              : 'border-white/[0.1] bg-white/[0.03]'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm tracking-wide">
                {activeModel.name}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  activeModel.quantization === 'INT8'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : activeModel.quantization === 'FP16'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}
              >
                {activeModel.quantization} QUANTIZATION
              </span>
              {activeModel.deployed && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold">
                  ★ DEPLOYED ON-DEVICE
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-300">
                Latency:{' '}
                <strong className={activeModel.latency <= 15 ? 'text-emerald-400' : 'text-amber-400'}>
                  {activeModel.latency}ms
                </strong>
              </span>
              <span className="text-slate-300">
                Precision: <strong className="text-cyan-400">{activeModel.map50}% mAP</strong>
              </span>
              <span className="text-slate-300">
                Power: <strong className="text-purple-400">{activeModel.power}</strong>
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {activeModel.notes}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
