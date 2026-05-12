import { C } from '../../styles/colors';

// Tarjeta editorial con lift de sombra azulada.
// - default: superficie blanca con sombra fresca.
// - inset: superficie hundida (insets / displays internos).
// - strong: sombra más marcada.
export const GlassCard = ({ children, inset = false, strong = false, soft = false, style = {}, className = '' }) => (
  <div
    className={className}
    style={{
      background: inset ? C.surfaceMute : C.surface,
      border: 'none',
      borderRadius: 20,
      boxShadow: inset
        ? (soft ? C.shadowInSoft : C.shadowIn)
        : strong
        ? C.shadowStrong
        : (soft ? C.shadowOutSoft : C.shadowOut),
      ...style,
    }}
  >
    {children}
  </div>
);
