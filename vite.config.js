import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js in un chunk separato
          'three': ['three'],
          // React in un chunk separato
          'vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
})