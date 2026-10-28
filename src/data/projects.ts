import { Project } from '@/types/database.types';

export interface EnrichedProject extends Project {
  what_is_it_for: string;
  target_goals: string[];
}

export const PORTFOLIO_PROJECTS: EnrichedProject[] = [
  {
    id: 'prj-railway',
    slug: 'edge-ai-railway-safety-system',
    title: 'Edge AI Railway Safety & Emergency Stop System',
    tagline: 'Autonomous computer vision hazard detection and emergency braking control for railway tracks.',
    what_is_it_for: 'Designed to prevent railway track accidents and collisions. The system uses real-time computer vision to monitor track corridors, distinguish between people, animals, and vehicles, validate obstacle distance using ultrasonic sensing to prevent false positives, and automatically trigger emergency stop commands to the train controller.',
    architecture_summary: 'Combines computer vision with an embedded hardware prototype. Uses YOLOv8 for visual obstacle classification, track corridor polygon geometry to confirm if an obstacle is on the track, HC-SR04 ultrasonic distance sensing for physical proximity validation, and sends stop signals to an ESP32 microcontroller and L298N motor driver with live incident logging. Selected as a Finalist at Makers Conclave by NIAT.',
    architecture_diagram: null,
    stack: ['Python', 'YOLOv8', 'OpenCV', 'ESP32', 'Ultrasonic Sensing', 'L298N Motor Driver', 'NumPy'],
    target_goals: [
      'Corridor Hazard Detection',
      'Ultrasonic Distance Verification',
      'ESP32 Automated Braking',
      'Live Incident Logging',
    ],
    metrics: [],
    repo_url: 'https://github.com/BELALANSARI07/Edge-AI-Railway-Safety-System',
    live_url: null,
    paper_url: null,
    model_weights_url: null,
    status: 'PROTOTYPE',
    featured: true,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prj-edge-alert',
    slug: 'low-latency-edge-ai-alert-system',
    title: 'Low-Latency Edge AI Alert System',
    tagline: 'Local-first edge computer vision and real-time alerting pipeline prototype for low-power hardware.',
    what_is_it_for: 'Built to provide a local-first computer vision and alert dispatch pipeline designed to run on low-power edge hardware (such as Raspberry Pi and Jetson platforms). The objective is to detect anomalies and dispatch immediate local alerts without depending on external cloud connectivity or suffering network latency.',
    architecture_summary: 'Audited, test-driven Python application featuring video ingestion with auto-reconnection, letterbox preprocessing, ONNX Runtime CPU inference for YOLOv8, pure NumPy vectorized Non-Maximum Suppression (NMS), SQLite alert history persistence, MQTT telemetry dispatch with cooldown suppression, and simulated GPIO fail-safe transitions. Backed by 49 automated unit and functional tests.',
    architecture_diagram: null,
    stack: ['Python', 'FastAPI', 'YOLOv8', 'ONNX Runtime', 'OpenCV', 'NumPy', 'MQTT (Mosquitto)', 'SQLite', 'Docker'],
    target_goals: [
      'Local On-Device Inference',
      'Zero Cloud Dependency',
      'Vectorized NumPy NMS',
      'MQTT Cooldown Telemetry',
      'Fail-Safe GPIO Relays',
    ],
    metrics: [],
    repo_url: 'https://github.com/BELALANSARI07/Low-Latency-Edge-AI-Alert-System.',
    live_url: null,
    paper_url: null,
    model_weights_url: null,
    status: 'PROTOTYPE',
    featured: true,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prj-rag',
    slug: 'multimodal-rag-knowledge-engine',
    title: 'Multi-Modal RAG Knowledge Engine',
    tagline: 'Asynchronous multi-modal retrieval engine for technical PDFs containing text, tables, and visual graphics.',
    what_is_it_for: 'Built to solve the limitation of standard text-only RAG systems when analyzing complex technical documents. It extracts embedded charts, architectural diagrams, and figures alongside narrative text, synthesizes visual descriptions using Vision-Language Models (VLMs), and indexes both into a unified vector space for grounded question answering with verifiable citations.',
    architecture_summary: 'Asynchronous FastAPI knowledge engine that parses complex multi-page PDFs using PyMuPDF, chunks narrative text with boundary-aware sliding windows, extracts and normalizes graphics, synthesizes dense visual descriptions via Gemini 1.5 Flash / GPT-4o-mini (with deterministic offline local fallbacks), maps text and visuals into a unified 384-dimensional vector space using all-MiniLM-L6-v2, and retrieves context from persistent ChromaDB with relevance guardrails. Backed by 68 automated tests.',
    architecture_diagram: null,
    stack: ['Python', 'FastAPI', 'ChromaDB', 'PyMuPDF', 'all-MiniLM-L6-v2', 'Gemini API', 'OpenAI API', 'Docker'],
    target_goals: [
      'First-Class Visual Extraction',
      'VLM Figure Summarization',
      'Unified 384-d Vector Store',
      'Grounded Source Citations',
      'Offline Local Fallback',
    ],
    metrics: [],
    repo_url: 'https://github.com/BELALANSARI07/Multi-Modal-RAG-Knowledge-Engine',
    live_url: null,
    paper_url: null,
    model_weights_url: null,
    status: 'RESEARCH',
    featured: true,
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prj-relieflink',
    slug: 'relieflink-ai',
    title: 'ReliefLink AI – Disaster Response Platform',
    tagline: 'Emergency coordination platform connecting agencies, volunteers, and citizens during natural disasters.',
    what_is_it_for: 'Designed to improve humanitarian response during natural disasters (floods, earthquakes, storms) by eliminating emergency communication chaos. It aims to provide centralized real-time SOS tracking, interactive shelter and resource mapping, and volunteer dispatching to help rescue teams reach stranded victims faster.',
    architecture_summary: 'Open-source humanitarian proposal and architectural framework focused on real-time incident coordination. Designed for rapid citizen SOS reporting, geolocation-based supply and shelter mapping, automated volunteer coordination, and duplicate incident suppression during critical crisis events.',
    architecture_diagram: null,
    stack: ['System Architecture', 'Disaster Intelligence', 'Emergency Coordination', 'Open Source'],
    target_goals: [
      'Real-Time SOS Incident Tracking',
      'Geospatial Shelter & Resource Map',
      'Multi-Agency Volunteer Coordination',
      'Crisis Communication Hub',
    ],
    metrics: [],
    repo_url: 'https://github.com/BELALANSARI07/relieflink-ai',
    live_url: null,
    paper_url: null,
    model_weights_url: null,
    status: 'RESEARCH',
    featured: true,
    display_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Helper to merge DB projects with rich local repository URLs and explanations
export function mergeWithEnrichedProjects(dbProjects: Project[]): EnrichedProject[] {
  if (!dbProjects || dbProjects.length === 0) {
    return PORTFOLIO_PROJECTS;
  }

  const enriched: EnrichedProject[] = [];

  PORTFOLIO_PROJECTS.forEach((curated) => {
    const match = dbProjects.find(
      (p) =>
        p.slug === curated.slug ||
        p.title.toLowerCase().includes(curated.title.toLowerCase().slice(0, 10)) ||
        curated.title.toLowerCase().includes(p.title.toLowerCase().slice(0, 10))
    );

    if (match) {
      enriched.push({
        ...curated,
        ...match,
        what_is_it_for: curated.what_is_it_for,
        target_goals: curated.target_goals,
        repo_url: curated.repo_url,
        live_url: match.live_url || curated.live_url,
        stack: curated.stack,
        metrics: [],
      });
    } else {
      enriched.push(curated);
    }
  });

  return enriched.sort((a, b) => a.display_order - b.display_order);
}
