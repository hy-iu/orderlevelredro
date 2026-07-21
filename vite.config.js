import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['katex', 'katex/dist/contrib/mhchem.js']
  },
  server: {
    port: 3000,
    host: true
  }
});
