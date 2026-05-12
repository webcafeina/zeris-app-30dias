import { useState, useEffect } from 'react';
import { C } from '../../styles/colors';
import { beep } from '../../lib/audio';
import { speak } from '../../lib/voice';

export function CountdownScreen({ onDone, voiceOn = true }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      beep(880, 0.3, 0.5);
      speak('Empezamos', voiceOn);
      const t = setTimeout(onDone, 800);
      return () => clearTimeout(t);
    }
    beep(660, 0.15, 0.3);
    speak(count.toString(), voiceOn);
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onDone, voiceOn]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: C.bgGradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontSize: 200,
          fontWeight: 200,
          color: C.accent,
          letterSpacing: '-10px',
          lineHeight: 1,
          textAlign: 'center',
          animation: 'softPulse 1s ease-in-out',
        }}
      >
        {count || '¡YA!'}
      </div>
    </div>
  );
}
