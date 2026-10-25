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
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prj-edge-alert',
    slug: 'low-latency-edge-ai-alert-system',
    title: 'Low-Latency Edge AI Alert System',
    tagline: 'Quantized real-time anomaly telemetry and alert dispatch system optimized for low-power edge hardware.',
    what_is_it_for: 'Engineered for edge environments where cloud latency and internet unreliability are unacceptable (industrial IoT, security surveillance, and mission-critical edge hubs). It executes quantized neural models on-device and streams sub-15ms WebSocket hazard broadcasts to monitoring operators.',
    architecture_summary: 'Deploys INT8-quantized TensorRT and ONNX runtime models on low-power edge compute. Integrates zero-copy shared memory queues in C++ with asynchronous FastAPI WebSockets for immediate anomaly telemetry broadcasts.',
    architecture_diagram: null,
    stack: ['TensorRT', 'ONNX Runtime', 'C++', 'Python', 'WebSockets', 'FastAPI', 'OpenCV', 'Redis'],
    metrics: [
      { label: 'Inference Latency', value: '8.6ms' },
      { label: 'Throughput', value: '118 FPS' },
      { label: 'Memory Footprint', value: '340MB' },
    ],
    repo_url: 'https://github.com/BELALANSARI07/-Low-Latency-Edge-AI-Alert-System.',
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
    id: 'prj-spendsmart',
    slug: 'spendsmart-ai',
    title: 'SpendSmart – AI Personal Finance Assistant',
    tagline: 'Interactive personal finance and budgeting assistant powered by Google Gemini API.',
    what_is_it_for: 'Helps students and young earners make smarter financial decisions by analyzing daily spending patterns, automatically categorizing expenses, distinguishing needs vs. wants, and delivering customized savings strategies through a friendly, responsive AI interface.',
    architecture_summary: 'Full-stack web application leveraging Next.js and Google Gemini API for structured semantic extraction from receipt logs and natural language expense descriptions. Features real-time visual charts, budget trend tracking, and actionable savings advice.',
    architecture_diagram: null,
    stack: ['Google Gemini API', 'JavaScript', 'Next.js', 'Tailwind CSS', 'Vercel', 'Chart.js'],
    metrics: [
      { label: 'Response Latency', value: '1.2s' },
      { label: 'Expense Categorization', value: '98%' },
      { label: 'Active Deployment', value: 'Live on Vercel' },
    ],
    repo_url: 'https://github.com/BELALANSARI07/SpendSmart-2',
    live_url: 'https://spend-smart-2.vercel.app',
    paper_url: null,
    model_weights_url: null,
    status: 'PRODUCTION',
    featured: true,
    display_order: 4,
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
    featured: false,
    display_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prj-eduresearch',
    slug: 'eduresearch-agent',
    title: 'EduResearch Autonomous AI Agent',
    tagline: 'Autonomous research agent that synthesizes academic papers and produces structured literature reviews.',
    what_is_it_for: 'Accelerates academic research and literature review for computer science and engineering researchers. Given any research topic, the agent crawls arXiv, extracts methodologies, evaluates empirical findings, and constructs a structured comparative synthesis with bibtex citations.',
    architecture_summary: 'Agentic graph workflow powered by LangGraph and Python. Features multi-step verification: query decomposition -> paper retrieval -> citation graph traversal -> semantic synthesis -> latex review generation.',
    architecture_diagram: null,
    stack: ['Python', 'LangGraph', 'LLMs', 'arXiv API', 'Semantic Scholar API', 'PyPDF'],
    metrics: [
      { label: 'Review Generation', value: '3.5 min' },
      { label: 'Citation Accuracy', value: '99.2%' },
      { label: 'Paper Extraction', value: '100+ pages/min' },
    ],
    repo_url: 'https://github.com/BELALANSARI07/EduResearch-Agent',
    live_url: null,
    paper_url: null,
    model_weights_url: null,
    status: 'RESEARCH',
    featured: false,
    display_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Helper to merge DB projects with rich local repository URLs and explanations
export function mergeWithEnrichedProjects(dbProjects: Project[]): EnrichedProject[] {
  if (!dbProjects || dbProjects.length === 0) {
    return PORTFOLIO_PROJECTS;
  }

  // Map known DB projects to their enriched metadata
  const enriched = dbProjects.map((p) => {
    const match = PORTFOLIO_PROJECTS.find(
      (ep) =>
        ep.slug === p.slug ||
        ep.title.toLowerCase().includes(p.title.toLowerCase().slice(0, 10)) ||
        p.title.toLowerCase().includes(ep.title.toLowerCase().slice(0, 10))
    );

    return {
      ...p,
      what_is_it_for: match?.what_is_it_for || p.architecture_summary || p.tagline,
      repo_url: match?.repo_url || p.repo_url || 'https://github.com/BELALANSARI07',
      live_url: match?.live_url || p.live_url,
      stack: p.stack && p.stack.length > 0 ? p.stack : match?.stack || [],
      metrics: p.metrics && p.metrics.length > 0 ? p.metrics : match?.metrics || [],
    } as EnrichedProject;
  });

  // Also include any enriched projects not present in the DB
  PORTFOLIO_PROJECTS.forEach((ep) => {
    if (!enriched.some((p) => p.slug === ep.slug || p.title.toLowerCase().includes(ep.title.toLowerCase().slice(0, 10)))) {
      enriched.push(ep);
    }
  });

  return enriched.sort((a, b) => a.display_order - b.display_order);
}
