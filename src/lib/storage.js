// Persistencia. Cambio importante: el estado del reto ahora vive POR MÉTODO,
// para que el usuario pueda llevar varios retos en paralelo (OREA, V60, etc.)
// sin sobrescribirse. Mantiene migración silenciosa desde el formato legacy.

export const STORAGE_KEY = 'zeris-orea-coach-v2';
const METHOD_KEY = 'zeris.selectedMethod';

const emptyMethodState = () => ({ completed: {}, logs: {} });

export const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { methods: {} };
    const parsed = JSON.parse(raw);
    // Migración: formato antiguo { completed, logs } → { methods: { orea: { completed, logs } } }
    if (parsed && parsed.completed !== undefined && !parsed.methods) {
      return {
        methods: {
          orea: { completed: parsed.completed || {}, logs: parsed.logs || {} },
        },
      };
    }
    return parsed.methods ? parsed : { methods: parsed || {} };
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
