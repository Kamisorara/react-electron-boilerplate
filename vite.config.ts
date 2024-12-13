import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 使用相对位置
  base: './',
  build: {
    // Output directory for production
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      // Customize the output for Electron packaging
      output: {
        // Ensure correct directory structure for the production build
        dir: path.resolve(__dirname, 'dist'),
      },
    },
  },
  server: {
    port: 5173,
  },
})
