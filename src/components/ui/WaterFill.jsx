import { C } from '../../styles/colors';

// Agua animada dentro de un círculo. Sube según `progress` (0..1).
// Top ondulado con animación SMIL + burbujas ascendentes.
// Pensado para anidarse dentro de CircularTimer durante pasos de vertido.
export function WaterFill({ progress = 0, size = 200, urgency = false }) {
  const p = Math.max(0, Math.min(1, progress));
  const waterTop = size * (1 - p);
  const waveAmp = 6;
  const waveBase = waterTop;

  const wave1 = `M 0 ${waveBase} Q ${size * 0.25} ${waveBase - waveAmp} ${size * 0.5} ${waveBase} T ${size} ${waveBase} V ${size} H 0 Z`;
  const wave2 = `M 0 ${waveBase} Q ${size * 0.25} ${waveBase + waveAmp} ${size * 0.5} ${waveBase} T ${size} ${waveBase} V ${size} H 0 Z`;

  const baseColor = urgency ? C.danger : C.pour;
  const lightColor = urgency ? '#E89595' : C.pourBright;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={`water-circle-clip-${size}`}>
          <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} />
        </clipPath>
        <linearGradient id={`water-gradient-${size}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lightColor} stopOpacity="0.55" />
          <stop offset="100%" stopColor={baseColor} stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <g clipPath={`url(#water-circle-clip-${size})`}>
        {/* Cuerpo del agua con borde ondulado animado */}
        <path d={wave1} fill={`url(#water-gradient-${size})`} style={{ transition: 'd 0.9s linear' }}>
          <animate
            attributeName="d"
            values={`${wave1};${wave2};${wave1}`}
            dur="2.4s"
            repeatCount="indefinite"
          />
        </path>

        {/* Burbujas ascendentes (solo si hay agua suficiente) */}
        {p > 0.05 && (
          <>
            <circle cx={size * 0.32} r={3} fill="rgba(255,255,255,0.7)">
              <animate
                attributeName="cy"
                values={`${size * 0.95};${waterTop + 8}`}
                dur="2.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.8;0.8;0"
                keyTimes="0;0.15;0.85;1"
                dur="2.6s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={size * 0.58} r={2} fill="rgba(255,255,255,0.6)">
              <animate
                attributeName="cy"
                values={`${size * 0.92};${waterTop + 14}`}
                dur="3.1s"
                begin="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.7;0.7;0"
                keyTimes="0;0.15;0.85;1"
                dur="3.1s"
                begin="0.6s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={size * 0.72} r={2.5} fill="rgba(255,255,255,0.65)">
              <animate
                attributeName="cy"
                values={`${size * 0.9};${waterTop + 10}`}
                dur="2.8s"
                begin="1.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.75;0.75;0"
                keyTimes="0;0.15;0.85;1"
                dur="2.8s"
                begin="1.2s"
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}
      </g>
    </svg>
  );
}
