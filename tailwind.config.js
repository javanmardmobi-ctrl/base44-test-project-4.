/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#092F57',
          deep: '#062748',
          soft: '#174D7C',
        },
        mist: '#EDF4FA',
        gold: '#C6A66B',
        ink: '#111827',
        muted: '#475569',
        line: '#E5EAF0',
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        shell: '1280px',
      },
      boxShadow: {
        soft: '0 24px 60px -30px rgba(9, 47, 87, 0.35)',
        card: '0 36px 80px -40px rgba(9, 47, 87, 0.55)',
        disc: '0 18px 40px -18px rgba(6, 39, 72, 0.55)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
