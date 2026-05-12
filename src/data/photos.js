// Catálogo de fotografías hiperrealistas de la OREA V4 Narrow.
// Los archivos viven en /public/orea/ y son ~1.1 MB cada uno (1200×1600 webp).
// Se usan estratégicamente para que la app no sea solo tipografía y formas:
//  - Hero de la MethodScreen para OREA
//  - Hero superior de la PrepScreen
//  - Photo de portada en el día 1 (carousel)
//  - Identificación visual de cada fondo (FAST/OPEN/CLASSIC/APEX) si aplica

export const OREA_PHOTOS = {
  front: '/orea/front.webp',
  threeQuarter: '/orea/three-quarter.webp',
  topView: '/orea/top-view.webp',
  tilted: '/orea/tilted.webp',
  steelBase: '/orea/steel-base.webp',
  whiteFilter: '/orea/white-filter.webp',
  waveFilter: '/orea/wave-filter.webp',
  groundCoffee: '/orea/ground-coffee.webp',
  onServer: '/orea/on-server.webp',
  modularParts: '/orea/modular-parts.webp',
  baseClassic: '/orea/base-classic.webp',
  baseOpen: '/orea/base-open.webp',
  baseFast: '/orea/base-fast.webp',
  baseApex: '/orea/base-apex.webp',
  supportBase: '/orea/support-base.webp',
};

// Mapa fondo → foto del fondo (para destacar el "bottom" de la receta del día).
export const BOTTOM_PHOTO = {
  CLASSIC: OREA_PHOTOS.baseClassic,
  OPEN: OREA_PHOTOS.baseOpen,
  FAST: OREA_PHOTOS.baseFast,
  APEX: OREA_PHOTOS.baseApex,
};
