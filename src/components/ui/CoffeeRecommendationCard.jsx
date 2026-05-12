import { Coffee, ExternalLink } from 'lucide-react';
import { C } from '../../styles/colors';

// Card de "café recomendado para este ejercicio".
// La data sale de data/coffees.js — al integrar con la API real de
// zeriscoffee.com basta con que esos objetos tengan los mismos campos.
//
// Layout: badge "RECOMENDADO POR ZERI'S" + nombre + origen + perfil de
// notas + resumen corto + CTA con link directo a la tienda.
export function CoffeeRecommendationCard({ coffee }) {
  if (!coffee) return null;

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

      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.text, letterSpacing: '-0.4px', lineHeight: 1.15 }}>
        {coffee.name}
      </h3>
      <div style={{ marginTop: 4, fontSize: 11, letterSpacing: '1.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase' }}>
        {coffee.region}
      </div>

      {/* Chips de proceso + tueste */}
      <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
        {[coffee.process, coffee.roast].filter(Boolean).map((chip) => (
          <span
            key={chip}
            style={{
              fontSize: 10,
              padding: '4px 10px',
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

      {/* CTA */}
      <a
        href={coffee.shopUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: 14,
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
