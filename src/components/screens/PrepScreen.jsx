import { useState } from 'react';
import { ChevronLeft, Check, ArrowRight, Clock } from 'lucide-react';
import { C } from '../../styles/colors';
import { warmUpVoice } from '../../lib/voice';

// Extrae el rango de clicks de un texto tipo "Media-fina (21–25 clicks Comandante)".
// Devuelve "21-25 clicks" o null si no encuentra patrón. Crítico: el click es lo
// que más se olvida al moler, así que lo mostramos prominente.
function extractClicks(grindText) {
  if (!grindText) return null;
  const m = /(\d+\s*[-–]\s*\d+|\d+)\s*clicks?/i.exec(grindText);
  if (!m) return null;
  const range = m[1].replace(/–/g, '-').replace(/\s+/g, '');
  return `${range} clicks`;
}

// Pasos previos al brew. Sin cronómetro: lista para completar a tu ritmo.
// Estilo editorial: números muy grandes, mucho aire entre filas, hairlines.
// Diferenciado visualmente del Brew (que sí es timed) para que el usuario
// entienda que aquí no corre el reloj.
export function PrepScreen({ day, onBack, onContinue }) {
  const steps = [
    {
      id: 'filter',
      title: 'Enjuaga el filtro',
      detail: `Coloca el filtro de papel en la ${day.bottom}. Enjuágalo con ~100 g de agua hirviendo. Esto retira el sabor a papel — sin enjuague, la taza queda con un fondo cartón que arruina los aromas.`,
    },
    {
      id: 'discard',
      title: 'Tira el agua del enjuague',
      detail: 'Vacía la jarra que ha quedado debajo. La cafetera y el filtro quedan templados, lo que ayuda a mantener estable la temperatura del agua durante la extracción.',
    },
    {
      id: 'tare',
      title: 'Báscula a cero',
      detail: 'Pon la cafetera (con el filtro montado) sobre la báscula y tárala. Si tu báscula tiene modo "pour-over" o "extracción", actívalo ahora: arrancará el cronómetro automáticamente al detectar los primeros gramos de agua.',
    },
    {
      id: 'beans',
      title: 'Pesa el café en grano',
      detail: 'En un recipiente aparte. Tiene que ser café entero — la molienda viene en el siguiente paso, justo antes de extraer.',
      value: `${day.coffee} g`,
    },
    {
      id: 'grind',
      title: 'Muele el café',
      detail: `${day.grind}. Hazlo justo ahora, no antes — el café molido pierde aromas en cuestión de minutos.`,
      value: extractClicks(day.grind),
    },
    {
      id: 'pour-grounds',
      title: 'Vacía el molido al filtro',
      detail: 'Y dale un golpecito suave al lateral del dripper para nivelar el lecho. Una superficie plana ayuda a que el agua se reparta uniformemente durante el bloom.',
    },
    {
      id: 'heat-water',
      title: 'Calienta el agua',
      detail: `Necesitas al menos ${day.water} g para el brew (más los ~100 g que ya usaste para enjuagar el filtro). Si tienes kettle de cuello de cisne, mucho mejor: permite verter con precisión.`,
      value: `${day.temp} °C`,
    },
  ];

  const [checked, setChecked] = useState(() => new Set());

  const toggle = (id) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allDone = checked.size === steps.length;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 24 }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 6px', display: 'flex', alignItems: 'center' }}>
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

      <div style={{ padding: '0 20px 28px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 10px',
            border: `1px solid ${C.border}`,
            borderRadius: 999,
            marginBottom: 14,
          }}
        >
          <Clock size={11} style={{ color: C.textFaint, textDecoration: 'line-through' }} />
          <span
            style={{
              fontSize: 9,
              letterSpacing: '2px',
              color: C.textFaint,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Pasos previos · sin cronómetro
          </span>
        </div>
        <h2
          style={{
            color: C.text,
            fontSize: 38,
            fontWeight: 200,
            lineHeight: 0.98,
            marginTop: 0,
            marginBottom: 12,
            letterSpacing: '-1.8px',
          }}
        >
          Antes del
          <br />
          <span style={{ fontWeight: 700 }}>cronómetro</span>
        </h2>
        <p style={{ color: C.textMute, fontSize: 14, lineHeight: 1.55, marginTop: 8 }}>
          Aquí no corre el reloj. Completa cada paso a tu ritmo. Cuando estés listo, arrancamos el cronómetro y empieza el brew.
        </p>
      </div>

      {/* Lista de pasos editorial */}
      <div style={{ padding: '0 4px' }}>
        {steps.map((step, i) => {
          const isChecked = checked.has(step.id);
          return (
            <button
              key={step.id}
              onClick={() => toggle(step.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                borderTop: i === 0 ? `1px solid ${C.border}` : 'none',
                borderBottom: `1px solid ${C.border}`,
                padding: '18px 20px',
                cursor: 'pointer',
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.surfaceMute; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              onTouchStart={(e) => { e.currentTarget.style.background = C.surfaceMute; }}
              onTouchEnd={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              {/* Número editorial XL */}
              <div
                style={{
                  flexShrink: 0,
                  width: 44,
                  fontSize: 36,
                  fontWeight: 200,
                  letterSpacing: '-1.5px',
                  lineHeight: 1,
                  color: isChecked ? C.textFaint : C.text,
                  fontVariantNumeric: 'tabular-nums',
                  position: 'relative',
                  textAlign: 'center',
                }}
              >
                {isChecked ? (
                  <Check size={26} strokeWidth={2.5} style={{ color: C.success }} />
                ) : (
                  String(i + 1).padStart(2, '0')
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                    alignItems: 'baseline',
                    marginBottom: 6,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: isChecked ? C.textMute : C.text,
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: '-0.3px',
                      lineHeight: 1.2,
                      textDecoration: isChecked ? 'line-through' : 'none',
                    }}
                  >
                    {step.title}
                  </h3>
                  {step.value && (
                    <div
                      style={{
                        fontSize: 18,
                        color: C.text,
                        fontWeight: 700,
                        fontVariantNumeric: 'tabular-nums',
                        whiteSpace: 'nowrap',
                        letterSpacing: '-0.3px',
                      }}
                    >
                      {step.value}
                    </div>
                  )}
                </div>
                <p
                  style={{
                    margin: 0,
                    color: C.textMute,
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    opacity: isChecked ? 0.55 : 1,
                  }}
                >
                  {step.detail}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Counter */}
      <div
        style={{
          textAlign: 'center',
          padding: '20px 20px 14px',
          fontSize: 10,
          color: allDone ? C.success : C.textFaint,
          letterSpacing: '2px',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}
      >
        {checked.size} de {steps.length} listos
      </div>

      {/* CTA */}
      <div style={{ padding: '0 20px 20px' }}>
        <button
          onClick={() => {
            warmUpVoice();
            onContinue();
          }}
          style={{
            width: '100%',
            background: C.text,
            border: 'none',
            borderRadius: 14,
            padding: '20px',
            color: '#FFF',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            cursor: 'pointer',
          }}
        >
          ARRANCAR CRONÓMETRO
          <ArrowRight size={18} />
        </button>
        {!allDone && (
          <div style={{ textAlign: 'center', fontSize: 11, color: C.textFaint, marginTop: 10 }}>
            Puedes arrancar sin marcar todos — pero asegúrate de tenerlos hechos.
          </div>
        )}
      </div>
    </div>
  );
}
