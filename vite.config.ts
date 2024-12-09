import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: 'hanbeul-you',
      project: 'bada-on-fe',
    }),
  ],

  server: {
    host: '0.0.0.0',
  },

  build: {
    sourcemap: true,
  },
});
