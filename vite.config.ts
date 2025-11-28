import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

import manifest from './manifest.json'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env (both .env and .env.mode)
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  // Proxy target: prefer VITE_API_TARGET, then API_TARGET, fallback to local
  const apiTarget = (env.VITE_API_TARGET || env.API_TARGET || 'http://localhost:3000').replace(/\/+$/, '')

  // Allow enabling PWA service worker in development with VITE_PWA_DEV=true
  const pwaDevEnabled = String(env.VITE_PWA_DEV || 'false').toLowerCase() === 'true'

  // Try to locate local certs (mkcert, etc.) under ./certs
  const tryPaths = [
    path.resolve(__dirname, 'certs', 'localhost-key.pem'),
    path.resolve(__dirname, 'certs', 'localhost.pem'),
    path.resolve(__dirname, 'certs', 'localhost+2-key.pem'),
    path.resolve(__dirname, 'certs', 'localhost+2.pem'),
  ]

  let httpsOption: Record<string, unknown> | boolean = {}
  try {
    const keyPath = tryPaths.find((p) => p.endsWith('-key.pem') && fs.existsSync(p))
    const certPath = tryPaths.find((p) => p.endsWith('.pem') && !p.endsWith('-key.pem') && fs.existsSync(p))
    if (keyPath && certPath) {
      httpsOption = { key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) }
      console.log('Vite HTTPS: using cert', keyPath, certPath)
    } else {
      // Leave https option as empty object to let Vite/Node choose default https behavior
      httpsOption = {}
      console.log('Vite HTTPS: no local cert found, using default https option')
    }
  } catch (err) {
    console.warn('Error loading https certs for vite', err)
    httpsOption = {}
  }

  return {
    plugins: [
      react(),
      VitePWA({
        manifest,
        includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        devOptions: { enabled: pwaDevEnabled },
        registerType: 'autoUpdate',
        workbox: { globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'] },
      }),
    ],
    resolve: { alias: { '@': path.resolve(__dirname, './src') } },
    server: {
      https: httpsOption,
      host: true,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
