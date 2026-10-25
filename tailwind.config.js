/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          black: "#08090A",
          subtle: "#111315",
          surface: "#1A1D20",
          card: "#121417",
        },
        border: {
          subtle: "#23272B",
          active: "#3E444B",
          focus: "#5A626C",
        },
        text: {
          muted: "#6C747E",
          secondary: "#9EA8B3",
          primary: "#F0F3F6",
          pure: "#FFFFFF",
        },
        telemetry: {
          green: "#38EF7D",
          amber: "#FFB020",
          red: "#FF4D4D",
        },
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "Courier New", "monospace"],
        sans: ["var(--font-geist-sans)", "Inter", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, #23272B 1px, transparent 1px), linear-gradient(to bottom, #23272B 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-dense": "32px 32px",
        "grid-sparse": "64px 64px",
      },
    },
  },
  plugins: [],
};
