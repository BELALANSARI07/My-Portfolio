# ARCHITECTURAL BLUEPRINT & SYSTEM SPECIFICATION
**Project**: Personal Engineering Canvas (AI/ML Engineering Portfolio)  
**Target Identity**: AI/ML Engineer (Class of 2029)  
**Aesthetic Paradigm**: "Data Canvas" — Monochromatic, Technical High-Density, Data-Driven, Stark Monospace  
**Document Version**: 1.0.0-PROD  

---

## 1. Design System & Frontend Aesthetic: "Data Canvas"

The **Data Canvas** aesthetic draws inspiration from industrial telemetry dashboards, LaTeX academic papers, technical documentation (RFCs/APIs), Bloomberg terminals, and CAD schematics. It eschews modern generic corporate SaaS designs in favor of stark, monochromatic high-contrast minimalism, strict structural grids, and information-dense typography.

### 1.1 Color Palette
A strict 5-tier monochromatic grayscale spectrum calibrated for OLED depth, razor-sharp technical contrast, and subtle grid delineations without color distractions.

| Token | Hex Value | Semantic Role / Application |
|---|---|---|
| `canvas-black` | `#08090A` | Deep base canvas / background layer |
| `canvas-subtle` | `#111315` | Section background, card fills, recessed containers |
| `canvas-surface` | `#1A1D20` | Surface elevation, hovered states, modal popovers |
| `border-subtle` | `#23272B` | Hairline grid lines (0.5px / 1px), column separators |
| `border-active` | `#3E444B` | Focused inputs, active data cells, card borders on hover |
| `text-muted` | `#6C747E` | Metadata labels, telemetry timestamps, metric labels, line numbers |
| `text-secondary` | `#9EA8B3` | Secondary descriptions, API param descriptions, spec notes |
| `text-primary` | `#F0F3F6` | Primary headings, titles, active data values |
| `text-pure` | `#FFFFFF` | Hero titles, highlighted metrics, terminal outputs |
| `accent-telemetry`| `#38EF7D` *(Optional Micro-accent)* | Ultra-sparse 4px telemetry status beacon (e.g. `[● ONLINE]`) |

### 1.2 Typography System
Strict pairing of a modern high-legibility geometric/neo-grotesque sans-serif with a razor-sharp monospace face for all technical data, coordinates, metrics, and code specs.

* **Primary Sans (Prose & Structural Headers)**: `Geist Sans` or `Inter` (`font-sans`)
  * Weights: `400` (Regular), `500` (Medium), `600` (Semi-bold)
* **Technical Monospace (Coordinates, Telemetry, Code, Metrics, Tables)**: `JetBrains Mono` or `Geist Mono` (`font-mono`)
  * Features: Tabular figures (`tnum`), zero-slash, ligature control
* **Hierarchy Scale**:
  * `Display / Terminal Title`: `clamp(1.75rem, 4vw, 2.75rem)` — Monospaced with blinking cursor
  * `Section Headers`: `0.875rem` (`text-xs` / `text-sm`) — Uppercase, tracked (`tracking-widest`), prefixed with technical section IDs (e.g. `[01_SYS_OVERVIEW]`, `[02_EXPERIMENTS]`)
  * `Card Headers`: `1.125rem` (`text-base` / `text-lg`) — Semi-bold mono/sans hybrid
  * `Body Text`: `0.875rem` (`text-sm`) — High readability, relaxed leading (`leading-relaxed`)
  * `Telemetry / Data Labels`: `0.75rem` (`text-xs`) — Pure uppercase monospace (`font-mono`)

### 1.3 Canvas Grid & Decorative Elements
* **Background Matrix**: Subtle 32px × 32px or 48px × 48px SVG hairline coordinate grid with intersection ticks (`+` markers at grid corners) and boundary frame borders.
* **Telemetry Headers**: Fixed screen-edge telemetry banner showing:
  * Current UTC Timestamp / Local Time (dynamic)
  * System Ping / Connection State: `LATENCY: 18ms | STATUS: NOMINAL`
  * Graduation Epoch: `T-MINUS [YYYY-2029]`
* **Technical Framing**: Cards and containers feature visible border lines, engineering corner brackets (`┌ ┐ └ ┘`), and data-attribute callouts (`DATA-ID="PRJ-001"`).

