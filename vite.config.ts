import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/AICopilotDemo/' : mode === 'monitoring' ? '/monitoring/' : '/',
  plugins: [react()],
  build: mode === 'monitoring'
    ? {
        outDir: 'dist-monitoring',
        rollupOptions: {
          input: 'monitoring.html',
        },
      }
    : undefined,
}))
