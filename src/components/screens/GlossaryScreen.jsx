import { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { C } from '../../styles/colors';
import { GLOSSARY } from '../../data/glossary';

// Lista completa de términos. Cada tarjeta es acordeón: tocar la expande
// para mostrar la explicación larga. Pensada para consulta tranquila desde Home.
export function GlossaryScreen({ onBack }) {
  const [expanded, setExpanded] = useState(null);
  const entries = Object.entries(GLOSSARY);

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

      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 10, letterSpacing: '3px', color: C.pour, fontWeight: 700 }}>
          GLOSARIO
        </div>
        <h2 style={{ color: C.text, fontSize: 26, fontWeight: 700, lineHeight: 1.1, marginTop: 6, letterSpacing: '-0.5px' }}>
          Términos del oficio
        </h2>
        <p style={{ color: C.textMute, fontSize: 13, lineHeight: 1.5, marginTop: 8 }}>
          Cualquier palabra del mundo del café que aparezca en la app y no entiendas, la tienes aquí. Toca para expandir.
        </p>
      </div>

      <div style={{ padding: '0 20px' }}>
        {entries.map(([key, entry]) => {
          const isOpen = expanded === key;
          return (
            <button
              key={key}
              onClick={() => setExpanded(isOpen ? null : key)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: C.surface,
                border: 'none',
                borderRadius: 18,
                padding: 16,
                marginBottom: 12,
                boxShadow: isOpen ? C.shadowInSoft : C.shadowOutSoft,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 16,
                      fontWeight: 700,
                      color: C.text,
                      letterSpacing: '-0.2px',
                    }}
                  >
                    {entry.term}
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textMute, lineHeight: 1.45 }}>
                    {entry.short}
                  </p>
                </div>
                <ChevronDown
                  size={18}
                  style={{
                    color: C.textFaint,
                    flexShrink: 0,
                    transition: 'transform 0.2s',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    marginTop: 2,
                  }}
                />
              </div>

              {isOpen && entry.long && (
                <div
                  style={{
                    marginTop: 14,
                    padding: '12px 14px',
                    background: C.surface,
                    boxShadow: C.shadowInSoft,
                    borderRadius: 12,
                    animation: 'fadeInFromBottom 0.25s ease',
                  }}
                >
                  {entry.long.split('\n\n').map((para, i) => (
                    <p
                      key={i}
                      style={{
                        margin: i === 0 ? 0 : '10px 0 0',
                        fontSize: 13,
                        color: C.text,
                        lineHeight: 1.55,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
