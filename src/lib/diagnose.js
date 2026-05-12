export function diagnose({ elapsed, targetMin, targetMax, attrs, defects }) {
  const findings = [];
  const actions = [];

  if (elapsed > targetMax) {
    const exc = elapsed - targetMax;
    findings.push({ type: 'time', severity: exc > 30 ? 'high' : 'medium', text: `Drawdown ${exc}s por encima del rango. Sobreextracción probable.` });
    actions.push('Sube 1 click la molienda mañana.');
    actions.push('Verifica que el papel está bien enjuagado (un papel seco puede ralentizar el flujo).');
    if (exc > 60) actions.push('Si pasa de nuevo: revisa el caudal de vertido (5 g/s objetivo). Caudal lento = drawdown largo.');
  } else if (elapsed < targetMin) {
    const def = targetMin - elapsed;
    findings.push({ type: 'time', severity: def > 30 ? 'high' : 'medium', text: `Drawdown ${def}s por debajo del rango. Subextracción probable.` });
    actions.push('Baja 1 click la molienda mañana.');
    actions.push('Verifica que no haya canalización (lecho desigual al final indica canales).');
  } else {
    findings.push({ type: 'time', severity: 'ok', text: 'Tiempo en rango óptimo. La molienda está bien calibrada.' });
  }

  const { dulzor = 5, acidez = 5, amargor = 5, cuerpo = 5 } = attrs;

  if (amargor >= 7 && dulzor <= 4) {
    findings.push({ type: 'taste', severity: 'high', text: 'Perfil sobreextraído: amargor dominante sin dulzor que lo equilibre.' });
    if (elapsed <= targetMax) {
      actions.push('Sube 1 click la molienda aunque el tiempo esté en rango.');
      actions.push('Baja temperatura 1-2 °C (prueba 92 °C en vez de 94).');
    }
  }
  if (acidez >= 7 && cuerpo <= 4 && dulzor <= 4) {
    findings.push({ type: 'taste', severity: 'high', text: 'Perfil subextraído: acidez agresiva sin cuerpo ni dulzor que la respalden.' });
    if (elapsed >= targetMin) {
      actions.push('Baja 1 click la molienda aunque el tiempo esté en rango.');
      actions.push('Sube temperatura 1-2 °C (prueba 95-96 °C).');
    }
  }
  if (acidez <= 3 && dulzor <= 4 && cuerpo <= 4) {
    findings.push({ type: 'taste', severity: 'medium', text: 'Taza plana en general. Posibles causas: café no fresco, agua mala, o ratio demasiado débil.' });
    actions.push('Verifica fecha de tueste del café (no debería pasar de 4 semanas).');
    actions.push('Si tu agua filtrada tiene TDS muy bajo (<50 ppm), prueba con más minerales.');
  }
  if (defects.seca || defects.aspera) {
    findings.push({ type: 'defect', severity: 'high', text: 'Astringencia detectada. Suele indicar sobreextracción o exceso de fines.' });
    actions.push('Sube molienda 1-2 clicks.');
    actions.push('Si usas papel barato, prueba con Sibarist o filtros premium.');
  }
  if (defects.vacia) {
    findings.push({ type: 'defect', severity: 'medium', text: 'Sensación vacía. Probable subextracción o ratio débil.' });
    actions.push('Baja molienda 1 click o sube temperatura 2 °C.');
  }
  if (defects.quemada) {
    findings.push({ type: 'defect', severity: 'high', text: 'Notas a quemado. Sobreextracción severa o tueste muy oscuro.' });
    actions.push('Baja temperatura del agua a 88-90 °C.');
    actions.push('Sube molienda 2 clicks.');
  }
  if (defects.papel) {
    findings.push({ type: 'defect', severity: 'medium', text: 'Sabor a papel. El filtro no se enjuagó suficiente.' });
    actions.push('Enjuaga el filtro con 150-200 g de agua hirviendo antes de cada brew.');
  }
  if (defects.agria) {
    findings.push({ type: 'defect', severity: 'medium', text: 'Acidez agria (no agradable). Subextracción o café con defectos.' });
    actions.push('Baja molienda y sube temperatura.');
  }
  if (defects.metalica) {
    findings.push({ type: 'defect', severity: 'medium', text: 'Notas metálicas. Agua con minerales en exceso o equipo sucio.' });
    actions.push('Limpia molinillo y cafetera a fondo.');
  }
  if (defects.salada) {
    findings.push({ type: 'defect', severity: 'medium', text: 'Notas saladas. Subextracción muy temprana.' });
    actions.push('Baja molienda 1-2 clicks.');
  }

  return { findings, actions: [...new Set(actions)] };
}
