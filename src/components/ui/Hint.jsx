import { useState, useEffect } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { C } from '../../styles/colors';
import { GLOSSARY } from '../../data/glossary';

// Inline hint: muestra `children` (o el término del glosario) seguido de un
// botón redondo con `?`. Al pulsarlo abre un bottom sheet con la explicación.
// Uso: <Hint term="bloom">bloom</Hint> · o <Hint term="bloom" />
export function Hint({ term, children, inline = true }) {
  const [open, setOpen] = useState(false);
  const entry = GLOSSARY[term];

  // Bloquea scroll del fondo cuando el sheet está abierto
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [open]);

  if (!entry) {
    // Si el término no existe en el glosario, devolvemos children tal cual.
    return <>{children}</>;
  }

  const label = children || entry.term;

  return (
    <>
      <span style={{ display: inline ? 'inline-flex' : 'flex', alignItems: 'center', gap: 4, verticalAlign: 'baseline' }}>
        <span>{label}</span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setOpen(true); }}
          aria-label={`Qué es ${entry.term}`}
          style={{
            background: C.surface,
            border: 'none',
            borderRadius: '50%',
            width: 18,
            height: 18,
            padding: 0,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: C.pour,
            cursor: 'pointer',
            boxShadow: C.shadowOutSoft,
            flexShrink: 0,
            verticalAlign: 'middle',
          }}
        >
          <HelpCircle size={12} strokeWidth={2.4} />
        </button>
      </span>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(58, 65, 81, 0.35)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeInFromBottom 0.25s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 560,
              background: C.surface,
              borderRadius: '24px 24px 0 0',
              boxShadow: '0 -8px 40px rgba(58,65,81,0.18)',
              padding: '20px 22px 28px',
              animation: 'slideUpIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            {/* Handle */}
            <div
              style={{
                width: 44,
                height: 4,
                borderRadius: 2,
                background: 'rgba(60, 70, 90, 0.15)',
                margin: '0 auto 16px',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, color: C.pour, letterSpacing: '2.5px', fontWeight: 700, textTransform: 'uppercase' }}>
                  Glosario
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: C.text,
                    margin: '4px 0 0',
                    letterSpacing: '-0.4px',
                    lineHeight: 1.15,
                  }}
                >
                  {entry.term}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                style={{
                  background: C.surface,
                  border: 'none',
                  borderRadius: '50%',
                  width: 34,
                  height: 34,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: C.textMute,
                  cursor: 'pointer',
                  boxShadow: C.shadowOutSoft,
                  flexShrink: 0,
                }}
              >
                <X size={18} />
              </button>
            </div>

            <p
              style={{
                marginTop: 16,
                fontSize: 14,
                color: C.text,
                fontWeight: 600,
                lineHeight: 1.5,
                letterSpacing: '-0.1px',
              }}
            >
              {entry.short}
            </p>

            {entry.long && (
              <div
                style={{
                  marginTop: 12,
                  padding: '14px 16px',
                  background: C.surface,
                  boxShadow: C.shadowInSoft,
                  borderRadius: 14,
                }}
              >
                {entry.long.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    style={{
                      margin: i === 0 ? 0 : '10px 0 0',
                      fontSize: 13.5,
                      color: C.textMute,
                      lineHeight: 1.55,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
