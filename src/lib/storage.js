export const STORAGE_KEY = 'zeris-orea-coach-v2';

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
