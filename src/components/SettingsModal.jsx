import { useState } from 'react';
import { AI_PROVIDERS, GEMINI_MODELS, OPENAI_MODELS, callGeminiAPI, callOpenAIAPI } from '../utils/aiService';

export default function SettingsModal({ isOpen, onClose, settings, onSaveSettings }) {
  const [provider, setProvider] = useState(settings.provider || AI_PROVIDERS.OFFLINE);
  const [geminiKey, setGeminiKey] = useState(settings.geminiKey || '');
  const [geminiModel, setGeminiModel] = useState(settings.geminiModel || 'gemini-1.5-flash');
  const [openaiKey, setOpenaiKey] = useState(settings.openaiKey || '');
  const [openaiModel, setOpenaiModel] = useState(settings.openaiModel || 'gpt-4o-mini');
  const [testStatus, setTestStatus] = useState(null); // { type: 'success' | 'error', message: '' }
  const [testing, setTesting] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings({
      provider,
      geminiKey,
      geminiModel,
      openaiKey,
      openaiModel
    });
    onClose();
  };

  const handleTestKey = async () => {
    setTesting(true);
    setTestStatus(null);

    try {
      if (provider === AI_PROVIDERS.GEMINI) {
        if (!geminiKey.trim()) throw new Error('Please enter a Gemini API Key first.');
        await callGeminiAPI(
          geminiKey.trim(),
          geminiModel,
          'You are a testing assistant. Return a test JSON response.',
          'Respond with JSON: {"status": "ok", "message": "Connection verified"}'
        );
        setTestStatus({ type: 'success', message: '✅ Gemini API connected successfully!' });
      } else if (provider === AI_PROVIDERS.OPENAI) {
        if (!openaiKey.trim()) throw new Error('Please enter an OpenAI API Key first.');
        await callOpenAIAPI(
          openaiKey.trim(),
          openaiModel,
          'You are a testing assistant. Return JSON: {"status": "ok"}',
          'Test connection'
        );
        setTestStatus({ type: 'success', message: '✅ OpenAI API connected successfully!' });
      } else {
        setTestStatus({ type: 'success', message: 'Offline Engine is active and ready!' });
      }
    } catch (err) {
      setTestStatus({ type: 'error', message: `❌ Error: ${err.message}` });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content settings-modal">
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-icon">⚙️</span>
            <h3>AI Engine & API Configuration</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="settings-body">
          <div className="settings-intro">
            Choose your AI execution mode. You can use our <strong>High-Speed Offline Engine</strong> (no API key required, 100% free), or connect your own <strong>Gemini or OpenAI API Key</strong> for unbounded creativity.
          </div>

          <div className="provider-selector-grid">
            <div
              className={`provider-card ${provider === AI_PROVIDERS.OFFLINE ? 'active' : ''}`}
              onClick={() => setProvider(AI_PROVIDERS.OFFLINE)}
            >
              <div className="provider-icon">⚡</div>
              <div className="provider-info">
                <h4>Instant Local Engine</h4>
                <p>100% Free, zero latency, viral copywriting templates.</p>
              </div>
              <span className="badge-free">Ready</span>
            </div>

            <div
              className={`provider-card ${provider === AI_PROVIDERS.GEMINI ? 'active' : ''}`}
              onClick={() => setProvider(AI_PROVIDERS.GEMINI)}
            >
              <div className="provider-icon">✨</div>
              <div className="provider-info">
                <h4>Google Gemini API</h4>
                <p>Flash 1.5 & Flash 2.0 with generative nuances.</p>
              </div>
              <span className="badge-api">BYO Key</span>
            </div>

            <div
              className={`provider-card ${provider === AI_PROVIDERS.OPENAI ? 'active' : ''}`}
              onClick={() => setProvider(AI_PROVIDERS.OPENAI)}
            >
              <div className="provider-icon">🧠</div>
              <div className="provider-info">
                <h4>OpenAI API</h4>
                <p>GPT-4o Mini or GPT-4o creative writing.</p>
              </div>
              <span className="badge-api">BYO Key</span>
            </div>
          </div>

          {/* Gemini Form */}
          {provider === AI_PROVIDERS.GEMINI && (
            <div className="api-config-section animate-fade-in">
              <div className="form-group">
                <label>Gemini API Key</label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="input-key"
                />
                <span className="field-hint">
                  Get a free Gemini API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">Google AI Studio</a>.
                </span>
              </div>

              <div className="form-group">
                <label>Gemini Model</label>
                <select
                  value={geminiModel}
                  onChange={(e) => setGeminiModel(e.target.value)}
                  className="select-model"
                >
                  {GEMINI_MODELS.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* OpenAI Form */}
          {provider === AI_PROVIDERS.OPENAI && (
            <div className="api-config-section animate-fade-in">
              <div className="form-group">
                <label>OpenAI API Key</label>
                <input
                  type="password"
                  placeholder="sk-..."
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  className="input-key"
                />
                <span className="field-hint">
                  Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer">OpenAI Platform</a>.
                </span>
              </div>

              <div className="form-group">
                <label>OpenAI Model</label>
                <select
                  value={openaiModel}
                  onChange={(e) => setOpenaiModel(e.target.value)}
                  className="select-model"
                >
                  {OPENAI_MODELS.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {testStatus && (
            <div className={`status-box ${testStatus.type}`}>
              {testStatus.message}
            </div>
          )}

          <div className="privacy-callout">
            🔒 <strong>Privacy First:</strong> API keys are stored strictly in your browser's private local storage. They are never sent to any intermediary server.
          </div>
        </div>

        <div className="modal-footer">
          {provider !== AI_PROVIDERS.OFFLINE && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleTestKey}
              disabled={testing}
            >
              {testing ? '🔄 Testing...' : '🔌 Test Connection'}
            </button>
          )}
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            💾 Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