---

## 2. System Architecture & Tech Stack

```
+---------------------------------------------------------------------------------+
|                                 CLIENT TIER                                     |
|  +---------------------------------------------------------------------------+  |
|  | Next.js 15 (App Router) + Tailwind CSS + Lucide Icons + Framer Motion     |  |
|  | - Public Data Canvas (/): Terminal Hero, Tech Matrix, Project RFCs, Tables|  |
|  | - Admin Control Plane (/admin): Telemetry Console, Dynamic CRUD, Modals   |  |
|  +---------------------------------------------------------------------------+  |
+----------------------------------------+----------------------------------------+
                                         | Next.js Server Components / Actions / RLS
+----------------------------------------v----------------------------------------+
|                                BACKEND TIER                                     |
|  +---------------------------------------------------------------------------+  |
|  | Supabase (PostgreSQL 16 Engine)                                           |  |
|  | - Auth: Magic Link / OAuth restricted via Email Whitelist + Edge Policy  |  |
|  | - Storage Bucket: Secure object storage for resumes, certs, avatar       |  |
|  | - Row Level Security (RLS): Strict read-public / write-whitelisted-admin   |  |
|  +---------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------+
```

### 2.1 Technology Rationales
1. **Next.js 15 (App Router)**:
   * Instant Static Generation / ISR for ultra-fast load times on public portfolio.
   * Server Components to pre-render project specs directly from Postgres.
   * Secure Edge Middleware for zero-leakage protection on `/admin` routes.
2. **Tailwind CSS (v3.4 / v4)**:
   * Zero-runtime CSS overhead with custom design tokens for the Data Canvas theme.
3. **Supabase**:
   * Relational PostgreSQL schema allows strict foreign keys (e.g. projects linked to architecture diagrams, benchmarks, tags).
   * Built-in Row Level Security (RLS) ensures that even if API keys are public, write/update/delete operations are strictly impossible for non-admin accounts.
   * Storage bucket with public read and authenticated write for instant image/PDF management.
4. **Email Dispatch Pipeline (Resend & Next.js API Handler)**:
   * **Recommended Provider**: **Resend** (clean REST API, instant deliverability, TypeScript SDK, generous free tier of 3,000 emails/mo).
   * **Dual Strategy**: When a user submits the Contact Form, the Next.js API handler concurrently dispatches an HTML notification email directly to your personal inbox AND records the message in Supabase's `contact_messages` table. This ensures 100% telemetry retention even during SMTP hiccups.

---

## 3. Application Directory Structure

