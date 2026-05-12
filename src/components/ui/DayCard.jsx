import { Check, ChevronRight } from 'lucide-react';
import { C } from '../../styles/colors';

export function DayCard({ day, completed, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        background: completed ? 'linear-gradient(135deg, rgba(5,150,105,0.08), rgba(5,150,105,0.02))' : C.glass,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: `1px solid ${completed ? 'rgba(5,150,105,0.3)' : C.glassBorder}`,
        borderRadius: 20,
        padding: 14,
        marginBottom: 10,
        boxShadow: C.shadow,
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
      onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 52,
            height: 52,
            flexShrink: 0,
            borderRadius: 16,
            background: completed ? C.success : C.accentLight,
            color: completed ? '#FFF' : C.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {completed ? <Check size={26} strokeWidth={3} /> : day.num.toString().padStart(2, '0')}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.text, fontSize: 15.5, fontWeight: 700, letterSpacing: '-0.2px' }}>
            {day.title}
          </div>
          <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontSize: 9,
                padding: '2px 8px',
                borderRadius: 6,
                background: day.type === 'brew' ? C.accentLight : 'rgba(217,119,6,0.12)',
                color: day.type === 'brew' ? C.accent : C.warn,
                letterSpacing: '1px',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {day.type === 'brew' ? '☕ BREW' : day.type === 'taste' ? '👅 CATA' : '✍ REFLEXIÓN'}
            </span>
            {day.type === 'brew' && (
              <span style={{ fontSize: 10, color: C.textFaint }}>
                {day.coffee}g · {day.water}g · {day.temp}°C
              </span>
            )}
          </div>
        </div>
        <ChevronRight size={20} style={{ color: C.textFaint, flexShrink: 0 }} />
      </div>
    </button>
  );
}
