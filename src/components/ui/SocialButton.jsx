import { Instagram, Twitter, Youtube, Globe, Facebook } from 'lucide-react';
import { C } from '../../styles/colors';

const ICONS = {
  instagram: Instagram,
  twitter: Twitter,
  x: Twitter,
  youtube: Youtube,
  website: Globe,
  facebook: Facebook,
};

const LABELS = {
  instagram: 'Instagram',
  twitter: 'X / Twitter',
  x: 'X / Twitter',
  youtube: 'YouTube',
  website: 'Sitio web',
  facebook: 'Facebook',
};

// Botón circular para abrir un perfil social externo en una nueva pestaña.
// `kind`: instagram | twitter | x | youtube | website | facebook.
export function SocialButton({ kind, href, size = 36 }) {
  if (!href) return null;
  const Icon = ICONS[kind] || Globe;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir ${LABELS[kind] || 'enlace'}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: C.surface,
        boxShadow: C.shadowOutSoft,
        color: C.text,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseDown={(e) => { e.currentTarget.style.boxShadow = C.shadowInSoft; }}
      onMouseUp={(e) => { e.currentTarget.style.boxShadow = C.shadowOutSoft; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = C.shadowOutSoft; }}
    >
      <Icon size={Math.round(size * 0.45)} strokeWidth={1.8} />
    </a>
  );
}
