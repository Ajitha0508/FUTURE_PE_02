import { useState } from 'react';
import AudioVoiceoverPlayer from './AudioVoiceoverPlayer';
import ABHookTester from './ABHookTester';
import { exportAsText, exportAsMarkdown, exportAsCSV, printScript } from '../utils/exportUtils';

export default function OutputCard({
  generatedData,
  setGeneratedData,
  activeTab,
  setActiveTab,
  isGenerating,
  onCopy,
  copySuccess,
  onOpenTeleprompter,
  onSaveToVault,
  onRegenerateItem
}) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const hasData = generatedData && Object.keys(generatedData).length > 0;

  // Render loading state with modern pulse effects
  if (isGenerating) {
    return (
      <div className="card output-card loading-state">
        <div className="loader-container">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
          <h3>AI Ad Strategist Writing...</h3>
          <p className="loader-subtext">Synthesizing audience hooks, emotional resonance, and viral pacing.</p>
          <div className="skeleton-container">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line-short"></div>
          </div>
        </div>
      </div>
    );
  }

  // Render empty/placeholder state if no data generated yet
  if (!hasData) {
    return (
      <div className="card output-card empty-state">
        <div className="empty-content">
          <div className="empty-graphic">🤖</div>
          <h3>Your AI Ad Script Board</h3>
          <p>Select any preset above or configure your brand details to generate scroll-stopping UGC assets.</p>
          <div className="demo-bubbles">
            <span>✨ 10 Scroll-Stopping Hooks</span>
            <span>🎬 60-Second Video Scripts</span>
            <span>🎥 Integrated Creator Teleprompter</span>
            <span>🔊 Voiceover Audio Studio</span>
            <span>🥊 A/B Hook Retention Simulator</span>
          </div>
        </div>
      </div>
    );
  }

  const getPlatformLabel = () => {
    const p = generatedData.platform;
    if (p === 'instagram') return 'Instagram Reels';
    if (p === 'youtube') return 'YouTube Shorts';
    if (p === 'facebook') return 'Facebook Ads';
    return 'TikTok';
  };

  const copyIndividualText = (text, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    navigator.clipboard.writeText(text);
    const btn = e?.currentTarget;
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = '✅ Copied!';
      btn.classList.add('btn-copied');
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('btn-copied');
      }, 1500);
    }
  };

  const handleSaveVault = () => {
    onSaveToVault(generatedData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Build full script audio text for TTS
  const fullScriptVoiceover = generatedData.script
    ? Object.values(generatedData.script).map(s => s.audio).join(' ')
    : '';

  // Inline edit handler for hooks
  const handleHookChange = (index, newText) => {
    const updated = [...generatedData.hooks];
    updated[index] = newText;
    setGeneratedData(prev => ({ ...prev, hooks: updated }));
  };

  // Inline edit handler for script steps
  const handleScriptChange = (key, field, newText) => {
    setGeneratedData(prev => ({
      ...prev,
      script: {
        ...prev.script,
        [key]: {
          ...prev.script[key],
          [field]: newText
        }
      }
    }));
  };

  return (
    <div className="card output-card">
      {/* Top Header */}
      <div className="card-header output-header">
        <div className="header-meta">
          <span className="card-icon">📊</span>
          <div className="title-group">
            <h3>{generatedData.businessName || 'Generated Output'}</h3>
            <span className="platform-badge" data-platform={generatedData.platform}>
              {getPlatformLabel()}
            </span>
          </div>
        </div>

        <div className="header-actions">
          {generatedData.script && (
            <button
              type="button"
              className="btn btn-prompter-launch"
              onClick={onOpenTeleprompter}
              title="Launch teleprompter with auto-scroll and webcam rehearsal"
            >
              🎥 Teleprompter
            </button>
          )}

          <button
            type="button"
            className={`btn btn-save-vault ${saveSuccess ? 'saved' : ''}`}
            onClick={handleSaveVault}
            title="Save to local history vault"
          >
            {saveSuccess ? '⭐ Saved!' : '⭐ Save Vault'}
          </button>

          <div className="export-dropdown-wrapper">
            <button
              type="button"
              className="btn btn-export"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              📥 Export ▼
            </button>

            {showExportMenu && (
              <div className="export-menu-dropdown animate-fade-in">
                <button
                  type="button"
                  onClick={() => {
                    exportAsText(generatedData);
                    setShowExportMenu(false);
                  }}
                >
                  📄 Download .TXT
                </button>
                <button
                  type="button"
                  onClick={() => {
                    exportAsMarkdown(generatedData);
                    setShowExportMenu(false);
                  }}
                >
                  📝 Download Markdown (.md)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    exportAsCSV(generatedData);
                    setShowExportMenu(false);
                  }}
                >
                  🎬 CapCut Cue Sheet (.csv)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    printScript(generatedData);
                    setShowExportMenu(false);
                  }}
                >
                  🖨️ Print / Save PDF
                </button>
              </div>
            )}
          </div>

          <button className={`btn btn-copy ${copySuccess ? 'copied' : ''}`} onClick={onCopy}>
            {copySuccess ? '✅ Copied!' : '📋 Copy Output'}
          </button>
        </div>
      </div>

      {/* Tabs Nav */}
      <div className="tabs-nav">
        <button
          className={`tab-btn ${activeTab === 'hooks' ? 'active' : ''}`}
          onClick={() => setActiveTab('hooks')}
        >
          🔥 Hooks ({generatedData.hooks?.length || 0})
        </button>
        <button
          className={`tab-btn ${activeTab === 'script' ? 'active' : ''}`}
          onClick={() => setActiveTab('script')}
        >
          🎬 UGC Script
        </button>
        <button
          className={`tab-btn ${activeTab === 'cta' ? 'active' : ''}`}
          onClick={() => setActiveTab('cta')}
        >
          ⚡ CTA ({generatedData.ctas?.length || 0})
        </button>
        <button
          className={`tab-btn ${activeTab === 'captions' ? 'active' : ''}`}
          onClick={() => setActiveTab('captions')}
        >
          ✍️ Captions
        </button>
        <button
          className={`tab-btn ${activeTab === 'ab' ? 'active' : ''}`}
          onClick={() => setActiveTab('ab')}
        >
          🥊 A/B Battle
        </button>
        <button
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          📦 Complete Pack
        </button>
      </div>

      <div className="tab-content">
        
        {/* HOOKS TAB */}
        {activeTab === 'hooks' && (
          <div className="hooks-list animate-fade-in">
            <div className="tab-intro-row">
              <span className="tab-intro-text">
                10 scroll-stopping hooks tailored to your audience. Click any text to edit directly!
              </span>
              <button
                type="button"
                className="btn-pill-subtle"
                onClick={() => setActiveTab('ab')}
              >
                🥊 Test Hooks in A/B Battle
              </button>
            </div>

            {generatedData.hooks?.map((hook, i) => (
              <div key={i} className="hook-item">
                <span className="hook-number">#{i + 1}</span>
                <input
                  type="text"
                  value={hook}
                  onChange={(e) => handleHookChange(i, e.target.value)}
                  className="hook-input-editable"
                  title="Click to edit hook text"
                />
                <div className="hook-actions">
                  <button
                    className="btn-mini-regen"
                    onClick={() => onRegenerateItem('hooks', i)}
                    title="Regenerate this specific hook"
                  >
                    🔄
                  </button>
                  <button
                    className="btn-mini-copy"
                    onClick={(e) => copyIndividualText(`"${hook}"`, e)}
                    title="Copy this hook"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* UGC SCRIPT TAB */}
        {activeTab === 'script' && (
          <div className="script-timeline animate-fade-in">
            <div className="tab-intro-row">
              <span className="tab-intro-text">
                Structured UGC video timeline. Record each segment as a separate take.
              </span>
              <button
                type="button"
                className="btn-prompter-accent"
                onClick={onOpenTeleprompter}
              >
                🎥 Launch Teleprompter
              </button>
            </div>

            {/* Master Audio Voiceover Bar for entire script */}
            {fullScriptVoiceover && (
              <div className="script-audio-master">
                <span className="master-audio-label">🎙️ Voiceover Audition:</span>
                <AudioVoiceoverPlayer textToSpeak={fullScriptVoiceover} />
              </div>
            )}

            {generatedData.script && Object.entries(generatedData.script).map(([key, section]) => (
              <div key={key} className="timeline-node">
                <div className="node-marker"></div>
                <div className="node-card">
                  <div className="node-header">
                    <h5>{section.title}</h5>
                    <div className="node-header-actions">
                      <AudioVoiceoverPlayer textToSpeak={section.audio} />
                      <button
                        className="btn-mini-regen"
                        onClick={() => onRegenerateItem('scriptStep', key)}
                        title="Regenerate this scene step"
                      >
                        🔄
                      </button>
                      <button
                        className="btn-mini-copy"
                        onClick={(e) => copyIndividualText(`${section.title}\nB-roll: ${section.visual}\nVoiceover: "${section.audio}"`, e)}
                      >
                        Copy Step
                      </button>
                    </div>
                  </div>
                  <div className="node-body">
                    <div className="visual-cue">
                      <strong>🎥 Visual / B-Roll Cue:</strong>
                      <textarea
                        rows="2"
                        value={section.visual}
                        onChange={(e) => handleScriptChange(key, 'visual', e.target.value)}
                        className="editable-cue-textarea"
                      />
                    </div>
                    <div className="audio-cue">
                      <strong>🎙️ Spoken Line (Voiceover):</strong>
                      <textarea
                        rows="2"
                        value={section.audio}
                        onChange={(e) => handleScriptChange(key, 'audio', e.target.value)}
                        className="editable-voice-textarea"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA TAB */}
        {activeTab === 'cta' && (
          <div className="cta-list animate-fade-in">
            <div className="tab-intro">
              10 direct-response call-to-actions. Pick the one that aligns with your campaign goals.
            </div>
            <div className="cta-grid">
              {generatedData.ctas?.map((cta, i) => (
                <div key={i} className="cta-item">
                  <div className="cta-header">
                    <span className="cta-badge">CTA #{i + 1}</span>
                    <div className="cta-actions">
                      <button
                        className="btn-mini-regen"
                        onClick={() => onRegenerateItem('cta', i)}
                        title="Regenerate this CTA"
                      >
                        🔄
                      </button>
                      <button
                        className="btn-mini-copy"
                        onClick={(e) => copyIndividualText(`"${cta}"`, e)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <p className="cta-text">"{cta}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CAPTIONS TAB */}
        {activeTab === 'captions' && (
          <div className="captions-list animate-fade-in">
            <div className="tab-intro">
              Social media captions matching platform style and emojis. Ready to paste!
            </div>
            {generatedData.captions?.map((caption, i) => (
              <div key={i} className="caption-mockup">
                <div className="mockup-header">
                  <div className="avatar">🤖</div>
                  <div className="user-meta">
                    <span className="username">{generatedData.businessName ? generatedData.businessName.toLowerCase().replace(/\s+/g, '_') : 'brand_creator'}</span>
                    <span className="sponsored">Sponsored</span>
                  </div>
                  <button
                    className="btn-mini-copy"
                    onClick={(e) => copyIndividualText(caption, e)}
                  >
                    Copy Caption
                  </button>
                </div>
                <div className="mockup-body">
                  <p>{caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* A/B HOOK BATTLE TAB */}
        {activeTab === 'ab' && (
          <ABHookTester hooks={generatedData.hooks || []} />
        )}

        {/* COMPLETE PACK TAB */}
        {activeTab === 'all' && (
          <div className="adpack-container animate-fade-in">
            <div className="tab-intro-row">
              <span className="tab-intro-text">
                Full consolidated campaign document. Select all or use the export tools above!
              </span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => exportAsMarkdown(generatedData)}
              >
                📝 Export .MD
              </button>
            </div>
            <textarea
              readOnly
              value={generatedData.all}
              className="adpack-textarea"
              onClick={(e) => e.target.select()}
            />
          </div>
        )}

      </div>
    </div>
  );
}
