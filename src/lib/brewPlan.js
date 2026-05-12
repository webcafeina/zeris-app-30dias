// Construye el plan de brew real a partir de los pasos del día.
// Inyecta SIEMPRE un primer paso "DOSIS" a t=0 con 10s de ventana para que
// el usuario meta el café molido en el filtro antes del bloom. Sin esto,
// quien arranque el cronómetro sin haber vaciado el molido al filtro
// pierde el momento del bloom corriendo a por el café.
// Todos los pasos originales del día se desplazan +DOSE_WINDOW.

export const DOSE_WINDOW = 10; // segundos de margen antes del bloom

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
