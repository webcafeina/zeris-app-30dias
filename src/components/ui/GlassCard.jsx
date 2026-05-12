import { C } from '../../styles/colors';

// Tarjeta neumórfica. Nombre se mantiene por compatibilidad con imports.
// - default: superficie elevada (shadowOut).
// - inset: superficie hundida (shadowIn) — útil para chips/displays internos.
export const GlassCard = ({ children, inset = false, soft = false, style = {}, className = '' }) => (
  <div
    className={className}
    style={{
      background: C.surface,
      borderRadius: 24,
      boxShadow: inset
        ? (soft ? C.shadowInSoft : C.shadowIn)
        : (soft ? C.shadowOutSoft : C.shadowOut),
      ...style,
    }}
  >
    {children}
  </div>
);
