import { C } from '../../styles/colors';

// Chip hundido (inset) — para mostrar parámetros de extracción como pastillas embebidas.
export function ParamChip({ label, value, fullWidth }) {
  return (
    <div
      style={{
        background: C.surface,
        borderRadius: 14,
        padding: '10px 14px',
        gridColumn: fullWidth ? 'span 2' : 'auto',
        boxShadow: C.shadowInSoft,
      }}
    >
      <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '1.5px', fontWeight: 700, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: 15, color: C.text, fontWeight: 600, marginTop: 2, lineHeight: 1.2, fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </div>
    </div>
  );
}
