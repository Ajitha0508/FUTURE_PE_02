import { useState } from 'react';
import { FRAMEWORKS, TONES, DURATIONS, LANGUAGES } from '../utils/generators';

const PLATFORMS = [
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#00F2FE' },
  { id: 'instagram', name: 'Instagram Reels', icon: '📸', color: '#E1306C' },
  { id: 'youtube', name: 'YouTube Shorts', icon: '🎥', color: '#FF0000' },
  { id: 'facebook', name: 'Facebook Ads', icon: '💙', color: '#1877F2' }
];

export default function InputForm({ onGenerate, isGenerating, activePreset, onOpenSettings, aiProvider }) {
  const [formData, setFormData] = useState({
    businessName: '',
    product: '',
    audience: '',
    platform: 'tiktok',
    framework: 'pas',
    tone: 'authentic',
    duration: '60s',
    language: 'en',
    painPoint: '',
    offer: ''
  });

  const [prevPreset, setPrevPreset] = useState(activePreset);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errors, setErrors] = useState({});

  // Sync state when activePreset changes without useEffect
  if (activePreset !== prevPreset) {
    setPrevPreset(activePreset);
    if (activePreset) {
      setFormData({
        businessName: activePreset.businessName || '',
        product: activePreset.product || '',
        audience: activePreset.audience || '',
        platform: activePreset.platform || 'tiktok',
        framework: activePreset.framework || 'pas',
        tone: activePreset.tone || 'authentic',
        duration: activePreset.duration || '60s',
        language: activePreset.language || 'en',
        painPoint: activePreset.painPoint || '',
        offer: activePreset.offer || ''
      });
      setErrors({});
      if (activePreset.painPoint || activePreset.offer) {
        setShowAdvanced(true);
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlatformSelect = (platformId) => {
    setFormData(prev => ({ ...prev, platform: platformId }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.businessName.trim()) newErrors.businessName = 'Business Name is required';
    if (!formData.product.trim()) newErrors.product = 'Product or Service is required';
    if (!formData.audience.trim()) newErrors.audience = 'Target Audience is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const triggerGeneration = (type) => {
    if (validateForm()) {
      onGenerate(type, formData);
    } else {
      const form = document.getElementById('input-form-card');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="card form-card" id="input-form-card">
      <div className="card-header">
        <div className="card-header-title">
          <span className="card-icon">⚙️</span>
          <h3>Ad Campaign Studio</h3>
        </div>
        <button
          type="button"
          className="btn-engine-badge"
          onClick={onOpenSettings}
          title="Click to configure AI engine & API keys"
        >
          {aiProvider === 'gemini' ? '✨ Gemini Active' : aiProvider === 'openai' ? '🧠 OpenAI Active' : '⚡ Local AI'}
        </button>
      </div>

      {/* Basic Inputs */}
      <div className="form-group">
        <label htmlFor="businessName">Brand / Business Name</label>
        <div className="input-wrapper">
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g. FitFlow, Lumina Glow, SaaSApp"
            className={errors.businessName ? 'input-error' : ''}
          />
          {errors.businessName && <span className="error-text">{errors.businessName}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="product">Product or Service Description</label>
        <div className="input-wrapper">
          <textarea
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder="e.g. Smart hydration tracking water bottle that syncs with Apple Health & Garmin"
            rows="3"
            className={errors.product ? 'input-error' : ''}
          />
          {errors.product && <span className="error-text">{errors.product}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="audience">Target Audience / Persona</label>
        <div className="input-wrapper">
          <input
            type="text"
            id="audience"
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            placeholder="e.g. Busy gym-goers, remote founders, college students"
            className={errors.audience ? 'input-error' : ''}
          />
          {errors.audience && <span className="error-text">{errors.audience}</span>}
        </div>
      </div>

      {/* Target Platform */}
      <div className="form-group">
        <label>Target Platform</label>
        <div className="platform-grid">
          {PLATFORMS.map((plat) => {
            const isSelected = formData.platform === plat.id;
            return (
              <button
                key={plat.id}
                type="button"
                className={`platform-btn ${isSelected ? 'selected' : ''}`}
                style={{ '--platform-color': plat.color }}
                onClick={() => handlePlatformSelect(plat.id)}
              >
                <span className="platform-icon">{plat.icon}</span>
                <span className="platform-name">{plat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Framework & Tone Selectors */}
      <div className="form-row-grid">
        <div className="form-group">
          <label htmlFor="framework">Copywriting Framework</label>
          <select
            id="framework"
            name="framework"
            value={formData.framework}
            onChange={handleChange}
            className="select-styled"
          >
            {FRAMEWORKS.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tone">Tone of Voice</label>
          <select
            id="tone"
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="select-styled"
          >
            {TONES.map(t => (
              <option key={t.id} value={t.id}>{t.icon} {t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Duration & Language Selectors */}
      <div className="form-row-grid">
        <div className="form-group">
          <label htmlFor="duration">Target Duration</label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="select-styled"
          >
            {DURATIONS.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="language">Script Language</label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="select-styled"
          >
            {LANGUAGES.map(l => (
              <option key={l.id} value={l.id}>{l.flag} {l.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Inputs Accordion */}
      <div className="advanced-accordion">
        <button
          type="button"
          className="advanced-toggle-btn"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <span>{showAdvanced ? '▼' : '▶'} Advanced Strategy (Pain Point & Promo Offer)</span>
          <span className="optional-badge">Optional</span>
        </button>

        {showAdvanced && (
          <div className="advanced-content animate-fade-in">
            <div className="form-group">
              <label htmlFor="painPoint">Specific Pain Point / Frustration</label>
              <input
                type="text"
                id="painPoint"
                name="painPoint"
                value={formData.painPoint}
                onChange={handleChange}
                placeholder="e.g. Wasting 3 hours everyday sorting messy receipts"
              />
            </div>

            <div className="form-group">
              <label htmlFor="offer">Special Launch Offer / Promo Code</label>
              <input
                type="text"
                id="offer"
                name="offer"
                value={formData.offer}
                onChange={handleChange}
                placeholder="e.g. SAVE20, BUY1GET1, VIPPASS"
              />
            </div>
          </div>
        )}
      </div>

      <div className="action-divider"></div>

      {/* Generation Actions */}
      <div className="generator-actions">
        <h4>Select Output to Generate:</h4>
        <div className="action-grid">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => triggerGeneration('hooks')}
            disabled={isGenerating}
          >
            🔥 Generate Hooks
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => triggerGeneration('script')}
            disabled={isGenerating}
          >
            🎬 Generate UGC Script
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => triggerGeneration('cta')}
            disabled={isGenerating}
          >
            ⚡ Generate CTA
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => triggerGeneration('captions')}
            disabled={isGenerating}
          >
            ✍️ Generate Captions
          </button>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => triggerGeneration('all')}
          disabled={isGenerating}
        >
          {isGenerating ? '⚡ Synthesizing Creative Pack...' : '🚀 Generate Complete Ad Pack'}
        </button>
      </div>
    </div>
  );
}
