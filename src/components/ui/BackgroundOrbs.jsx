// Fondo zen: 4 orbes pastel difuminados moviéndose muy despacio por la pantalla.
// Se monta UNA vez en App.jsx como capa fija detrás de todo. Las tarjetas
// blancas flotan encima y destacan; el fondo aporta calma sin distraer.
// Animaciones definidas en animations.css para no recalcular cada frame.

export function BackgroundOrbs() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        // z-index -1 dentro del stacking context de #root → queda por
        // DEBAJO del contenido de la app (header, cartas, etc).
        // Con z-index 0 se renderizaba encima y tapaba el header.
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div className="zen-orb zen-orb-peach" />
      <div className="zen-orb zen-orb-mint" />
      <div className="zen-orb zen-orb-lavender" />
      <div className="zen-orb zen-orb-sky" />
    </div>
  );
}
