import { useState } from 'react';
import { Coffee, ExternalLink, Sparkles, Check } from 'lucide-react';
import { C } from '../../styles/colors';
import { FLASH_DISCOUNT } from '../../data/coffees';
import { CoffeeBagThumb } from './CoffeeBagThumb';

// Card de "café recomendado para este ejercicio".
// La data sale de data/coffees.js — al integrar con la API real de
// zeriscoffee.com basta con que esos objetos tengan los mismos campos.
//
// Si `coffee.photo` apunta a una URL real, se muestra como imagen.
// Si es null, cae en un placeholder SVG de bolsa con el código del origen.
export function CoffeeRecommendationCard({ coffee }) {
  const [imgError, setImgError] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  if (!coffee) return null;

  const showPhoto = coffee.photo && !imgError;

  const copyFlashCode = async () => {
    try {
      await navigator.clipboard.writeText(FLASH_DISCOUNT.code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2500);
    } catch (e) {
      // Silencioso — si falla, el botón sigue siendo un link que abre la tienda.
    }
  };

  return (
    <div
      style={{
        background: C.surface,
        borderRadius: 18,
        boxShadow: C.shadowOutSoft,
        padding: 18,
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <Coffee size={14} style={{ color: C.text }} />
        <span style={{ fontSize: 10, letterSpacing: '2.5px', color: C.text, fontWeight: 700, textTransform: 'uppercase' }}>
          Café recomendado por Zeri's
        </span>
      </div>

      {/* Cabecera: thumb (foto o bolsa-placeholder) + nombre + origen */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <div style={{ flexShrink: 0, width: 96 }}>
          {showPhoto ? (
            <img
              src={coffee.photo}
              alt={coffee.name}
              onError={() => setImgError(true)}
              loading="lazy"
              style={{ width: 96, height: 120, objectFit: 'cover', borderRadius: 10, display: 'block' }}
            />
          ) : (
            <CoffeeBagThumb coffee={coffee} size={96} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: '-0.3px', lineHeight: 1.15 }}>
            {coffee.name}
          </h3>
          <div style={{ marginTop: 4, fontSize: 11, letterSpacing: '1.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase' }}>
            {coffee.region}
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {[coffee.process, coffee.roast].filter(Boolean).map((chip) => (
              <span
                key={chip}
                style={{
                  fontSize: 10,
                  padding: '4px 9px',
                  borderRadius: 8,
                  background: C.surfaceMute,
                  color: C.textMute,
                  fontWeight: 600,
                  letterSpacing: '0.3px',
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Notas de cata */}
      {coffee.notes && (
        <div style={{ marginTop: 14, padding: '12px 14px', background: C.surfaceMute, borderRadius: 12 }}>
          <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
            Notas de cata
          </div>
          <div style={{ fontSize: 13, color: C.text, fontWeight: 600, lineHeight: 1.4, letterSpacing: '-0.2px' }}>
            {coffee.notes}
          </div>
        </div>
      )}

      {/* Resumen — por qué encaja con el ejercicio */}
      {coffee.summary && (
        <p style={{ marginTop: 12, marginBottom: 0, fontSize: 12.5, color: C.textMute, lineHeight: 1.5 }}>
          {coffee.summary}
        </p>
      )}

      {/* Flash discount — "llévatelo ahora con 3% extra" */}
      {FLASH_DISCOUNT && (
        <div
          style={{
            marginTop: 14,
            padding: '12px 14px',
            background: C.surfaceMute,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
          }}
        >
          <Sparkles size={16} style={{ color: C.text, flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, color: C.text, fontWeight: 700, letterSpacing: '-0.2px' }}>
              {FLASH_DISCOUNT.percent}% extra si lo compras ahora
            </div>
            <div style={{ fontSize: 11, color: C.textMute, marginTop: 3 }}>
              Usa el código{' '}
              <span
                style={{
                  fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
                  fontWeight: 700,
                  color: C.text,
                  letterSpacing: '0.5px',
                }}
              >
                {FLASH_DISCOUNT.code}
              </span>{' '}
              al pagar.
            </div>
          </div>
          <button
            onClick={copyFlashCode}
            aria-label="Copiar código de descuento"
            style={{
              flexShrink: 0,
              background: codeCopied ? C.text : C.surface,
              color: codeCopied ? '#FFF' : C.text,
              border: `1px solid ${codeCopied ? C.text : C.border}`,
              borderRadius: 10,
              padding: '8px 10px',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            {codeCopied ? <Check size={12} strokeWidth={3} /> : null}
            {codeCopied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
      )}

      {/* CTA principal a la tienda */}
      <a
        href={coffee.shopUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          background: C.text,
          color: '#FFF',
          border: 'none',
          borderRadius: 14,
          padding: '12px 16px',
          textDecoration: 'none',
          cursor: 'pointer',
          boxShadow: C.shadowOutSoft,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ExternalLink size={14} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Ver en la tienda
          </span>
        </span>
        {coffee.price && (
          <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.2px' }}>
            {coffee.price}
          </span>
        )}
      </a>
    </div>
  );
}