```
my-portfolio/
├── .env.example                     # Environment schema documentation
├── .env.local                       # Private keys (SUPABASE_URL, ANON_KEY, ADMIN_EMAIL)
├── next.config.mjs                  # Image domains, headers, security policies
├── tailwind.config.js               # Data Canvas color palette, typography, grid utilities
├── tsconfig.json                    # Strict TypeScript configuration
├── package.json
├── public/
│   ├── grid-dot.svg                 # Hairline matrix patterns
│   └── resume-placeholder.pdf
└── src/
    ├── app/
    │   ├── layout.tsx               # Root layout: Telemetry top-bar, font loaders, providers
    │   ├── page.tsx                 # Public Data Canvas (Single page with high-density sections)
    │   ├── globals.css              # Custom grid lines, scrollbars, terminal styling
    │   ├── api/
    │   │   └── contact/
    │   │       └── route.ts         # Secure contact email dispatch (Resend/Nodemailer + Supabase archive)
    │   ├── login/
    │   │   └── page.tsx             # Stark terminal-themed Magic Link login screen
    │   └── admin/
    │       ├── layout.tsx           # Admin shell with technical side rail & status monitor
    │       ├── page.tsx             # Overview: system stats, record counters, quick actions
    │       ├── projects/
    │       │   └── page.tsx         # Full CRUD for RFC/Spec-style projects & metrics
    │       ├── skills/
    │       │   └── page.tsx         # Categorized matrix editor (Core AI, Math, Infra)
    │       ├── profile/
    │       │   └── page.tsx         # Profile avatar, bio, terminal prompt, contact config
    │       ├── leadership/
    │       │   └── page.tsx         # Hackathons & leadership table entries
    │       └── storage/
    │           └── page.tsx         # Certificate & asset manager (Upload, delete, copy URL)
    ├── components/
    │   ├── canvas/                  # Data Canvas Visual Primitives
    │   │   ├── GridBackground.tsx   # Hairline grid with corner crosshairs
    │   │   ├── TelemetryBar.tsx     # Real-time clock, uptime, status beacon
    │   │   ├── SectionHeader.tsx    # Technical section tag e.g. [01_SPECS]
    │   │   └── MetricBox.tsx        # High-contrast numerical metric callout
    │   ├── sections/                # Public Portfolio Modules
    │   │   ├── TerminalHero.tsx     # Interactive CLI-style hero with system diagnostics
    │   │   ├── TechMatrix.tsx       # Categorized hardware/software capability grid
    │   │   ├── ProjectSpecs.tsx     # Technical RFC/Spec project cards with benchmarks
    │   │   ├── LeadershipTable.tsx  # Interactive high-density data table
    │   │   └── ContactCanvas.tsx    # Terminal contact trigger & PGP/Social endpoints
    │   ├── admin/                   # Admin UI Components
    │   │   ├── AdminNav.tsx         # Monospace administrative tab navigation
    │   │   ├── DataTable.tsx        # Generic re-usable table with inline edit/delete
    │   │   ├── ProjectFormModal.tsx # Multi-tab form (Metadata, Metrics, Architecture)
    │   │   └── ImageUploader.tsx    # Drag-and-drop Supabase storage uploader with preview
    │   └── ui/                      # Base Atomic Primitives
    │       ├── Button.tsx           # Monospace button with hover brackets [ Run ]
    │       ├── Input.tsx            # Stark monospace text inputs
    │       └── Dialog.tsx           # High-contrast modal dialog
    ├── lib/
    │   ├── supabase/
    │   │   ├── client.ts            # Browser client with Supabase SSR helpers
    │   │   ├── server.ts            # Server-side authenticated Supabase client
    │   │   └── middleware.ts        # Session refresh & admin email verification
    │   ├── utils.ts                 # Formatting, classNames (clsx + twMerge)
    │   └── telemetry.ts             # Uptime calculators, system timestamps
    ├── types/
    │   └── database.types.ts        # Auto-generated / explicit TypeScript schema types
    └── middleware.ts                # Intercepts /admin routes and validates admin email
```

---

## 4. PostgreSQL Database Schema (Supabase)

All tables use UUID primary keys, timestamp tracking (`created_at`, `updated_at`), and are secured using PostgreSQL Row Level Security (RLS).

### 4.1 Table: `profiles`
Stores the single-record portfolio identity, terminal banner configs, and contact endpoints.

```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    headline TEXT NOT NULL,                  -- e.g. "AI/ML Engineering Student // Class of 2029"
    bio TEXT NOT NULL,
    avatar_url TEXT,                         -- Supabase storage public URL
    resume_url TEXT,                         -- PDF link
    terminal_welcome_msg TEXT NOT NULL,      -- Message output in Terminal Hero
    contact_email TEXT NOT NULL,
    github_url TEXT,
    linkedin_url TEXT,
    x_url TEXT,
    huggingface_url TEXT,
    scholar_url TEXT,
    pgp_fingerprint TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.2 Table: `skills`
Grouped logically for an AI/ML engineer into core disciplines.

```sql
CREATE TYPE skill_category AS ENUM (
    'ML_FOUNDATIONS',      -- Linear Algebra, Probability, Calculus, PyTorch, JAX
    'DEEP_LEARNING_LLM',    -- Transformers, Diffusion, Quantization, LoRA, vLLM
    'SYS_ENGINEERING',     -- CUDA, C++, Distributed Training, Triton, Docker
    'FULL_STACK_APIS',     -- Next.js, FastAPI, PostgreSQL, Vector DBs
    'HARDWARE_TOOLING'     -- NVIDIA H100/A100, TensorRT, ONNX, Git, Linux
);

CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category skill_category NOT NULL,
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 100), -- Telemetry bar %
    years_experience NUMERIC(3, 1),
    highlighted BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.3 Table: `projects`
Structured like technical specifications / RFCs rather than generic screenshots.

