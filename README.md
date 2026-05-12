# 30 días con OREA

App móvil web complementaria a la guía PDF **"30 días con OREA"** de [Zeri's Coffee](https://zeriscoffee.com) (Cáceres). Acompaña al usuario durante 30 días de ejercicios estructurados con la cafetera de filtrado **OREA V4 Narrow**: brews guiados con timer + voz, días de cata, días de reflexión, motor de diagnóstico de la taza y cuaderno de notas con dictado.

## Stack

- **Vite + React 18** (JavaScript)
- **lucide-react** para iconografía
- **vite-plugin-pwa** (manifest + service worker, instalable en Android/iOS)
- **localStorage** para persistencia (sin backend)
- **Web Speech API** (anuncios y dictado de notas) + **Web Audio API** (beeps)
- Estilos JSX inline + paleta tokenizada (pastel glassmorphism)

## Estructura

```
src/
├── App.jsx                 # orquestador (state machine)
├── main.jsx
├── data/                   # 30 días + atributos/defectos de cata
├── lib/                    # storage, voice, audio, format, diagnose
├── styles/                 # paleta + animaciones
└── components/
    ├── ui/                 # GlassCard, DayCard, ParamChip, TasteSlider
    └── screens/            # Home, Carousel, Timeline, Countdown,
                            # BrewRunning, PostBrew, NonBrew
public/
├── zeris-logo.svg          # isotipo Zeri's
└── icon-192.png / icon-512.png   # iconos PWA
files-prompt/               # App.jsx original + PDF (referencia, no se toca)
```

## Comandos

```bash
npm install     # primera vez
npm run dev     # dev server en http://localhost:5173
npm run build   # build de producción → dist/
npm run preview # servir dist/ localmente
```

## Despliegue

Pensado para **Cloudflare Pages**:
- Build command: `npm run build`
- Output directory: `dist`
- Sin variables de entorno requeridas en v1.

## Autoría

Producto de [Zeri's Coffee Roaster](https://zeriscoffee.com). Desarrollo por [Webcafeína](https://webcafeina.com).
