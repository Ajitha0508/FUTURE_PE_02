import React, { useState } from 'react';

export default function HistoryModal({ isOpen, onClose, history, onLoadItem, onDeleteItem, onClearAll }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredHistory = (history || []).filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      (item.businessName || '').toLowerCase().includes(term) ||
      (item.product || '').toLowerCase().includes(term) ||
      (item.platform || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content history-modal">
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-icon">🗄️</span>
            <h3>Saved Scripts & History Vault</h3>
            <span className="badge-count">{history.length} Saved</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="history-search-row">
          <input
            type="text"
            placeholder="Search by brand name, product, or platform..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {history.length > 0 && (
            <button
              type="button"
              className="btn-text-danger"
              onClick={onClearAll}
              title="Delete all saved history"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="history-list">
          {filteredHistory.length === 0 ? (
            <div className="history-empty">
              <span className="empty-icon">📭</span>
              <p>No saved campaigns found.</p>
              <span className="empty-sub">When you generate UGC scripts, they will be archived here automatically!</span>
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div key={item.id} className="history-card">
                <div className="history-card-header">
                  <div>
                    <h4 className="history-brand">{item.businessName || 'Untitled Brand'}</h4>
                    <span className="history-platform-tag">{item.platform?.toUpperCase()}</span>
                    <span className="history-time">{new Date(item.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="history-card-actions">
                    <button
                      type="button"
                      className="btn-history-load"
                      onClick={() => {
                        onLoadItem(item);
                        onClose();
                      }}
                    >
                      🚀 Load Script
                    </button>
                    <button
                      type="button"
                      className="btn-history-delete"
                      onClick={() => onDeleteItem(item.id)}
                      title="Delete from history"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <p className="history-product-preview">{item.product}</p>
                {item.hooks && item.hooks[0] && (
                  <div className="history-hook-preview">
                    <strong>Top Hook:</strong> "{item.hooks[0]}"
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
