import { Check, ChevronRight } from 'lucide-react';
import { C } from '../../styles/colors';

export function DayCard({ day, completed, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        background: C.surface,
        border: 'none',
        borderRadius: 20,
        padding: 14,
        marginBottom: 12,
        boxShadow: C.shadowOutSoft,
        cursor: 'pointer',
        transition: 'box-shadow 0.18s, transform 0.18s',
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.boxShadow = C.shadowInSoft;
        e.currentTarget.style.transform = 'scale(0.995)';
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
        e.currentTarget.style.transform = 'scale(0.995)';
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.boxShadow = C.shadowOutSoft;
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 52,
            height: 52,
            flexShrink: 0,
            borderRadius: 16,
            background: C.surface,
            boxShadow: completed ? C.shadowInSoft : C.shadowInSoft,
            color: completed ? C.success : C.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {completed ? <Check size={24} strokeWidth={2.5} /> : day.num.toString().padStart(2, '0')}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.text, fontSize: 15.5, fontWeight: 600, letterSpacing: '-0.2px' }}>
            {day.title}
          </div>
          <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontSize: 9,
                padding: '2px 8px',
                borderRadius: 6,
                background: C.surface,
                boxShadow: C.shadowInSoft,
                color: day.type === 'brew' ? C.accent : C.warn,
                letterSpacing: '1.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {day.type === 'brew' ? 'BREW' : day.type === 'taste' ? 'CATA' : 'REFLEXIÓN'}
            </span>
            {day.type === 'brew' && (
              <span style={{ fontSize: 10, color: C.textFaint, fontVariantNumeric: 'tabular-nums' }}>
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
