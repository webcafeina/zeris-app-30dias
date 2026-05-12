import { useState, useEffect, useRef } from 'react';
import { C } from '../../styles/colors';
import { formatTime } from '../../lib/format';
import { beep } from '../../lib/audio';
import { speak, speakTip } from '../../lib/voice';
import { TIPS } from '../../data/tips';
import {
  buildBrewPlan,
  pourDurationForStep,
  pourAmountForStep,
  actionDurationForStep,
  actionVerb,
} from '../../lib/brewPlan';
import { CircularTimer } from '../ui/CircularTimer';
import { WaterFill } from '../ui/WaterFill';
import { WaterStream } from '../ui/WaterStream';
import { Hint } from '../ui/Hint';

const ACTION_LABEL = {
  dose: 'CAFÉ AL FILTRO',
  pour: 'VIERTE',
  swirl: 'SWIRL',
  rao: 'RAO SPIN',
  drain: 'DRAWDOWN',
};

// Interpolación de azul intenso → azul muy claro según `progress` (0..1).
// Se usa tanto para el stroke del anillo del timer como para el tinte de
// la card "AHORA · PASO" — ambos cambian de color a la vez, transmitiendo
// el paso del tiempo de forma continua y suave en lugar de "el anillo
// se cierra".
function blueShade(progress) {
  const t = Math.max(0, Math.min(1, progress));
  // de #1E5A8F (azul intenso pourDark) a #D5E8F4 (azul muy pálido sky)
  const r = Math.round(30 + (213 - 30) * t);
  const g = Math.round(90 + (232 - 90) * t);
  const b = Math.round(143 + (244 - 143) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

// Versión con alpha para fondos teñidos (cards). Misma curva pero opacidad
// constante baja para que el texto sea legible encima.
function blueTintBg(progress, alpha = 0.16) {
  const t = Math.max(0, Math.min(1, progress));
  const r = Math.round(30 + (213 - 30) * t);
  const g = Math.round(90 + (232 - 90) * t);
  const b = Math.round(143 + (244 - 143) * t);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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

  // El plan real arranca con un paso "DOSIS" sintético de 10s para que el
  // usuario meta el café molido en el filtro antes del bloom. Sin esto,
  // quien dispare el cronómetro sin café puesto pierde el momento del bloom.
  const { steps, targetMin, targetMax } = buildBrewPlan(day);

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
  // Toda la cromática del brew gira en torno al azul agua, sin rojo.
  // Card y anillo comparten el mismo azul; lo que cambia con el tiempo
  // es la OPACIDAD: en los últimos 5s, ambos se desvanecen hasta confundirse
  // con el fondo, justo antes de que la siguiente card aparezca con un rebote.
  const FADE_AT = 5;
  const fadeFactor =
    tToNext !== null && tToNext !== undefined && tToNext <= FADE_AT && tToNext >= 0
      ? Math.max(0, tToNext / FADE_AT)
      : 1;
  const cardTintBg = `rgba(91, 160, 217, ${0.18 * fadeFactor})`; // C.pour con alpha que también se desvanece

  // Sub-timer de la acción del paso: cuántos segundos debe durar el ACTO
  // (verter, swirl, rao spin, echar café al filtro). Distinto del hueco
  // hasta el siguiente paso. Una vez agotado, la etiqueta del timer pasa
  // a "ESPERA" y, en el caso del pour, el agua se queda estática.
  const actionDuration = actionDurationForStep(steps, currentIdx);
  const pourDuration = isPour ? actionDuration : 0;
  const pourAmount = pourAmountForStep(steps, currentIdx);
  const elapsedInStep = currentStep ? Math.max(0, elapsed - currentStep.at) : 0;
  const actionLeft = Math.max(0, actionDuration - elapsedInStep);
  const actionProgress = actionDuration > 0 ? Math.min(1, elapsedInStep / actionDuration) : 1;
  const stillActing = actionDuration > 0 && actionLeft > 0;
  // Aliases por compatibilidad con la UI del WaterFill y el chorrito
  // (que solo deben renderizarse durante el acto de verter).
  const pourLeft = isPour ? actionLeft : 0;
  const pourProgress = isPour ? actionProgress : 1;
  const stillPouring = isPour && stillActing;
  // inUrgency conservada por compat con plantillas pre-existentes; toda
  // la lógica de color rojo se ha retirado.
  const inUrgency = false;

  // Cuando estamos en drawdown (no hay nextStep) y el tiempo total ha
  // superado el rango objetivo, asumimos que el café ya ha terminado de
  // gotear y avisamos al usuario para que toque "Terminar".
  const inDrawdown = !nextStep;
  const drawdownDone = inDrawdown && elapsed > targetMax;
  const drawdownAnnouncedRef = useRef(false);

  useEffect(() => {
    if (drawdownDone && !drawdownAnnouncedRef.current) {
      drawdownAnnouncedRef.current = true;
      if (voiceOn) speak('Pulsa en Terminar', voiceOn);
      beep(880, 0.25, 0.4);
    }
    // Si por alguna razón salimos del drawdown (raro), reseteamos.
    if (!inDrawdown) drawdownAnnouncedRef.current = false;
  }, [drawdownDone, inDrawdown, voiceOn]);

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

      {/* Timer único (ESPERA) con la animación del agua dentro, sincronizada
          al vertido. Sobre el ring cae un chorrito mientras se vierte.
          - Anillo: cuenta atrás hasta el siguiente paso (tToNext).
          - WaterFill: sube de 0 a 100% durante pourDuration y se queda
            quieto al terminar el vertido (active=false freezing).
          - WaterStream: gotas cayendo, solo mientras stillPouring.
          Padding-top generoso para que el chorrito tenga aire sobre el
          ring y no clipe contra el tiempo total. */}
      <div style={{ padding: '60px 20px 30px' }}>
        {nextStep ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <WaterStream active={stillPouring} />
              <CircularTimer
                progress={stepProgress}
                remaining={tToNext}
                size={240}
                stroke={13}
                dangerAt={5}
                noDrain
              >
                {isPour && pourDuration > 0 && (
                  <WaterFill
                    progress={pourProgress}
                    size={212}
                    active={stillPouring}
                  />
                )}
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
                    padding: '0 18px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      letterSpacing: '2.5px',
                      fontWeight: 700,
                      color: isPour && pourProgress > 0.15 ? '#FFF' : C.textFaint,
                      textShadow: isPour && pourProgress > 0.15 ? '0 1px 2px rgba(30,90,143,0.4)' : 'none',
                      marginBottom: 4,
                      textTransform: 'uppercase',
                    }}
                  >
                    {actionDuration > 0
                      ? (stillActing
                          ? (ACTION_LABEL[currentStep?.action] || 'Paso')
                          : 'ESPERA')
                      : (ACTION_LABEL[currentStep?.action] || 'Paso')}
                  </div>
                  <div
                    style={{
                      fontSize: 56,
                      fontWeight: 200,
                      letterSpacing: '-2.5px',
                      lineHeight: 1,
                      color: isPour && pourProgress > 0.3 ? '#FFF' : C.text,
                      textShadow: isPour && pourProgress > 0.3 ? '0 1px 3px rgba(30,90,143,0.5)' : 'none',
                      fontVariantNumeric: 'tabular-nums',
                      transition: 'color 0.35s ease',
                    }}
                  >
                    {tToNext}s
                  </div>
                  {stillActing && actionLeft > 0 && (
                    <div
                      style={{
                        fontSize: 11,
                        marginTop: 5,
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        color: stillPouring ? '#FFF' : C.text,
                        textShadow: stillPouring ? '0 1px 2px rgba(30,90,143,0.4)' : 'none',
                      }}
                    >
                      {actionVerb(currentStep?.action)} · {actionLeft}s
                      {isPour && pourAmount > 0 ? ` · ${pourAmount} g` : ''}
                    </div>
                  )}
                  {!stillPouring && currentStep?.water && isPour && (
                    <div
                      style={{
                        fontSize: 10,
                        marginTop: 5,
                        fontWeight: 600,
                        letterSpacing: '0.3px',
                        color: '#FFF',
                        textShadow: '0 1px 2px rgba(30,90,143,0.4)',
                      }}
                    >
                      hasta {currentStep.water} g de agua
                    </div>
                  )}
                </div>
              </CircularTimer>
            </div>
          </div>
        ) : (
          /* Drawdown: sin nextStep, mostramos placa centrada.
             Cuando el café deja de gotear (elapsed > targetMax) la voz
             anuncia "Pulsa en Terminar" y el texto cambia para reforzarlo. */
          <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                gap: 8,
                padding: '0 30px',
                textAlign: 'center',
                animation: drawdownDone ? 'cardPum 0.55s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                transition: 'box-shadow 0.4s ease',
              }}
            >
              <div style={{ fontSize: 9, letterSpacing: '3px', fontWeight: 700, color: C.text }}>
                {drawdownDone ? 'CAFÉ LISTO' : 'DRAWDOWN'}
              </div>
              <div style={{ fontSize: drawdownDone ? 17 : 14, color: drawdownDone ? C.text : C.textMute, fontWeight: drawdownDone ? 700 : 600, lineHeight: 1.25, letterSpacing: drawdownDone ? '-0.2px' : 0 }}>
                {drawdownDone ? 'Pulsa en TERMINAR' : 'Espera la última gota'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Etiqueta completa del paso actual. Tinte azul que va de intenso →
          claro siguiendo stepProgress, igual que el anillo del timer.
          Cuando cambia el paso, la card se remonta (key={currentIdx})
          con animación "pum" para que el usuario perciba el salto. */}
      {currentStep && (
        <div style={{ padding: '0 20px 12px' }}>
          <div
            key={currentIdx}
            style={{
              background: cardTintBg,
              boxShadow: C.shadowOutSoft,
              borderRadius: 18,
              padding: '14px 18px',
              textAlign: 'center',
              animation: 'cardPum 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
              transition: 'background 0.9s linear, opacity 0.9s linear',
              // La card se mantiene visible al 100% hasta los últimos 5s
              // del paso; en esos 5s su opacidad cae linealmente a 0 (se
              // confunde con el fondo), justo antes de que la siguiente
              // card aparezca con un rebote.
              opacity: fadeFactor,
            }}
          >
            <div style={{ fontSize: 9, letterSpacing: '2.5px', color: C.textMute, fontWeight: 700, marginBottom: 4 }}>
              AHORA · PASO {currentIdx + 1} DE {steps.length}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, lineHeight: 1.3, letterSpacing: '-0.2px' }}>
              {currentStep.label}
            </div>
            {actionHintTerm(currentStep, currentIdx) && (
              <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, color: C.pourDark, fontWeight: 600 }}>
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
            boxShadow: C.shadowStrong,
          }}
        >
          TERMINAR
        </button>
      </div>
    </div>
  );
}
