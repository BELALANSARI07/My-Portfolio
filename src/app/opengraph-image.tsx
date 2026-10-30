import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Belal Ansari | AI/ML Engineer & Systems Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #030712 0%, #0b0f19 50%, #030712 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow Spheres */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '450px',
            height: '450px',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            left: '-50px',
            width: '450px',
            height: '450px',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
          }}
        />

        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 20px',
              borderRadius: '9999px',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              background: 'rgba(139, 92, 246, 0.1)',
              color: '#c084fc',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            <span>BELAL ANSARI // PORTFOLIO</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '9999px',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#34d399',
              fontSize: '16px',
            }}
          >
            <span>● AVAILABLE FOR INTERNSHIPS</span>
          </div>
        </div>

        {/* Center Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
            }}
          >
            AI/ML Engineer in the Making
          </h1>
          <p
            style={{
              fontSize: '26px',
              color: '#94a3b8',
              margin: 0,
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            Building edge computer vision, multi-modal RAG engines, and real-world intelligent systems. NIAT Makers Conclave Finalist.
          </p>
        </div>

        {/* Bottom Footer Pills */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            {['Python', 'PyTorch', 'YOLOv8', 'OpenCV', 'FastAPI', 'Next.js', 'ESP32'].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: '#e2e8f0',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: '20px',
              color: '#a855f7',
              fontWeight: 700,
              fontFamily: 'monospace',
            }}
          >
            belalansari.me
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
