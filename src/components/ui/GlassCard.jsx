import { C } from '../../styles/colors';

export const GlassCard = ({ children, strong = false, style = {}, className = '' }) => (
  <div
    className={className}
    style={{
      background: strong ? C.glassStrong : C.glass,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: `1px solid ${C.glassBorder}`,
      borderRadius: 24,
      boxShadow: C.shadow,
      ...style,
    }}
  >
    {children}
  </div>
);
