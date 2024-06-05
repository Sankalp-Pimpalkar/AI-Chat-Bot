import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',  // Ensure the target is ESNext
    rollupOptions: {
      output: {
        format: 'es',  // Ensure the output format is ES modules
      },
    },
  },
})
