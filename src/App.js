import React, { useState, useEffect, useRef } from 'react';
import FuzzyText from './FuzzyText';
import './App.css';
import MuteIcon from './Mute.png';
import UnmuteIcon from './Unmute.png';
import WarningBanner from './components/WarningBanner';



function App() {
  const hoverIntensity = 0.5;
  const enableHover = true;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [showPrompt, setShowPrompt] = useState(true);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(process.env.PUBLIC_URL + '/Background.mp3');
    audioRef.current.loop = true;
    
    // Error handling
    const handleError = (e) => {
      console.error('Audio error:', e);
      setShowPrompt(true);
    };
    
    audioRef.current.addEventListener('error', handleError);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Toggle audio with robust state handling
  const toggleAudio = async () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        // Ensure audio is ready
        if (audioRef.current.readyState < 3) { // < HAVE_FUTURE_DATA
          await new Promise((resolve) => {
            audioRef.current.addEventListener('canplay', resolve, { once: true });
          });
        }
        await audioRef.current.play();
        setShowPrompt(false);
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Playback failed:", error);
      setShowPrompt(true);
    }
  };

  return (
    <div className="app-container">
      {/* Music Toggle Button */}
      <button 
        className={`music-toggle ${isPlaying ? 'playing' : ''}`}
        onClick={toggleAudio}
        aria-label={isPlaying ? "Mute music" : "Unmute music"}
      >
        <img 
          src={isPlaying ? UnmuteIcon : MuteIcon} 
          alt={isPlaying ? "Mute" : "Unmute"}
          className="music-icon"
          onError={(e) => console.error('Icon failed to load:', e.target.src)}
        />
      </button>

      {/* Audio Prompt */}
      {showPrompt && (
        <div className="audio-prompt">
          Click the speaker to enable music
        </div>
      )}

      {/* Warning Banner (Your custom notice card) */}
      <WarningBanner
        headerText="Before you proceed..."
        bodyText="Marked by code, driven by design. Enter if you dare to witness the lair."
        confirmLabel="Enter the Lair"
      />

      {/* Main Content */}
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