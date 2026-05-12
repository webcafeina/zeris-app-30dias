import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Timestamp fijado en cada build de Vite. Lo inyectamos como define global
// para que la app pueda mostrar la versión en el footer y así sea fácil
// confirmar que el dispositivo está viendo el último deploy.
const BUILD_DATE = new Date().toISOString();
const BUILD_SHORT = BUILD_DATE.slice(0, 16).replace('T', ' ');

export default defineConfig({
  define: {
    __BUILD_DATE__: JSON.stringify(BUILD_DATE),
    __BUILD_SHORT__: JSON.stringify(BUILD_SHORT),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['zeris-logo.svg'],
      devOptions: { enabled: false },
      manifest: {
        name: '30 días con OREA',
        short_name: 'OREA',
        description: 'Aprende a usar la cafetera OREA V4 Narrow en 30 días. Por Zeri\'s Coffee.',
        theme_color: '#3C2415',
        background_color: '#FAFAF8',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        lang: 'es',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        navigateFallback: '/index.html',
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
});
