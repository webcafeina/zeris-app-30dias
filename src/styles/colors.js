// Paleta — minimalista B&W editorial sobre fondo pastel-orbes zen.
// Los orbes pastel los pinta BackgroundOrbs (fixed, detrás de todo).
// Las tarjetas blancas flotan sobre ese fondo con sombras gris suaves
// que les dan profundidad sin colorearlas.

const BLACK = '#0A0A0A';
const WHITE = '#FFFFFF';
const BORDER = 'rgba(10, 10, 10, 0.08)';
const BORDER_STRONG = 'rgba(10, 10, 10, 0.20)';

// Sombras gris frío neutras. Suaves pero visibles sobre el fondo pastel.
const SHADOW_GREY = 'rgba(70, 80, 100, 0.20)';
const SHADOW_GREY_SOFT = 'rgba(70, 80, 100, 0.12)';
const SHADOW_LIGHT = 'rgba(255, 255, 255, 1)';

export const C = {
  // Superficies: bg transparente para que el body (con orbes) se vea a través
  // de las pantallas. surface es blanco puro para que las cartas destaquen.
  bg: 'transparent',
  bgGradient: 'transparent',
  surface: WHITE,
  surfaceMute: '#F4F5F8',

  // Bordes
  border: BORDER,
  borderStrong: BORDER_STRONG,
  divider: BORDER,

  // Sombras gris neutro — dan lift contra el fondo pastel sin teñir
  shadowOut: `-5px -5px 14px ${SHADOW_LIGHT}, 6px 6px 18px ${SHADOW_GREY}`,
  shadowOutSoft: `-3px -3px 8px ${SHADOW_LIGHT}, 4px 4px 12px ${SHADOW_GREY_SOFT}`,
  shadowIn: `inset -3px -3px 8px ${SHADOW_LIGHT}, inset 3px 3px 8px ${SHADOW_GREY_SOFT}`,
  shadowInSoft: `inset -2px -2px 5px ${SHADOW_LIGHT}, inset 2px 2px 6px ${SHADOW_GREY_SOFT}`,
  shadow: `0 2px 8px ${SHADOW_GREY_SOFT}`,
  shadowStrong: `0 12px 36px ${SHADOW_GREY}, 0 4px 10px ${SHADOW_GREY_SOFT}`,

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
