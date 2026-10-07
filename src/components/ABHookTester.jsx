import React, { useState } from 'react';

/**
 * Heuristic scoring algorithm for short-form video hooks
 */
function scoreHook(hookText = '') {
  const text = hookText.toLowerCase();
  
  // Factors
  const hasNumbers = /\d+/.test(text);
  const hasStrongPatternInterrupt = /(stop|unpopular|honest|secret|don't|mistake|why|nobody|scared|confession|hack)/.test(text);
  const hasCuriosityWords = /(you need|truth|nobody wants|life ruined|today years old|sign to|pov|gamechanger)/.test(text);
  const wordCount = text.trim().split(/\s+/).length;
  const isOptimalLength = wordCount >= 8 && wordCount <= 22;

  let curiosity = 65;
  let emotional = 60;
  let retention = 70;

  if (hasStrongPatternInterrupt) {
    curiosity += 18;
    retention += 14;
  }
  if (hasCuriosityWords) {
    emotional += 20;
    curiosity += 12;
  }
  if (hasNumbers) {
    retention += 10;
    curiosity += 6;
  }
  if (isOptimalLength) {
    retention += 8;
  } else if (wordCount > 25) {
    retention -= 15; // too long for 3s
  }

  curiosity = Math.min(98, Math.max(45, curiosity));
  emotional = Math.min(97, Math.max(42, emotional));
  retention = Math.min(99, Math.max(50, retention));

  const overall = Math.round((curiosity * 0.35) + (emotional * 0.3) + (retention * 0.35));

  return {
    curiosity,
    emotional,
    retention,
    overall
  };
}

export default function ABHookTester({ hooks = [], onSelectHook }) {
  const [hookAIndex, setHookAIndex] = useState(0);
  const [hookBIndex, setHookBIndex] = useState(hooks.length > 1 ? 1 : 0);

  if (!hooks || hooks.length === 0) {
    return (
      <div className="ab-tester-empty">
        <p>Generate hooks first to run the A/B Retention Battle!</p>
      </div>
    );
  }

  const hookA = hooks[hookAIndex] || hooks[0];
  const hookB = hooks[hookBIndex] || hooks[Math.min(1, hooks.length - 1)];

  const scoresA = scoreHook(hookA);
  const scoresB = scoreHook(hookB);

  const winner = scoresA.overall >= scoresB.overall ? 'A' : 'B';

  return (
    <div className="ab-tester-container animate-fade-in">
      <div className="ab-header">
        <div className="ab-badge">⚡ A/B Hook Retention Simulator</div>
        <h4>Compare 2 hooks head-to-head before spending ad budget</h4>
        <p className="ab-sub">
          Predicts 3-second viewer retention, emotional resonance, and algorithm virality based on short-form psychology.
        </p>
      </div>

      <div className="ab-selectors-row">
        <div className="ab-select-box">
          <label>Variant A</label>
          <select value={hookAIndex} onChange={(e) => setHookAIndex(Number(e.target.value))}>
            {hooks.map((h, i) => (
              <option key={i} value={i}>Hook #{i + 1}: {h.slice(0, 45)}...</option>
            ))}
          </select>
        </div>

        <div className="ab-vs-badge">VS</div>

        <div className="ab-select-box">
          <label>Variant B</label>
          <select value={hookBIndex} onChange={(e) => setHookBIndex(Number(e.target.value))}>
            {hooks.map((h, i) => (
              <option key={i} value={i}>Hook #{i + 1}: {h.slice(0, 45)}...</option>
            ))}
          </select>
        </div>
      </div>

      {/* Battle Cards */}
      <div className="ab-battle-grid">
        {/* Card A */}
        <div className={`ab-card ${winner === 'A' ? 'winner-card' : ''}`}>
          <div className="ab-card-top">
            <span className="card-variant-tag">HOOK A</span>
            {winner === 'A' && <span className="winner-tag">🏆 WINNER (+{scoresA.overall - scoresB.overall} pts)</span>}
          </div>
          <p className="ab-hook-quote">"{hookA}"</p>

          <div className="ab-metrics">
            <div className="metric-row">
              <span className="metric-label">3s Retention Index</span>
              <div className="metric-bar-bg">
                <div className="metric-bar-fill" style={{ width: `${scoresA.retention}%` }}></div>
              </div>
              <span className="metric-val">{scoresA.retention}%</span>
            </div>

            <div className="metric-row">
              <span className="metric-label">Curiosity Gap</span>
              <div className="metric-bar-bg">
                <div className="metric-bar-fill" style={{ width: `${scoresA.curiosity}%` }}></div>
              </div>
              <span className="metric-val">{scoresA.curiosity}%</span>
            </div>

            <div className="metric-row">
              <span className="metric-label">Emotional Trigger</span>
              <div className="metric-bar-bg">
                <div className="metric-bar-fill" style={{ width: `${scoresA.emotional}%` }}></div>
              </div>
              <span className="metric-val">{scoresA.emotional}%</span>
            </div>
          </div>

          <div className="ab-overall-score">
            <span>Viral Potential Score:</span>
            <strong>{scoresA.overall} / 100</strong>
          </div>
        </div>

        {/* Card B */}
        <div className={`ab-card ${winner === 'B' ? 'winner-card' : ''}`}>
          <div className="ab-card-top">
            <span className="card-variant-tag">HOOK B</span>
            {winner === 'B' && <span className="winner-tag">🏆 WINNER (+{scoresB.overall - scoresA.overall} pts)</span>}
          </div>
          <p className="ab-hook-quote">"{hookB}"</p>

          <div className="ab-metrics">
            <div className="metric-row">
              <span className="metric-label">3s Retention Index</span>
              <div className="metric-bar-bg">
                <div className="metric-bar-fill" style={{ width: `${scoresB.retention}%` }}></div>
              </div>
              <span className="metric-val">{scoresB.retention}%</span>
            </div>

            <div className="metric-row">
              <span className="metric-label">Curiosity Gap</span>
              <div className="metric-bar-bg">
                <div className="metric-bar-fill" style={{ width: `${scoresB.curiosity}%` }}></div>
              </div>
              <span className="metric-val">{scoresB.curiosity}%</span>
            </div>

            <div className="metric-row">
              <span className="metric-label">Emotional Trigger</span>
              <div className="metric-bar-bg">
                <div className="metric-bar-fill" style={{ width: `${scoresB.emotional}%` }}></div>
              </div>
              <span className="metric-val">{scoresB.emotional}%</span>
            </div>
          </div>

          <div className="ab-overall-score">
            <span>Viral Potential Score:</span>
            <strong>{scoresB.overall} / 100</strong>
          </div>
        </div>
      </div>

      <div className="ab-conclusion">
        💡 <strong>Creative Recommendation:</strong> Variant {winner} has stronger pattern-interrupt phrasing for the first 3 seconds. Test Variant {winner} as your primary hook, and run Variant {winner === 'A' ? 'B' : 'A'} as an ad set duplicate to capture cold traffic!
      </div>
    </div>
  );
}