```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,               -- e.g. "distributed-moe-engine"
    title TEXT NOT NULL,                     -- e.g. "Distributed Mixture-of-Experts Inference Engine"
    tagline TEXT NOT NULL,                   -- One-line engineering summary
    architecture_summary TEXT NOT NULL,      -- Problem statement & design architecture
    architecture_diagram TEXT,               -- ASCII diagram, Mermaid code, or SVG URL
    stack TEXT[] NOT NULL,                   -- ['PyTorch', 'Triton', 'CUDA', 'FastAPI']
    metrics JSONB DEFAULT '[]'::jsonb,       -- Array of metrics: [{"label": "Latency", "value": "12.4ms", "delta": "-42%"}, {"label": "Throughput", "value": "1.4k tok/s"}]
    repo_url TEXT,
    live_url TEXT,
    paper_url TEXT,
    model_weights_url TEXT,
    status TEXT DEFAULT 'PRODUCTION',        -- 'PRODUCTION', 'RESEARCH', 'EXPERIMENT'
    featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.4 Table: `leadership_hackathons`
Tabular records for hackathon wins, research papers, club leadership, and awards.

```sql
CREATE TABLE leadership_hackathons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,                     -- e.g. "MIT HackMIT 2025"
    role_or_award TEXT NOT NULL,             -- e.g. "1st Place - Autonomous Agents Track"
    organization TEXT NOT NULL,              -- e.g. "MIT / IEEE"
    date_str TEXT NOT NULL,                  -- e.g. "OCT 2025"
    summary TEXT NOT NULL,                   -- Engineering output description
    metrics TEXT,                            -- e.g. "Beat 450+ teams, evaluated on 5k test runs"
    evidence_url TEXT,                       -- Link to project / news / certificate
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.5 Table: `certificates_assets`
Manages uploaded media, papers, certificates, and credentials.

```sql
CREATE TABLE certificates_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date DATE,
    credential_url TEXT,                     -- Verify URL
    file_url TEXT NOT NULL,                  -- Supabase storage link
    file_type TEXT NOT NULL,                 -- 'image/png', 'application/pdf'
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.6 Table: `contact_messages`
Stores incoming contact transmissions for persistent telemetry and zero-drop reliability.

```sql
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    user_agent TEXT,
    ip_hash TEXT,                            -- Anonymized for spam protection
    status TEXT DEFAULT 'UNREAD',            -- 'UNREAD', 'ARCHIVED', 'REPLIED'
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 5. Security & Admin Authentication Flow

```
+----------------------------------------------------------------------------------+
|                             AUTHENTICATION GATEWAY                               |
+----------------------------------------------------------------------------------+
                                         |
                       User requests /login or /admin
                                         |
                                         v
                      +--------------------------------------+
                      | Form: Enter Email Address (Passwordless|
                      +--------------------------------------+
                                         |
                                         v
                     Is email == process.env.NEXT_PUBLIC_ADMIN_EMAIL?
                                    /        \
                             [NO]  /          \  [YES]
                                  v            v
                    Reject immediately.    Issue Supabase Magic Link OTP
                    "ACCESS DENIED:        or Google OAuth Token
                    UNAUTHORIZED PRINCIPAL"     |
                                                v
                                   User clicks Magic Link in email
                                                |
                                                v
                                 Supabase sets Auth JWT in Cookie
                                                |
                                                v
+----------------------------------------------------------------------------------+
|                    NEXT.JS EDGE MIDDLEWARE (middleware.ts)                       |
|  - Intercepts all requests matching `/admin/:path*`                             |
|  - Extracts session JWT via `@supabase/ssr`                                      |
|  - Validates `session.user.email === process.env.ADMIN_EMAIL`                    |
|  - IF INVALID: Destroys session cookie, redirects to `/login?error=unauthorized` |
|  - IF VALID: Forwards request to Admin Route Handler                             |
+----------------------------------------------------------------------------------+
                                         |
                                         v
+----------------------------------------------------------------------------------+
|                 POSTGRESQL ROW LEVEL SECURITY (RLS) POLICIES                     |
|  - Public (anon) role: `SELECT` only on `profiles`, `skills`, `projects`, etc.   |
|  - Authenticated role: `INSERT`, `UPDATE`, `DELETE` allowed ONLY IF:             |
|    `auth.jwt() ->> 'email' = current_setting('app.admin_email')`                 |
|    (Configurable via Supabase SQL function/environment variable)                 |
+----------------------------------------------------------------------------------+
```

