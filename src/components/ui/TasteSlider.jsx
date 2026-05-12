import { C } from '../../styles/colors';

export function TasteSlider({ attr, value, onChange }) {
  const pct = (value / 10) * 100;
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>{attr.icon}</span>
          <span style={{ color: C.text, fontSize: 15, fontWeight: 700 }}>{attr.label}</span>
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: C.accent,
            fontVariantNumeric: 'tabular-nums',
            minWidth: 32,
            textAlign: 'right',
          }}
        >
          {value}
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        style={{
          width: '100%',
          height: 36,
          appearance: 'none',
          background: `linear-gradient(to right, ${C.accent} 0%, ${C.accentBright} ${pct}%, rgba(10,10,10,0.10) ${pct}%, rgba(10,10,10,0.10) 100%)`,
          borderRadius: 18,
          outline: 'none',
          border: `1px solid ${C.glassBorder}`,
          boxShadow: C.shadow,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, padding: '0 4px' }}>
        <span style={{ fontSize: 10, color: C.textFaint }}>{attr.lowLabel}</span>
        <span style={{ fontSize: 10, color: C.textFaint }}>{attr.highLabel}</span>
      </div>
    </div>
  );
}
