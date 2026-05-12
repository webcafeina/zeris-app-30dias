import { useState } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import { C } from '../../styles/colors';
import { DAYS } from '../../data/days';
import { DayCard } from '../ui/DayCard';
import { MethodSwitcher } from '../ui/MethodSwitcher';
import { MethodIcon } from '../ui/MethodIcon';
import { SocialButton } from '../ui/SocialButton';
import { getMethod } from '../../data/methods';
import { ZERIS } from '../../data/zerisInfo';
import { GlossaryScreen } from './GlossaryScreen';
import { RecipesScreen } from './RecipesScreen';

const PHASES = ['Fundamentos', 'Variables', 'Los 4 fondos', 'Campeones', 'Cierre'];

export function HomeScreen({ state, method, onDayClick, onSwitchMethod, onResetMethod }) {
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [recipesOpen, setRecipesOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const completedCount = Object.keys(state.completed || {}).length;
  const progress = (completedCount / 30) * 100;
  const currentMethod = getMethod(method);

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
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 32 }}>
      {/* Header: marca + pill método + glosario */}
      <div style={{ padding: '20px 20px 14px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/zeris-logo.svg" alt="Zeri's Coffee" width={34} height={34} style={{ display: 'block' }} />
            <div style={{ fontSize: 9, letterSpacing: '3px', color: C.text, fontWeight: 700 }}>
              ZERI'S COFFEE
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
              color: C.text,
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: C.shadowOutSoft,
            }}
          >
            <BookOpen size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Pill de método: tap → abre MethodSwitcher */}
        <button
          onClick={() => setSwitcherOpen(true)}
          style={{
            marginTop: 18,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: C.surface,
            border: 'none',
            borderRadius: 999,
            padding: '8px 16px 8px 10px',
            cursor: 'pointer',
            color: C.text,
            boxShadow: C.shadowOutSoft,
          }}
        >
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: C.surface,
              boxShadow: C.shadowInSoft,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: C.text,
            }}
          >
            <MethodIcon id={method} size={18} />
          </span>
          <span style={{ fontSize: 9, letterSpacing: '2px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase' }}>
            Reto activo
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text, letterSpacing: '-0.2px' }}>
            {currentMethod?.name || 'Método'}
          </span>
          <ChevronDown size={14} style={{ color: C.textMute, marginLeft: 2 }} />
        </button>
      </div>

      {/* Hero */}
      <div style={{ padding: '8px 20px 20px' }}>
        <h1 style={{ color: C.text, fontSize: 44, fontWeight: 200, lineHeight: 0.95, letterSpacing: '-2px', margin: 0 }}>
          30 días
          <br />
          <span style={{ fontWeight: 700 }}>con {currentMethod?.id === 'orea' ? 'OREA' : currentMethod?.name || 'tu cafetera'}</span>
        </h1>
      </div>

      {/* Progreso */}
      <div style={{ padding: '0 20px 22px' }}>
        <div
          style={{
            padding: '20px 22px',
            border: 'none',
            borderRadius: 20,
            background: C.surface,
            boxShadow: C.shadowOut,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <span style={{ fontSize: 10, color: C.textFaint, letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase' }}>
              Tu progreso
            </span>
            <span>
              <span style={{ fontSize: 28, color: C.text, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-1px' }}>
                {completedCount}
              </span>
              <span style={{ fontSize: 14, color: C.textFaint }}> / 30</span>
            </span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: C.surfaceMute, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: C.text,
                borderRadius: 2,
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* Fases y días */}
      <div style={{ padding: '0 20px' }}>
        {PHASES.map((phase) => {
          const phaseDays = DAYS.filter((d) => d.phase === phase);
          const phaseDone = phaseDays.filter((d) => state.completed?.[d.num]).length;
          return (
            <div key={phase} style={{ marginBottom: 30 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 10, letterSpacing: '3px', color: C.text, fontWeight: 700, textTransform: 'uppercase' }}>
                  {phase}
                </span>
                <div style={{ flex: 1, height: 1, background: C.border }} />
                <span
                  style={{
                    fontSize: 11,
                    color: C.textFaint,
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '0.5px',
                  }}
                >
                  {phaseDone}/{phaseDays.length}
                </span>
              </div>
              {phaseDays.map((day) => (
                <DayCard
                  key={day.num}
                  day={day}
                  completed={!!state.completed?.[day.num]}
                  onClick={() => onDayClick(day.num)}
                />
              ))}
            </div>
          );
        })}
      </div>

      {/* Footer Zeri's: contacto + redes */}
      <div style={{ padding: '20px 20px 4px', textAlign: 'center' }}>
        <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '3px', fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>
          Síguenos en Zeri's
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
          <SocialButton kind="website" href={ZERIS.website} />
          <SocialButton kind="instagram" href={ZERIS.social.instagram} />
          <SocialButton kind="facebook" href={ZERIS.social.facebook} />
          <SocialButton kind="twitter" href={ZERIS.social.twitter} />
        </div>
        <a
          href={ZERIS.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontSize: 10,
            color: C.textFaint,
            letterSpacing: '2px',
            fontWeight: 700,
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          zeriscoffee.com
        </a>
      </div>

      {/* Switcher de método */}
      <MethodSwitcher
        open={switcherOpen}
        current={method}
        onClose={() => setSwitcherOpen(false)}
        onSwitchMethod={(id) => {
          setSwitcherOpen(false);
          onSwitchMethod(id);
        }}
        onOpenRecipes={() => {
          setSwitcherOpen(false);
          setRecipesOpen(true);
        }}
        onResetMethod={() => {
          setSwitcherOpen(false);
          onResetMethod();
        }}
      />
    </div>
  );
}
