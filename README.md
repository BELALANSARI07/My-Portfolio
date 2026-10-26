<div align="center">

# 🌌 Belal Ansari — Engineering Portfolio

### *High-Performance, Glassmorphic AI/ML Engineer Portfolio & Telemetry Hub*

[![Live Demo](https://img.shields.io/badge/Live_Site-belalansari.me-7c3aed?style=for-the-badge&logo=vercel&logoColor=white)](https://www.belalansari.me)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Resend](https://img.shields.io/badge/Email-Resend-000000?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)

<p align="center">
  <a href="https://www.belalansari.me"><b>Explore Live Website »</b></a> •
  <a href="https://github.com/BELALANSARI07">GitHub Profile</a> •
  <a href="https://www.linkedin.com/in/belal-ansari-7a2bb3303">LinkedIn</a> •
  <a href="mailto:belalansari000078@gmail.com">Contact Belal</a>
</p>

</div>

---

## 📌 Overview

This repository powers **[belalansari.me](https://www.belalansari.me)**, the personal engineering portfolio and live algorithmic radar of **Belal Ansari** — B.Tech Computer Science & Engineering (AI/ML) student at Noida International University (CGPA: 8.66), Finalist at Makers Conclave by NIAT, and Vice President of the Gen AI Club.

Engineered with **Next.js 15 App Router**, **React 19**, **Tailwind CSS**, and **Framer Motion**, the site features a sleek cosmic glassmorphic aesthetic, live telemetry from GitHub/LeetCode/Codeforces, zero-friction project blueprint inspections, transactional email dispatch, and mobile-first responsive optimization.

---

## ✨ Key Features

### 1. 🚀 Autonomous GitHub Project Pipeline
* **Real-Time Sync**: Automatically fetches and indexes public repositories directly from [`@BELALANSARI07`](https://github.com/BELALANSARI07).
* **Automatic Lifecycle Management**: New public repositories added to GitHub automatically generate new portfolio cards; deleted repositories are automatically purged.
* **Smart Enrichment**: Combines live GitHub repository telemetry (stars, languages, push dates) with deep curated engineering blueprints, benchmark metrics, and mission specifications.
* **Instant Revalidation**: Uses Next.js Incremental Static Regeneration (ISR) and secure webhook endpoints (`/api/webhooks/github`) for immediate updates without redeployment.

### 2. 📱 Mobile-First Responsive Design
* **Adaptive Hierarchy**: On mobile viewports, the profile photo takes priority at the very top, immediately followed by the headline, typing bio, and CTAs.
* **Zero Mobile Clutter**: Desktop-only decorative widgets (floating code sandbox, orbital spin rings, mouse-follower canvas) are cleanly hidden on phones for sub-second render speeds and zero horizontal scroll.
* **Accessible Touch Targets**: 48px+ touch targets, native drawer navigation, and responsive modals.

### 3. 🎯 Authentic Engineering Specs (No Stock Data)
* **Zero Fake Placeholders**: Every project card showcases real technical architectures, actual benchmark numbers, and direct source code links.
* **Interactive Blueprints Modal**: Click any project to open an architectural blueprint detailing the technical rationale, stack, metrics, and live demo access.

### 4. ⚡ Live Algorithmic & Open-Source Telemetry
* **LeetCode Integration**: Queries LeetCode GraphQL API for live problem counts across Easy, Medium, and Hard tiers, alongside global ranking.
* **Codeforces Competitive Radar**: Fetches live competitive ratings, rank badges, and division data.
* **GitHub Activity**: Real-time public repo metrics, commit calendar visualizations, and language distributions.

### 5. 📬 Secure Contact & Transactional Email
* Powered by the **Resend API** and Next.js Server Actions with rigorous server-side validation and responsive confirmation dialogs.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) with React 19 & Server Components |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) (Strict mode) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) & [Framer Motion 12](https://www.framer.com/motion/) |
| **UI Components** | [Lucide React](https://lucide.dev/), Custom Glassmorphic Spotlight & Bento Cards |
| **Database & Auth** | [Supabase](https://supabase.com/) (PostgreSQL with Row-Level Security, `@supabase/ssr`) |
| **APIs & Telemetry** | GitHub REST API, LeetCode GraphQL, Codeforces API |
| **Email Service** | [Resend](https://resend.com/) transactional email pipeline |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/) with automated branch previews and production edge caching |

---

## 📂 Project Directory Structure

```text
My-Portfolio/
├── src/
│   ├── app/                                # Next.js 15 App Router
│   │   ├── api/
│   │   │   ├── coding-stats/route.ts      # LeetCode / Codeforces / GitHub API aggregator
│   │   │   ├── contact/route.ts           # Resend email dispatch API
│   │   │   ├── projects/route.ts          # Synchronized projects endpoint
│   │   │   └── webhooks/github/route.ts   # GitHub push webhook handler
│   │   ├── about/                         # About page route
│   │   ├── contact/                       # Contact page route
│   │   ├── experience/                    # Experience & leadership timeline
│   │   ├── progress/                      # Algorithmic radar & heatmaps
│   │   ├── projects/                      # Full projects directory with search & filters
│   │   ├── skills/                        # Skills and competencies matrix
│   │   ├── globals.css                    # Tailwind design system & utilities
│   │   ├── layout.tsx                     # Root layout & Viewport configuration
│   │   └── page.tsx                       # Cosmic home landing page
│   ├── components/
│   │   ├── canvas/                        # Cosmic background & ambient nebula glows
│   │   ├── navbar/                        # Cosmic responsive navbar & drawer
│   │   ├── sections/
│   │   │   ├── CosmicHero.tsx             # Responsive hero with dynamic typing & avatar
│   │   │   ├── HighlightCards.tsx         # Fast milestone summary cards
│   │   │   ├── CodingPulse.tsx            # Live competitive programming metrics
│   │   │   ├── CosmicProjects.tsx         # Curated architectural project showcase
│   │   │   ├── CosmicMatrix.tsx           # Skills, education, and interests
│   │   │   └── CosmicFooter.tsx           # Callout banner, contact modal, socials
│   │   └── ui/                            # SpotlightCard, ProjectModal, ContributionHeatmap
│   ├── data/
│   │   └── projects.ts                    # Curated project data & blueprint schemas
│   ├── lib/
│   │   ├── github/
│   │   │   └── sync.ts                    # GitHub repository sync & stack inferrer
│   │   ├── resend/                        # Resend transactional email client
│   │   └── supabase/                      # Supabase client & SSR helpers
│   └── types/
│       └── database.types.ts              # TypeScript schemas for DB and projects
├── public/                                # Static assets, avatars, and resume
├── package.json                           # Dependencies and build scripts
├── tailwind.config.ts                     # Tailwind CSS theme customization
└── tsconfig.json                          # Strict TypeScript configuration
```

---

## 🔬 Featured Engineering Projects

| Project | Primary Stack | Core Focus | Link |
| :--- | :--- | :--- | :--- |
| **Edge AI Railway Safety System** | `YOLOv8` `ESP32` `OpenCV` `MQTT` | Real-time computer vision obstacle detection and automated emergency train braking. Finalist at Makers Conclave by NIAT. | [Repository ↗](https://github.com/BELALANSARI07/Edge-AI-Railway-Safety-System) |
| **Low-Latency Edge AI Alert System** | `ONNX` `TensorRT` `YOLOv8` `FastAPI` | Quantized neural inference (< 15ms) running on edge compute for instant anomaly detection without cloud dependence. | [Repository ↗](https://github.com/BELALANSARI07/Low-Latency-Edge-AI-Alert-System.) |
| **Multi-Modal RAG Knowledge Engine** | `ColPali` `PyTorch` `Qdrant` `LangChain` | Hybrid late-interaction multi-vector document search across complex technical diagrams and text blueprints. | [Repository ↗](https://github.com/BELALANSARI07/Multi-Modal-RAG-Knowledge-Engine) |
| **ReliefLink AI** | `Next.js` `FastAPI` `WebSockets` `GeoJSON` | Real-time natural disaster coordination platform with live SOS tracking and AI emergency triage. | [Repository ↗](https://github.com/BELALANSARI07/relieflink-ai) |

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18.17+ or 20+ recommended)
* [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/BELALANSARI07/My-Portfolio.git
cd My-Portfolio
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# GitHub Integration
GITHUB_TOKEN=your_personal_access_token_optional
GITHUB_WEBHOOK_SECRET=your_github_webhook_secret

# Resend Email Integration
RESEND_API_KEY=your_resend_api_key
CONTACT_NOTIFICATION_EMAIL=belalansari000078@gmail.com
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 👤 Author

**Belal Ansari**  
* B.Tech Computer Science & Engineering (AI/ML) — Noida International University
* **Portfolio**: [belalansari.me](https://www.belalansari.me)
* **GitHub**: [@BELALANSARI07](https://github.com/BELALANSARI07)
* **LinkedIn**: [in/belal-ansari-7a2bb3303](https://www.linkedin.com/in/belal-ansari-7a2bb3303)
* **Email**: [belalansari000078@gmail.com](mailto:belalansari000078@gmail.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
