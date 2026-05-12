import { useState } from 'react';
import { C } from '../../styles/colors';

// Foto OREA con loading lazy + fallback. Si la imagen no carga (por ejemplo,
// archivo no movido a /public/orea/), muestra un placeholder neumórfico.
// `aspect` permite controlar la relación de aspecto del contenedor.
export function OreaPhoto({ src, alt = '', radius = 18, aspect = 'auto', style = {} }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        style={{
          width: '100%',
          aspectRatio: aspect === 'auto' ? undefined : aspect,
          minHeight: aspect === 'auto' ? 160 : undefined,
          background: C.surfaceMute,
          borderRadius: radius,
          boxShadow: C.shadowInSoft,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: C.textFaint,
          fontSize: 10,
          letterSpacing: '2px',
          fontWeight: 700,
          textTransform: 'uppercase',
          ...style,
        }}
      >
        Sin foto
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
      style={{
        width: '100%',
        aspectRatio: aspect === 'auto' ? undefined : aspect,
        height: aspect === 'auto' ? 'auto' : undefined,
        objectFit: 'cover',
        display: 'block',
        borderRadius: radius,
        ...style,
      }}
    />
  );
}
