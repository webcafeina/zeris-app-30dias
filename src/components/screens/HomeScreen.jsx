import { useState } from 'react';
import { BookOpen, ChevronDown, Coffee, Instagram, ArrowRight, Notebook, Tag, Package } from 'lucide-react';
import { C } from '../../styles/colors';
import { DAYS } from '../../data/days';
import { DayCard } from '../ui/DayCard';
import { MethodSwitcher } from '../ui/MethodSwitcher';
import { MethodIcon } from '../ui/MethodIcon';
import { SocialButton } from '../ui/SocialButton';
import { OreaPhoto } from '../ui/OreaPhoto';
import { getMethod } from '../../data/methods';
import { ZERIS } from '../../data/zerisInfo';
import { OREA_PHOTOS } from '../../data/photos';
import { GlossaryScreen } from './GlossaryScreen';
import { RecipesScreen } from './RecipesScreen';
import { ChallengeScreen } from './ChallengeScreen';
import { LogsScreen } from './LogsScreen';

const PHASES = ['Fundamentos', 'Variables', 'Los 4 fondos', 'Campeones', 'Cierre'];

export function HomeScreen({ state, method, onDayClick, onSwitchMethod, onResetMethod }) {
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [recipesOpen, setRecipesOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [logsOpen, setLogsOpen] = useState(false);

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

  if (challengeOpen) {
    return <ChallengeScreen onBack={() => setChallengeOpen(false)} />;
  }

  if (logsOpen) {
    return (
      <LogsScreen
        state={state}
        onBack={() => setLogsOpen(false)}
        onDayClick={(num) => {
          setLogsOpen(false);
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button
              onClick={() => setLogsOpen(true)}
              aria-label="Mis catas"
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
                boxShadow: C.shadowOutSoft,
              }}
            >
              <Notebook size={16} strokeWidth={2} />
            </button>
            <button
              onClick={() => setRecipesOpen(true)}
              aria-label="Abrir libro de recetas"
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
                boxShadow: C.shadowOutSoft,
              }}
            >
              <Coffee size={16} strokeWidth={2} />
            </button>
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
                boxShadow: C.shadowOutSoft,
              }}
            >
              <BookOpen size={16} strokeWidth={2} />
            </button>
          </div>
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

      {/* Hero photo de la cafetera + título */}
      <div style={{ padding: '8px 20px 14px' }}>
        <OreaPhoto src={OREA_PHOTOS.tilted} alt="OREA V4 Narrow" radius={18} aspect="16/10" />
      </div>
      <div style={{ padding: '6px 20px 20px' }}>
        <h1 style={{ color: C.text, fontSize: 44, fontWeight: 200, lineHeight: 0.95, letterSpacing: '-2px', margin: 0 }}>
          30 días
          <br />
          <span style={{ fontWeight: 700 }}>con {currentMethod?.id === 'orea' ? 'OREA' : currentMethod?.name || 'tu cafetera'}</span>
        </h1>
      </div>

      {/* Banner del reto en redes */}
      <div style={{ padding: '0 20px 14px' }}>
        <button
          onClick={() => setChallengeOpen(true)}
          style={{
            width: '100%',
            textAlign: 'left',
            background: C.surface,
            border: 'none',
            borderRadius: 16,
            padding: '14px 16px',
            boxShadow: C.shadowOutSoft,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            color: C.text,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              flexShrink: 0,
              borderRadius: '50%',
              background: C.surfaceMute,
              boxShadow: C.shadowInSoft,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: C.text,
            }}
          >
            <Instagram size={18} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 9, letterSpacing: '2.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase' }}>
              Reto en redes
            </div>
            <div style={{ fontSize: 13.5, color: C.text, fontWeight: 700, letterSpacing: '-0.2px', lineHeight: 1.25, marginTop: 2 }}>
              1 foto al día → 30 fotos → descuento
            </div>
          </div>
          <ArrowRight size={16} style={{ color: C.textFaint, flexShrink: 0 }} />
        </button>
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
              {phaseDays.map((day) => {
                const attempts = state.logs?.[day.num];
                const attemptsCount = Array.isArray(attempts) ? attempts.length : (attempts ? 1 : 0);
                return (
                  <DayCard
                    key={day.num}
                    day={day}
                    completed={!!state.completed?.[day.num]}
                    attemptsCount={attemptsCount}
                    onClick={() => onDayClick(day.num)}
                  />
                );
              })}
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
        {/* Build timestamp — sirve para confirmar visualmente que el
            dispositivo está viendo el último deploy. Lo inyecta vite.config
            en cada build. */}
        <div
          style={{
            marginTop: 8,
            fontSize: 9,
            color: C.textFaint,
            letterSpacing: '1.5px',
            fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
            opacity: 0.7,
          }}
        >
          BUILD · {typeof __BUILD_SHORT__ !== 'undefined' ? __BUILD_SHORT__ : 'dev'}
        </div>
      </div>

      {/* Promo: descuento de bienvenida + pack-reto. Visible siempre desde
          Home para que la oferta no quede solo enterrada en MethodScreen. */}
      <div style={{ padding: '20px 20px 8px' }}>
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: 18,
            boxShadow: C.shadowOutSoft,
          }}
        >
          <div style={{ fontSize: 9, letterSpacing: '2.5px', color: C.text, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>
            Promos de Zeri's
          </div>

          {/* Pack reto: máquina + café para todo el mes */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
              padding: '12px 0',
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <Package size={20} style={{ color: C.text, flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, color: C.text, fontWeight: 700, letterSpacing: '-0.2px' }}>
                Pack reto 30 días
              </div>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: C.textMute, lineHeight: 1.5 }}>
                Descuento especial al llevarte la <strong style={{ color: C.text }}>máquina + el café</strong> que necesitas para experimentar todo el mes. Una suscripción pensada justo para hacer este reto.
              </p>
              <a
                href={`${ZERIS.website}/tienda/`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: 6,
                  fontSize: 10,
                  color: C.text,
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                Ver el pack →
              </a>
            </div>
          </div>

          {/* CAFETAZO10 */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
              padding: '14px 0 4px',
            }}
          >
            <Tag size={20} style={{ color: C.text, flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, color: C.text, fontWeight: 700, letterSpacing: '-0.2px' }}>
                10% en tu primera compra
              </div>
              <div style={{ fontSize: 12, color: C.textMute, marginTop: 4 }}>
                Código:{' '}
                <span
                  style={{
                    fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
                    fontWeight: 700,
                    color: C.text,
                    letterSpacing: '0.5px',
                  }}
                >
                  {ZERIS.discount?.code || 'CAFETAZO10'}
                </span>
              </div>
            </div>
          </div>
        </div>
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
