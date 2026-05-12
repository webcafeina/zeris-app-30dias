# Plan — 30 días con Zeri's

App móvil web complementaria a la guía PDF de Zeri's Coffee.
Marca tareas con `[x]` a medida que se completan.

🌐 **Producción**: https://zeris-app-30dias.pages.dev
🧪 **Dev local**: `npm run dev` → http://localhost:5173

---

## Cómo testear el progreso

Dos formas, complementarias:

**1. En local (mientras programamos):**
```bash
npm run dev
```

**2. En móvil real (preview pública por cada push):**
- Cada push a `main` actualiza https://zeris-app-30dias.pages.dev
- Cada push a otra rama genera una URL preview única en Cloudflare Pages
- Abrir esa URL desde el iPhone/Android → instalar como PWA

---

## Estado del producto (mayo 2026)

### ✅ Listo y desplegado

**Infraestructura**
- Vite + React 18 + vite-plugin-pwa
- GitHub `webcafeina/zeris-app-30dias`, Cloudflare Pages, SW con autoUpdate + skipWaiting
- Build limpio, sin warnings

**Selector de método (entrada)**
- 7 métodos: OREA (activo), V60, AeroPress, Moka, Prensa francesa, Chemex, Espresso
- Foto hero de la OREA, descripción + tagline Zeri's
- Bloque promo con código `CAFETAZO10`
- Glosario y libro de recetas accesibles desde aquí también

**Navegación entre métodos**
- Pill "Reto activo" en Home → abre MethodSwitcher (bottom sheet)
- Estado persistido **por método** (cada uno con su progreso independiente)
- Switcher incluye: cambiar método, ver todas las recetas, volver al selector inicial,
  **exportar/importar backup** del progreso completo

**Glosario**
- 15 términos del oficio (bloom, swirl, rao spin, drawdown, ratio, FAST, etc.)
- Inline `<Hint>` con `?` que abre un bottom sheet con la definición
- Pantalla completa de glosario desde Home

