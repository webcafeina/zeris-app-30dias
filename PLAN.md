# Plan — 30 días con OREA

Roadmap de la app móvil web complementaria a la guía PDF de Zeri's Coffee.
Marca tareas con `[x]` a medida que se completan.

---

## Cómo testear el progreso

Dos formas, complementarias:

**1. En local (mientras programamos):**
```bash
npm run dev
```
Abre `http://localhost:5173` en el navegador del portátil. Los cambios se ven al instante.

**2. En móvil real (preview pública por cada push):**
- Cada push a GitHub dispara un build en **Cloudflare Pages**.
- Cloudflare genera una URL pública (ej. `<commit>.zeris-app-30dias.pages.dev`).
- Abrir esa URL desde el iPhone/Android → instalar como PWA → testear voz, beeps, offline, instalación.
- La rama `main` actualiza la URL de producción; cualquier otra rama genera su propia preview.

> La preview pública es **crítica** porque Web Speech API, instalación PWA y service worker solo se comportan bien en hardware real, no en el simulador.

---

## Fase 0 — Bootstrap y repo

- [x] Inicializar Vite + React 18 + `vite-plugin-pwa`
- [x] Importar `App.jsx` original y PDF como referencia (`files-prompt/`)
- [x] Extraer `styles/`, `lib/` y `data/` desde `App.jsx`
- [x] Extraer primitivas UI (`GlassCard`, `DayCard`, `ParamChip`, `TasteSlider`)
- [x] Extraer pantallas (`Home`, `Carousel`, `Timeline`, `Countdown`, `BrewRunning`, `PostBrew`, `NonBrew`)
- [x] Añadir logo Zeri's + iconos PWA (192/512)
- [x] Redactar `README.md` inicial
- [x] Crear repo en GitHub (`webcafeina/zeris-app-30dias`, público)
- [x] Configurar `gh` CLI y push inicial a `origin/main`

## Fase 1 — Higiene de repo

- [x] Añadir `.claude/` al `.gitignore` (`node_modules/` y `dist/` ya estaban)
- [x] Commitear `package-lock.json`
- [x] Conectar repo a Cloudflare Pages (ver Fase 4)
- [ ] Configurar protección de `main` (require PR, no force-push) en GitHub
- [ ] Crear branch de trabajo `dev` y flujo PR → main

## Fase 2 — Core funcional (estado actual a auditar)

Antes de marcar, validar en navegador que cada flujo funciona end-to-end.

- [ ] **Home**: progreso global, retomar día actual, acceso a timeline
- [ ] **Carousel**: navegación entre los 30 días con `DayCard`
- [ ] **Timeline**: vista vertical de los 30 días con estado completado/pendiente
- [ ] **Countdown**: cuenta atrás previa al brew (con beeps)
- [ ] **BrewRunning**: timer guiado paso a paso + anuncios por voz (Web Speech)
- [ ] **PostBrew**: cata con `TasteSlider` + motor `diagnose.js`
- [ ] **NonBrew**: días de cata / reflexión sin extracción
- [ ] Persistencia en `localStorage` (avance, notas, catas) verificada
- [ ] Dictado de notas funcional en Android e iOS

## Fase 3 — PWA y experiencia móvil

- [ ] Verificar instalación en Android (Chrome) — banner "Añadir a pantalla de inicio"
- [ ] Verificar instalación en iOS (Safari) — meta tags `apple-touch-icon`, `apple-mobile-web-app-*`
- [ ] Probar offline (service worker sirviendo `dist/` cacheado)
- [ ] Splash screens iOS (opcional, según calidad deseada)
- [ ] Revisar viewport, safe-area-inset, sin scroll horizontal
- [ ] Lighthouse PWA score ≥ 90

## Fase 4 — CI/CD y despliegue

- [x] **Cloudflare Pages**: conectado a `webcafeina/zeris-app-30dias`
  - Build command: `npm run build`
  - Output directory: `dist`
  - Variable de entorno: `NODE_VERSION=20`
  - Auto preview deployments en cada push (no-`main`) → URL única por commit
  - Production deployment en cada push a `main`
- [x] **URL de producción**: https://zeris-app-30dias.pages.dev (HTTP 200 verificado)
- [ ] Configurar dominio (¿`30dias.zeriscoffee.com`? confirmar con Zeri's)
- [ ] Verificar HTTPS y headers de seguridad
- [ ] Smoke test en producción desde móvil real
- [ ] GitHub Action de build en PRs (opcional — Cloudflare ya hace build, esto es redundante salvo que queramos test runner)

## Fase 5 — Pulido pre-lanzamiento

- [ ] QA cruzado: iPhone Safari, Android Chrome, desktop responsive
- [ ] Revisión de textos (copy) con Zeri's
- [ ] Accesibilidad básica: contraste, focus visible, labels en sliders
- [ ] Analítica ligera (Plausible / Cloudflare Web Analytics) — opt-in
- [ ] Página `/about` o footer con créditos (Zeri's + Webcafeína)

## Fase 6 — Post-lanzamiento (backlog)

- [ ] Compartir progreso (screenshot/share API)
- [ ] Exportar notas a PDF/email
- [ ] Modo claro/oscuro automático
- [ ] Soporte multiidioma (ES → EN)
- [ ] Variantes para otras cafeteras (V60, Kalita…)

---

**Estado actual:** Infraestructura lista. App desplegada en https://zeris-app-30dias.pages.dev. Próximo: auditoría funcional de pantallas (Fase 2).
