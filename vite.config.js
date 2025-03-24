const appVersion = new Date().toISOString(); // Injected version

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(appVersion)
  },
  base: '/work-timer/',  // 👈 MATCHES your GitHub folder path
  plugins: [react()],
})
