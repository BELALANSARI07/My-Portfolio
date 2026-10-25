import CosmicNavbar from '@/components/navbar/CosmicNavbar';
import CosmicFooter from '@/components/sections/CosmicFooter';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { createClient } from '@/lib/supabase/server';
import { GraduationCap, Users, Sparkles, Code2, Download, ArrowRight, MapPin, Calendar, Heart } from 'lucide-react';

export const revalidate = 60;

export default async function AboutPage() {
  let profile = {
    full_name: 'Belal Ansari',
    headline: 'AI/ML Engineer in the Making | B.Tech CSE (AI & ML)',
    bio: 'Aspiring AI/ML Engineer focused on Generative AI, Machine Learning, and Computer Vision. I enjoy turning ideas into practical AI-powered solutions and exploring how intelligent systems can solve real-world problems.',
    location: 'Delhi, India',
    timezone: 'Asia/Kolkata (UTC+05:30)',
    contact_email: 'belalansari000078@gmail.com',
    resume_url: null,
  };

  try {
    const supabase = await createClient();
    const { data } = await supabase.from('profiles').select('*').single();
    if (data) profile = { ...profile, ...data };
  } catch (e) {}

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between">
      <CosmicNavbar resumeUrl={profile.resume_url} />

      <main className="pt-28 pb-20 relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Header Banner */}
        <div className="mb-12 pb-6 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Sparkles className="h-3 w-3" />
            <span>BIOGRAPHY &amp; VISION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Belal Ansari
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            AI/ML engineering student, builder, and technical community leader exploring the frontiers of artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Main Story Narrative (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            <SpotlightCard className="p-8 space-y-5 text-slate-300 text-sm leading-relaxed">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Engineering Philosophy
              </h2>
              <p>
                I am an aspiring AI/ML Engineer pursuing my B.Tech in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning at Noida International University (Class of 2029).
              </p>
              <p>
                My passion lies at the intersection of deep neural representations and real-world deployment. From crafting multi-modal retrieval-augmented generation (RAG) engines capable of parsing dense visual schematics to developing real-time YOLO obstacle detection models for railway fail-safe mechanisms, I thrive on engineering complete, operational solutions.
              </p>
              <p>
                Beyond individual codebases, I believe deeply in collaborative development. As Vice President of the Gen AI Club, I organize hands-on technical workshops, mentor fellow student engineers, and foster an environment where complex AI concepts become practical prototypes.
              </p>
            </SpotlightCard>

            {/* Academic Milestones */}
            <SpotlightCard className="p-8 space-y-6">
              <div className="flex items-center gap-3 text-white font-bold text-lg">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span>Academic Foundation</span>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-white/[0.06] bg-black/30 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-base text-white">
                      B.Tech in Computer Science &amp; Engineering (AI &amp; ML)
                    </h3>
                    <span className="text-xs font-mono text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 bg-purple-500/10">
                      CGPA: 8.65
                    </span>
                  </div>
                  <div className="text-xs text-purple-400">Noida International University, Greater Noida, India</div>
                  <div className="text-xs font-mono text-slate-400">Epoch: 2025 – 2029</div>
                  <p className="text-xs text-slate-400 pt-2 leading-relaxed">
                    Core Coursework: Data Structures &amp; Algorithms, Linear Algebra &amp; Vector Spaces, Neural Networks, Computer Vision, Operating Systems, Database Management Systems.
                  </p>
                </div>
              </div>
            </SpotlightCard>

            {/* Leadership & Community */}
            <SpotlightCard className="p-8 space-y-6">
              <div className="flex items-center gap-3 text-white font-bold text-lg">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Users className="h-5 w-5" />
                </div>
                <span>Leadership &amp; Campus Initiatives</span>
              </div>

              <div className="p-5 rounded-2xl border border-white/[0.06] bg-black/30 space-y-2">
                <h3 className="font-bold text-base text-white">Vice President — Gen AI Club</h3>
                <div className="text-xs text-blue-400">Noida International University</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Directing technical workshops on PyTorch, Hugging Face Transformers, and LangChain for over 120+ active student participants. Led the organization of university hackathons and speaker sessions with industry AI practitioners.
                </p>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column: Profile Specs & Fast Facts (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <SpotlightCard className="p-4 overflow-hidden text-center">
              <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-white/10 bg-slate-900 mb-4">
                <img
                  src="/belal-ansari.png"
                  alt={profile.full_name}
                  className="w-full h-full object-cover object-top opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-70" />
              </div>
              <h3 className="font-bold text-base text-white">{profile.full_name}</h3>
              <p className="text-xs text-purple-300 font-mono mt-0.5">B.Tech CSE (AI/ML) • NIU</p>
            </SpotlightCard>

            <SpotlightCard className="p-6 space-y-4">
              <h3 className="font-bold text-sm text-white uppercase tracking-wider pb-3 border-b border-white/[0.08]">
                Fast Facts
              </h3>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500">LOCATION:</span>
                  <span className="text-white">Delhi, India</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500">TIMEZONE:</span>
                  <span className="text-white">Asia/Kolkata (UTC+05:30)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500">GRADUATION:</span>
                  <span className="text-purple-300 font-bold">Class of 2029</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500">PHONE:</span>
                  <span className="text-white">+91 7042181064</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500">STATUS:</span>
                  <span className="text-emerald-400 font-bold">Open to Internships</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <a
                  href={profile.resume_url || 'https://drive.google.com/file/d/1XN3kU-m0nC1BwG-H8-7cR-6hG/view'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Full Resume</span>
                </a>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </main>

      <CosmicFooter profile={profile as any} />
    </div>
  );
}
