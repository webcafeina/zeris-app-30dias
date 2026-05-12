import { useState } from 'react';
import { ChevronRight, BookOpen, Tag } from 'lucide-react';
import { C } from '../../styles/colors';
import { METHODS } from '../../data/methods';
import { MethodIcon } from '../ui/MethodIcon';
import { GlossaryScreen } from './GlossaryScreen';

// Pantalla inicial: elige método de extracción.
// Solo OREA habilitado; los demás marcados PRÓXIMAMENTE.
export function MethodScreen({ onSelect }) {
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [pendingMethod, setPendingMethod] = useState(null);

  if (glossaryOpen) {
    return <GlossaryScreen onBack={() => setGlossaryOpen(false)} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 28 }}>
      <div style={{ padding: '24px 20px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/zeris-logo.svg" alt="Zeri's Coffee" width={36} height={36} style={{ display: 'block' }} />
          <div style={{ fontSize: 9, letterSpacing: '3px', color: C.text, fontWeight: 700 }}>
            ZERI'S COFFEE · CÁCERES
          </div>
        </div>
        <button
          onClick={() => setGlossaryOpen(true)}
          aria-label="Abrir glosario"
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: C.text,
            cursor: 'pointer',
          }}
        >
          <BookOpen size={16} strokeWidth={2} />
        </button>
      </div>

      {/* Hero */}
      <div style={{ padding: '12px 20px 28px' }}>
        <h1 style={{ color: C.text, fontSize: 50, fontWeight: 200, lineHeight: 0.95, letterSpacing: '-2.5px', margin: 0 }}>
          30 días
          <br />
          <span style={{ fontWeight: 700 }}>con tu cafetera</span>
        </h1>
        <p style={{ color: C.textMute, fontSize: 14.5, lineHeight: 1.55, marginTop: 18, maxWidth: 460 }}>
          Te vamos a ayudar a sacar el máximo rendimiento al café de especialidad que ya estás tomando. Elige el método con el que quieres hacer el reto.
        </p>
      </div>

      {/* Selector */}
      <div style={{ padding: '0 4px 20px' }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: '3px',
            color: C.textFaint,
            fontWeight: 700,
            textTransform: 'uppercase',
            padding: '0 16px 10px',
          }}
        >
          Elige tu método
        </div>

        {METHODS.map((method, i) => {
          const isAvailable = method.available;
          return (
            <button
              key={method.id}
              onClick={() => {
                if (isAvailable) {
                  onSelect(method.id);
                } else {
                  setPendingMethod(method.id);
                  setTimeout(() => setPendingMethod(null), 2400);
                }
              }}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'transparent',
                borderTop: i === 0 ? `1px solid ${C.border}` : 'none',
                borderBottom: `1px solid ${C.border}`,
                borderLeft: 'none',
                borderRight: 'none',
                padding: '18px 20px',
                cursor: 'pointer',
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                opacity: isAvailable ? 1 : 0.6,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { if (isAvailable) e.currentTarget.style.background = C.surfaceMute; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              onTouchStart={(e) => { if (isAvailable) e.currentTarget.style.background = C.surfaceMute; }}
              onTouchEnd={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  flexShrink: 0,
                  borderRadius: 14,
                  border: `1px solid ${C.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: C.text,
                }}
              >
                <MethodIcon id={method.id} size={30} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: C.text, fontSize: 17, fontWeight: 700, letterSpacing: '-0.3px', lineHeight: 1.2 }}>
                  {method.name}
                </div>
                <div
                  style={{
                    color: C.textFaint,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginTop: 4,
                  }}
                >
                  {method.category}
                </div>
                <div style={{ color: C.textMute, fontSize: 12.5, lineHeight: 1.5, marginTop: 6 }}>
                  {method.description}
                </div>
                {pendingMethod === method.id && (
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.warn,
                      letterSpacing: '0.3px',
                      animation: 'fadeInFromBottom 0.25s ease',
                    }}
                  >
                    Aún no disponible. Estamos preparándolo.
                  </div>
                )}
              </div>
              <div style={{ flexShrink: 0, color: isAvailable ? C.text : C.textFaint }}>
                {isAvailable ? (
                  <ChevronRight size={22} />
                ) : (
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                      color: C.textFaint,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    PRÓXIMAMENTE
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Promo */}
      <div style={{ padding: '8px 20px 24px' }}>
        <div
          style={{
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: 20,
            background: C.surfaceMute,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span
              style={{
                fontSize: 10,
                letterSpacing: '2.5px',
                color: C.text,
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              Recuerdos para tu cafetazo
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 0',
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <Tag size={20} style={{ color: C.text, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, color: C.text, fontWeight: 700, letterSpacing: '-0.2px' }}>
                10% en tu primera compra
              </div>
              <div style={{ fontSize: 12, color: C.textMute, marginTop: 2 }}>
                Código:{' '}
                <span
                  style={{
                    fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
                    fontWeight: 700,
                    color: C.text,
                    letterSpacing: '0.5px',
                  }}
                >
                  CAFETAZO10
                </span>
              </div>
            </div>
          </div>

          <div style={{ padding: '14px 0 4px' }}>
            <div style={{ fontSize: 14, color: C.text, fontWeight: 600, letterSpacing: '-0.2px' }}>
              Suscripción reto de 30 días
            </div>
            <div style={{ fontSize: 12, color: C.textMute, marginTop: 4, lineHeight: 1.5 }}>
              Descuento especial al combinar la máquina + el café que necesitas para experimentar todo el mes.
            </div>
          </div>

          <a
            href="https://zeriscoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              marginTop: 12,
              textAlign: 'center',
              fontSize: 11,
              color: C.text,
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Ver en zeriscoffee.com →
          </a>
        </div>
      </div>
    </div>
  );
}
