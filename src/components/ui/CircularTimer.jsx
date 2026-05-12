import { C } from '../../styles/colors';

// Anillo de progreso circular sobre superficie neumórfica raised.
// - `progress` (0..1): fracción del paso completada.
// - `remaining` (segundos): para disparar urgencia visual (azul → rojo).
// - `dangerAt` (segundos): umbral de urgencia. Por defecto 5s.
// - `noDrain` (bool): si true, el anillo se queda completo (no se vacía
//   con dashoffset). Útil para combinar con `strokeColorOverride` y
//   transmitir el paso del tiempo solo por color.
// - `strokeColorOverride`: si se pasa, ignora el color automático
//   (azul / rojo) y usa ese valor directamente. El caller controla la
//   interpolación (p.ej. azul intenso → azul claro según stepProgress).
// - `children`: contenido central (número, etiqueta) y/o WaterFill anidado.
export function CircularTimer({
  progress = 0,
  remaining = null,
  size = 260,
  stroke = 14,
  dangerAt = 5,
  noDrain = false,
  strokeColorOverride = null,
  children,
}) {
  const p = Math.max(0, Math.min(1, progress));
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const dashoffset = noDrain ? 0 : circumference * p;

  // El anillo del cronómetro siempre es azul (mismo palette que el agua,
  // sin rojo de urgencia). En los últimos `dangerAt` segundos pierde
  // opacidad gradualmente hasta confundirse con el fondo.
  const strokeColor = strokeColorOverride || C.pour;
  const strokeOpacity =
    remaining !== null && remaining !== undefined && remaining <= dangerAt && remaining >= 0
      ? Math.max(0, remaining / dangerAt)
      : 1;

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        background: C.surface,
        boxShadow: C.shadowOut,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Pozo interior hundido — da profundidad y aloja agua/contenido */}
      <div
        style={{
          position: 'absolute',
          inset: stroke + 8,
          borderRadius: '50%',
          background: C.surface,
          boxShadow: C.shadowInSoft,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>

      {/* Anillo SVG — va por encima del pozo. Usa un gradiente vertical
          azul (mismo palette que el agua del WaterFill) y la stroke-opacity
          se reduce gradualmente cuando faltan pocos segundos. */}
      <svg
        width={size}
        height={size}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'rotate(-90deg)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`ring-grad-${size}`}
            x1={size}
            y1={0}
            x2={0}
            y2={0}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={C.pourBright} />
            <stop offset="100%" stopColor={C.pour} />
          </linearGradient>
        </defs>
        {/* Track hairline siempre visible */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(10,10,10,0.07)"
          strokeWidth={stroke}
        />
        {/* Anillo activo: usa el gradiente (o override). stroke-opacity
            cae a 0 en los últimos dangerAt segundos. */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={strokeColorOverride || `url(#ring-grad-${size})`}
          strokeOpacity={strokeOpacity}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          style={{
            transition: 'stroke-dashoffset 0.9s linear, stroke-opacity 0.9s linear, stroke 0.35s ease',
          }}
        />
      </svg>
    </div>
  );
}
