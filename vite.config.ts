import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base:
    mode === 'monitoring'
      ? '/monitoring/'
      : mode === 'pages'
        ? '/AICopilotDemo/'
        : '/',
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
