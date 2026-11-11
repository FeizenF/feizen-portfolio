import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base keeps the build portable: it works at a domain root and
// under a sub-path such as GitHub Pages' /repository-name/.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
  },
})
