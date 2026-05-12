// Paleta — pastel glassmorphism
// Blancos rotos, grises suaves. Azul para vertidos (acción activa con agua).
// Café oscuro (espresso solo) para drawdown (espera) y elementos importantes.

export const C = {
  // Fondo: gradiente blanco/gris pastel muy suave
  bg: '#F7F6F4',
  bgGradient: 'linear-gradient(160deg, #FAFAF8 0%, #EFEDE8 100%)',

  // Glass: blancos transparentes para tarjetas glassmorphism MUY marcado
  glass: 'rgba(255, 255, 255, 0.45)',
  glassStrong: 'rgba(255, 255, 255, 0.78)',
  glassBorder: 'rgba(255, 255, 255, 0.85)',
  glassInner: 'rgba(255, 255, 255, 0.35)',

  // Sombras suaves para profundidad
  shadow: '0 8px 32px rgba(60, 40, 25, 0.06), 0 2px 8px rgba(60, 40, 25, 0.04)',
  shadowStrong: '0 20px 60px rgba(60, 40, 25, 0.10), 0 4px 16px rgba(60, 40, 25, 0.06)',

  // Texto en grises oscuros (no negro absoluto)
  text: '#2D2520',
  textMute: '#605650',
  textFaint: '#8F857D',

  // Acción activa: azul de agua (vertidos en curso)
  pour: '#3B82C4',
  pourBright: '#5BA3DE',
  pourDark: '#1E5A8F',
  pourLight: 'rgba(59, 130, 196, 0.08)',

  // Espera / drawdown: café espresso oscuro
  brew: '#3C2415',
  brewBright: '#5A3519',
  brewLight: 'rgba(60, 36, 21, 0.08)',

  // Acento (CTAs y elementos clave)
  accent: '#3C2415',
  accentBright: '#5A3519',
  accentLight: 'rgba(60, 36, 21, 0.10)',

  // Estados
  success: '#5B8C5A',
  warn: '#C9A85C',
  danger: '#C46B6B',

  // Líneas
  divider: 'rgba(60, 40, 25, 0.08)',
};
