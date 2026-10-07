import React, { useState, useEffect, useRef } from 'react';

export default function AudioVoiceoverPlayer({ textToSpeak, label = 'Listen to Voiceover' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [rate, setRate] = useState(1);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlay = () => {
    if (!speechSupported || !textToSpeak) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel(); // clear queue

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Pick natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if ('speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  if (!speechSupported) return null;

  return (
    <div className="audio-voiceover-bar">
      <div className="audio-left">
        <button
          type="button"
          className={`btn-audio-play ${isPlaying ? 'playing' : ''}`}
          onClick={isPlaying ? handlePause : handlePlay}
          title={isPlaying ? 'Pause Speech' : 'Play Speech'}
        >
          {isPlaying ? '⏸️ Pause' : isPaused ? '▶️ Resume' : '🔊 Listen Voiceover'}
        </button>

        {(isPlaying || isPaused) && (
          <button
            type="button"
            className="btn-audio-stop"
            onClick={handleStop}
            title="Stop playback"
          >
            ⏹️
          </button>
        )}

        {isPlaying && (
          <div className="sound-wave-anim">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      <div className="audio-speed-control">
        <span className="speed-label">Speed:</span>
        <button
          type="button"
          className={`speed-pill ${rate === 0.9 ? 'active' : ''}`}
          onClick={() => setRate(0.9)}
        >
          0.9x
        </button>
        <button
          type="button"
          className={`speed-pill ${rate === 1.0 ? 'active' : ''}`}
          onClick={() => setRate(1.0)}
        >
          1.0x
        </button>
        <button
          type="button"
          className={`speed-pill ${rate === 1.15 ? 'active' : ''}`}
          onClick={() => setRate(1.15)}
        >
          1.2x
        </button>
      </div>
    </div>
  );
}
