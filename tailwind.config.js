/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: { DEFAULT: '#000000' },
        blue: { 900: '#1e3a8a', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb' },
        purple: { 900: '#581c87', 600: '#9333ea', 400: '#a78bfa' },
        indigo: { 900: '#312e81' },
        green: { 500: '#22c55e', 400: '#4ade80', 300: '#86efac' },
        yellow: { 500: '#eab308', 400: '#facc15', 300: '#fde047' },
        red: { 500: '#ef4444', 400: '#f87171', 300: '#fca5a5' },
        orange: { 500: '#f97316', 400: '#fb923c', 300: '#fdba74' },
      },
    },
  },
  plugins: [],
} 