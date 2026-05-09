import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        jobs: resolve(__dirname, 'jobs.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
