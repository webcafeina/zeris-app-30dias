export const STORAGE_KEY = 'zeris-orea-coach-v2';
const METHOD_KEY = 'zeris.selectedMethod';

export const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { completed: {}, logs: {} };
  } catch {
    return { completed: {}, logs: {} };
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

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
