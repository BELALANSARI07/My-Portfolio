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
        space: {
          deep: "#030712",
          card: "rgba(11, 15, 25, 0.75)",
          surface: "rgba(17, 24, 39, 0.65)",
          pill: "rgba(30, 41, 59, 0.5)",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(139, 92, 246, 0.4)",
        },
        glow: {
          blue: "#3B82F6",
          purple: "#8B5CF6",
          violet: "#9333EA",
          pink: "#EC4899",
          cyan: "#06B6D4",
          amber: "#F59E0B",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
