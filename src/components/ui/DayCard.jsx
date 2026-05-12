import { Check, ArrowUpRight } from 'lucide-react';
import { C } from '../../styles/colors';

// DayCard editorial: número grande a la izquierda, título en bold, metadatos sutiles.
// Sombra azulada que lo separa del fondo; presionado → sombra hundida.
export function DayCard({ day, completed, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        background: C.surface,
        border: 'none',
        borderRadius: 18,
        padding: '14px 16px',
        marginBottom: 12,
        cursor: 'pointer',
        boxShadow: C.shadowOutSoft,
        transition: 'box-shadow 0.18s, transform 0.18s',
        display: 'block',
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.boxShadow = C.shadowInSoft;
        e.currentTarget.style.transform = 'scale(0.998)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.boxShadow = C.shadowOutSoft;
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = C.shadowOutSoft;
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onTouchStart={(e) => {
        e.currentTarget.style.boxShadow = C.shadowInSoft;
        e.currentTarget.style.transform = 'scale(0.998)';
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.boxShadow = C.shadowOutSoft;
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 44,
            flexShrink: 0,
            fontSize: 30,
            fontWeight: 200,
            color: completed ? C.success : C.text,
            letterSpacing: '-1.5px',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1,
            textAlign: 'center',
          }}
        >
          {completed ? <Check size={26} strokeWidth={2.5} /> : day.num.toString().padStart(2, '0')}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.text, fontSize: 15, fontWeight: 600, letterSpacing: '-0.2px', lineHeight: 1.25 }}>
            {day.title}
          </div>
          <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 9,
                letterSpacing: '2px',
                color: C.textFaint,
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {day.type === 'brew' ? 'Brew' : day.type === 'taste' ? 'Cata' : 'Reflexión'}
            </span>
            {day.type === 'brew' && (
              <span style={{ fontSize: 11, color: C.textMute, fontVariantNumeric: 'tabular-nums' }}>
                {day.coffee} g · {day.water} g · {day.temp} °C
              </span>
            )}
          </div>
        </div>

        <ArrowUpRight size={18} style={{ color: C.textFaint, flexShrink: 0 }} />
      </div>
    </button>
  );
}
