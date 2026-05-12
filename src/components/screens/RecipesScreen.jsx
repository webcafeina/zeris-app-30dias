import { useState, useMemo } from 'react';
import { ChevronLeft, Check, Clock, Droplet, ArrowRight, Search, X } from 'lucide-react';
import { C } from '../../styles/colors';
import { DAYS } from '../../data/days';
import { BARISTAS, getBarista } from '../../data/baristas';
import { formatTime } from '../../lib/format';

// Comprueba si una receta (día) hace match con la query del buscador.
// Busca contra: título, molienda, fondo, ratio, gramajes (café/agua), temp,
// y el nombre del barista si hay baristaId.
function matchesQuery(day, q) {
  if (!q) return true;
  const needle = q.toLowerCase().trim();
  if (!needle) return true;
  const barista = day.baristaId ? getBarista(day.baristaId) : null;
  const haystack = [
    day.title,
    day.grind,
    day.bottom,
    day.ratio,
    `${day.coffee} g`,
    `${day.water} g`,
    `${day.temp} °C`,
    `${day.coffee}g`,
    `${day.water}g`,
    `dia ${day.num}`,
    `día ${day.num}`,
    barista?.name,
    barista?.country,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(needle);
}

const PHASE_ORDER = ['Fundamentos', 'Variables', 'Los 4 fondos', 'Campeones', 'Cierre'];
const TYPE_LABEL = { brew: 'BREW', taste: 'CATA', reflect: 'REFLEXIÓN' };

// Etiqueta compacta de un paso del brew, para la ficha-receta.
// "BLOOM · 28 g" / "100 g" / "Swirl" / "Rao spin" / "Drawdown".
function compactStep(step, idx) {
  if (step.action === 'pour') {
    const isBloom = idx === 0 || /bloom/i.test(step.label || '');
    return isBloom ? `BLOOM · ${step.water} g` : `${step.water} g`;
  }
  if (step.action === 'swirl') return 'Swirl';
  if (step.action === 'rao') return 'Rao spin';
  if (step.action === 'drain') return 'Drawdown';
  return step.label || step.action;
}

// Tarjeta de receta minimalista: parámetros + tabla esquemática de vertidos.
function RecipeCard({ day, completed, onStart }) {
  const total = day.steps?.[day.steps.length - 1]?.at || null;
  const pours = (day.steps || []).filter((s) => s.action === 'pour').length;

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
      {/* Cabecera con día + título */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '2.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase' }}>
            Día {day.num}
          </div>
          <h3 style={{ margin: '3px 0 0', fontSize: 17, fontWeight: 700, color: C.text, letterSpacing: '-0.3px', lineHeight: 1.2 }}>
            {day.title}
          </h3>
        </div>
        {completed && (
          <Check size={18} strokeWidth={2.5} style={{ color: C.success, flexShrink: 0 }} />
        )}
      </div>

      {/* Parámetros clave en una línea */}
      <div
        style={{
          marginTop: 10,
          paddingTop: 10,
          borderTop: `1px solid ${C.border}`,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 8,
        }}
      >
        <div>
          <div style={{ fontSize: 8, letterSpacing: '1.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase' }}>Café</div>
          <div style={{ fontSize: 14, color: C.text, fontWeight: 700, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>
            {day.coffee} g
          </div>
        </div>
        <div>
          <div style={{ fontSize: 8, letterSpacing: '1.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase' }}>Agua</div>
          <div style={{ fontSize: 14, color: C.text, fontWeight: 700, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>
            {day.water} g
          </div>
        </div>
        <div>
          <div style={{ fontSize: 8, letterSpacing: '1.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase' }}>Ratio</div>
          <div style={{ fontSize: 14, color: C.text, fontWeight: 700, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>
            {day.ratio}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 8, letterSpacing: '1.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase' }}>Temp</div>
          <div style={{ fontSize: 14, color: C.text, fontWeight: 700, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>
            {day.temp} °C
          </div>
        </div>
        <div>
          <div style={{ fontSize: 8, letterSpacing: '1.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase' }}>Fondo</div>
          <div style={{ fontSize: 14, color: C.text, fontWeight: 700, marginTop: 2 }}>
            {day.bottom || '—'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 8, letterSpacing: '1.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase' }}>Vertidos</div>
          <div style={{ fontSize: 14, color: C.text, fontWeight: 700, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>
            {pours}
          </div>
        </div>
      </div>

      {/* Molienda (línea propia porque suele ser larga) */}
      {day.grind && (
        <div style={{ marginTop: 10, fontSize: 11, color: C.textMute, lineHeight: 1.4 }}>
          <span style={{ fontWeight: 700, color: C.text }}>Molienda:</span> {day.grind}
        </div>
      )}

      {/* Tabla de vertidos esquemática */}
      {day.steps && day.steps.length > 0 && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 9, letterSpacing: '2.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
            Plan {total ? `· ~${formatTime(total)}` : ''}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '46px 1fr', rowGap: 4, fontSize: 12.5 }}>
            {day.steps.map((step, i) => (
              <div key={i} style={{ display: 'contents' }}>
                <div
                  style={{
                    color: C.textMute,
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: 600,
                    letterSpacing: '0.2px',
                  }}
                >
                  {formatTime(step.at)}
                </div>
                <div style={{ color: C.text, fontWeight: 500 }}>
                  {compactStep(step, i)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={onStart}
        style={{
          marginTop: 14,
          width: '100%',
          background: 'transparent',
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: '10px 14px',
          color: C.text,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        Empezar ejercicio
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

// Sección de un barista con su foto + lista de sus recetas.
function BaristaSection({ barista, days, state, onDayClick }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 14,
          padding: '4px 0 12px',
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        {barista ? (
          <BaristaThumb barista={barista} />
        ) : (
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: C.surfaceMute,
              boxShadow: C.shadowInSoft,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: C.text,
              fontWeight: 700,
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            Z
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 9, letterSpacing: '2.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase' }}>
            {barista ? barista.country : 'Curso base'}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text, letterSpacing: '-0.3px', lineHeight: 1.2, marginTop: 2 }}>
            {barista ? barista.name : "Zeri's Coffee"}
          </div>
          {barista && (
            <div style={{ fontSize: 11, color: C.textMute, marginTop: 2 }}>
              {barista.role}
            </div>
          )}
        </div>
        <div style={{ fontSize: 11, color: C.textFaint, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          {days.length}
        </div>
      </div>

      {days.map((day) => (
        <RecipeCard
          key={day.num}
          day={day}
          completed={!!state.completed?.[day.num]}
          onStart={() => onDayClick(day.num)}
        />
      ))}
    </div>
  );
}

function BaristaThumb({ barista }) {
  const [error, setError] = useState(false);
  const initials = barista.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  if (barista.photo && !error) {
    return (
      <img
        src={barista.photo}
        alt={barista.name}
        onError={() => setError(true)}
        width={44}
        height={44}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
          boxShadow: C.shadowInSoft,
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: C.surfaceMute,
        boxShadow: C.shadowInSoft,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: C.text,
        fontWeight: 700,
        fontSize: 14,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

// Orden manual de baristas para que la vista sea predecible (los más
// referenciados primero, OREA-específicos arriba).
const BARISTA_ORDER = ['hoffmann', 'hedrick', 'kasuya', 'wolfl', 'rao', 'rolf', 'dottavio', 'spillman'];

function groupByAuthor(brewDays) {
  const grouped = {};
  brewDays.forEach((d) => {
    const id = d.baristaId || 'zeris';
    if (!grouped[id]) grouped[id] = [];
    grouped[id].push(d);
  });
  // Ordenamos según BARISTA_ORDER; lo demás al final (zeris siempre al final)
  const result = [];
  BARISTA_ORDER.forEach((id) => {
    if (grouped[id]) {
      result.push({ barista: getBarista(id), days: grouped[id] });
      delete grouped[id];
    }
  });
  // Cualquier barista no listado en BARISTA_ORDER (raro), añadirlo
  Object.keys(grouped).forEach((id) => {
    if (id !== 'zeris') {
      result.push({ barista: getBarista(id), days: grouped[id] });
    }
  });
  // Por último, Zeri's (orphan)
  if (grouped.zeris) {
    result.push({ barista: null, days: grouped.zeris });
  }
  return result;
}

// Vista resumen de todas las recetas del curso.
// Dos modos vía toggle: por orden del curso o por autor.
export function RecipesScreen({ state, onBack, onDayClick }) {
  const [mode, setMode] = useState('author'); // 'phase' o 'author'
  const [query, setQuery] = useState('');

  const brewDays = useMemo(() => DAYS.filter((d) => d.type === 'brew'), []);
  const filteredBrewDays = useMemo(
    () => brewDays.filter((d) => matchesQuery(d, query)),
    [brewDays, query],
  );
  const authorGroups = useMemo(
    () => groupByAuthor(filteredBrewDays),
    [filteredBrewDays],
  );
  const phaseDaysAll = useMemo(
    () => DAYS.filter((d) => matchesQuery(d, query)),
    [query],
  );

  const hasResults = mode === 'author' ? authorGroups.length > 0 : phaseDaysAll.length > 0;

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
        <div style={{ fontSize: 10, letterSpacing: '3px', color: C.text, fontWeight: 700 }}>
          RECETAS
        </div>
        <h2 style={{ color: C.text, fontSize: 30, fontWeight: 700, lineHeight: 1.05, marginTop: 6, letterSpacing: '-1px' }}>
          Libro de recetas
        </h2>
        <p style={{ color: C.textMute, fontSize: 13, lineHeight: 1.5, marginTop: 8 }}>
          Todas las recetas del reto, agrupadas para consulta rápida. Toca "empezar" para hacer la receta como ejercicio guiado.
        </p>
      </div>

      {/* Buscador */}
      <div style={{ padding: '0 20px 14px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 14px',
            background: C.surface,
            border: 'none',
            borderRadius: 14,
            boxShadow: C.shadowInSoft,
          }}
        >
          <Search size={16} style={{ color: C.textFaint, flexShrink: 0 }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar receta, autor, gramaje, ratio…"
            aria-label="Buscar receta"
            style={{
              flex: 1,
              minWidth: 0,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 14,
              color: C.text,
              padding: 0,
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Borrar búsqueda"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: C.textFaint,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Toggle: por curso / por autor */}
      <div style={{ padding: '0 20px 18px' }}>
        <div
          style={{
            display: 'flex',
            gap: 4,
            padding: 4,
            background: C.surfaceMute,
            borderRadius: 14,
          }}
        >
          {[
            { id: 'author', label: 'Por autor' },
            { id: 'phase', label: 'Por curso' },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setMode(opt.id)}
              style={{
                flex: 1,
                padding: '10px 12px',
                background: mode === opt.id ? C.surface : 'transparent',
                border: 'none',
                borderRadius: 10,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: mode === opt.id ? C.text : C.textMute,
                cursor: 'pointer',
                boxShadow: mode === opt.id ? C.shadowOutSoft : 'none',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sin resultados */}
      {!hasResults && (
        <div style={{ padding: '20px 30px', textAlign: 'center' }}>
          <div style={{ fontSize: 10, letterSpacing: '2.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
            Nada encontrado
          </div>
          <p style={{ color: C.textMute, fontSize: 13, lineHeight: 1.5 }}>
            Prueba con otro término: nombre de barista, gramaje (ej. "230"), fondo (FAST, OPEN) o ratio (1:16).
          </p>
        </div>
      )}

      {/* Modo POR AUTOR */}
      {mode === 'author' && hasResults && (
        <div style={{ padding: '0 20px' }}>
          {authorGroups.map((group) => (
            <BaristaSection
              key={group.barista?.id || 'zeris'}
              barista={group.barista}
              days={group.days}
              state={state}
              onDayClick={onDayClick}
            />
          ))}
        </div>
      )}

      {/* Modo POR CURSO (vista original, por fases) */}
      {mode === 'phase' && hasResults && (
        <div style={{ padding: '0 20px' }}>
          {PHASE_ORDER.map((phase) => {
            const phaseDays = phaseDaysAll.filter((d) => d.phase === phase);
            if (phaseDays.length === 0) return null;
            const phaseDone = phaseDays.filter((d) => state.completed?.[d.num]).length;
            return (
              <div key={phase} style={{ marginBottom: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 10, letterSpacing: '3px', color: C.text, fontWeight: 700, textTransform: 'uppercase' }}>
                    {phase}
                  </span>
                  <div style={{ flex: 1, height: 1, background: C.border }} />
                  <span style={{ fontSize: 11, color: C.textFaint, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                    {phaseDone}/{phaseDays.length}
                  </span>
                </div>
                {phaseDays.map((day) => {
                  const completed = !!state.completed?.[day.num];
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
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            flexShrink: 0,
                            borderRadius: 14,
                            background: C.surfaceMute,
                            boxShadow: C.shadowInSoft,
                            color: completed ? C.success : C.text,
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
                            <div style={{ color: C.text, fontSize: 14.5, fontWeight: 700, letterSpacing: '-0.2px', lineHeight: 1.25 }}>
                              {day.title}
                            </div>
                            <span
                              style={{
                                fontSize: 9,
                                padding: '3px 8px',
                                borderRadius: 8,
                                background: C.surfaceMute,
                                color: C.text,
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
                                <Droplet size={10} />
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
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
