import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-section">
          <span className="logo-icon">⚡</span>
          <h1 className="logo-text">AI UGC <span className="gradient-text">Ad Script Generator</span></h1>
        </div>
        <div className="navbar-links">
          <span className="badge badge-pulse">v2.0 Beta</span>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="nav-link">
            Docs
          </a>
        </div>
      </div>
    </nav>
  );
}
