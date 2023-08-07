import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,gif,png,svg,json,vue,txt,woff2,ttf}'],
      },
      manifest: {
        name: 'BeerBet',
        short_name: 'BeerBet',
        description: 'BeerBet, a social betting app.',
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
            name: 'Create a bet',
            url: '/creation',
            description: 'Create a bet',
            icons: [{ src: 'icons/pwa-192x192.png', sizes: '192x192' }],
          },
        ],
        lang: 'en',
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
        // additionalData: `@import "@/assets/style/global";`,
      },
    },
  },
})
