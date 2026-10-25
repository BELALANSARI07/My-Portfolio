import { createClient } from '@/lib/supabase/server';
import TerminalHero from '@/components/sections/TerminalHero';
import ProjectSpecs from '@/components/sections/ProjectSpecs';
import TechMatrix from '@/components/sections/TechMatrix';
import LeadershipTable from '@/components/sections/LeadershipTable';
import ContactCanvas from '@/components/sections/ContactCanvas';
import { Profile, Project, Skill, LeadershipHackathon } from '@/types/database.types';

// Fallback seed data in case Supabase credentials have not been configured yet
const DEFAULT_PROFILE: Profile = {
  id: 'local-seed-01',
  full_name: 'Belal Ansari',
  headline: 'AI/ML Engineer in the Making | B.Tech CSE (AI & ML)',
  bio: 'Aspiring AI/ML Engineer focused on Generative AI, Machine Learning, and Computer Vision. I enjoy turning ideas into practical AI-powered solutions and exploring how intelligent systems can solve real-world problems.',
  location: 'Delhi, India',
  timezone: 'Asia/Kolkata (UTC+05:30)',
  contact_number: '7042181064',
  contact_email: 'belalansari000078@gmail.com',
  admin_email: 'belalansari000078@gmail.com',
  avatar_url: null,
  resume_url: null,
  terminal_welcome_msg: 'System initialized. Belal Ansari telemetry kernel v1.0.4 loaded.',
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
    id: 'prj-seed-1',
    slug: 'multimodal-rag-engine',
    title: 'Multi-Modal RAG Knowledge Engine',
    tagline: 'Hybrid sparse-dense retrieval engine supporting vision-language documents, vector embeddings, and cross-attention reranking.',
    architecture_summary: 'Engineered an enterprise-grade retrieval-augmented generation pipeline capable of ingesting PDF technical diagrams, charts, and text. Uses Milvus/Qdrant vector storage with ColPali/BGE multi-vector late interaction embeddings, achieving sub-second multi-modal context synthesis.',
    architecture_diagram: `+------------------+      +-------------------+      +------------------+
| Document Ingest  | ---> | Vision Embedder   | ---> | Dense Vector DB  |
| (PDF/Charts/IMG) |      | (ColPali / BGE)   |      | (Milvus / Qdrant)|
+------------------+      +-------------------+      +--------+---------+
                                                              |
                               +------------------------------+
                               |
                               v
+------------------+      +-------------------+      +------------------+
| User Query       | ---> | Cross-Encoder     | ---> | LLM Synthesis    |
| (Text + Diagram) |      | Reranker          |      | (Context Prompt) |
+------------------+      +-------------------+      +------------------+`,
    stack: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Qdrant', 'ColPali', 'Transformers'],
    metrics: [
      { label: 'P95 Query Latency', value: '184ms', delta: '-38%' },
      { label: 'Recall@5', value: '92.4%', delta: '+14%' },
      { label: 'Embedding Dim', value: '1024-d', delta: 'Dense+Sparse' },
    ],
    repo_url: 'https://github.com/BELALANSARI07/multimodal-rag-engine',
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
    id: 'prj-seed-2',
    slug: 'edge-ai-alert-system',
    title: 'Low-Latency Edge AI Alert System',
    tagline: 'Quantized real-time anomaly telemetry and alert dispatch optimized for edge inference devices.',
    architecture_summary: 'Developed a lightweight edge computing inference pipeline deploying INT8-quantized neural networks on embedded hardware. Integrates zero-copy shared memory queues and WebSockets for telemetry event dispatch under 15ms.',
    architecture_diagram: `+-----------------+      +--------------------+      +------------------+
| Edge Sensor /   | ---> | TensorRT / ONNX    | ---> | Zero-Copy Event  |
| Camera Stream   |      | INT8 Quant Model   |      | Memory Buffer    |
+-----------------+      +--------------------+      +--------+---------+
                                                              |
                                                              v
                                                     +------------------+
                                                     | WebSocket Telemetry
                                                     | < 15ms Alert Bus |
                                                     +------------------+`,
    stack: ['C++', 'Python', 'TensorRT', 'ONNX Runtime', 'OpenCV', 'WebSockets', 'Redis'],
    metrics: [
      { label: 'Inference Latency', value: '8.6ms', delta: 'INT8 Accel' },
      { label: 'Memory Footprint', value: '340MB', delta: '-65%' },
      { label: 'Throughput', value: '118 FPS', delta: '+4.2x' },
    ],
    repo_url: 'https://github.com/BELALANSARI07',
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
    id: 'prj-seed-3',
    slug: 'railway-object-detection',
    title: 'Railway Object Detection & Emergency Stop Prototype',
    tagline: 'Computer vision obstacle detection and automated fail-safe emergency deceleration trigger for railway corridors.',
    architecture_summary: 'Constructed an intelligent railway safety system utilizing fine-tuned YOLOv11 architectures for multi-class track hazard detection (debris, human trespass, stalled vehicles). Features temporal optical flow smoothing to prevent false trigger emergency stops and transmits instantaneous automated telemetry.',
    architecture_diagram: `+------------------+      +-------------------+      +------------------+
| High-Speed Track | ---> | YOLOv11 Hazard    | ---> | Optical Flow     |
| Camera Input     |      | Detection Kernel  |      | Temporal Filter  |
+------------------+      +-------------------+      +--------+---------+
                                                              |
                                                              v
                                                     +------------------+
                                                     | Emergency Brake  |
                                                     | Relay Trigger    |
                                                     +------------------+`,
    stack: ['PyTorch', 'YOLOv11', 'OpenCV', 'FastAPI', 'NumPy', 'MQTT'],
    metrics: [
      { label: 'Mean AP@50', value: '94.8%', delta: 'Custom Weights' },
      { label: 'False Positive Rate', value: '0.12%', delta: '-88%' },
      { label: 'Trigger Time', value: '22ms', delta: 'Fail-safe' },
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
];

const DEFAULT_SKILLS: Skill[] = [
  { id: '1', name: 'Python', category: 'ML_FOUNDATIONS', proficiency_level: 95, years_experience: 3.0, highlighted: true, display_order: 1, created_at: '' },
  { id: '2', name: 'PyTorch', category: 'ML_FOUNDATIONS', proficiency_level: 90, years_experience: 2.5, highlighted: true, display_order: 2, created_at: '' },
  { id: '3', name: 'Linear Algebra & Calculus', category: 'ML_FOUNDATIONS', proficiency_level: 88, years_experience: 2.0, highlighted: false, display_order: 3, created_at: '' },
  { id: '4', name: 'NumPy / Pandas', category: 'ML_FOUNDATIONS', proficiency_level: 92, years_experience: 3.0, highlighted: false, display_order: 4, created_at: '' },
  { id: '5', name: 'Computer Vision (CNNs / YOLO)', category: 'DEEP_LEARNING_LLM', proficiency_level: 92, years_experience: 2.5, highlighted: true, display_order: 1, created_at: '' },
  { id: '6', name: 'Generative AI & LLMs', category: 'DEEP_LEARNING_LLM', proficiency_level: 90, years_experience: 2.0, highlighted: true, display_order: 2, created_at: '' },
  { id: '7', name: 'RAG & Vector Embeddings', category: 'DEEP_LEARNING_LLM', proficiency_level: 88, years_experience: 1.5, highlighted: true, display_order: 3, created_at: '' },
  { id: '8', name: 'Hugging Face Transformers', category: 'DEEP_LEARNING_LLM', proficiency_level: 85, years_experience: 2.0, highlighted: false, display_order: 4, created_at: '' },
  { id: '9', name: 'FastAPI & REST APIs', category: 'SYS_ENGINEERING', proficiency_level: 90, years_experience: 2.0, highlighted: true, display_order: 1, created_at: '' },
  { id: '10', name: 'Docker Containers', category: 'SYS_ENGINEERING', proficiency_level: 82, years_experience: 1.5, highlighted: true, display_order: 2, created_at: '' },
  { id: '11', name: 'Next.js 15 & React', category: 'FULL_STACK_APIS', proficiency_level: 85, years_experience: 2.0, highlighted: true, display_order: 1, created_at: '' },
  { id: '12', name: 'Tailwind CSS', category: 'FULL_STACK_APIS', proficiency_level: 88, years_experience: 2.0, highlighted: true, display_order: 2, created_at: '' },
  { id: '13', name: 'OpenCV', category: 'HARDWARE_TOOLING', proficiency_level: 90, years_experience: 2.5, highlighted: true, display_order: 1, created_at: '' },
  { id: '14', name: 'ONNX Runtime', category: 'HARDWARE_TOOLING', proficiency_level: 80, years_experience: 1.5, highlighted: true, display_order: 2, created_at: '' },
  { id: '15', name: 'Linux / Bash Shell', category: 'HARDWARE_TOOLING', proficiency_level: 85, years_experience: 2.5, highlighted: false, display_order: 3, created_at: '' },
];

const DEFAULT_RECORDS: LeadershipHackathon[] = [
  {
    id: 'rec-1',
    title: 'National Smart Transportation AI Challenge',
    role_or_award: 'Finalist & Outstanding Prototype Award',
    organization: 'Ministry of Transport / Tech Consortium',
    date_str: 'OCT 2025',
    summary: 'Architected and demonstrated the Railway Object Detection & Emergency Stop prototype evaluated against real track telemetry video feeds.',
    metrics: 'Top 3% of 800+ national submissions',
    evidence_url: 'https://github.com/BELALANSARI07',
    display_order: 1,
    created_at: '',
  },
  {
    id: 'rec-2',
    title: 'AI & Robotics Innovation Club',
    role_or_award: 'Technical Core Lead - Computer Vision',
    organization: 'University Chapter',
    date_str: '2024 - PRESENT',
    summary: 'Directing hands-on workshops on PyTorch, edge AI deployment, and multi-modal models for 120+ active student developers.',
    metrics: 'Conducted 8 technical bootcamps',
    evidence_url: null,
    display_order: 2,
    created_at: '',
  },
];

export const revalidate = 60; // ISR cache refresh every 60 seconds

export default async function Home() {
  let profile = DEFAULT_PROFILE;
  let projects = DEFAULT_PROJECTS;
  let skills = DEFAULT_SKILLS;
  let records = DEFAULT_RECORDS;

  try {
    const supabase = await createClient();

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
    console.warn('Falling back to local Data Canvas seed data:', err);
  }

  return (
    <main className="min-h-screen bg-canvas-black text-text-primary">
      <TerminalHero profile={profile} />
      <ProjectSpecs projects={projects} />
      <TechMatrix skills={skills} />
      <LeadershipTable records={records} />
      <ContactCanvas profile={profile} />

      {/* Global Telemetry Footer */}
      <footer className="border-t border-border-subtle bg-canvas-black py-8 font-mono text-xs text-text-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-telemetry-green" />
            <span>BELAL ANSARI // SYSTEM CANVAS</span>
            <span className="text-border-subtle">|</span>
            <span>NEXT.JS 15 + POSTGRESQL + TAILWIND</span>
          </div>
          <div className="text-[11px] text-text-muted">
            COORDINATES: DELHI, IN (28.6139° N, 77.2090° E)
          </div>
        </div>
      </footer>
    </main>
  );
}
