import { useEffect } from 'react';
import { X, BookOpen, RefreshCcw } from 'lucide-react';
import { C } from '../../styles/colors';
import { METHODS, getMethod } from '../../data/methods';
import { MethodIcon } from './MethodIcon';

// Bottom sheet que se abre desde el header de HomeScreen.
// Sirve para:
//   - Cambiar al reto de otro método sin perder el progreso del actual.
//   - Abrir la lista global de recetas (todos los métodos disponibles).
//   - Volver al selector inicial (limpia método activo).
export function MethodSwitcher({
  open,
  current,
  onClose,
  onSwitchMethod,
  onOpenRecipes,
  onResetMethod,
}) {
  // Bloquear scroll del fondo
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [open]);

  if (!open) return null;

  const currentMethod = getMethod(current);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 10, 10, 0.35)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeInFromBottom 0.2s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 560,
          background: C.surface,
          borderRadius: '24px 24px 0 0',
          padding: '14px 20px 26px',
          animation: 'slideUpIn 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
          maxHeight: '88vh',
          overflowY: 'auto',
        }}
      >
        {/* Handle */}
        <div style={{ width: 44, height: 4, borderRadius: 2, background: C.border, margin: '0 auto 18px' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '2.5px', fontWeight: 700, textTransform: 'uppercase' }}>
              Tu reto actual
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: '4px 0 0', letterSpacing: '-0.5px' }}>
              {currentMethod?.name || 'Sin método'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: C.text,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Lista de métodos */}
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '2.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>
            Cambia de reto
          </div>
          {METHODS.map((m) => {
            const isCurrent = m.id === current;
            const canTap = m.available;
            return (
              <button
                key={m.id}
                onClick={() => {
                  if (isCurrent) onClose();
                  else if (canTap) onSwitchMethod(m.id);
                }}
                disabled={!canTap && !isCurrent}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  marginBottom: 6,
                  background: isCurrent ? C.surfaceMute : C.surface,
                  border: `1px solid ${isCurrent ? C.borderStrong : C.border}`,
                  borderRadius: 14,
                  cursor: canTap || isCurrent ? 'pointer' : 'not-allowed',
                  opacity: canTap || isCurrent ? 1 : 0.55,
                  transition: 'background 0.12s',
                }}
              >
                <div style={{ color: C.text, flexShrink: 0 }}>
                  <MethodIcon id={m.id} size={26} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: '-0.2px' }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: '1.5px', fontWeight: 700, textTransform: 'uppercase', marginTop: 2 }}>
                    {m.category}
                  </div>
                </div>
                <div style={{ flexShrink: 0 }}>
                  {isCurrent ? (
                    <span style={{ fontSize: 9, color: C.text, fontWeight: 700, letterSpacing: '1.5px' }}>
                      EN CURSO
                    </span>
                  ) : !canTap ? (
                    <span style={{ fontSize: 9, color: C.textFaint, fontWeight: 700, letterSpacing: '1.5px' }}>
                      PRÓXIMAMENTE
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        {/* Acciones */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '2.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>
            Más
          </div>

          <button
            onClick={onOpenRecipes}
            style={{
              width: '100%',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 14px',
              marginBottom: 6,
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              cursor: 'pointer',
              color: C.text,
            }}
          >
            <BookOpen size={18} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.2px' }}>
                Ver todas las recetas
              </div>
              <div style={{ fontSize: 11, color: C.textMute, marginTop: 2 }}>
                Las 30 recetas del método actual, en orden.
              </div>
            </div>
          </button>

          <button
            onClick={onResetMethod}
            style={{
              width: '100%',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 14px',
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              cursor: 'pointer',
              color: C.text,
            }}
          >
            <RefreshCcw size={18} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.2px' }}>
                Volver al selector inicial
              </div>
              <div style={{ fontSize: 11, color: C.textMute, marginTop: 2 }}>
                Ver de nuevo todos los métodos disponibles.
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
