import { C } from '../../styles/colors';

export function ParamChip({ label, value, fullWidth }) {
  return (
    <div
      style={{
        background: C.glassStrong,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${C.glassBorder}`,
        borderRadius: 14,
        padding: '10px 12px',
        gridColumn: fullWidth ? 'span 2' : 'auto',
        boxShadow: C.shadow,
      }}
    >
      <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '1.5px', fontWeight: 700, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: 15, color: C.text, fontWeight: 700, marginTop: 2, lineHeight: 1.2 }}>
        {value}
      </div>
    </div>
  );
}
