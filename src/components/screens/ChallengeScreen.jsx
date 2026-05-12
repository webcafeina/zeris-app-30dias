import { ChevronLeft, Instagram, Camera, Coffee, Smartphone, Gift, ExternalLink } from 'lucide-react';
import { C } from '../../styles/colors';
import { ZERIS } from '../../data/zerisInfo';
import { OREA_PHOTOS } from '../../data/photos';
import { OreaPhoto } from '../ui/OreaPhoto';

const HASHTAG = '#RetoZerisCoffee';
const IG_HANDLE = '@zeriscoffeeroaster';

// Pantalla del reto social en redes. Detalla:
//  - qué hay que hacer (5-6 fotos en 5-6 días, taggear, hashtag)
//  - qué debe aparecer en cada foto (método + paquete + app)
//  - dónde llega la recompensa (panel de usuario en zeriscoffee.com)
// Accesible desde HomeScreen (banner) y desde el MethodSwitcher.
export function ChallengeScreen({ onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 32 }}>
      <div style={{ padding: '20px 20px 8px', display: 'flex', alignItems: 'center' }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: C.textMute,
            cursor: 'pointer',
            padding: 8,
          }}
        >
          <ChevronLeft size={20} />
          <span style={{ fontSize: 13 }}>Volver</span>
        </button>
      </div>

      {/* Hero photo: la cafetera completa para sugerir el tipo de foto que se publica */}
      <div style={{ padding: '4px 20px 18px' }}>
        <OreaPhoto src={OREA_PHOTOS.onServer} alt="OREA V4 Narrow sobre la jarra" radius={18} aspect="16/10" />
      </div>

      {/* Hero */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ fontSize: 10, letterSpacing: '3px', color: C.text, fontWeight: 700 }}>
          RETO EN REDES
        </div>
        <h2 style={{ color: C.text, fontSize: 38, fontWeight: 200, lineHeight: 0.98, marginTop: 8, letterSpacing: '-1.8px' }}>
          30 fotos,
          <br />
          <span style={{ fontWeight: 700 }}>30 días, 1 descuento</span>
        </h2>
        <p style={{ color: C.textMute, fontSize: 14, lineHeight: 1.55, marginTop: 16 }}>
          Sube <strong style={{ color: C.text }}>1 foto por día</strong> a Instagram (o agrupa de 3 en 3 si un día se te escapa). Cuando llegues a <strong style={{ color: C.text }}>30 fotos</strong> abonamos un <strong style={{ color: C.text }}>descuento especial</strong> a tu panel de usuario en zeriscoffee.com.
        </p>
      </div>

      {/* Cómo participar */}
      <div style={{ padding: '0 20px 20px' }}>
        <div
          style={{
            background: C.surface,
            borderRadius: 20,
            padding: 20,
            boxShadow: C.shadowOutSoft,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Instagram size={18} style={{ color: C.text }} />
            <span style={{ fontSize: 10, letterSpacing: '2.5px', color: C.text, fontWeight: 700, textTransform: 'uppercase' }}>
              Cómo participar
            </span>
          </div>

          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {[
              <>1 foto al día (lo ideal) o agrupa <strong style={{ color: C.text }}>mínimo 3 fotos por subida</strong> si batches varios días juntos.</>,
              <>Etiqueta <strong style={{ color: C.text }}>{IG_HANDLE}</strong> en cada foto.</>,
              <>Usa el hashtag <strong style={{ color: C.text }}>{HASHTAG}</strong>.</>,
              <>Cuando llegues a <strong style={{ color: C.text }}>30 fotos en total</strong>, el descuento se desbloquea automáticamente.</>,
            ].map((item, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  padding: '10px 0',
                  borderBottom: i < 3 ? `1px solid ${C.border}` : 'none',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: C.surfaceMute,
                    boxShadow: C.shadowInSoft,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.text,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: 13.5, color: C.textMute, lineHeight: 1.5, flex: 1 }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Qué debe aparecer en cada foto */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: 10, letterSpacing: '2.5px', color: C.textFaint, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>
          En cada foto tiene que aparecer
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { icon: Coffee, label: 'Tu método', sub: 'OREA, V60, AeroPress…' },
            { icon: Camera, label: 'Paquete Zeri\'s', sub: 'Café tostado por Zeri\'s' },
            { icon: Smartphone, label: 'La app', sub: 'En pantalla del móvil' },
          ].map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              style={{
                background: C.surface,
                borderRadius: 16,
                padding: 14,
                boxShadow: C.shadowOutSoft,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  margin: '0 auto 8px',
                  borderRadius: '50%',
                  background: C.surfaceMute,
                  boxShadow: C.shadowInSoft,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: C.text,
                }}
              >
                <Icon size={20} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text, letterSpacing: '-0.2px', lineHeight: 1.2 }}>
                {label}
              </div>
              <div style={{ fontSize: 10, color: C.textMute, marginTop: 4, lineHeight: 1.3 }}>
                {sub}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 11, color: C.textFaint, marginTop: 12, lineHeight: 1.5, textAlign: 'center' }}>
          Si falta alguno de los tres elementos, la foto no cuenta. Las tres en plano juntas, como prefieras encuadrar.
        </p>
      </div>

      {/* El premio */}
      <div style={{ padding: '0 20px 20px' }}>
        <div
          style={{
            background: C.surface,
            borderRadius: 20,
            padding: 20,
            boxShadow: C.shadowOutSoft,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Gift size={18} style={{ color: C.text }} />
            <span style={{ fontSize: 10, letterSpacing: '2.5px', color: C.text, fontWeight: 700, textTransform: 'uppercase' }}>
              El premio
            </span>
          </div>
          <p style={{ fontSize: 14, color: C.text, lineHeight: 1.55, margin: 0 }}>
            Descuento especial en tu próxima compra de café Zeri's.
          </p>
          <p style={{ fontSize: 12.5, color: C.textMute, lineHeight: 1.5, marginTop: 10, marginBottom: 0 }}>
            Validamos las publicaciones en un máximo de 48 h y abonamos el descuento a tu cuenta en{' '}
            <strong style={{ color: C.text }}>zeriscoffee.com</strong>. Tienes que tener cuenta de cliente con el mismo email que asocies a tu Instagram en el primer post (incluyélo en un comentario o en el bio si tu Instagram no usa email).
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div style={{ padding: '0 20px 20px' }}>
        <a
          href={ZERIS.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            width: '100%',
            background: C.text,
            color: '#FFF',
            border: 'none',
            borderRadius: 16,
            padding: '18px 20px',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            boxShadow: C.shadowStrong,
            marginBottom: 10,
          }}
        >
          <Instagram size={18} />
          Abrir Zeri's en Instagram
        </a>
        <a
          href={ZERIS.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            background: 'transparent',
            color: C.text,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: '14px 20px',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          <ExternalLink size={14} />
          Ir a zeriscoffee.com
        </a>
      </div>
    </div>
  );
}
