import React from 'react';

export default function OutputCard({
  generatedData,
  activeTab,
  setActiveTab,
  isGenerating,
  onCopy,
  copySuccess
}) {
  
  // Helper to check if any data is present
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
          <p className="loader-subtext">Analyzing platform trends, hooks patterns, and CTA conversion signals.</p>
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
          <p>Fill out the configuration inputs on the left and click any generator button to start building your high-converting UGC assets.</p>
          <div className="demo-bubbles">
            <span>✨ 10 Scroll-Stopping Hooks</span>
            <span>🎬 60-Second Video Scripts</span>
            <span>⚡ Call-To-Action Options</span>
          </div>
        </div>
      </div>
    );
  }

  // Get current active platform name
  const getPlatformLabel = () => {
    const p = generatedData.platform;
    if (p === 'instagram') return 'Instagram Reels';
    if (p === 'youtube') return 'YouTube Shorts';
    if (p === 'facebook') return 'Facebook Ads';
    return 'TikTok';
  };

  const copyIndividualText = (text, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    const btn = e.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = '✅ Copied!';
    btn.classList.add('btn-copied');
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('btn-copied');
    }, 1500);
  };

  return (
    <div className="card output-card">
      <div className="card-header output-header">
        <div className="header-meta">
          <span className="card-icon">📊</span>
          <h3>Generated Output</h3>
          <span className="platform-badge" data-platform={generatedData.platform}>
            {getPlatformLabel()}
          </span>
        </div>
        <button className={`btn btn-copy ${copySuccess ? 'copied' : ''}`} onClick={onCopy}>
          {copySuccess ? '✅ Copied Pack!' : '📋 Copy Active Output'}
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="tabs-nav">
        <button
          className={`tab-btn ${activeTab === 'hooks' ? 'active' : ''}`}
          onClick={() => setActiveTab('hooks')}
        >
          🔥 Hooks
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
          ⚡ CTA
        </button>
        <button
          className={`tab-btn ${activeTab === 'captions' ? 'active' : ''}`}
          onClick={() => setActiveTab('captions')}
        >
          ✍️ Captions
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
            <div className="tab-intro">
              We generated 10 platform-optimized hooks. Use these in the first 3 seconds of your video to stop the scroll.
            </div>
            {generatedData.hooks.map((hook, i) => (
              <div key={i} className="hook-item">
                <span className="hook-number">#{i + 1}</span>
                <p className="hook-text">"{hook}"</p>
                <button
                  className="btn-mini-copy"
                  onClick={(e) => copyIndividualText(`"${hook}"`, e)}
                  title="Copy this hook"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}

        {/* UGC SCRIPT TAB */}
        {activeTab === 'script' && (
          <div className="script-timeline animate-fade-in">
            <div className="tab-intro">
              60-Second UGC Ad Script structured for high conversion. Record each segment as a separate clip.
            </div>
            {Object.entries(generatedData.script).map(([key, section]) => (
              <div key={key} className="timeline-node">
                <div className="node-marker"></div>
                <div className="node-card">
                  <div className="node-header">
                    <h5>{section.title}</h5>
                    <button
                      className="btn-mini-copy"
                      onClick={(e) => copyIndividualText(`${section.title}\nB-roll: ${section.visual}\nVoiceover: ${section.audio}`, e)}
                    >
                      Copy Step
                    </button>
                  </div>
                  <div className="node-body">
                    <div className="visual-cue">
                      <strong>🎥 Visual / B-Roll:</strong>
                      <p>{section.visual}</p>
                    </div>
                    <div className="audio-cue">
                      <strong>🎙️ Spoken Line (Voiceover):</strong>
                      <p className="spoken-text">"{section.audio}"</p>
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
              10 direct-response call-to-actions. Pick the one that aligns with your product goals.
            </div>
            <div className="cta-grid">
              {generatedData.ctas.map((cta, i) => (
                <div key={i} className="cta-item">
                  <div className="cta-header">
                    <span className="cta-badge">CTA #{i + 1}</span>
                    <button
                      className="btn-mini-copy"
                      onClick={(e) => copyIndividualText(`"${cta}"`, e)}
                    >
                      Copy
                    </button>
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
              5 social media captions matching the voice and platform of your product. Copy with emojis and hashtags.
            </div>
            {generatedData.captions.map((caption, i) => (
              <div key={i} className="caption-mockup">
                <div className="mockup-header">
                  <div className="avatar">🤖</div>
                  <div className="user-meta">
                    <span className="username">{generatedData.businessName || 'ad_creator'}</span>
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

        {/* COMPLETE PACK TAB */}
        {activeTab === 'all' && (
          <div className="adpack-container animate-fade-in">
            <div className="tab-intro">
              Full formatted text containing all generated hooks, scripts, CTAs, and captions. Perfect for exporting.
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
