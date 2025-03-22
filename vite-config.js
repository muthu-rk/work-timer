// work-timer/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/work-timer/',  // 👈 MATCHES your GitHub folder path
  plugins: [react()],
})
