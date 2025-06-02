import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['nimbusnotes.up.railway.app', '.railway.app'] // Añadimos los hosts permitidos
  },
  preview: {
    host: true,
    port: 5173,
    allowedHosts: ['nimbusnotes.up.railway.app', '.railway.app'] // Añadimos los hosts permitidos
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})
