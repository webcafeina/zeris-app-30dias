import { useState } from 'react';
import { C } from '../../styles/colors';
import { SocialButton } from './SocialButton';

// Avatar con iniciales para cuando no hay foto disponible.
function InitialsAvatar({ name, size = 64 }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: C.surfaceMute,
        boxShadow: C.shadowInSoft,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: C.text,
        fontWeight: 700,
        fontSize: size * 0.36,
        letterSpacing: '-0.5px',
      }}
    >
      {initials}
    </div>
  );
}

// Tarjeta de barista: foto, nombre, rol, país, redes sociales para seguirle.
// Pensada para mostrar en CarouselScreen junto a la receta o vídeo
// que vamos a trabajar en el ejercicio del día.
export function BaristaCard({ barista }) {
  const [imgError, setImgError] = useState(false);
  if (!barista) return null;

  return (
    <div
      style={{
        background: C.surface,
        borderRadius: 18,
        boxShadow: C.shadowOutSoft,
        padding: 16,
      }}
    >
      <div
        style={{
          fontSize: 9,
          letterSpacing: '2.5px',
          color: C.textFaint,
          fontWeight: 700,
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        Receta basada en
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {barista.photo && !imgError ? (
          <img
            src={barista.photo}
            alt={barista.name}
            width={64}
            height={64}
            onError={() => setImgError(true)}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              objectFit: 'cover',
              flexShrink: 0,
              boxShadow: C.shadowInSoft,
            }}
          />
        ) : (
          <InitialsAvatar name={barista.name} size={64} />
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: C.text,
              letterSpacing: '-0.3px',
              lineHeight: 1.2,
            }}
          >
            {barista.name}
          </div>
          <div
            style={{
              fontSize: 11,
              color: C.textMute,
              fontWeight: 600,
              letterSpacing: '0.2px',
              marginTop: 3,
              lineHeight: 1.35,
            }}
          >
            {barista.role}
          </div>
          {barista.country && (
            <div
              style={{
                fontSize: 9,
                color: C.textFaint,
                letterSpacing: '2px',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginTop: 4,
              }}
            >
              {barista.country}
            </div>
          )}
        </div>
      </div>

      {barista.bio && (
        <p style={{ fontSize: 12.5, color: C.textMute, lineHeight: 1.5, marginTop: 12, marginBottom: 14 }}>
          {barista.bio}
        </p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', marginRight: 4 }}>
          Sígueme
        </div>
        <SocialButton kind="website" href={barista.website} />
        <SocialButton kind="instagram" href={barista.instagram} />
        <SocialButton kind="youtube" href={barista.youtube} />
        <SocialButton kind="twitter" href={barista.twitter} />
      </div>
    </div>
  );
}
