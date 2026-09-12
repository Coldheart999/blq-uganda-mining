/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uganda: {
          black: "#111111",
          yellow: "#FCDC04",
          red: "#D90000",
        },
        cyber: {
          bg: "#0B0E14",
          card: "#121824",
          cardHover: "#1A2332",
          border: "#1E293B",
          neon: "#10B981",
          yellow: "#F59E0B",
          accent: "#3B82F6",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [],
}
