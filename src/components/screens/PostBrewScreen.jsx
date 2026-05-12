import { useState, useRef } from 'react';
import { Sparkles, AlertTriangle, BookOpen, ChevronLeft, Lightbulb, Mic, MicOff, Check, Repeat, Camera, Copy, Instagram } from 'lucide-react';
import { C } from '../../styles/colors';
import { formatTime } from '../../lib/format';
import { diagnose } from '../../lib/diagnose';
import { TASTE_ATTRS, DEFECTS } from '../../data/taste';
import { ZERIS } from '../../data/zerisInfo';
import { GlassCard } from '../ui/GlassCard';
import { TasteSlider } from '../ui/TasteSlider';

// Caption pre-generado para que la persona pueda copiarlo y pegarlo al subir
// la foto de su brew a Instagram. Incluye etiquetado del roaster + hashtag
// del reto + contexto del día.
function buildShareCaption(day) {
  const lines = [
    `Día ${day.num} del reto de 30 días con OREA · ${day.title}`,
    '',
    `Ratio ${day.ratio} · ${day.coffee} g · ${day.water} g · ${day.temp} °C`,
    '',
    'Aprendiendo café de especialidad con el método paso a paso de @zeriscoffeeroaster.',
    '',
    '#RetoZerisCoffee #ZerisCoffee #cafedeespecialidad',
  ];
  return lines.join('\n');
}

