import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'app/interface'),
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'app/interface/src') },
  },
  server: {
    proxy: { '/api': 'http://localhost:8000' },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  // 1) Global loader override for all .js/.jsx files
  esbuild: {
    loader: 'jsx',           // apply JSX parsing to .js
    include: [
      'src/**/*.js',
      'src/**/*.jsx',
      'node_modules/**/*.js',
      'node_modules/**/*.jsx',
    ],
  },
  // 2) Optimize deps so pre‐bundling also respects JSX in .js
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
      }
    }
  }
});
