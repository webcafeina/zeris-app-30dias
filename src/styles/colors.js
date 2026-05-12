// Paleta — neumorfismo cálido (Zeri's Coffee)
// Superficie única (no hay contraste de color entre fondo y tarjetas);
// la profundidad nace de sombras bidireccionales (luz top-left + sombra cálida bottom-right).

const SURFACE = '#EFEAE2';        // latte pálido cálido (fondo y tarjetas comparten color)
const SHADOW_DARK = 'rgba(168, 142, 113, 0.32)';  // sombra cálida (tostado suave), no gris
const SHADOW_LIGHT = 'rgba(255, 255, 255, 0.95)'; // luz blanca

export const C = {
  // Superficie
  bg: SURFACE,
  bgGradient: SURFACE,            // mantengo la key por compatibilidad, ahora plana
  surface: SURFACE,

  // Sombras neumórficas (composables: shadowOut = elevado, shadowIn = hundido)
  shadowOut: `-8px -8px 18px ${SHADOW_LIGHT}, 8px 8px 18px ${SHADOW_DARK}`,
  shadowOutSoft: `-4px -4px 10px ${SHADOW_LIGHT}, 4px 4px 10px ${SHADOW_DARK}`,
  shadowIn: `inset -4px -4px 8px ${SHADOW_LIGHT}, inset 4px 4px 8px ${SHADOW_DARK}`,
  shadowInSoft: `inset -2px -2px 5px ${SHADOW_LIGHT}, inset 2px 2px 5px ${SHADOW_DARK}`,

  // Keys legacy mantenidas para compatibilidad con código que aún las usa.
  // Apuntan a equivalentes neumórficos para que nada quede roto durante la transición.
  glass: SURFACE,
  glassStrong: SURFACE,
  glassBorder: 'transparent',
  glassInner: SURFACE,
  shadow: `-4px -4px 10px ${SHADOW_LIGHT}, 4px 4px 10px ${SHADOW_DARK}`,
  shadowStrong: `-8px -8px 18px ${SHADOW_LIGHT}, 8px 8px 18px ${SHADOW_DARK}`,

  // Texto (warm grays)
  text: '#2A2520',
  textMute: '#6A5F55',
  textFaint: '#A89F95',

  // Acento café espresso — usar con sobriedad
  accent: '#3C2415',
  accentBright: '#5A3519',
  accentLight: 'rgba(60, 36, 21, 0.10)',

  // Acción activa (vertido): azul agua
  pour: '#3B82C4',
  pourBright: '#5BA3DE',
  pourDark: '#1E5A8F',
  pourLight: 'rgba(59, 130, 196, 0.10)',

  // Espera / drawdown: mismo café que accent
  brew: '#3C2415',
  brewBright: '#5A3519',
  brewLight: 'rgba(60, 36, 21, 0.08)',

  // Estados
  success: '#5B8C5A',
  warn: '#B8954A',
  danger: '#C46B6B',

  // Líneas / divisores (muy sutiles)
  divider: 'rgba(60, 40, 25, 0.08)',
};
