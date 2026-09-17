/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        panel: '#111111',
        paper: '#f5f2e8',
        acid: '#d7ff00',
        pink: '#ff3b9d',
        cyan: '#27e7ff',
        orange: '#ff6b00',
        purple: '#9b6cff',
        muted: '#888888'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"DM Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Playfair Display"', 'Georgia', 'serif']
      },
      boxShadow: {
        'brutal-acid': '11px 11px 0px #d7ff00',
        'brutal-pink': '11px 11px 0px #ff3b9d',
        'brutal-cyan': '11px 11px 0px #27e7ff',
        'brutal-orange': '11px 11px 0px #ff6b00',
        'brutal-purple': '11px 11px 0px #9b6cff',
        'brutal-white': '11px 11px 0px #f5f2e8',
        'brutal-lg': '18px 18px 0px #d7ff00',
        'brutal-modal': '24px 24px 0px #ff3b9d'
      }
    },
  },
  plugins: [],
}
