import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#04163a",
          accent: "#2b7a78",
          secondary: "#6bcfcf",
        },
      },
      animation: {
        'fade-up-soft': 'fade-up-soft 0.35s ease-out both',
        'soft-pulse': 'soft-pulse 2.4s ease-in-out infinite',
        'badge-pop': 'badge-pop 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both',
        'spin-slow': 'spin 6s linear infinite',
      },
      keyframes: {
        'fade-up-soft': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'soft-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.06)', opacity: '0.9' },
        },
        'badge-pop': {
          '0%': { transform: 'translateY(8px) scale(0.96)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

