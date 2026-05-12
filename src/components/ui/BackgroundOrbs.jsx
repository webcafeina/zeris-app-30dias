import { useEffect, useRef } from 'react';

// Fondo zen: 4 orbes pastel difuminados moviéndose por la pantalla.
// Se monta UNA vez en main.jsx como capa fija detrás de todo (z-index: -1).
// Animación con Web Animations API (no CSS @keyframes) para que iOS Safari
// NO los throttlee: las CSS animations de elementos blurred/background-only
// se pausan al considerar la página "idle"; WAAPI sigue corriendo.
export function BackgroundOrbs() {
  const refs = useRef([]);

  useEffect(() => {
    // Trayectos diferentes para cada orbe + duraciones rápidas (~7-10s)
    // para que el movimiento sea claramente perceptible.
    const setup = [
      {
        // peach / cream — café con leche
        keyframes: [
          { transform: 'translate3d(0, 0, 0) scale(1)' },
          { transform: 'translate3d(42vw, 36vh, 0) scale(1.25)' },
          { transform: 'translate3d(0, 0, 0) scale(1)' },
        ],
        duration: 5000,
        delay: 0,
      },
      {
        // mint / periwinkle
        keyframes: [
          { transform: 'translate3d(0, 0, 0) scale(1)' },
          { transform: 'translate3d(-38vw, 32vh, 0) scale(1.2)' },
          { transform: 'translate3d(0, 0, 0) scale(1)' },
        ],
        duration: 6000,
        delay: -1500,
      },
      {
        // lavender
        keyframes: [
          { transform: 'translate3d(0, 0, 0) scale(1)' },
          { transform: 'translate3d(36vw, -32vh, 0) scale(1.3)' },
          { transform: 'translate3d(0, 0, 0) scale(1)' },
        ],
        duration: 6500,
        delay: -3000,
      },
      {
        // sky
        keyframes: [
          { transform: 'translate3d(0, 0, 0) scale(1)' },
          { transform: 'translate3d(-34vw, -38vh, 0) scale(1.2)' },
          { transform: 'translate3d(0, 0, 0) scale(1)' },
        ],
        duration: 5500,
        delay: -2400,
      },
    ];

    const animations = refs.current.map((el, i) => {
      if (!el || typeof el.animate !== 'function') return null;
      const cfg = setup[i];
      return el.animate(cfg.keyframes, {
        duration: cfg.duration,
        iterations: Infinity,
        easing: 'ease-in-out',
        delay: cfg.delay,
        fill: 'both',
      });
    });

    return () => {
      animations.forEach((a) => {
        try { a?.cancel(); } catch {}
      });
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        // z-index -1 dentro del stacking context de #root → queda por
        // DEBAJO del contenido de la app (header, cartas, etc).
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div ref={(el) => (refs.current[0] = el)} className="zen-orb zen-orb-peach" />
      <div ref={(el) => (refs.current[1] = el)} className="zen-orb zen-orb-mint" />
      <div ref={(el) => (refs.current[2] = el)} className="zen-orb zen-orb-lavender" />
      <div ref={(el) => (refs.current[3] = el)} className="zen-orb zen-orb-sky" />
    </div>
  );
}
