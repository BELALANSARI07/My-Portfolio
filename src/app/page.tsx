import { createPublicClient } from '@/lib/supabase/public';
import CosmicNavbar from '@/components/navbar/CosmicNavbar';
import CosmicHero from '@/components/sections/CosmicHero';
import HighlightCards from '@/components/sections/HighlightCards';
import CodingPulse from '@/components/sections/CodingPulse';
import CosmicProjects from '@/components/sections/CosmicProjects';
import CosmicMatrix from '@/components/sections/CosmicMatrix';
import CosmicFooter from '@/components/sections/CosmicFooter';
import { Profile, Project, Skill, LeadershipHackathon } from '@/types/database.types';

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
    id: 'prj-1',
    slug: 'railway-object-detection',
    title: 'Railway Object Detection Prototype',
    tagline: 'Physical AI prototype to detect objects on railway tracks and trigger emergency stop using computer vision and ultrasonic sensing.',
    architecture_summary: 'Physical AI prototype to detect objects on railway tracks and trigger emergency stop using computer vision and ultrasonic sensing.',
    architecture_diagram: null,
    stack: ['YOLOv11', 'OpenCV', 'Raspberry Pi', 'Python', 'FastAPI'],
    metrics: [
      { label: 'Mean AP@50', value: '94.8%' },
      { label: 'Trigger Time', value: '22ms' },
    ],
    repo_url: 'https://github.com/BELALANSARI07',
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
    id: 'prj-2',
    slug: 'multimodal-rag-engine',
    title: 'Multi-Modal RAG Knowledge Engine',
    tagline: 'Document-based Q&A system using Hugging Face embeddings and vector database for semantic search and vision document synthesis.',
    architecture_summary: 'Document-based Q&A system using Hugging Face embeddings and vector database for semantic search and vision document synthesis.',
    architecture_diagram: null,
    stack: ['Embeddings', 'Chroma', 'Qdrant', 'RAG', 'Transformers'],
    metrics: [
      { label: 'P95 Latency', value: '184ms' },
      { label: 'Recall@5', value: '92.4%' },
    ],
    repo_url: 'https://github.com/BELALANSARI07/multimodal-rag-engine',
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
    id: 'prj-3',
    slug: 'safebite-allergen-detection',
    title: 'SafeBite – Food Allergen Detection',
    tagline: 'AI-powered computer vision app to detect food allergens and help users make safer dietary and food choices in real-time.',
    architecture_summary: 'AI-powered computer vision app to detect food allergens and help users make safer dietary and food choices in real-time.',
    architecture_diagram: null,
    stack: ['Computer Vision', 'YOLO', 'AI/ML', 'PyTorch'],
    metrics: [
      { label: 'Accuracy', value: '96.2%' },
      { label: 'Latency', value: '14ms' },
    ],
    repo_url: 'https://github.com/BELALANSARI07',
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
    id: 'prj-4',
    slug: 'edge-ai-alert-system',
    title: 'Low-Latency Edge AI Alert System',
    tagline: 'Quantized real-time anomaly telemetry and alert dispatch optimized for edge inference devices and low-power hardware.',
    architecture_summary: 'Quantized real-time anomaly telemetry and alert dispatch optimized for edge inference devices and low-power hardware.',
    architecture_diagram: null,
    stack: ['TensorRT', 'ONNX', 'FastAPI', 'WebSockets', 'C++'],
    metrics: [
      { label: 'Inference', value: '8.6ms' },
      { label: 'Throughput', value: '118 FPS' },
    ],
    repo_url: 'https://github.com/BELALANSARI07',
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
    title: 'National Smart Transportation AI Challenge',
    role_or_award: 'Finalist & Outstanding Prototype Award',
    organization: 'Ministry of Transport / Tech Consortium',
    date_str: 'OCT 2025',
    summary: 'Architected and demonstrated the Railway Object Detection & Emergency Stop prototype evaluated against real track telemetry feeds.',
    metrics: 'Top 3% of 800+ national submissions',
    evidence_url: 'https://github.com/BELALANSARI07',
    display_order: 1,
    created_at: '',
  },
];

export const revalidate = 60;

export default async function Home() {
  let profile = DEFAULT_PROFILE;
  let projects = DEFAULT_PROJECTS;
  let skills = DEFAULT_SKILLS;
  let records = DEFAULT_RECORDS;

  try {
    const supabase = createPublicClient();

    const [profileRes, projectsRes, skillsRes, recordsRes] = await Promise.all([
      supabase.from('profiles').select('*').single(),
      supabase.from('projects').select('*').order('display_order', { ascending: true }),
      supabase.from('skills').select('*').order('display_order', { ascending: true }),
      supabase.from('leadership_hackathons').select('*').order('display_order', { ascending: true }),
    ]);

    if (profileRes.data) profile = profileRes.data;
    if (projectsRes.data && projectsRes.data.length > 0) projects = projectsRes.data;
    if (skillsRes.data && skillsRes.data.length > 0) skills = skillsRes.data;
    if (recordsRes.data && recordsRes.data.length > 0) records = recordsRes.data;
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
