import { useState, useRef } from 'react';
import { ChevronLeft, BookOpen, Target, Mic, MicOff, Check } from 'lucide-react';
import { C } from '../../styles/colors';
import { GlassCard } from '../ui/GlassCard';
import { CarouselScreen } from './CarouselScreen';

export function NonBrewScreen({ day, onBack, onComplete }) {
  const [phase, setPhase] = useState('carousel');
  const [notes, setNotes] = useState('');
  const [isDictating, setIsDictating] = useState(false);
  const recognitionRef = useRef(null);

  const toggleDictation = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert('Tu navegador no soporta dictado por voz.');
      return;
    }
    if (isDictating) {
      recognitionRef.current?.stop();
      setIsDictating(false);
      return;
    }
    const rec = new SR();
    rec.lang = 'es-ES';
    rec.interimResults = true;
    rec.continuous = true;
    let baseText = notes;
    rec.onresult = (e) => {
      let interim = '';
      let finalT = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalT += t;
        else interim += t;
      }
      if (finalT) {
        baseText = (baseText + ' ' + finalT).trim();
        setNotes(baseText);
      } else if (interim) {
        setNotes((baseText + ' ' + interim).trim());
      }
    };
    rec.onerror = () => setIsDictating(false);
    rec.onend = () => setIsDictating(false);
    recognitionRef.current = rec;
    rec.start();
    setIsDictating(true);
  };

  if (phase === 'carousel') {
    return <CarouselScreen day={day} onBack={onBack} onContinue={() => setPhase('exercise')} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bgGradient, padding: 20, paddingBottom: 32 }}>
      <button
        onClick={() => setPhase('carousel')}
        style={{ background: 'transparent', border: 'none', color: C.textMute, fontSize: 13, padding: 8, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
      >
        <ChevronLeft size={18} /> Volver
      </button>

      <div style={{ fontSize: 10, letterSpacing: '3px', color: C.accent, fontWeight: 700 }}>
        DÍA {day.num} · {day.phase.toUpperCase()}
      </div>
      <h2 style={{ color: C.text, fontSize: 26, fontWeight: 700, marginTop: 6, letterSpacing: '-0.5px', lineHeight: 1.15 }}>
        {day.title}
      </h2>

      <GlassCard strong style={{ padding: 20, marginTop: 18, borderLeft: `4px solid ${day.type === 'taste' ? C.warn : C.accent}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          {day.type === 'taste' ? (
            <BookOpen size={16} style={{ color: C.warn }} />
          ) : (
            <Target size={16} style={{ color: C.accent }} />
          )}
          <span style={{ fontSize: 10, letterSpacing: '2px', color: day.type === 'taste' ? C.warn : C.accent, fontWeight: 700 }}>
            {day.type === 'taste' ? 'EJERCICIO DE CATA' : 'EJERCICIO DE REFLEXIÓN'}
          </span>
        </div>
        <p style={{ color: C.text, fontSize: 15, lineHeight: 1.6 }}>{day.objective}</p>
      </GlassCard>

      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: '2px', fontWeight: 700, marginBottom: 8 }}>
          TUS NOTAS
        </div>
        <div style={{ position: 'relative' }}>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={day.type === 'taste' ? '¿Qué notas a cada temperatura?' : 'Reflexiones, decisiones, preguntas...'}
            rows={9}
            style={{
              width: '100%',
              padding: '16px 60px 16px 16px',
              background: C.glassStrong,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${isDictating ? C.accent : C.glassBorder}`,
              borderRadius: 20,
              color: C.text,
              fontSize: 14,
              lineHeight: 1.5,
              fontFamily: 'inherit',
              resize: 'none',
              outline: 'none',
              boxShadow: C.shadow,
            }}
          />
          <button
            onClick={toggleDictation}
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: isDictating
                ? `linear-gradient(135deg, ${C.danger}, #EF4444)`
                : `linear-gradient(135deg, ${C.accent}, ${C.accentBright})`,
              border: 'none',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: C.shadowStrong,
              animation: isDictating ? 'softPulse 1.5s infinite' : 'none',
            }}
          >
            {isDictating ? <MicOff size={22} /> : <Mic size={22} />}
          </button>
        </div>
      </div>

      <button
        onClick={() => onComplete({ notes, timestamp: Date.now() })}
        style={{
          width: '100%',
          marginTop: 24,
          background: `linear-gradient(135deg, ${C.success}, #10B981)`,
          border: 'none',
          borderRadius: 20,
          padding: 18,
          color: '#FFF',
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(5,150,105,0.3)',
        }}
      >
        <Check size={20} strokeWidth={3} />
        MARCAR DÍA COMO HECHO
      </button>
    </div>
  );
}
