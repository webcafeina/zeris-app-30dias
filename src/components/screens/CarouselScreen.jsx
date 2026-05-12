import { useState } from 'react';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { C } from '../../styles/colors';
import { GlassCard } from '../ui/GlassCard';
import { BaristaCard } from '../ui/BaristaCard';
import { OreaPhoto } from '../ui/OreaPhoto';
import { getBarista } from '../../data/baristas';
import { OREA_PHOTOS } from '../../data/photos';

export function CarouselScreen({ day, onBack, onContinue }) {
  const [idx, setIdx] = useState(0);
  const slides = day.carousel || [];

  if (slides.length === 0) {
    setTimeout(onContinue, 0);
    return null;
  }

  const next = () => {
    if (idx < slides.length - 1) setIdx(idx + 1);
    else onContinue();
  };
  const prev = () => {
    if (idx > 0) setIdx(idx - 1);
    else onBack();
  };

  const slide = slides[idx];

  return (
    <div style={{ minHeight: '100vh', background: C.bgGradient, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onBack}
          style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 4, color: C.textMute, cursor: 'pointer', padding: 8 }}
        >
          <ChevronLeft size={20} />
          <span style={{ fontSize: 13 }}>Volver</span>
        </button>
        <span style={{ fontSize: 11, color: C.textFaint, letterSpacing: '2px', fontWeight: 700 }}>
          DÍA {day.num} · {day.phase}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 6, padding: '0 20px', marginBottom: 24 }}>
        {slides.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: i === idx ? C.accent : 'rgba(10,10,10,0.12)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 11, color: C.accent, letterSpacing: '3px', fontWeight: 700, marginBottom: 12 }}>
          {idx === 0 ? 'INTRODUCCIÓN' : `PARTE ${idx + 1}`}
        </div>

        <h2 style={{ color: C.text, fontSize: 30, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 20 }}>
          {slide.title}
        </h2>

        {/* Hero photo del slide cuando viene marcado con photoId. */}
        {slide.photoId && OREA_PHOTOS[slide.photoId] && (
          <div style={{ marginBottom: 18 }}>
            <OreaPhoto src={OREA_PHOTOS[slide.photoId]} alt={slide.title} radius={20} aspect="4/3" />
          </div>
        )}

        <GlassCard strong style={{ padding: 24 }}>
          <p style={{ color: C.text, fontSize: 16, lineHeight: 1.55, fontWeight: 400 }}>
            {slide.text}
          </p>

          {slide.youtubeId && (
            <div
              style={{
                marginTop: 18,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: C.shadowStrong,
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                background: '#000',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${slide.youtubeId}?rel=0`}
                title={slide.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {slide.video && !slide.youtubeId && (
            <div
              style={{
                marginTop: 16,
                padding: '12px 16px',
                background: C.surfaceMute,
                borderRadius: 12,
                fontSize: 12,
                color: C.text,
                fontWeight: 600,
                wordBreak: 'break-all',
              }}
            >
              ▶ {slide.video}
            </div>
          )}
        </GlassCard>

        {/* Tarjeta de barista: se muestra solo cuando este slide tiene vídeo
            y el día referencia a un barista del glosario. Permite seguir
            al autor de la receta o vídeo directamente desde aquí. */}
        {(slide.youtubeId || slide.video) && day.baristaId && getBarista(day.baristaId) && (
          <div style={{ marginTop: 16 }}>
            <BaristaCard barista={getBarista(day.baristaId)} />
          </div>
        )}
      </div>

      <div
        style={{
          position: 'sticky',
          bottom: 0,
          padding: '14px 20px calc(18px + env(safe-area-inset-bottom)) 20px',
          background: 'rgba(255, 255, 255, 0.86)',
          backdropFilter: 'blur(18px) saturate(180%)',
          WebkitBackdropFilter: 'blur(18px) saturate(180%)',
          display: 'flex',
          gap: 12,
          marginTop: 24,
          borderTop: `1px solid ${C.border}`,
          zIndex: 5,
        }}
      >
        <button
          onClick={prev}
          style={{
            flex: idx === 0 ? '0 0 60px' : 1,
            background: C.glass,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${C.glassBorder}`,
            borderRadius: 18,
            padding: '18px',
            color: C.textMute,
            fontSize: 14,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            cursor: 'pointer',
            boxShadow: C.shadow,
          }}
        >
          <ChevronLeft size={18} />
          {idx === 0 ? '' : 'Anterior'}
        </button>
        <button
          onClick={next}
          style={{
            flex: 2,
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentBright})`,
            border: 'none',
            borderRadius: 18,
            padding: '18px',
            color: '#FFF',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '1.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
            boxShadow: C.shadowStrong,
          }}
        >
          {idx === slides.length - 1 ? 'VER EJERCICIO' : 'SIGUIENTE'}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
