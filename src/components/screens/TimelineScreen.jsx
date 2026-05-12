import { ChevronLeft, Target, Play } from 'lucide-react';
import { C } from '../../styles/colors';
import { formatTime } from '../../lib/format';
import { warmUpVoice } from '../../lib/voice';
import { buildBrewPlan } from '../../lib/brewPlan';
import { GlassCard } from '../ui/GlassCard';
import { ParamChip } from '../ui/ParamChip';

export function TimelineScreen({ day, onBack, onStart }) {
  // Mismo plan que verá el usuario durante el brew (incluye el paso DOSIS
  // sintético a t=0). Así la vista previa cuadra con el cronómetro real.
  const { steps } = buildBrewPlan(day);
  const total = steps[steps.length - 1]?.at || 0;

  return (
    <div style={{ minHeight: '100vh', background: C.bgGradient, paddingBottom: 24 }}>
      <div style={{ padding: '20px 20px 12px', display: 'flex', alignItems: 'center' }}>
        <button
          onClick={onBack}
          style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 4, color: C.textMute, cursor: 'pointer', padding: 8 }}
        >
          <ChevronLeft size={20} />
          <span style={{ fontSize: 13 }}>Volver</span>
        </button>
      </div>

      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontSize: 10, letterSpacing: '3px', color: C.accent, fontWeight: 700 }}>
          DÍA {day.num} · {day.phase.toUpperCase()}
        </div>
        <h2 style={{ color: C.text, fontSize: 26, fontWeight: 700, lineHeight: 1.1, marginTop: 6, letterSpacing: '-0.5px' }}>
          {day.title}
        </h2>
      </div>

      <div style={{ padding: '0 20px 16px' }}>
        <GlassCard strong style={{ padding: 18, borderLeft: `4px solid ${C.warn}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Target size={14} style={{ color: C.warn }} />
            <span style={{ fontSize: 10, letterSpacing: '2px', color: C.warn, fontWeight: 700 }}>OBJETIVO DEL EJERCICIO</span>
          </div>
          <p style={{ color: C.text, fontSize: 14, lineHeight: 1.5 }}>{day.objective}</p>
        </GlassCard>
      </div>

      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 10, letterSpacing: '2px', color: C.textFaint, fontWeight: 700, marginBottom: 10 }}>
          LA RECETA
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <ParamChip label="Café" value={`${day.coffee} g`} />
          <ParamChip label="Agua" value={`${day.water} g`} />
          <ParamChip label="Ratio" value={day.ratio} />
          <ParamChip label="Temp" value={`${day.temp} °C`} />
          <ParamChip label="Molienda" value={day.grind} fullWidth />
          <ParamChip label="Fondo" value={day.bottom} fullWidth />
        </div>
      </div>

      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ fontSize: 10, letterSpacing: '2px', color: C.textFaint, fontWeight: 700, marginBottom: 10 }}>
          PASOS DEL EJERCICIO · TIEMPO TOTAL ~{formatTime(total)}
        </div>
        <div style={{ position: 'relative', paddingLeft: 28 }}>
          <div
            style={{
              position: 'absolute',
              left: 11,
              top: 8,
              bottom: 8,
              width: 2,
              background: `linear-gradient(to bottom, ${C.accent} 0%, ${C.accentBright} 50%, rgba(90,53,25,0.2) 100%)`,
              borderRadius: 1,
            }}
          />
          {steps.map((step, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 14 }}>
              <div
                style={{
                  position: 'absolute',
                  left: -28,
                  top: 10,
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#FFF',
                  border: `3px solid ${C.accent}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 9,
                  fontWeight: 700,
                  color: C.accent,
                  boxShadow: C.shadowOutSoft,
                }}
              >
                {i + 1}
              </div>
              <GlassCard strong style={{ padding: '10px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: C.text, fontWeight: 600, lineHeight: 1.35 }}>
                      {step.label}
                    </div>
                    {step.water && (
                      <div style={{ fontSize: 11, color: C.accent, marginTop: 2, fontWeight: 600 }}>
                        Báscula: {step.water} g
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: C.accent,
                      fontWeight: 700,
                      fontVariantNumeric: 'tabular-nums',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {formatTime(step.at)}
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <button
          onClick={() => {
            warmUpVoice();
            onStart();
          }}
          style={{
            width: '100%',
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentBright})`,
            border: 'none',
            borderRadius: 20,
            padding: '20px',
            color: '#FFF',
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            cursor: 'pointer',
            boxShadow: C.shadowStrong,
          }}
        >
          <Play size={22} fill="#FFF" />
          EMPEZAR EJERCICIO
        </button>
        <div style={{ textAlign: 'center', fontSize: 11, color: C.textFaint, marginTop: 10 }}>
          Tendrás 3 segundos de cuenta atrás antes de empezar
        </div>
      </div>
    </div>
  );
}
