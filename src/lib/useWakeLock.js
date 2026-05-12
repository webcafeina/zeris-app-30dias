import { useEffect, useRef } from 'react';

// Hook que mantiene la pantalla encendida mientras `active` sea true.
// Usa la Screen Wake Lock API (Chrome Android, Safari iOS 16.4+).
// El sistema libera el lock automáticamente cuando la pestaña pasa a
// segundo plano; lo re-pedimos al volver a primer plano.
// Silencioso si el API no está soportado.
export function useWakeLock(active) {
  const sentinelRef = useRef(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const supported = typeof navigator !== 'undefined' && 'wakeLock' in navigator;
    if (!supported) return;

    let cancelled = false;

    const acquire = async () => {
      if (cancelled) return;
      if (sentinelRef.current) return;
      try {
        const s = await navigator.wakeLock.request('screen');
        if (cancelled) {
          try { await s.release(); } catch {}
          return;
        }
        sentinelRef.current = s;
        // El navegador puede liberar el lock por su cuenta (ej. página
        // oculta). En ese caso, nullificamos el ref para poder
        // re-adquirirlo cuando el usuario vuelva.
        s.addEventListener('release', () => {
          if (sentinelRef.current === s) sentinelRef.current = null;
        });
      } catch (err) {
        // Errores típicos: la página no está visible, no hay gesto del
        // usuario. No hacemos ruido — el reloj va a seguir funcionando
        // aunque la pantalla pueda apagarse.
        console.debug('[wakeLock] No se pudo activar:', err?.message || err);
      }
    };

    const release = async () => {
      const s = sentinelRef.current;
      sentinelRef.current = null;
      if (s) {
        try { await s.release(); } catch {}
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && activeRef.current) {
        acquire();
      }
    };

    if (active) acquire();
    else release();

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibility);
      release();
    };
  }, [active]);
}
