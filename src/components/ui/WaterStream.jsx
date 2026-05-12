import { C } from '../../styles/colors';

// Chorrito de agua: gotas cayendo verticalmente que aterrizan en la parte
// superior del CircularTimer. Solo se renderiza mientras `active === true`
// (durante el acto de verter). 3 gotas con delays escalonados para que la
// caída se vea continua.
//
// Se posiciona absolutamente respecto a un contenedor padre con position: relative.
export function WaterStream({ active = false, urgency = false }) {
  if (!active) return null;
  const dropColor = urgency ? C.danger : C.pourDark;
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: -60,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 16,
        height: 70,
        pointerEvents: 'none',
        zIndex: 3,
      }}
    >
      {/* Columna sutil que conecta visualmente el origen con el ring */}
      <div
        style={{
          position: 'absolute',
          top: 4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 2,
          height: 56,
          background: `linear-gradient(to bottom, transparent, ${C.pourLight} 30%, ${C.pourLight} 100%)`,
          borderRadius: 1,
        }}
      />
      {/* Gotas animadas */}
      <div
        className="zeris-drop"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          marginLeft: -4,
          width: 8,
          height: 12,
          background: dropColor,
          borderRadius: '50% / 30% 30% 50% 50%',
          animation: 'waterDropFall 0.7s linear infinite',
          animationDelay: '0s',
          boxShadow: `0 0 4px ${C.pourLight}`,
        }}
      />
      <div
        className="zeris-drop"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          marginLeft: -3,
          width: 6,
          height: 10,
          background: dropColor,
          borderRadius: '50% / 30% 30% 50% 50%',
          animation: 'waterDropFall 0.7s linear infinite',
          animationDelay: '0.23s',
          opacity: 0.85,
        }}
      />
      <div
        className="zeris-drop"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          marginLeft: -3.5,
          width: 7,
          height: 11,
          background: dropColor,
          borderRadius: '50% / 30% 30% 50% 50%',
          animation: 'waterDropFall 0.7s linear infinite',
          animationDelay: '0.46s',
          opacity: 0.9,
        }}
      />
    </div>
  );
}
