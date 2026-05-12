import { C } from '../../styles/colors';

// Param chip editorial: label en eyebrow + valor grande. Línea inferior fina.
// No usa caja "chip": es un par etiqueta/valor sobre una hairline.
export function ParamChip({ label, value, fullWidth }) {
  return (
    <div
      style={{
        padding: '8px 0 10px',
        borderBottom: `1px solid ${C.border}`,
        gridColumn: fullWidth ? 'span 2' : 'auto',
      }}
    >
      <div
        style={{
          fontSize: 9,
          color: C.textFaint,
          letterSpacing: '2px',
          fontWeight: 700,
          textTransform: 'uppercase',
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 16,
          color: C.text,
          fontWeight: 600,
          lineHeight: 1.2,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.2px',
        }}
      >
        {value}
      </div>
    </div>
  );
}
