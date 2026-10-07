import { INDUSTRY_PRESETS } from '../utils/presets';

export default function PresetsBar({ onSelectPreset }) {
  return (
    <div className="presets-wrapper">
      <div className="presets-header">
        <span className="presets-badge">⚡ Quick Demo Presets</span>
        <span className="presets-hint">Click any brand template to populate instantly:</span>
      </div>
      <div className="presets-scroll">
        {INDUSTRY_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className="preset-chip"
            onClick={() => onSelectPreset(preset)}
            title={`Load ${preset.name} (${preset.category})`}
          >
            <span className="preset-name">{preset.name}</span>
            <span className="preset-cat">{preset.category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
