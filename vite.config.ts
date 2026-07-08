import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        coaching: resolve(process.cwd(), 'coaching.html'),
      },
    },
  },
})
