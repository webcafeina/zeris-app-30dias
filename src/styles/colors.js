// Paleta — neumorfismo blanco suave (Zeri's Coffee)
// Fondo y superficies blancos. La profundidad nace de sombras MUY suaves:
// luz blanca top-left + gris frío sutil bottom-right.
// Tonos pastel en general para mantener todo amable y limpio.

const WHITE = '#FFFFFF';
const SHADOW_DARK = 'rgba(174, 184, 204, 0.22)';   // gris frío muy sutil
const SHADOW_LIGHT = 'rgba(255, 255, 255, 1)';     // luz blanca pura

export const C = {
  // Superficie
  bg: WHITE,
  bgGradient: WHITE,
  surface: WHITE,

  // Sombras neumórficas suaves (azul-gris en lugar de tostado)
  shadowOut: `-6px -6px 14px ${SHADOW_LIGHT}, 6px 6px 14px ${SHADOW_DARK}`,
  shadowOutSoft: `-3px -3px 8px ${SHADOW_LIGHT}, 3px 3px 8px ${SHADOW_DARK}`,
  shadowIn: `inset -3px -3px 7px ${SHADOW_LIGHT}, inset 3px 3px 7px ${SHADOW_DARK}`,
  shadowInSoft: `inset -2px -2px 4px ${SHADOW_LIGHT}, inset 2px 2px 4px ${SHADOW_DARK}`,

  // Keys legacy mantenidas para compatibilidad (no romper otros imports).
  glass: WHITE,
  glassStrong: WHITE,
  glassBorder: 'transparent',
  glassInner: WHITE,
  shadow: `-3px -3px 8px ${SHADOW_LIGHT}, 3px 3px 8px ${SHADOW_DARK}`,
  shadowStrong: `-6px -6px 14px ${SHADOW_LIGHT}, 6px 6px 14px ${SHADOW_DARK}`,

  // Texto en grises neutros (no negro absoluto)
  text: '#3A4151',
  textMute: '#7A8294',
  textFaint: '#A8B0BE',

  // Acento café — sobrio, presente en CTAs y números clave
  accent: '#4A2F1F',
  accentBright: '#6B452B',
  accentLight: 'rgba(74, 47, 31, 0.08)',

  // Vertido: azul pastel suave (no saturado)
  pour: '#7BB0DC',
  pourBright: '#A5CCE5',
  pourDark: '#4E89B8',
  pourLight: 'rgba(123, 176, 220, 0.12)',

  // Espera / drawdown
  brew: '#4A2F1F',
  brewBright: '#6B452B',
  brewLight: 'rgba(74, 47, 31, 0.06)',

  // Estados pastel
  success: '#86B585',
  warn: '#D4B26A',
  danger: '#E69191',

  // Líneas sutiles
  divider: 'rgba(60, 70, 90, 0.06)',
};
