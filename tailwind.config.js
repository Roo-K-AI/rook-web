/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        success: { DEFAULT: '#22C55E', 50: '#f0fdf4', 600: '#16a34a' },
        warning: { DEFAULT: '#F59E0B', 50: '#fffbeb', 600: '#d97706' },
        danger: { DEFAULT: '#EF4444', 50: '#fef2f2', 600: '#dc2626' },
        surface: {
          DEFAULT: '#F8FAFC',
          card: '#FFFFFF',
          dark: '#0B1120',
          'dark-card': '#131C31',
          'dark-hover': '#1E293B',
        },
        ink: {
          DEFAULT: '#0F172A',
          muted: '#64748B',
          dark: '#F1F5F9',
          'dark-muted': '#94A3B8',
        },
        edge: {
          DEFAULT: '#E2E8F0',
          dark: '#1E293B',
        },
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        soft: '0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px 0 rgb(15 23 42 / 0.04)',
        card: '0 1px 3px 0 rgb(15 23 42 / 0.08), 0 4px 12px -2px rgb(15 23 42 / 0.06)',
        'card-hover': '0 8px 30px -4px rgb(15 23 42 / 0.12), 0 4px 12px -2px rgb(15 23 42 / 0.08)',
        glow: '0 0 0 1px rgb(124 58 237 / 0.1), 0 8px 30px -4px rgb(124 58 237 / 0.25)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};
