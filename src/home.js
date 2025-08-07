import React, { useState, useEffect, useRef } from 'react';
import FuzzyText from './FuzzyText';
import MuteIcon from './Mute.png';
import UnmuteIcon from './Unmute.png';
import './App.css';

function Home() {
  const hoverIntensity = 0.5;
  const enableHover = true;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio(process.env.PUBLIC_URL + '/Background.mp3');
    audioRef.current.loop = true;

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

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        if (audioRef.current.readyState < 3) {
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

export default Home;
