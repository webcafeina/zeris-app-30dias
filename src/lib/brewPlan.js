// Construye el plan de brew real a partir de los pasos del día.
// Inyecta SIEMPRE un primer paso "DOSIS" a t=0 con 10s de ventana para que
// el usuario meta el café molido en el filtro antes del bloom. Sin esto,
// quien arranque el cronómetro sin haber vaciado el molido al filtro
// pierde el momento del bloom corriendo a por el café.
// Todos los pasos originales del día se desplazan +DOSE_WINDOW.

export const DOSE_WINDOW = 10; // segundos de margen antes del bloom

// Caudal de vertido OREA: 5 g de agua por segundo. Sobre esta tasa calculamos
// cuántos segundos debería durar el ACTO de verter (≠ el hueco hasta el
// siguiente paso, que incluye la espera mientras filtra).
const POUR_RATE_GPS = 5;

// Duración estimada del vertido del paso `idx` en segundos.
// 0 si el paso no es un pour. Mínimo 1s para que el ring se aprecie.
export function pourDurationForStep(steps, idx) {
  const step = steps?.[idx];
  if (!step || step.action !== 'pour' || typeof step.water !== 'number') return 0;
  let prevWater = 0;
  for (let i = idx - 1; i >= 0; i--) {
    const s = steps[i];
    if (s.action === 'pour' && typeof s.water === 'number') {
      prevWater = s.water;
      break;
    }
  }
  const added = Math.max(0, step.water - prevWater);
  if (added <= 0) return 0;
  return Math.max(1, Math.ceil(added / POUR_RATE_GPS));
}

// Gramos que se vierten en este paso (diff respecto al pour anterior).
export function pourAmountForStep(steps, idx) {
  const step = steps?.[idx];
  if (!step || step.action !== 'pour' || typeof step.water !== 'number') return 0;
  let prevWater = 0;
  for (let i = idx - 1; i >= 0; i--) {
    const s = steps[i];
    if (s.action === 'pour' && typeof s.water === 'number') {
      prevWater = s.water;
      break;
    }
  }
  return Math.max(0, step.water - prevWater);
}

export function buildBrewPlan(day) {
  const rawSteps = day?.steps || [];
  const dosePrep = {
    at: 0,
    action: 'dose',
    label: 'Vierte tu café recién molido dentro del filtro',
  };
  const shifted = rawSteps.map((s) => ({ ...s, at: s.at + DOSE_WINDOW }));
  const steps = [dosePrep, ...shifted];

  // Los target times originales (drawdown óptimo) se miden desde el BLOOM,
  // pero ahora el reloj arranca antes, así que les sumamos la ventana.
  const [origMin, origMax] = day?.targetTime || [150, 200];
  const targetMin = origMin + DOSE_WINDOW;
  const targetMax = origMax + DOSE_WINDOW;

  return { steps, targetMin, targetMax };
}
