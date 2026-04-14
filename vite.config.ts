import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => ({
  base:
    mode === 'monitoring'
      ? '/monitoring/'
      : command === 'build'
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
