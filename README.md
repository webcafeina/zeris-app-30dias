# 30 días con Zeri's

App móvil web complementaria a la guía **"30 días con OREA"** de [Zeri's Coffee](https://zeriscoffee.com) (Cáceres). Acompaña al usuario durante 30 días de ejercicios estructurados de café de filtro: brews guiados con timer + voz, días de cata, motor de diagnóstico de la taza, cuaderno de notas multi-intento, recomendación de café Zeri's por ejercicio y reto social con descuento.

🌐 **Producción**: https://zeris-app-30dias.pages.dev — deploy automático en cada push a `main` (Cloudflare Pages).

## Qué incluye

- **Selector de método** (OREA activo · V60, AeroPress, Moka, Prensa francesa, Chemex, Espresso "próximamente"), con foto hero hiperrealista de la OREA.
- **Switcher de método** desde Home: cambiar de reto sin perder progreso del anterior, ver todas las recetas, **export/import JSON** del progreso.
- **Glosario** de 15 términos del oficio (bloom, swirl, rao spin, drawdown, ratio, FAST, etc.) inline + pantalla completa.
- **Libro de recetas** con dos vistas (por autor / por curso) y buscador (gramaje, ratio, fondo, barista).
- **Carousel educativo** por día con vídeos verificados de baristas reconocidos (Hoffmann, Hedrick, Kasuya, Wölfl, Patrik Rolf, Scott Rao, D'Ottavio) y `BaristaCard` con redes para seguir al autor.
- **Pasos previos al cronómetro**: checklist de 9 puntos (montar dripper sobre báscula, tarar, pesar, moler con click count, verificar, re-tarar, calentar agua).
- **Cronómetro de brew**: anillo circular con gradiente azul, agua animada subiendo durante el vertido, chorrito cayendo, etiqueta dinámica VIERTE/SWIRL/RAO/DOSE → ESPERA, fade en últimos 5s, voz para anuncios + pool de tips ambientales, drawdown centrado con cue "Pulsa en Terminar" cuando supera target time.
- **Cata post-brew** con sliders + defectos + notas con dictado, y **"Comparte tu cafetazo"** con caption pre-rellenado para Instagram.
- **Diario de catas (Mis catas)**: cada día acumula intentos (un día puede tener 5+ catas), con delta vs intento anterior en cada atributo.
- **Reto en redes** (`#RetoZerisCoffee` + `@zeriscoffeeroaster`): 30 fotos en 30 días para desbloquear descuento.
- **Café Zeri's recomendado** por ejercicio con CTA a la tienda.
- **Identidad visual editorial B&W**: fondo zen con 4 orbes pastel azul-violeta animados con Web Animations API, CTAs sticky con backdrop blur + safe-area iOS, sin urgencia roja (todo en azules y desvanecimientos).

## Stack

- **Vite + React 18** (JS)
- **vite-plugin-pwa** (SW autoUpdate + skipWaiting, instalable en Android/iOS)
- **lucide-react** para iconografía
- **Web Speech API** (voz + dictado) + **Web Audio API** (beeps)
- **localStorage** para persistencia + export/import JSON (no backend aún)
- Estilos JSX inline + paleta tokenizada en `src/styles/colors.js`

## Estructura

```
src/
├── App.jsx                # state machine: método activo + flujo del día
├── main.jsx               # arranque + <BackgroundOrbs/>
├── data/
│   ├── methods.js         # catálogo de 7 métodos
│   ├── days.js            # 30 días OREA (carouseles, parámetros, steps)
│   ├── baristas.js        # 8 baristas con bio, web, redes
│   ├── coffees.js         # cafés Zeri's recomendados (placeholders)
│   ├── glossary.js        # 15 términos del oficio
│   ├── tips.js            # pool de consejos de voz durante esperas
│   ├── photos.js          # mapa de fotos OREA + helpers
│   ├── zerisInfo.js       # contacto + redes Zeri's
│   └── taste.js           # atributos + defectos de cata
├── lib/
│   ├── storage.js         # localStorage + migraciones
│   ├── brewPlan.js        # plan del brew (dose, pour duration, action duration)
│   ├── backup.js          # export/import JSON del progreso
│   ├── voice.js           # speak + speakTip (no interrumpe)
│   ├── audio.js           # beeps
│   ├── format.js          # tiempo mm:ss + helpers
│   └── diagnose.js        # heurísticas de diagnóstico de la taza
├── styles/
│   ├── colors.js          # tokens B&W + acentos azul agua
│   └── animations.css     # keyframes (cardPum, waterDropFall, etc.)
└── components/
    ├── ui/                # primitivas reutilizables
    │   ├── CircularTimer.jsx, WaterFill.jsx, WaterStream.jsx
    │   ├── BackgroundOrbs.jsx (WAAPI)
    │   ├── DayCard.jsx, GlassCard.jsx, ParamChip.jsx, TasteSlider.jsx
    │   ├── MethodIcon.jsx, MethodSwitcher.jsx
    │   ├── Hint.jsx, BaristaCard.jsx, SocialButton.jsx
    │   ├── OreaPhoto.jsx, CoffeeRecommendationCard.jsx
    │   └── BackupSection.jsx
    └── screens/
        ├── MethodScreen.jsx      # entrada
        ├── HomeScreen.jsx        # diario, glosario, recetas, reto
        ├── CarouselScreen.jsx, TimelineScreen.jsx
        ├── PrepScreen.jsx, CountdownScreen.jsx
        ├── BrewRunningScreen.jsx, PostBrewScreen.jsx, NonBrewScreen.jsx
        ├── RecipesScreen.jsx, GlossaryScreen.jsx
        ├── ChallengeScreen.jsx, LogsScreen.jsx

public/
├── zeris-logo.svg
├── icon-192.png, icon-512.png
├── orea/                  # 19 fotos hiperrealistas de la OREA V4
└── baristas/              # placeholder; aquí van las fotos reales
```

## Comandos

```bash
npm install     # primera vez
npm run dev     # dev server en http://localhost:5173 (o LAN IP)
npm run build   # build de producción → dist/
npm run preview # servir dist/ localmente
```

## Despliegue

Cloudflare Pages:
- Build command: `npm run build`
- Output directory: `dist`
- Variable de entorno: `NODE_VERSION=20`

## Autoría

Producto de [Zeri's Coffee Roaster](https://zeriscoffee.com). Desarrollo por [Webcafeína](https://webcafeina.com).
