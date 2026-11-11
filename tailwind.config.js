/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#080301',
        orange: '#FF5500',
        ember: '#C24100',
        warm: '#FFDFD1',
        casing: '#DCD9CE',
        surface: '#141414',
      },
      fontFamily: {
        display: ['Rajdhani', 'system-ui', 'sans-serif'],
        sans: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
        crt: ['"Share Tech Mono"', 'ui-monospace', 'monospace'],
        pixel: ['Silkscreen', 'monospace'],
      },
    },
  },
  plugins: [],
}
