/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.{js,html}'],
  theme: {
    extend: {
      colors: {
        ink: '#191919',
        bone: '#efedea',
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono Variable"', 'ui-monospace', 'monospace'],
        display: ['"Geist Variable"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        h1: ['clamp(3.5rem, 14vw, 14rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'h1-2': ['clamp(2.75rem, 11vw, 11rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        h2: ['clamp(2rem, 6vw, 5rem)', { lineHeight: '1.15' }],
        menu: ['clamp(3rem, 12vw, 12rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        note: ['clamp(0.75rem, 0.9vw, 1rem)', { lineHeight: '1.2' }],
        body: ['clamp(1rem, 1.1vw, 1.25rem)', { lineHeight: '1.4' }],
      },
      transitionTimingFunction: {
        custom: 'cubic-bezier(0.65, 0, 0.35, 1)',
        'custom-less': 'cubic-bezier(0.5, 0, 0.5, 1)',
        'custom-text-links': 'cubic-bezier(0.6, 0, 0.4, 1)',
      },
      transitionDuration: {
        1250: '1250ms',
      },
    },
  },
  plugins: [],
};
