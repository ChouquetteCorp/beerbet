import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import Sitemap from 'vite-plugin-sitemap'
import translation from './src/lang/locales/fr.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Sitemap({
      dynamicRoutes: ['/login', '/faq', '/creation', '/error', '/offline', '/legal', '/privacy'],
      hostname: 'https://beer.chouquettebet.fr/',
    }),
    VitePWA({
      registerType: 'prompt',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,gif,png,svg,json,vue,txt,woff2,ttf}'],
      },
      manifest: {
        name: translation['PWA']['name'],
        short_name: translation['PWA']['short_name'],
        description: translation['PWA']['description'],
        theme_color: '#1f2d40',
        start_url: '/',
        display: 'standalone',
        categories: ['events', 'games', 'social'],
        screenshots: [
          {
            src: './screenshots/1.jpg',
            sizes: '720x1558',
            type: 'image/jpeg',
            platform: 'wide',
            label: 'Screenshot #1',
          },
          {
            src: './screenshots/2.jpg',
            sizes: '720x1558',
            type: 'image/jpeg',
            platform: 'wide',
            label: 'Screenshot #2',
          },
          {
            src: './screenshots/3.jpg',
            sizes: '720x1558',
            platform: 'wide',
            label: 'Screenshot #3',
            type: 'image/jpeg',
          },
          {
            src: './screenshots/4.jpg',
            sizes: '720x1558',
            type: 'image/jpeg',
            label: 'Screenshot #4',
            platform: 'wide',
          },
        ],
        shortcuts: [
          {
            name: 'Créer',
            url: '/creation',
            description: 'Créer un pari',
            icons: [{ src: 'icons/pwa-192x192.png', sizes: '192x192' }],
          },
        ],
        lang: 'fr',
        icons: [
          {
            src: 'icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: 'any',
            type: 'image/png',
          },
        ],
        background_color: '#1f2d40',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/style/global";`,
      },
    },
  },
})
