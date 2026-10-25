export type SkillCategory = 
  | 'ML_FOUNDATIONS'
  | 'DEEP_LEARNING_LLM'
  | 'SYS_ENGINEERING'
  | 'FULL_STACK_APIS'
  | 'HARDWARE_TOOLING';

export interface Profile {
  id: string;
  full_name: string;
  headline: string;
  bio: string;
  location: string;
  timezone: string;
  contact_number: string | null;
  contact_email: string;
  admin_email: string;
  avatar_url: string | null;
  resume_url: string | null;
  terminal_welcome_msg: string;
  github_url: string | null;
  linkedin_url: string | null;
  kaggle_url: string | null;
  x_url: string | null;
  huggingface_url: string | null;
  scholar_url: string | null;
  pgp_fingerprint: string | null;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency_level: number;
  years_experience: number;
  highlighted: boolean;
  display_order: number;
  created_at: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  delta?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  architecture_summary: string;
  architecture_diagram: string | null;
  stack: string[];
  metrics: ProjectMetric[];
  repo_url: string | null;
  live_url: string | null;
  paper_url: string | null;
  model_weights_url: string | null;
  status: 'PRODUCTION' | 'RESEARCH' | 'EXPERIMENT';
  featured: boolean;
  display_order: number;
  latency_ms?: number | null;
  accuracy_pct?: number | null;
  power_draw_w?: number | null;
  alert_thresholds?: {
    confidence?: number;
    iou?: number;
    cooldown_s?: number;
    audio_alarm?: boolean;
    gpio_pin?: number;
    [key: string]: any;
  } | null;
  edge_specs?: {
    target_hardware?: string;
    core_stack?: string[];
    inference_latency?: string;
    alert_response?: string;
    [key: string]: any;
  } | null;
  mock_logs?: string[] | null;
  mock_stream_active?: boolean | null;
  mock_detections?: Array<{
    label: string;
    confidence: number;
    box: [number, number, number, number];
    region?: string;
  }> | null;
  created_at: string;
  updated_at: string;
}

export interface LeadershipHackathon {
  id: string;
  title: string;
  role_or_award: string;
  organization: string;
  date_str: string;
  summary: string;
  metrics: string | null;
  evidence_url: string | null;
  display_order: number;
  created_at: string;
}

export interface CertificateAsset {
  id: string;
  title: string;
  issuer: string;
  issue_date: string | null;
  credential_url: string | null;
  file_url: string;
  file_type: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  user_agent: string | null;
  ip_hash: string | null;
  status: 'UNREAD' | 'READ' | 'ARCHIVED';
  created_at: string;
}
