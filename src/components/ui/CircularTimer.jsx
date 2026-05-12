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

  const inUrgency = remaining !== null && remaining !== undefined && remaining <= dangerAt && remaining > 0;
  const strokeColor = strokeColorOverride
    ? (inUrgency ? C.danger : strokeColorOverride)
    : (inUrgency ? C.danger : C.pour);

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        background: C.surface,
        boxShadow: C.shadowOut,
        animation: inUrgency ? 'urgencyPulse 0.7s ease-in-out infinite' : 'none',
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

      {/* Anillo SVG — va por encima del pozo */}
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
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(10,10,10,0.07)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={strokeColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          style={{
            transition: 'stroke-dashoffset 0.9s linear, stroke 0.35s ease',
            filter: inUrgency ? `drop-shadow(0 0 6px ${C.danger})` : 'none',
          }}
        />
      </svg>
    </div>
  );
}
