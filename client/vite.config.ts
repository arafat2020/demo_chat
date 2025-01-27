import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend server URL
        changeOrigin: true, // Update the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove '/api' prefix if needed
      },
    },
  },
})
