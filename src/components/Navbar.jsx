export default function Navbar({ onOpenHistory, historyCount = 0, onOpenSettings, aiProvider }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-section">
          <div className="logo-badge-icon">⚡</div>
          <div className="logo-text-group">
            <h1 className="logo-text">AI UGC <span className="gradient-text">Ad Studio Pro</span></h1>
            <span className="logo-subtag">Viral Video Scripts & Teleprompter</span>
          </div>
        </div>

        <div className="navbar-actions">
          <button
            type="button"
            className="nav-btn-vault"
            onClick={onOpenHistory}
            title="View saved script history"
          >
            <span>🗄️ Vault</span>
            {historyCount > 0 && <span className="vault-count-pill">{historyCount}</span>}
          </button>

          <button
            type="button"
            className="nav-btn-settings"
            onClick={onOpenSettings}
            title="Configure AI API & model settings"
          >
            <span>⚙️ AI Settings</span>
            <span className="ai-mode-pill">
              {aiProvider === 'gemini' ? 'Gemini' : aiProvider === 'openai' ? 'OpenAI' : 'Local'}
            </span>
          </button>

          <span className="badge badge-pulse">v3.0 Pro</span>
        </div>
      </div>
    </nav>
  );
}
