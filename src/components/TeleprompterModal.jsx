import { useState, useEffect, useRef, useCallback } from 'react';

export default function TeleprompterModal({ script, businessName, isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2); // 1 to 5
  const [fontSize, setFontSize] = useState(36); // px
  const [isMirrored, setIsMirrored] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');

  const scrollContainerRef = useRef(null);
  const videoRef = useRef(null);
  const animationFrameRef = useRef(null);
  const streamRef = useRef(null);

  // Stop camera helper
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }, []);

  // Close handler
  const handleClose = useCallback(() => {
    setIsPlaying(false);
    stopCamera();
    onClose();
  }, [onClose, stopCamera]);

  // Reset to top
  const handleReset = () => {
    setIsPlaying(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  // Toggle webcam rehearsal
  const toggleCamera = async () => {
    if (cameraActive) {
      stopCamera();
    } else {
      setCameraError('');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } catch (err) {
        console.error('Webcam access error:', err);
        setCameraError('Camera access denied or unavailable.');
      }
    }
  };

  // Teleprompter smooth auto-scroll loop
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    let lastTimestamp = performance.now();

    const scrollLoop = (timestamp) => {
      if (scrollContainerRef.current) {
        const delta = (timestamp - lastTimestamp) / 1000;
        const pixelsToScroll = scrollSpeed * 40 * delta;
        scrollContainerRef.current.scrollTop += pixelsToScroll;

        // Auto pause when reached end
        const atBottom =
          scrollContainerRef.current.scrollTop + scrollContainerRef.current.clientHeight >=
          scrollContainerRef.current.scrollHeight - 10;
        if (atBottom) {
          setIsPlaying(false);
          return;
        }
      }
      lastTimestamp = timestamp;
      animationFrameRef.current = requestAnimationFrame(scrollLoop);
    };

    animationFrameRef.current = requestAnimationFrame(scrollLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, scrollSpeed, isOpen]);

  // Handle keyboard shortcuts (Space to toggle, Esc to close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.code === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen || !script) return null;

  // Calculate total words in script
  const scriptText = Object.values(script).map(s => s.audio).join(' ');
  const wordCount = scriptText.trim().split(/\s+/).filter(Boolean).length;
  const estimatedSeconds = Math.round((wordCount / 140) * 60);

  return (
    <div className="teleprompter-overlay">
      <div className="teleprompter-backdrop" onClick={handleClose}></div>
      <div className="teleprompter-container">
        
        {/* Top Control Bar */}
        <div className="prompter-topbar">
          <div className="prompter-meta">
            <span className="prompter-title">🎥 UGC Creator Teleprompter</span>
            <span className="prompter-stats">
              {wordCount} words • ~{estimatedSeconds}s audio @ 140 WPM
            </span>
          </div>

          <div className="prompter-controls">
            <button
              type="button"
              className={`prompter-btn ${isPlaying ? 'btn-pause' : 'btn-play'}`}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸️ Pause (Space)' : '▶️ Start (Space)'}
            </button>

            <button
              type="button"
              className="prompter-btn btn-secondary"
              onClick={handleReset}
              title="Reset to top"
            >
              🔄 Reset
            </button>

            <div className="slider-control">
              <label>Speed: {scrollSpeed}x</label>
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.5"
                value={scrollSpeed}
                onChange={(e) => setScrollSpeed(parseFloat(e.target.value))}
              />
            </div>

            <div className="slider-control">
              <label>Size: {fontSize}px</label>
              <input
                type="range"
                min="24"
                max="56"
                step="2"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </div>

            <button
              type="button"
              className={`prompter-btn ${isMirrored ? 'btn-active' : ''}`}
              onClick={() => setIsMirrored(!isMirrored)}
              title="Mirror text horizontally for glass teleprompters"
            >
              🪞 Mirror
            </button>

            <button
              type="button"
              className={`prompter-btn ${cameraActive ? 'btn-camera-on' : ''}`}
              onClick={toggleCamera}
              title="Rehearse on camera"
            >
              {cameraActive ? '📷 Hide Cam' : '📷 Mirror Cam'}
            </button>

            <button
              type="button"
              className="prompter-close-btn"
              onClick={handleClose}
              title="Close Teleprompter (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {cameraError && (
          <div className="prompter-alert">{cameraError}</div>
        )}

        {/* Rehearsal Stage with Optional Webcam */}
        <div className={`prompter-viewport ${cameraActive ? 'with-camera' : ''}`}>
          {cameraActive && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="prompter-webcam"
            />
          )}

          {/* Reading Eye-Line Guide */}
          <div className="prompter-eyeline-marker">
            <span className="eyeline-tag">EYE LEVEL FOCUS</span>
          </div>

          {/* Scrollable Prompter Content */}
          <div
            ref={scrollContainerRef}
            className={`prompter-scroll-body ${isMirrored ? 'mirrored' : ''}`}
          >
            <div className="prompter-spacer"></div>

            <div className="prompter-brand-intro">
              <h2>{businessName || 'UGC Script'}</h2>
              <p>Look directly into the lens • Take a deep breath • Smile!</p>
            </div>

            {Object.entries(script).map(([key, sec]) => (
              <div key={key} className="prompter-scene-block">
                <div className="prompter-scene-header">
                  <span className="scene-badge">{sec.title}</span>
                  <span className="broll-pill">🎥 {sec.visual}</span>
                </div>
                <div
                  className="prompter-spoken-text"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  "{sec.audio}"
                </div>
              </div>
            ))}

            <div className="prompter-outro">
              <h3>🎬 Cut! Fantastic delivery!</h3>
              <p>Re-record tricky parts or export your script.</p>
            </div>

            <div className="prompter-spacer"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