---

## 6. Public Interface: Section-by-Section Specification

### Section 01: Telemetry & Terminal Hero (`/` top)
* **Visual Form**: Styled as a high-density Linux/UNIX terminal boot diagnostic session.
* **Header Bar**: `[SESSION_ID: AI-2029-SYS] | [UPTIME: 99.98%] | [NODE: NEXT-EDGE-GLOBAL]`.
* **Interactive Command Line**: Prompts `visitor@belal-ansari:~$` with typing effect and runnable mini-commands:
  * `help`: lists commands (`skills`, `projects`, `contact`, `clear`)
  * `cat about.md`: outputs your philosophy on AI/ML and engineering vision
  * `download resume`: triggers instant download of the active resume PDF.

### Section 02: Classified Tech Matrix (`#stack`)
* **Visual Form**: Five-column engineering grid with progress telemetry bars and tabular details.
* **Columns**:
  1. *ML Foundations & Math* (Calculus, Linear Algebra, PyTorch)
  2. *Deep Learning & LLM Systems* (Transformers, CUDA Kernels, vLLM, Fine-tuning)
  3. *Distributed & Backend* (FastAPI, Redis, Docker, Triton Inference Server)
  4. *Full-Stack Delivery* (Next.js, Tailwind, Postgres, TypeScript)
  5. *Hardware & Tooling* (TensorRT, Linux, Git, NVIDIA Architecture)

### Section 03: Projects as Technical RFCs (`#projects`)
* **Visual Form**: Styled as engineering whitepapers or API documentation cards with:
  * **System Identifier**: e.g., `RFC-004: DISTRIBUTED-INFERENCE`
  * **Architecture Schematic**: ASCII flow diagram or crisp SVG component diagram
  * **Benchmark Telemetry**: 2–3 boxed metrics (e.g. `P99 LATENCY: 14.2ms`, `ACCURACY: 94.6%`, `VRAM: 8.2GB`)
  * **Code & Artifacts Bar**: `[ View Source ]`, `[ Benchmark Specs ]`, `[ Model Weights ]`

### Section 04: Leadership, Research & Hackathons (`#records`)
* **Visual Form**: Stark data grid table with column sort, filter pills (`ALL`, `HACKATHONS`, `RESEARCH`, `LEADERSHIP`), tabular timestamps, rank badges (`[1ST PLACE]`, `[LEAD]`), and metric verification links.

### Section 05: Contact Transmission & Dispatch (`#contact`)
* **Visual Form**: Styled as an industrial "Data Transmission Interface" with visible terminal telemetry, status lines, and technical input fields.
* **Functional Scope**:
  * **Input Fields**: `NAME` (text), `EMAIL` (email), and `TRANSMISSION_PAYLOAD` (message textarea).
  * **Interactive States**:
    * Idle: `[ > TRANSMIT MESSAGE ]`
    * Submitting: `[ STATUS: ENCRYPTING & TRANSMITTING... ]` with blinking cursor
    * Success: `[ STATUS: 200 OK — MESSAGE RECEIVED & DISPATCHED ]`
    * Failure: `[ ERR_TRANSMISSION_FAILED: RETRY ]`
  * **Dual-Delivery Pipeline (Zero Drop Guarantee)**:
    1. **Direct Inbox Dispatch (Email)**: Powered by a Next.js API Route / Server Action using **Resend** (Recommended: clean developer-first API, zero SMTP flakiness, 3,000 free emails/mo) or standard **Nodemailer** (SMTP via Gmail/Host).
    2. **Database Archival**: Simultaneously inserts a record into Supabase `contact_messages` table with timestamp and `UNREAD` state, viewable within the `/admin/messages` dashboard.
* **Auxiliary Telemetry**: PGP Public Key signature card, direct copyable email string, and social endpoints.

---

## 7. Migration Plan from Current Repository

1. The current Vite SPA contains legacy components and dependencies (`react-scroll`, `react-tsparticles`, old CSS files).
2. We will cleanly initialize the Next.js 15 + Tailwind CSS + Supabase infrastructure in the repository root.
3. Replace the legacy aesthetic with the sleek, high-performance, monochromatic "Data Canvas".
4. Configure Supabase client, migrations, seed data, and protected `/admin` route.
