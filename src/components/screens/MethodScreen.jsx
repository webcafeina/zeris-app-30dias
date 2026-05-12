import { useState } from 'react';
import { ChevronRight, BookOpen, Sparkles, Tag } from 'lucide-react';
import { C } from '../../styles/colors';
import { METHODS } from '../../data/methods';
import { MethodIcon } from '../ui/MethodIcon';
import { GlossaryScreen } from './GlossaryScreen';

// Pantalla inicial: selecciona método de extracción.
// Hoy solo OREA está habilitado; el resto muestra badge "PRÓXIMAMENTE".
export function MethodScreen({ onSelect }) {
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [pendingMethod, setPendingMethod] = useState(null); // para mostrar mensaje "próximamente"

  if (glossaryOpen) {
    return <GlossaryScreen onBack={() => setGlossaryOpen(false)} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 28 }}>
      {/* Header con logo + glosario */}
      <div
        style={{
          padding: '28px 20px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/zeris-logo.svg" alt="Zeri's Coffee" width={40} height={40} style={{ display: 'block' }} />
          <div style={{ fontSize: 10, letterSpacing: '4px', color: C.accent, fontWeight: 700 }}>
            ZERI'S COFFEE · CÁCERES
          </div>
        </div>
        <button
          onClick={() => setGlossaryOpen(true)}
          aria-label="Abrir glosario"
          style={{
            background: C.surface,
            border: 'none',
            borderRadius: '50%',
            width: 38,
            height: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: C.pour,
            cursor: 'pointer',
            boxShadow: C.shadowOutSoft,
            flexShrink: 0,
          }}
        >
          <BookOpen size={17} strokeWidth={2} />
        </button>
      </div>

      {/* Hero */}
      <div style={{ padding: '8px 20px 20px' }}>
        <h1
          style={{
            color: C.text,
            fontSize: 42,
            fontWeight: 200,
            lineHeight: 0.95,
            letterSpacing: '-1.8px',
            margin: 0,
          }}
        >
          30 días
          <br />
          <span style={{ color: C.accent, fontWeight: 700 }}>con tu cafetera</span>
        </h1>
        <p
          style={{
            color: C.textMute,
            fontSize: 14,
            lineHeight: 1.55,
            marginTop: 16,
            maxWidth: 460,
          }}
        >
          Te vamos a ayudar a sacar el máximo rendimiento al café de especialidad que ya estás tomando. Elige el método con el que quieres hacer el reto.
        </p>
      </div>

      {/* Selector de métodos */}
      <div style={{ padding: '0 20px 20px' }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: '3px',
            color: C.textFaint,
            fontWeight: 700,
            marginBottom: 14,
            textTransform: 'uppercase',
          }}
        >
          Elige tu método
        </div>

        {METHODS.map((method) => {
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
                background: C.surface,
                border: 'none',
                borderRadius: 20,
                padding: 16,
                marginBottom: 12,
                boxShadow: C.shadowOutSoft,
                cursor: 'pointer',
                display: 'flex',
                gap: 14,
                alignItems: 'center',
                opacity: isAvailable ? 1 : 0.72,
                transition: 'box-shadow 0.18s, transform 0.18s',
              }}
              onTouchStart={(e) => {
                if (isAvailable) e.currentTarget.style.boxShadow = C.shadowInSoft;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.boxShadow = C.shadowOutSoft;
              }}
              onMouseDown={(e) => {
                if (isAvailable) e.currentTarget.style.boxShadow = C.shadowInSoft;
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow = C.shadowOutSoft;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = C.shadowOutSoft;
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  flexShrink: 0,
                  borderRadius: 16,
                  background: C.surface,
                  boxShadow: C.shadowInSoft,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isAvailable ? C.accent : C.textFaint,
                }}
              >
                <MethodIcon id={method.id} size={32} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    color: C.text,
                    fontSize: 15.5,
                    fontWeight: 700,
                    letterSpacing: '-0.2px',
                    lineHeight: 1.2,
                  }}
                >
                  {method.name}
                </div>
                <div
                  style={{
                    color: C.textFaint,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginTop: 3,
                  }}
                >
                  {method.category}
                </div>
                <div style={{ color: C.textMute, fontSize: 12.5, lineHeight: 1.45, marginTop: 6 }}>
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
              <div style={{ flexShrink: 0, color: isAvailable ? C.accent : C.textFaint }}>
                {isAvailable ? (
                  <ChevronRight size={22} />
                ) : (
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                      padding: '4px 8px',
                      borderRadius: 8,
                      background: C.surface,
                      boxShadow: C.shadowInSoft,
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

      {/* Bloque promo */}
      <div style={{ padding: '8px 20px 24px' }}>
        <div
          style={{
            background: C.surface,
            borderRadius: 22,
            padding: 18,
            boxShadow: C.shadowOutSoft,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Sparkles size={14} style={{ color: C.accent }} />
            <span
              style={{
                fontSize: 10,
                letterSpacing: '2.5px',
                color: C.accent,
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
              padding: 14,
              background: C.surface,
              boxShadow: C.shadowInSoft,
              borderRadius: 16,
              marginBottom: 10,
            }}
          >
            <Tag size={20} style={{ color: C.accent, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, color: C.text, fontWeight: 700, letterSpacing: '-0.2px' }}>
                10% en tu primera compra
              </div>
              <div style={{ fontSize: 12, color: C.textMute, marginTop: 2 }}>
                Código:{' '}
                <span
                  style={{
                    fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
                    fontWeight: 700,
                    color: C.accent,
                    letterSpacing: '0.5px',
                  }}
                >
                  CAFETAZO10
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '12px 14px',
              borderRadius: 14,
              background: C.surface,
              boxShadow: C.shadowInSoft,
            }}
          >
            <div style={{ fontSize: 13, color: C.text, fontWeight: 600, lineHeight: 1.4 }}>
              Suscripción reto de 30 días
            </div>
            <div style={{ fontSize: 12, color: C.textMute, marginTop: 4, lineHeight: 1.45 }}>
              Descuento especial al combinar la máquina + el café que necesitas para experimentar todo el mes.
            </div>
          </div>

          <a
            href="https://zeriscoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              marginTop: 14,
              textAlign: 'center',
              fontSize: 11,
              color: C.pour,
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Ver en zeriscoffee.com →
          </a>
        </div>
      </div>
    </div>
  );
}
