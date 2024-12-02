import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: './index.html',
        component: './src/component.ts'
      },
      output: {
        entryFileNames: 'assets/[name].bundle.js',
        chunkFileNames: 'assets/[name].chunk.js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})
