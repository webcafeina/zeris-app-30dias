import { useState } from 'react';
import { ChevronLeft, Check, Play } from 'lucide-react';
import { C } from '../../styles/colors';
import { warmUpVoice } from '../../lib/voice';

// Checklist de preparación física previa al brew.
// Cada paso es tappable: se marca/desmarca. El CTA siempre está disponible
// (los expertos pueden saltar), pero cambia de estilo cuando todo está listo.
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
      title: `Pesa ${day.coffee} g de café en grano`,
      detail: 'En un recipiente aparte. Tiene que ser café entero — la molienda viene en el siguiente paso, justo antes de extraer.',
      value: `${day.coffee} g`,
    },
    {
      id: 'grind',
      title: 'Muele el café',
      detail: `${day.grind}. Hazlo justo ahora, no antes — el café molido pierde aromas en cuestión de minutos.`,
    },
    {
      id: 'pour-grounds',
      title: 'Vacía el molido al filtro',
      detail: 'Y dale un golpecito suave al lateral del dripper para nivelar el lecho. Una superficie plana ayuda a que el agua se reparta uniformemente durante el bloom.',
    },
    {
      id: 'heat-water',
      title: `Calienta agua a ${day.temp} °C`,
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
          DÍA {day.num} · PREPARACIÓN
        </div>
        <h2 style={{ color: C.text, fontSize: 26, fontWeight: 700, lineHeight: 1.1, marginTop: 6, letterSpacing: '-0.5px' }}>
          Deja todo a punto
        </h2>
        <p style={{ color: C.textMute, fontSize: 13, lineHeight: 1.5, marginTop: 8 }}>
          Antes de arrancar el cronómetro, completa cada paso. Tócalo cuando lo hayas hecho para marcarlo como listo.
        </p>
      </div>

      {/* Steps */}
      <div style={{ padding: '0 20px' }}>
        {steps.map((step, i) => {
          const isChecked = checked.has(step.id);
          return (
            <button
              key={step.id}
              onClick={() => toggle(step.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: C.surface,
                border: 'none',
                borderRadius: 18,
                padding: 16,
                marginBottom: 12,
                boxShadow: isChecked ? C.shadowInSoft : C.shadowOutSoft,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s, opacity 0.2s',
                opacity: isChecked ? 0.62 : 1,
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                  borderRadius: '50%',
                  background: C.surface,
                  boxShadow: isChecked ? C.shadowInSoft : C.shadowOutSoft,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isChecked ? C.success : C.textFaint,
                  fontSize: 12,
                  fontWeight: 700,
                  transition: 'box-shadow 0.2s, color 0.2s',
                }}
              >
                {isChecked ? <Check size={18} strokeWidth={2.5} /> : i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
                  <div
                    style={{
                      color: C.text,
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: '-0.2px',
                      textDecoration: isChecked ? 'line-through' : 'none',
                    }}
                  >
                    {step.title}
                  </div>
                  {step.value && (
                    <div
                      style={{
                        fontSize: 13,
                        color: C.accent,
                        fontWeight: 700,
                        fontVariantNumeric: 'tabular-nums',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {step.value}
                    </div>
                  )}
                </div>
                <div style={{ color: C.textMute, fontSize: 12.5, lineHeight: 1.45, marginTop: 5 }}>
                  {step.detail}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Counter */}
      <div
        style={{
          textAlign: 'center',
          padding: '6px 20px 14px',
          fontSize: 10,
          color: allDone ? C.success : C.textFaint,
          letterSpacing: '2px',
          fontWeight: 700,
          transition: 'color 0.3s',
        }}
      >
        {checked.size} DE {steps.length} LISTOS
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
            background: allDone ? C.accent : C.surface,
            border: 'none',
            borderRadius: 20,
            padding: '20px',
            color: allDone ? '#FFF' : C.textMute,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            cursor: 'pointer',
            boxShadow: allDone
              ? '6px 6px 14px rgba(174,184,204,0.4), -6px -6px 14px rgba(255,255,255,1)'
              : C.shadowOutSoft,
            transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
          }}
        >
          <Play size={18} fill={allDone ? '#FFF' : C.textMute} />
          {allDone ? 'EMPEZAR EJERCICIO' : 'EMPEZAR EJERCICIO'}
        </button>
        {!allDone && (
          <div style={{ textAlign: 'center', fontSize: 11, color: C.textFaint, marginTop: 10 }}>
            Puedes empezar sin marcar todos — pero asegúrate de tenerlos hechos.
          </div>
        )}
      </div>
    </div>
  );
}
