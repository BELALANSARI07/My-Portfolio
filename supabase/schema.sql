-- ==============================================================================
-- DATABASE SCHEMA: DATA CANVAS PORTFOLIO & TELEMETRY ENGINE
-- Target: Supabase (PostgreSQL 16)
-- Admin Principal Whitelist: belalansari000078@gmail.com
-- ==============================================================================

-- 1. EXTENSIONS & ENUMS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ BEGIN
    CREATE TYPE skill_category AS ENUM (
        'ML_FOUNDATIONS',
        'DEEP_LEARNING_LLM',
        'SYS_ENGINEERING',
        'FULL_STACK_APIS',
        'HARDWARE_TOOLING'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. TABLES DEFINITION

-- 2.1 Profiles Table (Single Record Architecture)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    headline TEXT NOT NULL,
    bio TEXT NOT NULL,
    location TEXT NOT NULL,
    timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata (UTC+05:30)',
    contact_number TEXT,
    contact_email TEXT NOT NULL,
    admin_email TEXT NOT NULL DEFAULT 'belalansari000078@gmail.com',
    avatar_url TEXT,
    resume_url TEXT,
    terminal_welcome_msg TEXT NOT NULL,
    github_url TEXT,
    linkedin_url TEXT,
    kaggle_url TEXT,
    x_url TEXT,
    huggingface_url TEXT,
    scholar_url TEXT,
    pgp_fingerprint TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.2 Skills Matrix Table
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category skill_category NOT NULL,
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 100),
    years_experience NUMERIC(3, 1) DEFAULT 1.0,
    highlighted BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3 Technical Projects & RFC Specs Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    architecture_summary TEXT NOT NULL,
    architecture_diagram TEXT,
    stack TEXT[] NOT NULL,
    metrics JSONB DEFAULT '[]'::jsonb,
    repo_url TEXT,
    live_url TEXT,
    paper_url TEXT,
    model_weights_url TEXT,
    status TEXT DEFAULT 'PRODUCTION',
    featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4 Leadership, Awards & Hackathons Table
CREATE TABLE IF NOT EXISTS public.leadership_hackathons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    role_or_award TEXT NOT NULL,
    organization TEXT NOT NULL,
    date_str TEXT NOT NULL,
    summary TEXT NOT NULL,
    metrics TEXT,
    evidence_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5 Certificates & Media Assets Registry
CREATE TABLE IF NOT EXISTS public.certificates_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date DATE,
    credential_url TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL DEFAULT 'application/pdf',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.6 Contact Inbound Telemetry Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    user_agent TEXT,
    ip_hash TEXT,
    status TEXT DEFAULT 'UNREAD' CHECK (status IN ('UNREAD', 'READ', 'ARCHIVED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Zero-Trust Configuration: Public read-only, write locked to admin email
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leadership_hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Helper security function: Check if current JWT belongs to the authorized admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT (auth.jwt() ->> 'email') = 'belalansari000078@gmail.com';
$$;

-- Drop existing policies if re-running
DO $$ BEGIN
    DROP POLICY IF EXISTS "Public profiles read" ON public.profiles;
    DROP POLICY IF EXISTS "Admin profiles update" ON public.profiles;
    DROP POLICY IF EXISTS "Admin profiles insert" ON public.profiles;

    DROP POLICY IF EXISTS "Public skills read" ON public.skills;
    DROP POLICY IF EXISTS "Admin skills all" ON public.skills;

    DROP POLICY IF EXISTS "Public projects read" ON public.projects;
    DROP POLICY IF EXISTS "Admin projects all" ON public.projects;

    DROP POLICY IF EXISTS "Public records read" ON public.leadership_hackathons;
    DROP POLICY IF EXISTS "Admin records all" ON public.leadership_hackathons;

    DROP POLICY IF EXISTS "Public assets read" ON public.certificates_assets;
    DROP POLICY IF EXISTS "Admin assets all" ON public.certificates_assets;

    DROP POLICY IF EXISTS "Public contact insert" ON public.contact_messages;
    DROP POLICY IF EXISTS "Admin contact messages all" ON public.contact_messages;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Policies for profiles
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Admin profiles update" ON public.profiles FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin profiles insert" ON public.profiles FOR INSERT WITH CHECK (public.is_admin());

-- Policies for skills
CREATE POLICY "Public skills read" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Admin skills all" ON public.skills FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Policies for projects
CREATE POLICY "Public projects read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admin projects all" ON public.projects FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Policies for leadership & hackathons
CREATE POLICY "Public records read" ON public.leadership_hackathons FOR SELECT USING (true);
CREATE POLICY "Admin records all" ON public.leadership_hackathons FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Policies for certificates & assets
CREATE POLICY "Public assets read" ON public.certificates_assets FOR SELECT USING (true);
CREATE POLICY "Admin assets all" ON public.certificates_assets FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Policies for contact messages
-- Any visitor can submit a contact message
CREATE POLICY "Public contact insert" ON public.contact_messages FOR INSERT WITH CHECK (true);
-- Only the whitelisted admin can read, modify, or archive messages
CREATE POLICY "Admin contact messages all" ON public.contact_messages FOR ALL USING (public.is_admin());

-- ==============================================================================
-- 4. STORAGE BUCKET CONFIGURATION
-- Bucket: portfolio-assets
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read assets
CREATE POLICY "Public storage view"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-assets');

-- Only authorized admin email can upload/delete
CREATE POLICY "Admin storage upload"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'portfolio-assets' 
    AND (auth.jwt() ->> 'email') = 'belalansari000078@gmail.com'
);

CREATE POLICY "Admin storage delete"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'portfolio-assets' 
    AND (auth.jwt() ->> 'email') = 'belalansari000078@gmail.com'
);

