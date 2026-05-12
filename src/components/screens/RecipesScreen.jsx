import { ChevronLeft, Check, Clock, Droplet } from 'lucide-react';
import { C } from '../../styles/colors';
import { DAYS } from '../../data/days';
import { formatTime } from '../../lib/format';

const PHASE_ORDER = ['Fundamentos', 'Variables', 'Los 4 fondos', 'Campeones', 'Cierre'];
const TYPE_LABEL = { brew: 'BREW', taste: 'CATA', reflect: 'REFLEXIÓN' };

// Vista resumen de las 30 recetas del curso. Tocar una entrada salta a ese día.
export function RecipesScreen({ state, onBack, onDayClick }) {
  return (
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 32 }}>
      <div style={{ padding: '20px 20px 8px', display: 'flex', alignItems: 'center' }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: C.textMute,
            cursor: 'pointer',
            padding: 8,
          }}
        >
          <ChevronLeft size={20} />
          <span style={{ fontSize: 13 }}>Volver</span>
        </button>
      </div>

      <div style={{ padding: '0 20px 18px' }}>
        <div style={{ fontSize: 10, letterSpacing: '3px', color: C.accent, fontWeight: 700 }}>
          TODAS LAS RECETAS DEL CURSO
        </div>
        <h2 style={{ color: C.text, fontSize: 26, fontWeight: 700, lineHeight: 1.1, marginTop: 6, letterSpacing: '-0.5px' }}>
          Las 30 recetas
        </h2>
        <p style={{ color: C.textMute, fontSize: 13, lineHeight: 1.5, marginTop: 8 }}>
          Vista general del reto, en orden. Toca una entrada para ver su detalle y empezar el ejercicio.
        </p>
      </div>

      {PHASE_ORDER.map((phase) => {
        const phaseDays = DAYS.filter((d) => d.phase === phase);
        if (phaseDays.length === 0) return null;
        const phaseDone = phaseDays.filter((d) => state.completed[d.num]).length;
        return (
          <div key={phase} style={{ padding: '0 20px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 10, letterSpacing: '3px', color: C.accent, fontWeight: 700, textTransform: 'uppercase' }}>
                {phase}
              </span>
              <div style={{ flex: 1, height: 1, background: C.divider }} />
              <span style={{ fontSize: 11, color: C.textFaint, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                {phaseDone}/{phaseDays.length}
              </span>
            </div>

            {phaseDays.map((day) => {
              const completed = !!state.completed[day.num];
              const total = day.steps?.[day.steps.length - 1]?.at || null;
              return (
                <button
                  key={day.num}
                  onClick={() => onDayClick(day.num)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: C.surface,
                    border: 'none',
                    borderRadius: 18,
                    padding: 14,
                    marginBottom: 10,
                    boxShadow: C.shadowOutSoft,
                    cursor: 'pointer',
                    transition: 'box-shadow 0.18s',
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.boxShadow = C.shadowInSoft)}
                  onMouseUp={(e) => (e.currentTarget.style.boxShadow = C.shadowOutSoft)}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = C.shadowOutSoft)}
                  onTouchStart={(e) => (e.currentTarget.style.boxShadow = C.shadowInSoft)}
                  onTouchEnd={(e) => (e.currentTarget.style.boxShadow = C.shadowOutSoft)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        flexShrink: 0,
                        borderRadius: 14,
                        background: C.surface,
                        boxShadow: C.shadowInSoft,
                        color: completed ? C.success : C.accent,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: 700,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {completed ? <Check size={20} strokeWidth={2.5} /> : day.num.toString().padStart(2, '0')}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
                        <div
                          style={{
                            color: C.text,
                            fontSize: 14.5,
                            fontWeight: 700,
                            letterSpacing: '-0.2px',
                            lineHeight: 1.25,
                          }}
                        >
                          {day.title}
                        </div>
                        <span
                          style={{
                            fontSize: 9,
                            padding: '3px 8px',
                            borderRadius: 8,
                            background: C.surface,
                            boxShadow: C.shadowInSoft,
                            color: day.type === 'brew' ? C.accent : C.warn,
                            letterSpacing: '1.5px',
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {TYPE_LABEL[day.type] || day.type.toUpperCase()}
                        </span>
                      </div>

                      {day.type === 'brew' && (
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            gap: 10,
                            marginTop: 8,
                            fontSize: 11,
                            color: C.textMute,
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <Droplet size={10} style={{ color: C.pour }} />
                            {day.coffee} g · {day.water} g · {day.ratio}
                          </span>
                          <span>{day.temp} °C</span>
                          {total && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                              <Clock size={10} />
                              ~{formatTime(total)}
                            </span>
                          )}
                        </div>
                      )}

                      {day.type !== 'brew' && day.objective && (
                        <div
                          style={{
                            marginTop: 6,
                            fontSize: 12,
                            color: C.textMute,
                            lineHeight: 1.4,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {day.objective}
                        </div>
                      )}

                      {day.type === 'brew' && day.grind && (
                        <div
                          style={{
                            marginTop: 4,
                            fontSize: 11,
                            color: C.textFaint,
                            lineHeight: 1.3,
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          Molienda: {day.grind}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
