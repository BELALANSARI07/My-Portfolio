import { Project } from '@/types/database.types';

export interface EnrichedProject extends Project {
  what_is_it_for: string;
}

export const PORTFOLIO_PROJECTS: EnrichedProject[] = [
  {
    id: 'prj-railway',
    slug: 'edge-ai-railway-safety-system',
    title: 'Edge AI Railway Safety & Emergency Stop System',
    tagline: 'Autonomous computer vision hazard detection and emergency braking system for railway corridors.',
    what_is_it_for: 'Designed to prevent catastrophic railway track accidents and collisions. The system uses high-speed edge computer vision (YOLOv8) combined with ultrasonic distance sensors to monitor railway tracks in real time, distinguish between humans, animals, vehicles, and debris, and automatically trigger emergency braking protocols with instant IoT telemetry.',
    architecture_summary: 'Constructed using YOLOv8 trained on railway track anomaly datasets deployed to edge hardware with ESP32 microcontrollers. Features optical flow smoothing to prevent false-positive emergency stops and transmits instantaneous emergency stop commands to train brake relays and telemetry dashboards over MQTT.',
    architecture_diagram: null,
    stack: ['YOLOv8', 'Python', 'OpenCV', 'ESP32', 'Ultrasonic Sensing', 'FastAPI', 'MQTT', 'IoT'],
    metrics: [
      { label: 'Hazard Detection AP', value: '94.8%' },
      { label: 'Brake Trigger Latency', value: '22ms' },
      { label: 'False Positive Rate', value: '0.12%' },
    ],
    repo_url: 'https://github.com/BELALANSARI07/Edge-AI-Railway-Safety-System',
    live_url: null,
    paper_url: null,
    model_weights_url: null,
    status: 'PRODUCTION',
    featured: true,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prj-edge-alert',
    slug: 'low-latency-edge-ai-alert-system',
    title: 'Low-Latency Edge AI Alert System',
    tagline: 'Quantized real-time anomaly detection and alert dispatch pipeline optimized for edge compute hardware.',
    what_is_it_for: 'Developing an optimized computer vision pipeline to process real-time camera streams on low-power edge hardware (such as Raspberry Pi and Jetson devices). It runs quantized lightweight neural architectures at sub-15ms per frame to trigger instant local alerts without relying on external cloud connectivity.',
    architecture_summary: 'Targeted for edge environments where cloud latency and internet unreliability are unacceptable. The system ingests 60 FPS video streams, performs on-device resizing, executes FP16/INT8-quantized YOLOv8-nano inference via ONNX Runtime / TensorRT (sub-15ms), runs local NMS post-processing, and triggers instant MQTT telemetry alerts.',
    architecture_diagram: null,
    stack: ['PyTorch', 'YOLOv8', 'OpenCV', 'ONNX Runtime', 'Mosquitto (MQTT)', 'FastAPI', 'TensorRT'],
    metrics: [
      { label: 'Model Engine', value: 'ONNX / TensorRT' },
      { label: 'Target Latency', value: '< 15ms' },
      { label: 'Alert Protocol', value: 'MQTT / WebSockets' },
    ],
    repo_url: 'https://github.com/BELALANSARI07/Low-Latency-Edge-AI-Alert-System.',
    live_url: null,
    paper_url: null,
    model_weights_url: null,
    status: 'PRODUCTION',
    featured: true,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prj-rag',
    slug: 'multimodal-rag-knowledge-engine',
    title: 'Multi-Modal RAG Knowledge Engine',
    tagline: 'Hybrid semantic retrieval engine for complex vision-language documents, technical diagrams, and dense vector search.',
    what_is_it_for: 'Built to solve the limitations of standard text-only RAG when analyzing technical engineering documents, blueprints, and charts. It ingests complex multimodal PDFs, embeds both visual layout and textual context into vector space, and uses cross-encoder reranking to provide precise, verifiable answers.',
    architecture_summary: 'Multi-modal indexing pipeline using ColPali / BGE multi-vector late-interaction embeddings with Qdrant vector storage. Ingests raw document pages as visual patches, eliminating brittle OCR extraction, and passes retrieved context to multimodal LLMs with source citations.',
    architecture_diagram: null,
    stack: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Qdrant', 'ColPali', 'Transformers', 'ChromaDB'],
    metrics: [
      { label: 'P95 Query Latency', value: '184ms' },
      { label: 'Recall@5', value: '92.4%' },
      { label: 'Context Dimension', value: '1024-d' },
    ],
    repo_url: 'https://github.com/BELALANSARI07/Multi-Modal-RAG-Knowledge-Engine',
    live_url: null,
    paper_url: null,
    model_weights_url: null,
    status: 'PRODUCTION',
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
    what_is_it_for: 'Built to save lives during critical crisis events (floods, earthquakes, storms) by eliminating emergency response chaos. It provides real-time SOS tracking, interactive shelter and resource mapping, and AI-assisted supply triage to help rescue teams reach stranded victims faster.',
    architecture_summary: 'Real-time incident response architecture combining geospatial mapping (GeoJSON / Leaflet), WebSocket-driven SOS status updates, and AI priority ranking algorithms to prevent duplicate rescue efforts and coordinate emergency supplies.',
    architecture_diagram: null,
    stack: ['Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'WebSockets', 'GeoJSON', 'Tailwind CSS'],
    metrics: [
      { label: 'SOS Dispatch Latency', value: '< 500ms' },
      { label: 'Coordination Efficiency', value: '+40%' },
      { label: 'Architecture', value: 'Resilient PWA' },
    ],
    repo_url: 'https://github.com/BELALANSARI07/relieflink-ai',
    live_url: null,
    paper_url: null,
    model_weights_url: null,
    status: 'PRODUCTION',
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

  // Filter dbProjects to only those matching our confirmed active portfolio projects
  const activeSlugs = new Set(PORTFOLIO_PROJECTS.map((p) => p.slug));

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
        what_is_it_for: (match as any).what_is_it_for || curated.what_is_it_for,
        repo_url: curated.repo_url, // Preserve curated GitHub repo
        live_url: match.live_url || curated.live_url,
        stack: match.stack && match.stack.length > 0 ? match.stack : curated.stack,
        metrics: match.metrics && match.metrics.length > 0 ? match.metrics : curated.metrics,
      });
    } else {
      enriched.push(curated);
    }
  });

  return enriched.sort((a, b) => a.display_order - b.display_order);
}
