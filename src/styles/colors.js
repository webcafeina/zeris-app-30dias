// Paleta — minimalista B&W editorial con sombras verde-lima naturales.
// Estructura por bordes finos + sombras suaves color hoja de cafeto para
// dar "lift" a las tarjetas sin perder el carácter editorial limpio.

const BLACK = '#0A0A0A';
const WHITE = '#FFFFFF';
const BORDER = 'rgba(10, 10, 10, 0.08)';
const BORDER_STRONG = 'rgba(10, 10, 10, 0.20)';

// Sombras verde-lima muy suaves: evoca hoja de cafeto, fresco y natural,
// sin teñir las tarjetas. Mantiene el carácter B&W editorial.
const SHADOW_GREEN = 'rgba(176, 210, 140, 0.50)';
const SHADOW_GREEN_SOFT = 'rgba(176, 210, 140, 0.34)';
const SHADOW_LIGHT = 'rgba(255, 255, 255, 1)';

export const C = {
  // Superficies
  bg: '#FCFCFD',
  bgGradient: '#FCFCFD',
  surface: WHITE,
  surfaceMute: '#F7F8F3',     // off-white con un toque cálido-vegetal

  // Bordes
  border: BORDER,
  borderStrong: BORDER_STRONG,
  divider: BORDER,

  // Sombras verde-lima — profundidad orgánica sin perder limpieza
  shadowOut: `-5px -5px 14px ${SHADOW_LIGHT}, 6px 6px 18px ${SHADOW_GREEN}`,
  shadowOutSoft: `-3px -3px 8px ${SHADOW_LIGHT}, 4px 4px 12px ${SHADOW_GREEN_SOFT}`,
  shadowIn: `inset -3px -3px 8px ${SHADOW_LIGHT}, inset 3px 3px 8px ${SHADOW_GREEN_SOFT}`,
  shadowInSoft: `inset -2px -2px 5px ${SHADOW_LIGHT}, inset 2px 2px 6px ${SHADOW_GREEN_SOFT}`,
  shadow: `0 2px 8px ${SHADOW_GREEN_SOFT}`,
  shadowStrong: `0 12px 36px ${SHADOW_GREEN}, 0 4px 10px ${SHADOW_GREEN_SOFT}`,

  // Texto — alto contraste
  text: BLACK,
  textMute: '#4A4A4A',
  textFaint: '#8E8E8E',

  // Acento principal: NEGRO (mantenemos B&W)
  accent: BLACK,
  accentBright: '#1F1F1F',
  accentLight: 'rgba(10, 10, 10, 0.04)',

  // Café espresso — reservado para detalles muy puntuales
  coffee: '#3C2415',
  coffeeLight: 'rgba(60, 36, 21, 0.06)',

  // Azul agua — animación de vertido + ring del timer
  pour: '#5BA0D9',
  pourBright: '#86BCDF',
  pourDark: '#3E7BAE',
  pourLight: 'rgba(91, 160, 217, 0.10)',

  brew: BLACK,
  brewBright: '#2A2A2A',
  brewLight: 'rgba(10, 10, 10, 0.04)',

  // Estados
  success: '#5A7D5A',
  warn: '#A88440',
  danger: '#C95252',

  // Compat
  glass: WHITE,
  glassStrong: WHITE,
  glassBorder: BORDER,
  glassInner: WHITE,
};
