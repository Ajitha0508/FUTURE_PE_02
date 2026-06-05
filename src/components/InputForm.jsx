import React, { useState } from 'react';

const PLATFORMS = [
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#00F2FE' },
  { id: 'instagram', name: 'Instagram Reels', icon: '📸', color: '#E1306C' },
  { id: 'youtube', name: 'YouTube Shorts', icon: '🎥', color: '#FF0000' },
  { id: 'facebook', name: 'Facebook Ads', icon: '💙', color: '#1877F2' }
];

export default function InputForm({ onGenerate, isGenerating }) {
  const [formData, setFormData] = useState({
    businessName: '',
    product: '',
    audience: '',
    platform: 'tiktok'
  });
  
  const [errors, setErrors] = useState({});

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
      // Smooth scroll to top of form if errors
      const form = document.getElementById('input-form-card');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="card form-card" id="input-form-card">
      <div className="card-header">
        <span className="card-icon">⚙️</span>
        <h3>Ad Configuration</h3>
      </div>
      
      <div className="form-group">
        <label htmlFor="businessName">Business Name</label>
        <div className="input-wrapper">
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g. FitFlow"
            className={errors.businessName ? 'input-error' : ''}
          />
          {errors.businessName && <span className="error-text">{errors.businessName}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="product">Product or Service</label>
        <div className="input-wrapper">
          <textarea
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder="e.g. Smart water bottle that tracks hydration levels"
            rows="3"
            className={errors.product ? 'input-error' : ''}
          />
          {errors.product && <span className="error-text">{errors.product}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="audience">Target Audience</label>
        <div className="input-wrapper">
          <input
            type="text"
            id="audience"
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            placeholder="e.g. Busy gym-goers & health enthusiasts"
            className={errors.audience ? 'input-error' : ''}
          />
          {errors.audience && <span className="error-text">{errors.audience}</span>}
        </div>
      </div>

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

      <div className="action-divider"></div>

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
          🚀 Generate Complete Ad Pack
        </button>
      </div>
    </div>
  );
}
