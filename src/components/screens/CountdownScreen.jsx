import { useState, useEffect } from 'react';
import { C } from '../../styles/colors';
import { beep } from '../../lib/audio';
import { speak } from '../../lib/voice';
import { CircularTimer } from '../ui/CircularTimer';

const TOTAL = 3;

export function CountdownScreen({ onDone, voiceOn = true }) {
  const [count, setCount] = useState(TOTAL);

  useEffect(() => {
    if (count === 0) {
      beep(880, 0.3, 0.5);
      speak('Empecemos a hacer café', voiceOn);
      const t = setTimeout(onDone, 1400);
      return () => clearTimeout(t);
    }
    beep(660, 0.15, 0.3);
    speak(count.toString(), voiceOn);
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onDone, voiceOn]);

  const elapsed = TOTAL - count;
  const progress = elapsed / TOTAL;
  const isGo = count === 0;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: C.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: '3px',
          color: C.textFaint,
          fontWeight: 700,
          textTransform: 'uppercase',
        }}
      >
        Preparado en
      </div>

      <CircularTimer progress={progress} remaining={count} dangerAt={1} size={280}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: C.text,
            transition: 'color 0.35s ease',
            padding: '0 24px',
            textAlign: 'center',
          }}
        >
          {isGo ? (
            <>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 200,
                  letterSpacing: '-0.5px',
                  lineHeight: 1.05,
                  marginBottom: 4,
                }}
              >
                Empecemos
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                  lineHeight: 1.05,
                }}
              >
                a hacer café
              </div>
            </>
          ) : (
            <div
              style={{
                fontSize: 140,
                fontWeight: 200,
                letterSpacing: '-8px',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {count}
            </div>
          )}
        </div>
      </CircularTimer>
    </div>
  );
}