CREATE POLICY "Admin storage update"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'portfolio-assets' 
    AND (auth.jwt() ->> 'email') = 'belalansari000078@gmail.com'
);

-- ==============================================================================
-- 5. INITIAL SEED DATA
-- ==============================================================================

-- 5.1 Profile Seed
INSERT INTO public.profiles (
    full_name,
    headline,
    bio,
    location,
    timezone,
    contact_number,
    contact_email,
    admin_email,
    terminal_welcome_msg,
    github_url,
    linkedin_url,
    kaggle_url
) VALUES (
    'Belal Ansari',
    'AI/ML Engineer in the Making | B.Tech CSE (AI & ML)',
    'Aspiring AI/ML Engineer focused on Generative AI, Machine Learning, and Computer Vision. I enjoy turning ideas into practical AI-powered solutions and exploring how intelligent systems can solve real-world problems.',
    'Delhi, India',
    'Asia/Kolkata (UTC+05:30)',
    '7042181064',
    'belalansari000078@gmail.com',
    'belalansari000078@gmail.com',
    'System initialized. Belal Ansari telemetry kernel v1.0.4 loaded. Ready for inspection.',
    'https://github.com/BELALANSARI07',
    'https://www.linkedin.com/in/belal-ansari-7a2bb3303',
    'https://www.kaggle.com/belalansari07'
) ON CONFLICT DO NOTHING;

-- 5.2 Projects Seed (The 3 User Specified Seed Projects)
INSERT INTO public.projects (
    slug,
    title,
    tagline,
    architecture_summary,
    architecture_diagram,
    stack,
    metrics,
    status,
    featured,
    display_order
) VALUES 
(
    'multimodal-rag-engine',
    'Multi-Modal RAG Knowledge Engine',
    'Hybrid sparse-dense retrieval engine supporting vision-language documents, vector embeddings, and cross-attention reranking.',
    'Engineered an enterprise-grade retrieval-augmented generation pipeline capable of ingesting PDF technical diagrams, charts, and text. Uses Milvus/Qdrant vector storage with ColPali/BGE multi-vector late interaction embeddings, achieving sub-second multi-modal context synthesis.',
    '+------------------+      +-------------------+      +------------------+
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
+------------------+      +-------------------+      +------------------+ ',
    ARRAY['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Qdrant', 'ColPali', 'Transformers'],
    '[
        {"label": "P95 Query Latency", "value": "184ms", "delta": "-38%"},
        {"label": "Recall@5", "value": "92.4%", "delta": "+14%"},
        {"label": "Embedding Dim", "value": "1024-d", "delta": "Dense+Sparse"}
    ]'::jsonb,
    'PRODUCTION',
    true,
    1
),
(
    'edge-ai-alert-system',
    'Low-Latency Edge AI Alert System',
    'Quantized real-time anomaly telemetry and alert dispatch optimized for edge inference devices.',
    'Developed a lightweight edge computing inference pipeline deploying INT8-quantized neural networks on embedded hardware. Integrates zero-copy shared memory queues and WebSockets for telemetry event dispatch under 15ms.',
    '+-----------------+      +--------------------+      +------------------+
| Edge Sensor /   | ---> | TensorRT / ONNX    | ---> | Zero-Copy Event  |
| Camera Stream   |      | INT8 Quant Model   |      | Memory Buffer    |
+-----------------+      +--------------------+      +--------+---------+
                                                              |
                                                              v
                                                     +------------------+
                                                     | WebSocket Telemetry
                                                     | < 15ms Alert Bus |
                                                     +------------------+ ',
    ARRAY['C++', 'Python', 'TensorRT', 'ONNX Runtime', 'OpenCV', 'WebSockets', 'Redis'],
    '[
        {"label": "Inference Latency", "value": "8.6ms", "delta": "INT8 Accel"},
        {"label": "Memory Footprint", "value": "340MB", "delta": "-65%"},
        {"label": "Throughput", "value": "118 FPS", "delta": "+4.2x"}
    ]'::jsonb,
    'PRODUCTION',
    true,
    2
),
(
    'railway-object-detection',
    'Railway Object Detection & Emergency Stop Prototype',
    'Computer vision obstacle detection and automated fail-safe emergency deceleration trigger for railway corridors.',
    'Constructed an intelligent railway safety system utilizing fine-tuned YOLOv11 architectures for multi-class track hazard detection (debris, human trespass, stalled vehicles). Features temporal optical flow smoothing to prevent false trigger emergency stops and transmits instantaneous automated telemetry.',
    '+------------------+      +-------------------+      +------------------+
| High-Speed Track | ---> | YOLOv11 Hazard    | ---> | Optical Flow     |
| Camera Input     |      | Detection Kernel  |      | Temporal Filter  |
+------------------+      +-------------------+      +--------+---------+
                                                              |
                                                              v
                                                     +------------------+
                                                     | Emergency Brake  |
                                                     | Relay Trigger    |
                                                     +------------------+ ',
    ARRAY['PyTorch', 'YOLOv11', 'OpenCV', 'FastAPI', 'NumPy', 'MQTT'],
    '[
        {"label": "Mean AP@50", "value": "94.8%", "delta": "Custom Weights"},
        {"label": "False Positive Rate", "value": "0.12%", "delta": "-88%"},
        {"label": "Trigger Time", "value": "22ms", "delta": "Fail-safe"}
    ]'::jsonb,
    'PRODUCTION',
    true,
    3
)
ON CONFLICT (slug) DO NOTHING;