**Libro de recetas**
- Toggle "Por autor" / "Por curso"
- Vista por autor agrupa por barista (Hoffmann, Hedrick, Kasuya, Wölfl, Rao, D'Ottavio, etc.)
- Buscador: filtra por título, autor, gramaje, ratio, fondo, temp
- Ficha esquemática: parámetros + tabla de vertidos + CTA "Empezar ejercicio"

**Cafés recomendados**
- Card en TimelineScreen con café Zeri's que casa con el ejercicio del día
- Datos PLACEHOLDER (4 cafés inventados pero perfilados a tipos reales)
- Link a la tienda; estructura preparada para conectar con WooCommerce REST

**Flujo del brew**
1. **Carousel educativo** del día (slides con texto, fotos OREA, vídeo de YouTube cuando aplica, BaristaCard con redes sociales del autor de la receta)
2. **Timeline** del día (objetivo, parámetros, café recomendado, plan paso a paso)
3. **PrepScreen** ("Pasos previos · sin cronómetro"): 9 pasos checkables que incluyen
   montar la cafetera sobre la báscula, tarar, pesar café, moler con click count,
   verificar peso, re-tarar, calentar agua
4. **Countdown** 3-2-1 → "Empecemos a hacer café"
5. **BrewRunning** con cronómetro:
   - Anillo circular con gradiente azul (igual que el agua), drain visible
   - Etiqueta dinámica VIERTE/SWIRL/RAO SPIN/CAFÉ AL FILTRO → ESPERA cuando termina la acción
   - Subtitulo con verbo en gerundio + segundos + gramos para vertidos
   - Animación de agua subiendo durante el vertido + chorrito cayendo
   - En últimos 5s: anillo + card se desvanecen (opacity → 0)
   - Card "AHORA · PASO" rebota (cardPum) al cambiar de paso
   - Drawdown centrado, voz "Pulsa en Terminar" cuando supera target time
   - Voice tips ambientales durante esperas largas (pool por acción)
6. **PostBrew** con cata (sliders + defectos + notas con dictado) +
   "Comparte tu cafetazo" con caption pre-rellenado para Instagram + toast "Texto copiado"

**Mis catas (Diario)**
- Pantalla "Mis catas" en cabecera de Home
- Logs por día, ORDENADOS por última actividad
- Cada día: tarjeta colapsable con TODOS los intentos (un día puede tener 5-6 catas)
- Cada intento: fecha, tiempo, rating, sliders de cata con delta vs anterior, defectos, notas
- CTA "Repetir este ejercicio" en cada tarjeta

**Reto en redes**
- Banner en Home → ChallengeScreen
- 30 fotos en 30 días (mínimo 3 por subida) → descuento en panel de usuario zeriscoffee.com
- Hashtag `#RetoZerisCoffee` + @zeriscoffeeroaster
- 3 cards visuales: tu método + paquete Zeri's + la app en pantalla

**Identidad visual**
- B&W editorial estilo Ineffable
- Fondo zen con 4 orbes pastel azul-violeta + un toque cálido café con leche, animados con
  Web Animations API (evita el throttling de iOS Safari)
- Sin urgencia roja — todo va en azules y se desvanece por opacidad
- CTAs sticky abajo con backdrop-blur + safe-area-inset para el home bar de iPhone
- Fotos hiperrealistas OREA en MethodScreen, HomeScreen, PrepScreen, CarouselScreen, RecipesScreen
- Tipografía Inter, mucho aire, sombras verde-lima/gris-azulado para lift

**Datos**
- 30 días completos en `data/days.js` con carouseles, parámetros, pasos
- Cada día puede declarar `coffeeId` (recomendación), `baristaId`, slide.photoId
- 8 baristas con bio, foto (placeholder), web, IG, YouTube, Twitter
- `lib/brewPlan.js`: helpers para pour duration (5 g/s), action duration
  (swirl 5s, rao 10s, dose 10s), inserción automática del paso DOSIS al inicio

**Persistencia**
- localStorage por método + migración de formato antiguo
- **Backup JSON manual** (export/import) desde MethodSwitcher hasta que tengamos backend

---

## ⏳ Pendientes priorizados

### Cosas que solo NECESITAN datos tuyos (rápido cuando los tengamos)

- [ ] **Fotos reales de baristas** → reemplazar avatares con iniciales en
      `public/baristas/<id>.jpg`
- [ ] **Catálogo real de cafés Zeri's** → reemplazar `data/coffees.js` con
      productos reales + URLs de tienda + fotos de paquete
- [ ] **Investigación profunda de vídeos** por día (30 vídeos verificados de
      baristas reconocidos). Hecho solo para Wölfl (Día 24). Quedan 29 días por
      revisar uno a uno.

### Backend + auth (decisión técnica pendiente)

- [ ] **Auth contra zeriscoffee.com (WordPress)** — comparar usuarios entre la app
      y la web. Opciones: JWT, magic link, OAuth WP, Google/Apple SSO.
- [ ] **Backend para persistencia cross-device**: Cloudflare Workers + KV/D1.
      Estado del reto, fotos subidas, validación del reto social,
      asignación de descuentos automáticos en zeriscoffee.com.
- [ ] **Integración WooCommerce REST API** para cafés en vivo.

### Otros métodos (V60, AeroPress, Moka, Francesa, Chemex, Espresso)

- [ ] Crear curva de 30 días por método. Hoy solo OREA tiene contenido.
      Cuando arrancamos otro, hay que diseñar el currículum específico
      (cada uno con su pedagogía).

### UX / pulido menor

- [ ] Protección de `main` en GitHub (PR required, no force-push)
- [ ] Branch `dev` y flujo PR
- [ ] Lighthouse PWA score ≥ 90 (verificar)
- [ ] Splash screens iOS (opcional)
- [ ] Analítica ligera (Plausible / Cloudflare Web Analytics) — opt-in
- [ ] Página `/about` o footer con créditos
- [ ] Auditoría a11y básica: contraste, focus, labels en sliders

---

**Estado actual**: app totalmente funcional en local + producción, con flujo completo OREA y diario de catas. Pendientes principales son **contenido real (cafés, fotos, vídeos)** y **decisión de backend/auth** para persistencia cross-device y validación del reto social.
