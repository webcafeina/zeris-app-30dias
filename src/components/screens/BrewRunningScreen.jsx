import { useState, useEffect, useRef } from 'react';
import { C } from '../../styles/colors';
import { formatTime } from '../../lib/format';
import { beep } from '../../lib/audio';
import { speak } from '../../lib/voice';

const tonesForAction = (action) => {
  if (action === 'pour') {
    return {
      currentBg: 'rgba(59, 130, 196, 0.18)',
      currentBorder: 'rgba(59, 130, 196, 0.35)',
      currentText: '#1E5A8F',
      ghostBg: 'rgba(59, 130, 196, 0.08)',
      ghostBorder: 'rgba(59, 130, 196, 0.18)',
      ghostText: '#5A8AB5',
      progress: '#3B82C4',
    };
  }
  return {
    currentBg: 'rgba(60, 36, 21, 0.14)',
    currentBorder: 'rgba(60, 36, 21, 0.28)',
    currentText: '#3C2415',
    ghostBg: 'rgba(60, 36, 21, 0.06)',
    ghostBorder: 'rgba(60, 36, 21, 0.14)',
    ghostText: '#6B5544',
    progress: '#5A3519',
  };
};

export function BrewRunningScreen({ day, onFinish }) {
  const [elapsed, setElapsed] = useState(0);
  const [phase, setPhase] = useState('running');
  const [voiceOn, setVoiceOn] = useState(true);
  const announcedRef = useRef(new Set());
  const preAnnouncedRef = useRef(new Set());
  const intervalRef = useRef(null);

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

  const currentTones = currentStep ? tonesForAction(currentStep.action) : tonesForAction('pour');
  const nextTones = nextStep ? tonesForAction(nextStep.action) : null;

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

  return (
    <div style={{ minHeight: '100vh', background: C.bgGradient, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '14px 20px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            background: voiceOn ? 'rgba(60,36,21,0.08)' : 'rgba(60,40,25,0.03)',
            border: `1px solid ${voiceOn ? 'rgba(60,36,21,0.18)' : C.divider}`,
            color: voiceOn ? C.text : C.textFaint,
            cursor: 'pointer',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '1.5px',
            backdropFilter: 'blur(20px)',
          }}
        >
          {voiceOn ? 'VOZ' : 'MUDO'}
        </button>
      </div>

      <div style={{ textAlign: 'center', padding: '12px 20px 8px' }}>
        <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '2.5px', fontWeight: 700, marginBottom: 2 }}>
          TIEMPO · OBJETIVO {formatTime(targetMin)}–{formatTime(targetMax)}
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 200,
            color: timeColor,
            letterSpacing: '-4px',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 0.95,
          }}
        >
          {formatTime(elapsed)}
        </div>
        <div
          style={{
            fontSize: 11,
            color: timeColor,
            marginTop: 2,
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          {timeStatus}
        </div>
      </div>

      {nextStep && tToNext > 0 && (
        <div style={{ padding: '4px 20px 14px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 9,
              color: C.textFaint,
              letterSpacing: '1.5px',
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            <span>SIGUIENTE EN</span>
            <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: 11, color: tToNext <= 10 ? C.warn : C.textMute }}>
              {tToNext}s
            </span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: 'rgba(60,40,25,0.08)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${Math.max(0, Math.min(100, (1 - stepProgress) * 100))}%`,
                background: tToNext <= 10 ? C.warn : currentTones.progress,
                borderRadius: 2,
                transition: 'width 0.9s linear, background 0.3s',
              }}
            />
          </div>
        </div>
      )}

      <div style={{ padding: '0 20px', position: 'relative' }}>
        {currentStep && (
          <div
            key={`current-${currentIdx}`}
            style={{
              background: currentTones.currentBg,
              backdropFilter: 'blur(24px) saturate(140%)',
              WebkitBackdropFilter: 'blur(24px) saturate(140%)',
              border: `1px solid ${currentTones.currentBorder}`,
              borderRadius: 22,
              padding: '18px 22px',
              boxShadow: C.shadow,
              animation: 'slideDownIn 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ fontSize: 9, letterSpacing: '3px', color: currentTones.currentText, opacity: 0.7, fontWeight: 700 }}>
              AHORA · PASO {currentIdx + 1} DE {steps.length}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginTop: 6, color: currentTones.currentText, letterSpacing: '-0.3px' }}>
              {currentStep.label}
            </div>
            {currentStep.water && (
              <div
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  color: currentTones.currentText,
                  opacity: 0.85,
                  letterSpacing: '0.3px',
                }}
              >
                Báscula · {currentStep.water} g
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ padding: '12px 20px 0', flex: 1 }}>
        {nextStep && tToNext !== null && tToNext <= 10 && tToNext > 0 && (
          <div
            key={`prep-${currentIdx + 1}`}
            style={{
              background: 'rgba(201, 168, 92, 0.20)',
              backdropFilter: 'blur(24px) saturate(140%)',
              WebkitBackdropFilter: 'blur(24px) saturate(140%)',
              border: '1px solid rgba(201, 168, 92, 0.40)',
              borderRadius: 22,
              padding: '14px 20px',
              animation: 'softPulse 1.2s ease-in-out infinite',
            }}
          >
            <div style={{ fontSize: 9, letterSpacing: '3px', color: '#8A7333', fontWeight: 700 }}>
              PREPÁRATE EN {tToNext}s
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4, lineHeight: 1.25, color: '#7A6428' }}>
              {nextStep.label}
            </div>
            {nextStep.water && (
              <div style={{ fontSize: 12, color: '#8A7333', marginTop: 4, fontWeight: 600 }}>
                Báscula · {nextStep.water} g
              </div>
            )}
          </div>
        )}

        {nextStep && tToNext > 10 && nextTones && (
          <div
            key={`ghost-${currentIdx + 1}`}
            style={{
              background: nextTones.ghostBg,
              backdropFilter: 'blur(24px) saturate(120%)',
              WebkitBackdropFilter: 'blur(24px) saturate(120%)',
              border: `1px solid ${nextTones.ghostBorder}`,
              borderRadius: 22,
              padding: '14px 22px',
              animation: 'fadeInFromBottom 0.5s ease',
              boxShadow: C.shadow,
            }}
          >
            <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '2.5px', fontWeight: 700 }}>
              SIGUIENTE
            </div>
            <div style={{ fontSize: 15, color: nextTones.ghostText, fontWeight: 600, marginTop: 4, lineHeight: 1.3 }}>
              {nextStep.label}
            </div>
            {nextStep.water && (
              <div style={{ fontSize: 11, color: nextTones.ghostText, opacity: 0.75, marginTop: 2 }}>
                Báscula · {nextStep.water} g
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ padding: '12px 20px 20px', display: 'flex', gap: 10 }}>
        <button
          onClick={togglePause}
          style={{
            flex: 1,
            padding: '16px 0',
            borderRadius: 16,
            background: C.glassStrong,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${C.glassBorder}`,
            color: C.text,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '2px',
            cursor: 'pointer',
            boxShadow: C.shadow,
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
            background: C.text,
            border: 'none',
            color: '#FFF',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '2px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(60,40,25,0.20)',
          }}
        >
          TERMINAR
        </button>
      </div>
    </div>
  );
}
