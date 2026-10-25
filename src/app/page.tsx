import { createPublicClient } from '@/lib/supabase/public';
import CosmicNavbar from '@/components/navbar/CosmicNavbar';
import CosmicHero from '@/components/sections/CosmicHero';
import HighlightCards from '@/components/sections/HighlightCards';
import CodingPulse from '@/components/sections/CodingPulse';
import CosmicProjects from '@/components/sections/CosmicProjects';
import CosmicMatrix from '@/components/sections/CosmicMatrix';
import CosmicFooter from '@/components/sections/CosmicFooter';
import { Profile, Project, Skill, LeadershipHackathon } from '@/types/database.types';
import { PORTFOLIO_PROJECTS, mergeWithEnrichedProjects } from '@/data/projects';
import { getSyncedProjects } from '@/lib/github/sync';

const DEFAULT_PROFILE: Profile = {
  id: 'seed-01',
  full_name: 'Belal Ansari',
  headline: 'AI/ML Engineer in the Making | B.Tech CSE (AI & ML)',
  bio: 'B.Tech CSE (AI/ML) student at Noida International University. I build intelligent systems at the intersection of Generative AI, Computer Vision and real-world applications.',
  location: 'Delhi, India',
  timezone: 'Asia/Kolkata (UTC+05:30)',
  contact_number: '7042181064',
  contact_email: 'belalansari000078@gmail.com',
  admin_email: 'belalansari000078@gmail.com',
  avatar_url: '/belal-ansari.png',
  resume_url: null,
  terminal_welcome_msg: 'System initialized. Belal Ansari AI core loaded.',
  github_url: 'https://github.com/BELALANSARI07',
  linkedin_url: 'https://www.linkedin.com/in/belal-ansari-7a2bb3303',
  kaggle_url: 'https://www.kaggle.com/belalansari07',
  x_url: null,
  huggingface_url: null,
  scholar_url: null,
  pgp_fingerprint: null,
  updated_at: new Date().toISOString(),
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'prj-railway',
    slug: 'edge-ai-railway-safety-system',
    title: 'Edge AI Railway Safety & Emergency Stop System',
    tagline: 'Autonomous computer vision hazard detection and emergency braking system for railway corridors.',
    architecture_summary: 'Constructed using YOLOv8 trained on railway track anomaly datasets deployed to edge hardware with ESP32 microcontrollers. Features optical flow smoothing to prevent false-positive emergency stops and transmits instantaneous emergency stop commands to train brake relays and telemetry dashboards over MQTT.',
    architecture_diagram: null,
    stack: ['YOLOv8', 'Python', 'OpenCV', 'ESP32', 'Ultrasonic Sensing', 'FastAPI'],
    metrics: [
      { label: 'Hazard Detection AP', value: '94.8%' },
      { label: 'Brake Trigger Latency', value: '22ms' },
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
    architecture_summary: 'Targeted for edge environments where cloud latency and internet unreliability are unacceptable. The system ingests 60 FPS video streams, performs on-device resizing, executes FP16/INT8-quantized YOLOv8-nano inference via ONNX Runtime / TensorRT (sub-15ms), runs local NMS post-processing, and triggers instant MQTT telemetry alerts.',
    architecture_diagram: null,
    stack: ['PyTorch', 'YOLOv8', 'OpenCV', 'ONNX Runtime', 'Mosquitto (MQTT)', 'FastAPI'],
    metrics: [
      { label: 'Model Engine', value: 'ONNX / TensorRT' },
      { label: 'Target Latency', value: '< 15ms' },
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
    architecture_summary: 'Multi-modal indexing pipeline using ColPali / BGE multi-vector late-interaction embeddings with Qdrant vector storage. Ingests raw document pages as visual patches, eliminating brittle OCR extraction, and passes retrieved context to multimodal LLMs with source citations.',
    architecture_diagram: null,
    stack: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Qdrant', 'ColPali'],
    metrics: [
      { label: 'P95 Latency', value: '184ms' },
      { label: 'Recall@5', value: '92.4%' },
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
    architecture_summary: 'Real-time incident response architecture combining geospatial mapping (GeoJSON / Leaflet), WebSocket-driven SOS status updates, and AI priority ranking algorithms to prevent duplicate rescue efforts and coordinate emergency supplies.',
    architecture_diagram: null,
    stack: ['Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'WebSockets', 'GeoJSON'],
    metrics: [
      { label: 'SOS Latency', value: '< 500ms' },
      { label: 'Efficiency', value: '+40%' },
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

const DEFAULT_SKILLS: Skill[] = [
  { id: '1', name: 'Python', category: 'ML_FOUNDATIONS', proficiency_level: 95, years_experience: 3.0, highlighted: true, display_order: 1, created_at: '' },
  { id: '2', name: 'C++', category: 'SYS_ENGINEERING', proficiency_level: 85, years_experience: 2.0, highlighted: false, display_order: 2, created_at: '' },
  { id: '3', name: 'PyTorch', category: 'ML_FOUNDATIONS', proficiency_level: 90, years_experience: 2.5, highlighted: true, display_order: 3, created_at: '' },
  { id: '4', name: 'OpenCV', category: 'HARDWARE_TOOLING', proficiency_level: 92, years_experience: 2.5, highlighted: true, display_order: 4, created_at: '' },
  { id: '5', name: 'Ultralytics YOLO', category: 'DEEP_LEARNING_LLM', proficiency_level: 94, years_experience: 2.5, highlighted: true, display_order: 5, created_at: '' },
  { id: '6', name: 'FAISS', category: 'DEEP_LEARNING_LLM', proficiency_level: 86, years_experience: 1.5, highlighted: false, display_order: 6, created_at: '' },
  { id: '7', name: 'Sentence Transformers', category: 'DEEP_LEARNING_LLM', proficiency_level: 88, years_experience: 2.0, highlighted: true, display_order: 7, created_at: '' },
  { id: '8', name: 'Semantic Search & RAG', category: 'DEEP_LEARNING_LLM', proficiency_level: 90, years_experience: 2.0, highlighted: true, display_order: 8, created_at: '' },
  { id: '9', name: 'FastAPI', category: 'SYS_ENGINEERING', proficiency_level: 90, years_experience: 2.0, highlighted: true, display_order: 9, created_at: '' },
  { id: '10', name: 'Docker', category: 'SYS_ENGINEERING', proficiency_level: 82, years_experience: 1.5, highlighted: false, display_order: 10, created_at: '' },
  { id: '11', name: 'Next.js & React', category: 'FULL_STACK_APIS', proficiency_level: 88, years_experience: 2.0, highlighted: true, display_order: 11, created_at: '' },
  { id: '12', name: 'Tailwind CSS', category: 'FULL_STACK_APIS', proficiency_level: 90, years_experience: 2.0, highlighted: false, display_order: 12, created_at: '' },
  { id: '13', name: 'PostgreSQL & Supabase', category: 'SYS_ENGINEERING', proficiency_level: 86, years_experience: 2.0, highlighted: true, display_order: 13, created_at: '' },
  { id: '14', name: 'Git & GitHub', category: 'HARDWARE_TOOLING', proficiency_level: 92, years_experience: 3.0, highlighted: false, display_order: 14, created_at: '' },
  { id: '15', name: 'ONNX Runtime', category: 'HARDWARE_TOOLING', proficiency_level: 82, years_experience: 1.5, highlighted: false, display_order: 15, created_at: '' },
  { id: '16', name: 'MongoDB', category: 'FULL_STACK_APIS', proficiency_level: 80, years_experience: 1.5, highlighted: false, display_order: 16, created_at: '' },
  { id: '17', name: 'Firebase', category: 'FULL_STACK_APIS', proficiency_level: 82, years_experience: 1.5, highlighted: false, display_order: 17, created_at: '' },
  { id: '18', name: 'Node.js', category: 'FULL_STACK_APIS', proficiency_level: 84, years_experience: 2.0, highlighted: false, display_order: 18, created_at: '' },
];

const DEFAULT_RECORDS: LeadershipHackathon[] = [
  {
    id: 'rec-1',
    title: 'Makers Conclave by NIAT',
    role_or_award: 'Finalist',
    organization: 'NIAT (NxtWave of Innovation in Advanced Technologies)',
    date_str: '2025',
    summary: 'Selected as a Finalist at the Makers Conclave by NIAT for architecting and demonstrating the AI-powered Railway Object Detection & Emergency Stop prototype.',
    metrics: 'Finalist • Railway AI Prototype',
    evidence_url: 'https://github.com/BELALANSARI07',
    display_order: 1,
    created_at: '',
  },
];

export const revalidate = 60;

export default async function Home() {
  let profile = DEFAULT_PROFILE;
  let projects = PORTFOLIO_PROJECTS;
  let skills = DEFAULT_SKILLS;
  let records = DEFAULT_RECORDS;

  try {
    const supabase = createPublicClient();

    const [syncedProjects, profileRes, skillsRes, recordsRes] = await Promise.all([
      getSyncedProjects(),
      supabase.from('profiles').select('*').single(),
      supabase.from('skills').select('*').order('display_order', { ascending: true }),
      supabase.from('leadership_hackathons').select('*').order('display_order', { ascending: true }),
    ]);

    if (syncedProjects && syncedProjects.length > 0) {
      projects = syncedProjects;
    }
    if (profileRes.data) profile = profileRes.data;
    if (skillsRes.data && skillsRes.data.length > 0) skills = skillsRes.data;
    if (recordsRes.data && recordsRes.data.length > 0) {
      records = recordsRes.data.map((r: any) => {
        if (r.title && (r.title.includes('Transportation') || r.title.includes('National Smart'))) {
          return {
            ...r,
            title: 'Makers Conclave by NIAT',
            role_or_award: 'Finalist',
            organization: 'NIAT (NxtWave of Innovation in Advanced Technologies)',
            date_str: '2025',
            summary: 'Selected as a Finalist at the Makers Conclave by NIAT for architecting and demonstrating the AI-powered Railway Object Detection & Emergency Stop prototype.',
            metrics: 'Finalist • Railway Prototype',
          };
        }
        return r;
      });
    }
  } catch (err) {
    console.warn('Falling back to local seed data:', err);
  }

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 flex flex-col">
      <CosmicNavbar resumeUrl={profile.resume_url} />
      <CosmicHero profile={profile} />
      <HighlightCards />
      <CodingPulse />
      <CosmicProjects projects={projects} />
      <CosmicMatrix skills={skills} records={records} />
      <CosmicFooter profile={profile} />
    </main>
  );
}
