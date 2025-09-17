import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: resolve(__dirname, 'app/interface'),
  plugins: [
    react({
      include: [/\.[jt]sx?$/],
    }),
  ],
  resolve: {
    alias: { '@': resolve(__dirname, 'app/interface/src') },
  },
  server: {
    proxy: { '/api': 'http://localhost:8000' },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
});
