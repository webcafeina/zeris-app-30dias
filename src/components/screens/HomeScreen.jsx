import { useState } from 'react';
import { BookOpen, List } from 'lucide-react';
import { C } from '../../styles/colors';
import { DAYS } from '../../data/days';
import { GlassCard } from '../ui/GlassCard';
import { DayCard } from '../ui/DayCard';
import { GlossaryScreen } from './GlossaryScreen';
import { RecipesScreen } from './RecipesScreen';

const PHASES = ['Fundamentos', 'Variables', 'Los 4 fondos', 'Campeones', 'Cierre'];

export function HomeScreen({ state, onDayClick, onChangeMethod }) {
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [recipesOpen, setRecipesOpen] = useState(false);
  const completedCount = Object.keys(state.completed).length;
  const progress = (completedCount / 30) * 100;

  if (glossaryOpen) {
    return <GlossaryScreen onBack={() => setGlossaryOpen(false)} />;
  }

  if (recipesOpen) {
    return (
      <RecipesScreen
        state={state}
        onBack={() => setRecipesOpen(false)}
        onDayClick={(num) => {
          setRecipesOpen(false);
          onDayClick(num);
        }}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bgGradient, paddingBottom: 32 }}>
      <div style={{ padding: '32px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/zeris-logo.svg" alt="Zeri's Coffee" width={36} height={36} style={{ display: 'block' }} />
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
        <h1 style={{ color: C.text, fontSize: 36, fontWeight: 200, lineHeight: 0.95, marginTop: 10, letterSpacing: '-1.5px' }}>
          30 días
          <br />
          <span style={{ color: C.accent, fontWeight: 700 }}>con OREA</span>
        </h1>

        <GlassCard strong style={{ padding: 18, marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <span style={{ fontSize: 10, color: C.textFaint, letterSpacing: '2px', fontWeight: 700 }}>TU PROGRESO</span>
            <span>
              <span style={{ fontSize: 22, color: C.accent, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{completedCount}</span>
              <span style={{ fontSize: 14, color: C.textFaint }}> / 30</span>
            </span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: 'rgba(90,53,25,0.08)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${C.accent}, ${C.accentBright})`,
                borderRadius: 4,
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </GlassCard>
      </div>

      <div style={{ padding: '0 20px' }}>
        {PHASES.map((phase) => {
          const phaseDays = DAYS.filter((d) => d.phase === phase);
          const phaseDone = phaseDays.filter((d) => state.completed[d.num]).length;
          return (
            <div key={phase} style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 10, letterSpacing: '3px', color: C.accent, fontWeight: 700, textTransform: 'uppercase' }}>
                  {phase}
                </span>
                <div style={{ flex: 1, height: 1, background: C.divider }} />
                <span style={{ fontSize: 11, color: C.textFaint, fontWeight: 600 }}>
                  {phaseDone}/{phaseDays.length}
                </span>
              </div>
              {phaseDays.map((day) => (
                <DayCard
                  key={day.num}
                  day={day}
                  completed={!!state.completed[day.num]}
                  onClick={() => onDayClick(day.num)}
                />
              ))}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 16 }}>
        {onChangeMethod && (
          <button
            onClick={onChangeMethod}
            style={{
              background: C.surface,
              border: 'none',
              borderRadius: 14,
              padding: '8px 16px',
              fontSize: 11,
              letterSpacing: '1.5px',
              fontWeight: 700,
              color: C.textMute,
              cursor: 'pointer',
              boxShadow: C.shadowOutSoft,
            }}
          >
            CAMBIAR DE MÉTODO
          </button>
        )}
        <div style={{ textAlign: 'center', color: C.textFaint, fontSize: 10, letterSpacing: '2px' }}>
          ZERISCOFFEE.COM
        </div>
      </div>
    </div>
  );
}