export function PostBrewScreen({ day, elapsed, onComplete, onRepeatLater, onRepeatNow }) {
  const [phase, setPhase] = useState('summary');
  const [tasteAttrs, setTasteAttrs] = useState({ dulzor: 5, acidez: 5, amargor: 5, cuerpo: 5 });
  const [tasteDefects, setTasteDefects] = useState({});
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [isDictating, setIsDictating] = useState(false);
  const [captionCopied, setCaptionCopied] = useState(false);
  const recognitionRef = useRef(null);

  const shareCaption = buildShareCaption(day);

  const copyCaption = async () => {
    try {
      await navigator.clipboard.writeText(shareCaption);
      setCaptionCopied(true);
      setTimeout(() => setCaptionCopied(false), 2500);
    } catch (e) {
      console.warn('Clipboard no disponible:', e);
    }
  };

  const targetMin = day.targetTime?.[0] || 150;
  const targetMax = day.targetTime?.[1] || 200;

  const timeColor = elapsed < targetMin ? C.accentBright : elapsed <= targetMax ? C.success : C.danger;

  const toggleDictation = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert('Tu navegador no soporta dictado por voz. Prueba en Chrome móvil.');
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

  const diagnosis =
    phase === 'diagnosis' || phase === 'notes'
      ? diagnose({ elapsed, targetMin, targetMax, attrs: tasteAttrs, defects: tasteDefects })
      : null;

  const finish = () => {
    onComplete({ elapsed, tasteAttrs, tasteDefects, rating, notes, diagnosis, timestamp: Date.now() });
  };

  if (phase === 'summary') {
    return (
      <div style={{ minHeight: '100vh', background: C.bgGradient, padding: 20 }}>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Sparkles size={32} style={{ color: C.accent, marginBottom: 8 }} />
          <h2 style={{ color: C.text, fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px' }}>
            ¡Extracción terminada!
          </h2>
        </div>

        <GlassCard strong style={{ padding: 24, marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 10, letterSpacing: '3px', color: C.textFaint, fontWeight: 700 }}>
            TIEMPO FINAL DE EXTRACCIÓN
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 200,
              color: timeColor,
              letterSpacing: '-2px',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
              marginTop: 8,
            }}
          >
            {formatTime(elapsed)}
          </div>
          <div style={{ fontSize: 12, color: C.textFaint, marginTop: 8 }}>
            Rango objetivo: {formatTime(targetMin)} – {formatTime(targetMax)}
          </div>

          {elapsed > targetMax && (
            <div style={{ marginTop: 18, padding: 14, borderRadius: 14, background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <AlertTriangle size={16} style={{ color: C.danger, marginTop: 2, flexShrink: 0 }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: C.danger, fontSize: 11, fontWeight: 700, letterSpacing: '1px' }}>
                    DRAWDOWN LARGO · {elapsed - targetMax}s POR ENCIMA
                  </div>
                  <div style={{ color: C.text, fontSize: 13, marginTop: 4, lineHeight: 1.4 }}>
                    Probable sobreextracción. Cata el café para diagnosticar bien las causas.
                  </div>
                </div>
              </div>
            </div>
          )}
          {elapsed < targetMin && (
            <div style={{ marginTop: 18, padding: 14, borderRadius: 14, background: C.surfaceMute, border: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <AlertTriangle size={16} style={{ color: C.warn, marginTop: 2, flexShrink: 0 }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: C.warn, fontSize: 11, fontWeight: 700, letterSpacing: '1px' }}>
                    DRAWDOWN CORTO · {targetMin - elapsed}s POR DEBAJO
                  </div>
                  <div style={{ color: C.text, fontSize: 13, marginTop: 4, lineHeight: 1.4 }}>
                    Probable subextracción. Cata para confirmar.
                  </div>
                </div>
              </div>
            </div>
          )}
          {elapsed >= targetMin && elapsed <= targetMax && (
            <div style={{ marginTop: 18, padding: 14, borderRadius: 14, background: C.surfaceMute, border: `1px solid ${C.border}`, textAlign: 'left' }}>
              <div style={{ color: C.success, fontSize: 13, fontWeight: 600 }}>
                ✓ Tiempo en rango óptimo. Ahora la cata confirmará si molienda y temperatura son correctas.
              </div>
            </div>
          )}
        </GlassCard>

        <button
          onClick={() => setPhase('tasting')}
          style={{
            width: '100%',
            marginTop: 20,
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentBright})`,
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
            boxShadow: C.shadowStrong,
          }}
        >
          <BookOpen size={20} />
          VAMOS A CATAR
        </button>

        <button
          onClick={onRepeatNow}
          style={{
            width: '100%',
            marginTop: 10,
            background: 'transparent',
            border: 'none',
            color: C.textMute,
            fontSize: 13,
            padding: 10,
            cursor: 'pointer',
          }}
        >
          Repetir extracción ahora
        </button>
      </div>
    );
  }

  if (phase === 'tasting') {
    return (
      <div style={{ minHeight: '100vh', background: C.bgGradient, padding: 20, paddingBottom: 32 }}>
        <button
          onClick={() => setPhase('summary')}
          style={{ background: 'transparent', border: 'none', color: C.textMute, fontSize: 13, padding: 8, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
        >
          <ChevronLeft size={18} /> Volver
        </button>

        <h2 style={{ color: C.text, fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 6 }}>
          ¿Cómo te ha quedado?
        </h2>
        <p style={{ color: C.textMute, fontSize: 13, marginBottom: 24, lineHeight: 1.5 }}>
          Sé honesto. La intensidad importa más que si está «bien» o «mal».
        </p>

        {TASTE_ATTRS.map((attr) => (
          <TasteSlider
            key={attr.key}
            attr={attr}
            value={tasteAttrs[attr.key]}
            onChange={(v) => setTasteAttrs((prev) => ({ ...prev, [attr.key]: v }))}
          />
        ))}

        <div style={{ marginTop: 12, marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: '2px', fontWeight: 700 }}>
            ¿DETECTAS ALGÚN DEFECTO?
          </div>
          <div style={{ fontSize: 12, color: C.textFaint, marginTop: 4 }}>
            Marca los que apliquen (puedes marcar varios o ninguno).
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
          {DEFECTS.map((d) => {
            const active = !!tasteDefects[d.key];
            return (
              <button
                key={d.key}
                onClick={() => setTasteDefects((prev) => ({ ...prev, [d.key]: !prev[d.key] }))}
                style={{
                  padding: '12px 14px',
                  textAlign: 'left',
                  background: active ? 'rgba(220,38,38,0.1)' : C.glassStrong,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${active ? C.danger : C.glassBorder}`,
                  borderRadius: 14,
                  color: active ? C.danger : C.textMute,
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  boxShadow: C.shadow,
                  transition: 'all 0.2s',
                }}
              >
                {active && '✓ '}
                {d.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: '2px', fontWeight: 700, marginBottom: 8 }}>
            VALORACIÓN GLOBAL
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setRating(n)}
                style={{
                  flex: 1,
                  padding: '14px 0',
                  borderRadius: 14,
                  background: rating >= n ? `linear-gradient(135deg, ${C.accent}, ${C.accentBright})` : C.glassStrong,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${rating >= n ? 'transparent' : C.glassBorder}`,
                  color: rating >= n ? '#FFF' : C.textFaint,
                  fontSize: 20,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: C.shadow,
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setPhase('diagnosis')}
          style={{
            width: '100%',
            marginTop: 28,
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentBright})`,
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
            boxShadow: C.shadowStrong,
          }}
        >
          <Lightbulb size={20} />
          VER DIAGNÓSTICO
        </button>
      </div>
    );
  }

  if (phase === 'diagnosis' && diagnosis) {
    return (
      <div style={{ minHeight: '100vh', background: C.bgGradient, padding: 20, paddingBottom: 32 }}>
        <button
          onClick={() => setPhase('tasting')}
          style={{ background: 'transparent', border: 'none', color: C.textMute, fontSize: 13, padding: 8, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
        >
          <ChevronLeft size={18} /> Volver
        </button>

        <div style={{ fontSize: 10, letterSpacing: '3px', color: C.accent, fontWeight: 700 }}>
          DIAGNÓSTICO DE LA TAZA
        </div>
        <h2 style={{ color: C.text, fontSize: 24, fontWeight: 700, marginTop: 6, letterSpacing: '-0.5px', lineHeight: 1.15 }}>
          {diagnosis.findings.some((f) => f.severity === 'high')
            ? 'Hay margen de mejora claro'
            : diagnosis.findings.some((f) => f.severity === 'medium')
              ? 'Pequeños ajustes'
              : '✓ Bien ejecutado'}
        </h2>

        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 10, letterSpacing: '2px', color: C.textFaint, fontWeight: 700, marginBottom: 10 }}>
            QUÉ HA PASADO
          </div>
          {diagnosis.findings.map((f, i) => {
            const c = f.severity === 'high' ? C.danger : f.severity === 'medium' ? C.warn : C.success;
            return (
              <GlassCard key={i} strong style={{ padding: 14, marginBottom: 10, borderLeft: `4px solid ${c}` }}>
                <div style={{ color: c, fontSize: 10, fontWeight: 700, letterSpacing: '1.5px' }}>
                  {f.type === 'time' ? '⏱ TIEMPO' : f.type === 'taste' ? '👅 PERFIL' : '⚠ DEFECTO'}
                </div>
                <div style={{ color: C.text, fontSize: 13.5, marginTop: 5, lineHeight: 1.45 }}>{f.text}</div>
              </GlassCard>
            );
          })}
        </div>

        {diagnosis.actions.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: '2px', color: C.accent, fontWeight: 700, marginBottom: 10 }}>
              QUÉ HACER MAÑANA
            </div>
            <GlassCard strong style={{ padding: 18 }}>
              <ol style={{ margin: 0, paddingLeft: 18 }}>
                {diagnosis.actions.map((a, i) => (
                  <li key={i} style={{ color: C.text, fontSize: 13.5, lineHeight: 1.55, marginBottom: 8 }}>
                    {a}
                  </li>
                ))}
              </ol>
            </GlassCard>
          </div>
        )}

        <button
          onClick={() => setPhase('notes')}
          style={{
            width: '100%',
            marginTop: 24,
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentBright})`,
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
            boxShadow: C.shadowStrong,
          }}
        >
          <BookOpen size={20} />
          AÑADIR NOTAS
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bgGradient, padding: 20, paddingBottom: 32 }}>
      <button
        onClick={() => setPhase('diagnosis')}
        style={{ background: 'transparent', border: 'none', color: C.textMute, fontSize: 13, padding: 8, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
      >
        <ChevronLeft size={18} /> Volver
      </button>

      <div style={{ fontSize: 10, letterSpacing: '3px', color: C.accent, fontWeight: 700 }}>
        CUADERNO DE CATA
      </div>
      <h2 style={{ color: C.text, fontSize: 24, fontWeight: 700, marginTop: 6, letterSpacing: '-0.5px' }}>
        Añade lo que quieras recordar
      </h2>
      <p style={{ color: C.textMute, fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>
        Tu cata, tiempo, defectos y recomendaciones ya están guardados. Aquí puedes añadir lo que falte — texto libre o por voz.
      </p>

      <div style={{ position: 'relative', marginTop: 18 }}>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Origen del café, sensaciones, comparaciones..."
          rows={7}
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
            boxShadow: isDictating ? '0 0 0 4px rgba(201,82,82,0.18)' : C.shadowStrong,
            animation: isDictating ? 'softPulse 1.5s infinite' : 'none',
          }}
        >
          {isDictating ? <MicOff size={22} /> : <Mic size={22} />}
        </button>
      </div>
      <div style={{ fontSize: 11, color: isDictating ? C.accent : C.textFaint, marginTop: 8, fontWeight: isDictating ? 700 : 400 }}>
        {isDictating ? '● Escuchando... toca para parar' : 'Toca el micro para dictar por voz'}
      </div>

      {/* Comparte tu cafetazo: pre-rellena el caption para Instagram con el
          handle de Zeri's + hashtag del reto. Un toque copia el texto al
          portapapeles; otro abre Instagram para pegarlo al subir la foto. */}
      <div
        style={{
          marginTop: 24,
          background: C.surface,
          borderRadius: 18,
          padding: 18,
          boxShadow: C.shadowOutSoft,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Camera size={16} style={{ color: C.text }} />
          <span style={{ fontSize: 10, letterSpacing: '2.5px', color: C.text, fontWeight: 700, textTransform: 'uppercase' }}>
            Comparte tu cafetazo
          </span>
        </div>

        <p style={{ fontSize: 13, color: C.textMute, lineHeight: 1.55, margin: 0, marginBottom: 12 }}>
          Haz una foto a tu taza, al bloom, a la cafetera o al café que has usado. Etiqueta a Zeri's y suma para tu descuento del reto.
        </p>

        <pre
          style={{
            fontSize: 12,
            lineHeight: 1.5,
            color: C.text,
            background: C.surfaceMute,
            borderRadius: 12,
            padding: '12px 14px',
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontFamily: 'inherit',
            border: `1px solid ${C.border}`,
          }}
        >
          {shareCaption}
        </pre>

        {/* Toast persistente de confirmación. Aparece durante 2.5s tras copiar
            para que quede inequívocamente claro que el texto está en el
            portapapeles y se puede pegar en Instagram. */}
        {captionCopied && (
          <div
            role="status"
            aria-live="polite"
            style={{
              marginTop: 12,
              padding: '10px 14px',
              background: C.text,
              color: '#FFF',
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: C.shadowOutSoft,
              animation: 'fadeInFromBottom 0.25s ease',
            }}
          >
            <Check size={16} strokeWidth={3} />
            Texto copiado al portapapeles · pégalo al subir la foto en Instagram
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <button
            onClick={copyCaption}
            style={{
              flex: 1,
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              padding: '12px 14px',
              color: C.text,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: 'pointer',
              transition: 'background 0.12s',
            }}
          >
            {captionCopied ? <Check size={14} /> : <Copy size={14} />}
            {captionCopied ? 'Copiado' : 'Copiar texto'}
          </button>
          <a
            href={ZERIS.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              background: C.text,
              color: '#FFF',
              border: 'none',
              borderRadius: 14,
              padding: '12px 14px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: C.shadowOutSoft,
            }}
          >
            <Instagram size={14} />
            Instagram
          </a>
        </div>
      </div>

      <button
        onClick={finish}
        style={{
          width: '100%',
          marginTop: 16,
          background: C.text,
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
          boxShadow: C.shadowStrong,
        }}
      >
        <Check size={20} strokeWidth={3} />
        MARCAR DÍA COMO HECHO
      </button>

      <button
        onClick={onRepeatLater}
        style={{
          width: '100%',
          marginTop: 10,
          background: C.glassStrong,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${C.glassBorder}`,
          borderRadius: 20,
          padding: 16,
          color: C.textMute,
          fontSize: 14,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          cursor: 'pointer',
          boxShadow: C.shadow,
        }}
      >
        <Repeat size={18} />
        Quiero repetir este ejercicio mañana
      </button>
    </div>
  );
}
