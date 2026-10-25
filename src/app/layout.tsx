import type { Metadata } from 'next';
import './globals.css';
import CosmicBackground from '@/components/canvas/CosmicBackground';

export const metadata: Metadata = {
  title: 'Belal Ansari | AI/ML Engineer • Student • Problem Solver',
  description:
    'Portfolio of Belal Ansari, B.Tech CSE (AI/ML) student at Noida International University. Specializing in Generative AI, Computer Vision, and real-world intelligent systems.',
  keywords: [
    'Belal Ansari',
    'AI Engineer',
    'Machine Learning',
    'Computer Vision',
    'Generative AI',
    'YOLO',
    'PyTorch',
    'Next.js',
    'Tailwind CSS',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#030712] text-slate-100 antialiased selection:bg-purple-600 selection:text-white relative">
        <CosmicBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
