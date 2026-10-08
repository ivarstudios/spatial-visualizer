import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/spatial-visualizer/',
  plugins: [react()],
  server: {
    host: true, // Expose to local network
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pointcloud: resolve(__dirname, 'pointcloud.html'),
        // Add future pages here:
        // mesh: resolve(__dirname, 'mesh.html'),
        // splat: resolve(__dirname, 'splat.html'),
      },
    },
  },
})
