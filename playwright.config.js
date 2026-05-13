import { defineConfig, devices } from '@playwright/test';

// Configuración base de Playwright para la app de Zeri's.
// Apunta por defecto al dev server local; con BASE_URL=… podemos correr
// los mismos tests contra producción (https://zeris-app-30dias.pages.dev).
// Probamos en Chromium (desktop) y Mobile Safari (PWA real en iPhone).

const E = (typeof process !== 'undefined' && process['env']) || {};
const isCI = !!E['CI'];
const PORT = 5173;
const BASE_URL = E['BASE_URL'] || `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? 'github' : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 15'] },
    },
  ],
  // Arranca el dev server si los tests apuntan a localhost. Si pasamos
  // BASE_URL externo, no levantamos servidor.
  webServer: BASE_URL.startsWith('http://localhost')
    ? {
        command: 'npm run dev',
        url: BASE_URL,
        reuseExistingServer: !isCI,
        timeout: 60_000,
      }
    : undefined,
});
