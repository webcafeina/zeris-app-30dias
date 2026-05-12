// Thumbnail estilizado de bolsa de café para cuando no hay foto real.
// Bolsa con pliegue superior + cuerpo en `bagColor` + etiqueta clara con el
// código de origen. Cuando llegue la foto real, este placeholder se sustituye
// por <img src={coffee.photo} /> dentro de CoffeeRecommendationCard.

export function CoffeeBagThumb({ coffee, size = 96 }) {
  if (!coffee) return null;
  const code = coffee.code || coffee.region?.slice(0, 3).toUpperCase() || 'ZC';
  const bagColor = coffee.bagColor || '#5C3826';
  const bagAccent = coffee.bagAccent || '#D8B27E';
  // Tono más oscuro del bagColor para el pliegue del top
  const fold = darken(bagColor, 0.18);

  return (
    <svg
      viewBox="0 0 96 120"
      width={size}
      height={(size * 120) / 96}
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      {/* Sombra base */}
      <ellipse cx="48" cy="114" rx="34" ry="4" fill="rgba(0,0,0,0.12)" />

      {/* Pliegue superior */}
      <path
        d={`M 14 20 L 30 8 L 66 8 L 82 20 Z`}
        fill={fold}
      />
      {/* Línea decorativa del pliegue */}
      <line x1="48" y1="8" x2="48" y2="20" stroke={bagAccent} strokeWidth="0.6" opacity="0.5" />

      {/* Cuerpo de la bolsa */}
      <path
        d={`M 14 20 L 82 20 L 78 108 Q 78 112 74 112 L 22 112 Q 18 112 18 108 Z`}
        fill={bagColor}
      />

      {/* Etiqueta */}
      <rect x="26" y="50" width="44" height="34" rx="3" fill={bagAccent} opacity="0.92" />
      <line x1="30" y1="60" x2="66" y2="60" stroke={bagColor} strokeWidth="0.6" opacity="0.5" />
      <text
        x="48"
        y="76"
        fontSize="18"
        fontWeight="800"
        textAnchor="middle"
        fill={bagColor}
        letterSpacing="2"
        fontFamily="-apple-system, BlinkMacSystemFont, Inter, sans-serif"
      >
        {code}
      </text>

      {/* Sello inferior pequeño */}
      <circle cx="48" cy="98" r="4" fill={bagAccent} opacity="0.45" />
    </svg>
  );
}

// Mezcla `hex` con negro en proporción `amount` (0..1) para oscurecer.
function darken(hex, amount = 0.15) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const r = Math.max(0, Math.round(parseInt(m[1], 16) * (1 - amount)));
  const g = Math.max(0, Math.round(parseInt(m[2], 16) * (1 - amount)));
  const b = Math.max(0, Math.round(parseInt(m[3], 16) * (1 - amount)));
  return `rgb(${r}, ${g}, ${b})`;
}
