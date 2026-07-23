/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        physics: {
          dark: '#070913',
          card: 'rgba(15, 23, 42, 0.75)',
          border: 'rgba(56, 189, 248, 0.2)',
          hep: '#ec4899',       // High Energy Physics (Pink/Magenta)
          quantum: '#38bdf8',   // AMO / Quantum (Cyan)
          condensed: '#10b981', // Condensed Matter (Emerald)
          stat: '#f59e0b',      // Stat / Complex (Amber)
          astro: '#a855f7',     // Astro / Gravity (Purple)
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
