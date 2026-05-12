import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronDown, Notebook, Star } from 'lucide-react';
import { C } from '../../styles/colors';
import { DAYS } from '../../data/days';
import { TASTE_ATTRS, DEFECTS } from '../../data/taste';
import { formatTime } from '../../lib/format';

const TASTE_BY_KEY = Object.fromEntries(TASTE_ATTRS.map((a) => [a.key, a]));
const DEFECT_BY_KEY = Object.fromEntries(DEFECTS.map((d) => [d.key, d]));

function formatDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

function lastTimestamp(attempts) {
  if (!Array.isArray(attempts) || attempts.length === 0) return 0;
  return attempts[attempts.length - 1]?.timestamp || 0;
}

// Mini-slider de lectura (no editable) para mostrar el valor de cada
// atributo de cata en cada intento. value 0..10.
function ReadonlySlider({ value = 0, color = C.text }) {
  const pct = Math.max(0, Math.min(10, value)) * 10;
  return (
    <div
      style={{
        position: 'relative',
        height: 4,
        borderRadius: 2,
        background: 'rgba(10,10,10,0.07)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: `${pct}%`,
          background: color,
          borderRadius: 2,
        }}
      />
    </div>
  );
}

// Card detalle de un intento concreto: fecha, tiempo, rating, sliders de cata, defectos, notas.
function AttemptDetail({ attempt, isLatest, previousAttempt }) {
  const taste = attempt?.tasteAttrs || {};
  const defects = attempt?.tasteDefects || {};
  const checkedDefects = Object.entries(defects).filter(([, v]) => v).map(([k]) => DEFECT_BY_KEY[k]?.label || k);

  return (
    <div
      style={{
        padding: '14px 14px 16px',
        borderRadius: 14,
        background: C.surfaceMute,
        marginBottom: 8,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 10, letterSpacing: '2px', color: C.text, fontWeight: 700, textTransform: 'uppercase' }}>
          Intento {attempt.attemptNumber || '?'}{isLatest ? ' · último' : ''}
        </div>
        <div style={{ fontSize: 11, color: C.textMute }}>
          {formatDate(attempt.timestamp)}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap', fontSize: 11, color: C.textMute }}>
        {typeof attempt.elapsed === 'number' && (
          <span><strong style={{ color: C.text }}>Tiempo:</strong> {formatTime(attempt.elapsed)}</span>
        )}
        {attempt.rating > 0 && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Star size={11} fill={C.text} stroke={C.text} />
            <strong style={{ color: C.text }}>{attempt.rating}/5</strong>
          </span>
        )}
        {attempt.repeatRequested && (
          <span style={{ fontWeight: 700, color: C.textMute }}>Marcado para repetir</span>
        )}
      </div>

      {/* Sliders de cata, con flecha si mejoró/empeoró respecto al anterior */}
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {TASTE_ATTRS.map((attr) => {
          const v = taste[attr.key] ?? 0;
          const prevV = previousAttempt?.tasteAttrs?.[attr.key];
          const delta = typeof prevV === 'number' ? v - prevV : null;
          return (
            <div key={attr.key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: C.text }}>
                  <span style={{ marginRight: 4 }}>{attr.icon}</span>
                  {attr.label}
                </span>
                <span style={{ fontSize: 11, color: C.text, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                  {v}
                  {delta !== null && delta !== 0 && (
                    <span style={{ marginLeft: 4, fontSize: 9, color: C.textFaint, fontWeight: 600 }}>
                      ({delta > 0 ? '+' : ''}{delta})
                    </span>
                  )}
                </span>
              </div>
              <ReadonlySlider value={v} color={C.text} />
            </div>
          );
        })}
      </div>

      {checkedDefects.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 9, letterSpacing: '1.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
            Defectos detectados
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {checkedDefects.map((d) => (
              <span
                key={d}
                style={{
                  fontSize: 10,
                  padding: '3px 8px',
                  borderRadius: 8,
                  background: C.surface,
                  color: C.textMute,
                  fontWeight: 600,
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {attempt.notes && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 9, letterSpacing: '1.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
            Notas
          </div>
          <p style={{ margin: 0, fontSize: 12.5, color: C.text, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
            {attempt.notes}
          </p>
        </div>
      )}
    </div>
  );
}

// Card por día: cabecera con resumen + acordeón con todos los intentos.
function DayLogCard({ day, attempts, onDayClick }) {
  const [open, setOpen] = useState(false);
  const latest = attempts[attempts.length - 1];
  const previous = attempts.length > 1 ? attempts[attempts.length - 2] : null;

  return (
    <div
      style={{
        background: C.surface,
        borderRadius: 18,
        boxShadow: C.shadowOutSoft,
        padding: 16,
        marginBottom: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: C.surfaceMute,
            boxShadow: C.shadowInSoft,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: C.text,
            fontWeight: 700,
            fontSize: 13,
            fontVariantNumeric: 'tabular-nums',
            flexShrink: 0,
          }}
        >
          {day ? String(day.num).padStart(2, '0') : '—'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ margin: 0, fontSize: 15.5, fontWeight: 700, color: C.text, letterSpacing: '-0.2px', lineHeight: 1.2 }}>
            {day?.title || 'Día sin datos'}
          </h3>
          <div style={{ marginTop: 4, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10, color: C.textFaint, letterSpacing: '1.5px', fontWeight: 700, textTransform: 'uppercase' }}>
              {attempts.length} {attempts.length === 1 ? 'intento' : 'intentos'}
            </span>
            {latest?.timestamp && (
              <span style={{ fontSize: 11, color: C.textMute }}>
                Último · {formatDate(latest.timestamp)}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar detalle' : 'Ver detalle'}
          style={{
            background: 'transparent',
            border: 'none',
            color: C.textMute,
            cursor: 'pointer',
            padding: 4,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {open && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
          {/* Recorremos de más reciente a más antiguo */}
          {[...attempts].reverse().map((a, i) => {
            const reverseIdx = attempts.length - 1 - i;
            const prev = reverseIdx > 0 ? attempts[reverseIdx - 1] : null;
            return (
              <AttemptDetail
                key={i}
                attempt={a}
                isLatest={i === 0}
                previousAttempt={prev}
              />
            );
          })}

          {day && (
            <button
              onClick={() => onDayClick && onDayClick(day.num)}
              style={{
                width: '100%',
                marginTop: 4,
                background: C.text,
                color: '#FFF',
                border: 'none',
                borderRadius: 14,
                padding: '12px 14px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Repetir este ejercicio
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Pantalla "Mis catas": agrupa todos los intentos del usuario por día,
// ordenados por última actividad. Cada día se puede desplegar para ver
// la lista completa de intentos con sliders + notas + delta vs anterior.
export function LogsScreen({ state, onBack, onDayClick }) {
  const entries = useMemo(() => {
    const logs = state?.logs || {};
    const out = [];
    for (const [k, v] of Object.entries(logs)) {
      const arr = Array.isArray(v) ? v : (v ? [v] : []);
      if (arr.length === 0) continue;
      const day = DAYS.find((d) => String(d.num) === String(k));
      out.push({ day, dayNum: Number(k), attempts: arr });
    }
    out.sort((a, b) => lastTimestamp(b.attempts) - lastTimestamp(a.attempts));
    return out;
  }, [state]);

  const totalAttempts = useMemo(
    () => entries.reduce((sum, e) => sum + e.attempts.length, 0),
    [entries],
  );

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

      <div style={{ padding: '0 20px 22px' }}>
        <div style={{ fontSize: 10, letterSpacing: '3px', color: C.text, fontWeight: 700 }}>
          MIS CATAS
        </div>
        <h2 style={{ color: C.text, fontSize: 30, fontWeight: 700, lineHeight: 1.05, marginTop: 6, letterSpacing: '-1px' }}>
          Diario de catas
        </h2>
        <p style={{ color: C.textMute, fontSize: 13, lineHeight: 1.5, marginTop: 8 }}>
          Aquí queda registrado cada brew que has cerrado, con sus notas de cata.
          {totalAttempts > 0 && (
            <>
              {' '}
              Hasta ahora <strong style={{ color: C.text }}>{totalAttempts}</strong>{' '}
              {totalAttempts === 1 ? 'cata' : 'catas'} en{' '}
              <strong style={{ color: C.text }}>{entries.length}</strong>{' '}
              {entries.length === 1 ? 'día' : 'días'}.
            </>
          )}
        </p>
      </div>

      {entries.length === 0 ? (
        <div style={{ padding: '40px 30px', textAlign: 'center' }}>
          <Notebook size={32} style={{ color: C.textFaint, marginBottom: 12 }} />
          <div style={{ fontSize: 10, letterSpacing: '2.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
            Aún sin catas
          </div>
          <p style={{ color: C.textMute, fontSize: 13, lineHeight: 1.55, margin: 0 }}>
            Cuando termines tu primer brew y guardes las notas de cata, aparecerá aquí. Si repites un ejercicio, las distintas catas se guardan juntas para comparar la evolución.
          </p>
        </div>
      ) : (
        <div style={{ padding: '0 20px' }}>
          {entries.map((entry) => (
            <DayLogCard
              key={entry.dayNum}
              day={entry.day}
              attempts={entry.attempts}
              onDayClick={onDayClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
