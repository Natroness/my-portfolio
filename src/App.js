import React, { useState, useEffect, useRef } from 'react';
import FuzzyText from './FuzzyText';
import './App.css';
import MuteIcon from './Mute.png';
import UnmuteIcon from './Unmute.png';

function App() {
  const hoverIntensity = 0.5;
  const enableHover = true;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [showPrompt, setShowPrompt] = useState(true);

  // Initialize audio with proper path
  useEffect(() => {
    audioRef.current = new Audio(process.env.PUBLIC_URL + '/Background.mp3');
    audioRef.current.loop = true;
    
    // Add error listener
    audioRef.current.addEventListener('error', (e) => {
      console.error('Audio error:', e);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Reliable toggle function
  const toggleAudio = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        // First ensure audio is loaded
        if (audioRef.current.readyState === 0) { // HAVE_NOTHING
          await new Promise((resolve) => {
            audioRef.current.addEventListener('canplaythrough', resolve, { once: true });
          });
        }
        await audioRef.current.play();
        setShowPrompt(false);
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Audio playback failed:", error);
      setShowPrompt(true);
      alert("Couldn't play audio. Please interact with the page first.");
    }
  };

  return (
    <div className="app-container">
      <button 
        className={`music-toggle ${isPlaying ? 'playing' : ''}`}
        onClick={toggleAudio}
        aria-label={isPlaying ? "Mute music" : "Unmute music"}
      >
        <img 
          src={isPlaying ? UnmuteIcon : MuteIcon} 
          alt={isPlaying ? "Mute" : "Unmute"}
          className="music-icon"
        />
      </button>

      {showPrompt && (
        <div className="audio-prompt">
          Click the speaker to enable music
        </div>
      )}

      <FuzzyText 
        baseIntensity={0.2} 
        hoverIntensity={hoverIntensity} 
        enableHover={enableHover}
      >
        Hi! It's Me Nikesh.
      </FuzzyText>
    </div>
  );
}

export default App;