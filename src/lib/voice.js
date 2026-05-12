// speechSynthesis necesita un gesto del usuario antes del primer speak en móvil.
// warmUpVoice() se llama al desbloquear voz (countdown), luego speak() ya va.

let voiceWarmed = false;

export const warmUpVoice = () => {
  if (voiceWarmed || typeof window === 'undefined' || !window.speechSynthesis) return;
  try {
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    u.lang = 'es-ES';
    window.speechSynthesis.speak(u);
    voiceWarmed = true;
  } catch (e) {
    console.warn('[Voice] No se pudo calentar:', e);
  }
};

export const speak = (text, enabled) => {
  if (!enabled) return;
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('[Voice] speechSynthesis no disponible en este navegador');
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    u.rate = 1.05;
    u.pitch = 1.0;
    u.volume = 1.0;
    u.onerror = (e) => console.warn('[Voice] Error al hablar:', e.error, text);
    window.speechSynthesis.speak(u);
  } catch (e) {
    console.warn('[Voice] Excepción:', e);
  }
};