-- 5.3 Categorized Skills Seed
INSERT INTO public.skills (name, category, proficiency_level, years_experience, highlighted, display_order) VALUES
-- ML Foundations
('Python', 'ML_FOUNDATIONS', 95, 3.0, true, 1),
('PyTorch', 'ML_FOUNDATIONS', 90, 2.5, true, 2),
('Linear Algebra & Calculus', 'ML_FOUNDATIONS', 88, 2.0, false, 3),
('NumPy / Pandas', 'ML_FOUNDATIONS', 92, 3.0, false, 4),
('Scikit-Learn', 'ML_FOUNDATIONS', 86, 2.0, false, 5),

-- Deep Learning & LLM Systems
('Computer Vision (CNNs / YOLO)', 'DEEP_LEARNING_LLM', 92, 2.5, true, 1),
('Generative AI & LLMs', 'DEEP_LEARNING_LLM', 90, 2.0, true, 2),
('RAG Architectures & Vector DBs', 'DEEP_LEARNING_LLM', 88, 1.5, true, 3),
('Hugging Face Transformers', 'DEEP_LEARNING_LLM', 85, 2.0, false, 4),
('Model Quantization (INT8/FP16)', 'DEEP_LEARNING_LLM', 80, 1.0, false, 5),

-- Systems Engineering & Backend
('FastAPI & REST APIs', 'SYS_ENGINEERING', 90, 2.0, true, 1),
('Docker & Containerization', 'SYS_ENGINEERING', 82, 1.5, true, 2),
('Redis & Message Queues', 'SYS_ENGINEERING', 78, 1.0, false, 3),
('PostgreSQL & Supabase', 'SYS_ENGINEERING', 85, 2.0, false, 4),

-- Full Stack & Tools
('Next.js & React', 'FULL_STACK_APIS', 85, 2.0, true, 1),
('Tailwind CSS', 'FULL_STACK_APIS', 88, 2.0, true, 2),
('TypeScript', 'FULL_STACK_APIS', 82, 1.5, false, 3),

-- Hardware & Tooling
('OpenCV', 'HARDWARE_TOOLING', 90, 2.5, true, 1),
('ONNX Runtime', 'HARDWARE_TOOLING', 80, 1.5, true, 2),
('Linux / Bash', 'HARDWARE_TOOLING', 85, 2.5, false, 3),
('Git & GitHub Actions', 'HARDWARE_TOOLING', 90, 3.0, false, 4)
ON CONFLICT DO NOTHING;

-- 5.4 Sample Leadership & Achievements Seed
INSERT INTO public.leadership_hackathons (title, role_or_award, organization, date_str, summary, metrics, display_order) VALUES
(
    'National Smart Transportation AI Challenge',
    'Finalist & Outstanding Prototype Award',
    'Ministry of Transport / Tech Consortium',
    'OCT 2025',
    'Architected and demonstrated the Railway Object Detection & Emergency Stop prototype evaluated against real track telemetry video feeds.',
    'Top 3% of 800+ national submissions',
    1
),
(
    'AI & Robotics Innovation Club',
    'Technical Core Lead - Computer Vision',
    'University Chapter',
    '2024 - PRESENT',
    'Directing hands-on workshops on PyTorch, edge AI deployment, and multi-modal models for 120+ active student developers.',
    'Conducted 8 technical bootcamps',
    2
)
ON CONFLICT DO NOTHING;
