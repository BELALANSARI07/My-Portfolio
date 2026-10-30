import type { Metadata, Viewport } from 'next';
import './globals.css';
import CosmicBackground from '@/components/canvas/CosmicBackground';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#030712',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.belalansari.me'),
  title: {
    default: 'Belal Ansari | AI/ML Engineer • Student • Problem Solver',
    template: '%s | Belal Ansari',
  },
  description:
    'Portfolio of Belal Ansari, B.Tech CSE (AI/ML) student at Noida International University. Specializing in Generative AI, Computer Vision (YOLOv8), and real-world intelligent systems.',
  keywords: [
    'Belal Ansari',
    'AI Engineer',
    'Machine Learning',
    'Computer Vision',
    'Generative AI',
    'YOLOv8',
    'PyTorch',
    'Next.js',
    'FastAPI',
    'Noida International University',
  ],
  authors: [{ name: 'Belal Ansari', url: 'https://www.belalansari.me' }],
  creator: 'Belal Ansari',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.belalansari.me',
    title: 'Belal Ansari | AI/ML Engineer • Student • Problem Solver',
    description:
      'Portfolio of Belal Ansari, B.Tech CSE (AI/ML) student at Noida International University. Specializing in Generative AI, Computer Vision, and real-world intelligent systems.',
    siteName: 'Belal Ansari Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belal Ansari | AI/ML Engineer',
    description:
      'Building edge computer vision, multi-modal RAG engines, and real-world intelligent systems. NIAT Makers Conclave Finalist.',
    creator: '@belalansari',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Belal Ansari',
  url: 'https://www.belalansari.me',
  jobTitle: 'AI/ML Engineering Student & Developer',
  affiliation: {
    '@type': 'EducationalOrganization',
    name: 'Noida International University',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Noida International University',
  },
  sameAs: [
    'https://github.com/BELALANSARI07',
    'https://www.linkedin.com/in/belal-ansari-7a2bb3303',
    'https://www.kaggle.com/belalansari07',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Computer Vision',
    'YOLOv8',
    'PyTorch',
    'FastAPI',
    'Next.js',
    'TypeScript',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#030712] text-slate-100 antialiased selection:bg-purple-600 selection:text-white relative">
        <CosmicBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
