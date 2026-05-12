// Export / import del estado completo de la app en JSON.
// Sirve como red de seguridad mientras no haya backend: el usuario puede
// descargarse su progreso, fotos pendientes de subir, notas, etc. y volver
// a importarlo en otro dispositivo o tras un borrado de caché.

import { STORAGE_KEY } from './storage';

const BACKUP_VERSION = 1;
const SELECTED_METHOD_KEY = 'zeris.selectedMethod';

// Genera el blob JSON con todo lo persistible.
// Solo dependemos de localStorage (no hay backend), así que el contenido
// se compone de las dos claves que escribimos: estado del reto + método
// activo. Versión incluida para futuras migraciones.
export function exportBackup() {
  let stateRaw = null;
  let methodRaw = null;
  try {
    stateRaw = localStorage.getItem(STORAGE_KEY);
    methodRaw = localStorage.getItem(SELECTED_METHOD_KEY);
  } catch {}

  const payload = {
    app: 'zeris-30dias',
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    selectedMethod: methodRaw,
    state: stateRaw ? JSON.parse(stateRaw) : null,
  };

  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const date = new Date().toISOString().slice(0, 10);
  a.download = `zeris-30dias-backup-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Liberar el blob tras un tick para no romper la descarga en Safari iOS.
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  return { ok: true };
}

// Carga un backup desde un File (input type="file"). Devuelve una promesa
// que resuelve con un summary parseado para que la UI pueda mostrarlo.
// El estado se persiste en localStorage; el caller debe luego recargar la
// app o disparar un re-render para que la pantalla se entere.
export function importBackup(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No se seleccionó ningún archivo.'));

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.onload = () => {
      try {
        const payload = JSON.parse(String(reader.result || '{}'));
        if (!payload || payload.app !== 'zeris-30dias') {
          throw new Error('Este archivo no parece un backup de la app de Zeri\'s.');
        }
        if (payload.state) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(payload.state));
        }
        if (payload.selectedMethod) {
          localStorage.setItem(SELECTED_METHOD_KEY, payload.selectedMethod);
        }
        const methods = payload.state?.methods || {};
        const totalAttempts = Object.values(methods).reduce((sum, m) => {
          const logs = m?.logs || {};
          return sum + Object.values(logs).reduce((s, v) => s + (Array.isArray(v) ? v.length : v ? 1 : 0), 0);
        }, 0);
        resolve({
          ok: true,
          methodsCount: Object.keys(methods).length,
          totalAttempts,
          exportedAt: payload.exportedAt,
        });
      } catch (e) {
        reject(e);
      }
    };
    reader.readAsText(file);
  });
}
