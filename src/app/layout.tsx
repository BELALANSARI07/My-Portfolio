import type { Metadata } from 'next';
import './globals.css';
import TelemetryBar from '@/components/canvas/TelemetryBar';

export const metadata: Metadata = {
  title: 'Belal Ansari // AI/ML Engineering & Systems Telemetry Canvas',
  description:
    'Engineering portfolio of Belal Ansari, AI/ML Engineering Student (Class of 2029). Focus in Computer Vision, Generative AI, and Low-Latency Edge Telemetry.',
  keywords: [
    'AI Engineer',
    'Machine Learning',
    'Computer Vision',
    'PyTorch',
    'Belal Ansari',
    'Data Canvas',
    'Next.js 15',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-canvas-black text-text-primary antialiased selection:bg-border-active selection:text-text-pure">
        <TelemetryBar adminEmail="belalansari000078@gmail.com" />
        {children}
      </body>
    </html>
  );
}
