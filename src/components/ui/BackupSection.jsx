import { useRef, useState } from 'react';
import { Download, Upload, Check } from 'lucide-react';
import { C } from '../../styles/colors';
import { exportBackup, importBackup } from '../../lib/backup';

// Sección de export/import del progreso. Pensada para alojarse dentro del
// MethodSwitcher hasta que tengamos backend real. Permite al usuario
// llevarse el estado del reto entre dispositivos o devolverlo tras un
// borrado de caché.
export function BackupSection({ onImported }) {
  const inputRef = useRef(null);
  const [feedback, setFeedback] = useState(null); // { type: 'ok' | 'error', text }

  const handleExport = () => {
    try {
      exportBackup();
      setFeedback({ type: 'ok', text: 'Descargado en tu dispositivo.' });
    } catch (e) {
      setFeedback({ type: 'error', text: 'No se pudo exportar. Intenta de nuevo.' });
    }
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleImportClick = () => {
    inputRef.current?.click();
  };

  const handleFileSelected = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const summary = await importBackup(file);
      setFeedback({
        type: 'ok',
        text: `Importado · ${summary.methodsCount} método${summary.methodsCount !== 1 ? 's' : ''} · ${summary.totalAttempts} cata${summary.totalAttempts !== 1 ? 's' : ''}.`,
      });
      // Damos un tick para que el toast salga, luego forzamos recarga total.
      setTimeout(() => {
        if (onImported) onImported();
        else window.location.reload();
      }, 900);
    } catch (err) {
      setFeedback({ type: 'error', text: err?.message || 'Archivo no válido.' });
      setTimeout(() => setFeedback(null), 4500);
    }
  };

  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: '2.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>
        Tu progreso
      </div>

      <button
        type="button"
        onClick={handleExport}
        style={{
          width: '100%',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 14px',
          marginBottom: 6,
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          cursor: 'pointer',
          color: C.text,
        }}
      >
        <Download size={18} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.2px' }}>
            Exportar mi progreso
          </div>
          <div style={{ fontSize: 11, color: C.textMute, marginTop: 2 }}>
            Descarga un archivo JSON con todas tus catas, intentos y progreso.
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={handleImportClick}
        style={{
          width: '100%',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 14px',
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          cursor: 'pointer',
          color: C.text,
        }}
      >
        <Upload size={18} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.2px' }}>
            Importar desde un backup
          </div>
          <div style={{ fontSize: 11, color: C.textMute, marginTop: 2 }}>
            Restaura tu progreso desde un JSON que hayas exportado antes.
          </div>
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        onChange={handleFileSelected}
        style={{ display: 'none' }}
      />

      {feedback && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: 12,
            padding: '10px 14px',
            background: feedback.type === 'ok' ? C.text : C.surfaceMute,
            color: feedback.type === 'ok' ? '#FFF' : C.text,
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: feedback.type === 'ok' ? 'none' : `1px solid ${C.border}`,
            animation: 'fadeInFromBottom 0.25s ease',
          }}
        >
          {feedback.type === 'ok' && <Check size={14} strokeWidth={3} />}
          {feedback.text}
        </div>
      )}
    </div>
  );
}
