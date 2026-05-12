// Silueta mínima de cada método. viewBox 0 0 48 48, stroke currentColor.
// El color viene del contenedor (text color o accent).

export function MethodIcon({ id, size = 36 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  switch (id) {
    case 'orea':
      // Cono truncado con boca ancha (OREA V4 Narrow)
      return (
        <svg {...props}>
          <path d="M 10 12 L 38 12 L 32 36 L 16 36 Z" />
          <line x1="14" y1="22" x2="34" y2="22" opacity="0.45" />
          <line x1="20" y1="40" x2="28" y2="40" />
        </svg>
      );
    case 'v60':
      // Cono completo terminado en punto
      return (
        <svg {...props}>
          <path d="M 8 10 L 40 10 L 24 40 Z" />
          <line x1="14" y1="18" x2="34" y2="18" opacity="0.45" />
          <line x1="17" y1="26" x2="31" y2="26" opacity="0.45" />
        </svg>
      );
    case 'aeropress':
      // Cilindro con émbolo arriba
      return (
        <svg {...props}>
          <rect x="14" y="14" width="20" height="26" rx="1.5" />
          <rect x="16" y="6" width="16" height="8" rx="1" />
          <line x1="22" y1="2" x2="22" y2="6" />
          <line x1="26" y1="2" x2="26" y2="6" />
        </svg>
      );
    case 'moka':
      // Octágono (cuerpo superior + inferior) + mango
      return (
        <svg {...props}>
          <path d="M 14 6 L 34 6 L 37 11 L 37 22 L 11 22 L 11 11 Z" />
          <path d="M 13 22 L 35 22 L 35 38 L 30 42 L 18 42 L 13 38 Z" />
          <path d="M 37 26 L 43 26 L 43 36 L 37 36" />
        </svg>
      );
    case 'french':
      // Cilindro con varilla y pomo del émbolo
      return (
        <svg {...props}>
          <rect x="13" y="12" width="22" height="30" rx="1.5" />
          <circle cx="24" cy="6" r="3" />
          <line x1="24" y1="9" x2="24" y2="14" />
          <line x1="13" y1="18" x2="35" y2="18" opacity="0.45" />
          <line x1="32" y1="14" x2="36" y2="14" opacity="0.5" />
        </svg>
      );
    case 'chemex':
      // Reloj de arena con anillo central (collar de cuero)
      return (
        <svg {...props}>
          <path d="M 12 6 L 36 6 L 28 22 L 28 28 L 36 42 L 12 42 L 20 28 L 20 22 Z" />
          <line x1="20" y1="22" x2="28" y2="22" />
          <line x1="20" y1="28" x2="28" y2="28" />
        </svg>
      );
    case 'espresso':
      // Taza demitasse con asa + vapor
      return (
        <svg {...props}>
          <path d="M 12 20 L 32 20 L 30 38 L 14 38 Z" />
          <path d="M 32 24 Q 40 24 40 30 Q 40 34 32 33" />
          <path d="M 18 14 Q 20 10 18 6" opacity="0.5" />
          <path d="M 24 14 Q 26 10 24 6" opacity="0.5" />
          <path d="M 30 14 Q 32 10 30 6" opacity="0.5" />
        </svg>
      );
    default:
      return null;
  }
}
