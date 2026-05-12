// Persistencia. Cambio importante: el estado del reto ahora vive POR MÉTODO,
// para que el usuario pueda llevar varios retos en paralelo (OREA, V60, etc.)
// sin sobrescribirse. Mantiene migración silenciosa desde el formato legacy.

export const STORAGE_KEY = 'zeris-orea-coach-v2';
const METHOD_KEY = 'zeris.selectedMethod';

const emptyMethodState = () => ({ completed: {}, logs: {} });

// Convierte cada entrada de `logs` a array de intentos. Pre-migración
// guardábamos un único objeto por día (sobrescribía al repetir el ejercicio);
// ahora cada intento queda registrado para poder comparar evoluciones.
const normalizeLogs = (logs) => {
  if (!logs || typeof logs !== 'object') return {};
  const out = {};
  for (const [k, v] of Object.entries(logs)) {
    if (Array.isArray(v)) {
      out[k] = v;
    } else if (v && typeof v === 'object') {
      out[k] = [v]; // legacy: un solo intento, lo envolvemos
    }
  }
  return out;
};

export const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { methods: {} };
    const parsed = JSON.parse(raw);
    // Migración 1: formato antiguo { completed, logs } sin métodos →
    // { methods: { orea: { completed, logs } } }
    if (parsed && parsed.completed !== undefined && !parsed.methods) {
      return {
        methods: {
          orea: { completed: parsed.completed || {}, logs: normalizeLogs(parsed.logs) },
        },
      };
    }
    // Migración 2: para cada método, asegurar que logs[day] sea array.
    if (parsed.methods) {
      const next = { methods: {} };
      for (const [mid, ms] of Object.entries(parsed.methods)) {
        next.methods[mid] = {
          completed: ms?.completed || {},
          logs: normalizeLogs(ms?.logs),
        };
      }
      return next;
    }
    return { methods: {} };
  } catch {
    return { methods: {} };
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

export const getMethodState = (state, methodId) => {
  return state?.methods?.[methodId] || emptyMethodState();
};

export const setMethodState = (state, methodId, methodState) => ({
  ...state,
  methods: {
    ...(state?.methods || {}),
    [methodId]: methodState,
  },
});

export const getSelectedMethod = () => {
  try {
    return localStorage.getItem(METHOD_KEY) || null;
  } catch {
    return null;
  }
};

export const setSelectedMethod = (id) => {
  try {
    localStorage.setItem(METHOD_KEY, id);
  } catch {}
};

export const clearSelectedMethod = () => {
  try {
    localStorage.removeItem(METHOD_KEY);
  } catch {}
};
