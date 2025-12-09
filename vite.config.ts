import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import manifest from './manifest.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest,
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      // switch to "true" to enable sw on development
      devOptions: { enabled: false },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
        // Increase the file size limit to 5MB (from default 2MB)
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
      },
    }),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000, // 1000 kB
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting
        manualChunks: {
          // React core libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Ant Design UI library
          'antd-vendor': ['antd', '@ant-design/icons'],
          // State management
          'recoil-vendor': ['recoil'],
          // Axios for API calls
          'axios-vendor': ['axios'],
        },
      },
    },
  },
});
