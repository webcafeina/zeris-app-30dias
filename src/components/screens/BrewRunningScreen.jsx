import { useState, useEffect, useRef } from 'react';
import { C } from '../../styles/colors';
import { formatTime } from '../../lib/format';
import { beep } from '../../lib/audio';
import { speak, speakTip } from '../../lib/voice';
import { TIPS } from '../../data/tips';
import { CircularTimer } from '../ui/CircularTimer';
import { WaterFill } from '../ui/WaterFill';
import { Hint } from '../ui/Hint';

const ACTION_LABEL = {
  pour: 'VIERTE',
  swirl: 'SWIRL',
  rao: 'RAO SPIN',
  drain: 'DRAWDOWN',
};

// Mapeo acción → entrada del glosario (cuando aplica).
// Para `pour` distinguimos bloom (primer vertido) del resto.
function actionHintTerm(step, idx) {
  if (!step) return null;
  if (step.action === 'swirl') return 'swirl';
  if (step.action === 'rao') return 'rao';
  if (step.action === 'drain') return 'drawdown';
  if (step.action === 'pour' && (idx === 0 || /bloom/i.test(step.label || ''))) return 'bloom';
  return null;
}

export function BrewRunningScreen({ day, onFinish }) {
  const [elapsed, setElapsed] = useState(0);
  const [phase, setPhase] = useState('running');
  const [voiceOn, setVoiceOn] = useState(true);
  const announcedRef = useRef(new Set());
  const preAnnouncedRef = useRef(new Set());
  const intervalRef = useRef(null);
  const tipTimersRef = useRef([]);
  const spokenTipsRef = useRef(new Set());
  const voiceOnRef = useRef(voiceOn);
  const phaseRef = useRef(phase);

  // Refs en sync para que el callback de los timers tenga el valor más reciente
  // sin reinstalar los timeouts cada vez que cambia voiceOn/phase.
  useEffect(() => { voiceOnRef.current = voiceOn; }, [voiceOn]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const steps = day.steps || [];
  const targetMin = day.targetTime?.[0] || 150;
  const targetMax = day.targetTime?.[1] || 200;

  useEffect(() => {
    if (phase !== 'running') return;
    intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(intervalRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'running') return;
    const justNow = steps.findIndex((s, i) => s.at === elapsed && !announcedRef.current.has(i));
    if (justNow !== -1) {
      announcedRef.current.add(justNow);
      beep(880, 0.2, 0.4);
      if (voiceOn) speak(steps[justNow].label, voiceOn);
    }
  }, [elapsed, phase, steps, voiceOn]);

  useEffect(() => {
    if (phase !== 'running') return;
    const nextIdx = steps.findIndex((s, i) => s.at > elapsed && !announcedRef.current.has(i));
    if (nextIdx !== -1) {
      const next = steps[nextIdx];
      const t = next.at - elapsed;
      if (t === 10 && !preAnnouncedRef.current.has(nextIdx)) {
        preAnnouncedRef.current.add(nextIdx);
        beep(660, 0.15, 0.3);
      }
    }
  }, [elapsed, phase, steps]);

  const currentIdx = (() => {
    let last = 0;
    steps.forEach((s, i) => {
      if (elapsed >= s.at) last = i;
    });
    return last;
  })();
  const currentStep = steps[currentIdx];
  const nextStep = steps[currentIdx + 1];
  const tToNext = nextStep ? nextStep.at - elapsed : null;
  const stepDuration = nextStep ? nextStep.at - currentStep.at : 0;
  const stepProgress = nextStep && stepDuration > 0 ? (elapsed - currentStep.at) / stepDuration : 1;
  const isPour = currentStep?.action === 'pour';
  const inUrgency = tToNext !== null && tToNext <= 5 && tToNext > 0;

  const timeColor = (() => {
    if (elapsed < targetMin) return C.text;
    if (elapsed <= targetMax) return C.success;
    return C.danger;
  })();

  const timeStatus = (() => {
    if (elapsed < targetMin) return 'En progreso';
    if (elapsed <= targetMax) return 'Rango óptimo';
    return 'Drawdown largo';
  })();

  const togglePause = () => setPhase((p) => (p === 'running' ? 'paused' : 'running'));

  // Scheduler de tips de voz durante los waits del brew.
  // Se reinicia al cambiar de paso. Programa hasta 2 tips por paso (a +8s y +22s)
  // siempre que el paso dure lo suficiente. speakTip() respeta lo que se esté
  // hablando — si voice está ocupada con un anuncio de paso, el tip se descarta.
  useEffect(() => {
    // Limpia los timers del paso anterior
    tipTimersRef.current.forEach((t) => clearTimeout(t));
    tipTimersRef.current = [];

    if (!currentStep || !nextStep) return;
    const stepDur = nextStep.at - currentStep.at;
    if (stepDur < 18) return; // muy corto, no programa tips

    const fireTip = () => {
      if (phaseRef.current !== 'running' || !voiceOnRef.current) return;
      const pool = [...(TIPS[currentStep.action] || []), ...TIPS.general];
      const unspoken = pool.filter((t) => !spokenTipsRef.current.has(t));
      const list = unspoken.length > 0 ? unspoken : pool;
      const tip = list[Math.floor(Math.random() * list.length)];
      spokenTipsRef.current.add(tip);
      speakTip(tip, voiceOnRef.current);
    };

    // Primer tip a +8s. Margen suficiente tras el anuncio del paso.
    tipTimersRef.current.push(setTimeout(fireTip, 8000));

    // Segundo tip a +22s si el paso es lo bastante largo
    // (deja 8s de margen antes del pre-anuncio a -10s del siguiente).
    if (stepDur >= 30) {
      tipTimersRef.current.push(setTimeout(fireTip, 22000));
    }

    return () => {
      tipTimersRef.current.forEach((t) => clearTimeout(t));
      tipTimersRef.current = [];
    };
  }, [currentIdx, currentStep, nextStep]);

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '2px', fontWeight: 700 }}>
            DÍA {day.num}
          </div>
          <div style={{ fontSize: 12, color: C.textMute, fontWeight: 600, marginTop: 2 }}>
            {day.title}
          </div>
        </div>
        <button
          onClick={() => setVoiceOn((v) => !v)}
          style={{
            padding: '8px 14px',
            borderRadius: 14,
            background: C.surface,
            boxShadow: voiceOn ? C.shadowInSoft : C.shadowOutSoft,
            border: 'none',
            color: voiceOn ? C.text : C.textFaint,
            cursor: 'pointer',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '1.5px',
          }}
        >
          {voiceOn ? 'VOZ' : 'MUDO'}
        </button>
      </div>

      {/* Tiempo total + estado */}
      <div style={{ textAlign: 'center', padding: '6px 20px 12px' }}>
        <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '2.5px', fontWeight: 700, marginBottom: 2 }}>
          TIEMPO TOTAL · OBJETIVO {formatTime(targetMin)}–{formatTime(targetMax)}
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 300,
            color: timeColor,
            letterSpacing: '-1.5px',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1,
            transition: 'color 0.4s ease',
          }}
        >
          {formatTime(elapsed)}
        </div>
        <div
          style={{
            fontSize: 9,
            color: timeColor,
            marginTop: 4,
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            transition: 'color 0.4s ease',
          }}
        >
          {timeStatus}
        </div>
      </div>

      {/* Timer circular (foco principal) */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 20px 20px' }}>
        {nextStep ? (
          <CircularTimer
            progress={stepProgress}
            remaining={tToNext}
            size={260}
            dangerAt={5}
          >
            {/* Capa de agua para pasos de vertido */}
            {isPour && <WaterFill progress={stepProgress} size={232} urgency={inUrgency} />}

            {/* Contenido central */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 24px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: '2.5px',
                  fontWeight: 700,
                  color: inUrgency ? '#FFF' : isPour ? '#FFF' : C.textFaint,
                  textShadow: isPour ? '0 1px 2px rgba(30,90,143,0.4)' : 'none',
                  marginBottom: 4,
                }}
              >
                {ACTION_LABEL[currentStep.action] || 'PASO'}
              </div>
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 200,
                  letterSpacing: '-3px',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1,
                  color: inUrgency ? '#FFF' : isPour ? '#FFF' : C.text,
                  textShadow: isPour ? '0 1px 3px rgba(30,90,143,0.5)' : 'none',
                  transition: 'color 0.35s ease',
                }}
              >
                {tToNext}s
              </div>
              {currentStep.water && (
                <div
                  style={{
                    fontSize: 11,
                    marginTop: 6,
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    color: isPour ? '#FFF' : C.textMute,
                    textShadow: isPour ? '0 1px 2px rgba(30,90,143,0.4)' : 'none',
                  }}
                >
                  hasta {currentStep.water} g
                </div>
              )}
            </div>
          </CircularTimer>
        ) : (
          /* Drawdown: sin nextStep, mostramos placa */
          <div
            style={{
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: C.surface,
              boxShadow: C.shadowOut,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <div style={{ fontSize: 9, letterSpacing: '3px', fontWeight: 700, color: C.accent }}>
              DRAWDOWN
            </div>
            <div style={{ fontSize: 14, color: C.textMute, fontWeight: 600 }}>
              Espera última gota
            </div>
          </div>
        )}
      </div>

      {/* Etiqueta completa del paso actual */}
      {currentStep && (
        <div style={{ padding: '0 20px 12px' }}>
          <div
            style={{
              background: C.surface,
              boxShadow: C.shadowOutSoft,
              borderRadius: 18,
              padding: '14px 18px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 9, letterSpacing: '2.5px', color: C.textFaint, fontWeight: 700, marginBottom: 4 }}>
              AHORA · PASO {currentIdx + 1} DE {steps.length}
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.text, lineHeight: 1.3, letterSpacing: '-0.2px' }}>
              {currentStep.label}
            </div>
            {actionHintTerm(currentStep, currentIdx) && (
              <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, color: C.pour, fontWeight: 600 }}>
                  <Hint term={actionHintTerm(currentStep, currentIdx)}>¿Qué es esto?</Hint>
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Vista previa del siguiente paso */}
      <div style={{ padding: '0 20px', flex: 1 }}>
        {nextStep && tToNext !== null && tToNext <= 10 && tToNext > 0 && (
          <div
            key={`prep-${currentIdx + 1}`}
            style={{
              background: C.surface,
              boxShadow: C.shadowInSoft,
              borderRadius: 18,
              padding: '12px 16px',
              animation: 'softPulse 1.2s ease-in-out infinite',
            }}
          >
            <div style={{ fontSize: 9, letterSpacing: '2.5px', color: C.warn, fontWeight: 700 }}>
              PREPÁRATE EN {tToNext}s
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 3, lineHeight: 1.3, color: C.text }}>
              {nextStep.label}
            </div>
          </div>
        )}

        {nextStep && tToNext > 10 && (
          <div
            key={`ghost-${currentIdx + 1}`}
            style={{
              background: C.surface,
              boxShadow: C.shadowOutSoft,
              borderRadius: 18,
              padding: '12px 16px',
              animation: 'fadeInFromBottom 0.5s ease',
              opacity: 0.75,
            }}
          >
            <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '2.5px', fontWeight: 700 }}>
              SIGUIENTE
            </div>
            <div style={{ fontSize: 13, color: C.textMute, fontWeight: 600, marginTop: 3, lineHeight: 1.3 }}>
              {nextStep.label}
            </div>
          </div>
        )}
      </div>

      {/* Acciones */}
      <div style={{ padding: '16px 20px 20px', display: 'flex', gap: 10 }}>
        <button
          onClick={togglePause}
          style={{
            flex: 1,
            padding: '16px 0',
            borderRadius: 16,
            background: C.surface,
            boxShadow: phase === 'paused' ? C.shadowInSoft : C.shadowOutSoft,
            border: 'none',
            color: C.text,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '2px',
            cursor: 'pointer',
            transition: 'box-shadow 0.18s',
          }}
        >
          {phase === 'paused' ? 'REANUDAR' : 'PAUSA'}
        </button>
        <button
          onClick={() => onFinish(elapsed)}
          style={{
            flex: 1.5,
            padding: '16px 0',
            borderRadius: 16,
            background: C.accent,
            border: 'none',
            color: '#FFF',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '2px',
            cursor: 'pointer',
            boxShadow: '6px 6px 14px rgba(168,142,113,0.4), -6px -6px 14px rgba(255,255,255,0.9)',
          }}
        >
          TERMINAR
        </button>
      </div>
    </div>
  );
}
