import React, { useEffect } from 'react';
import FuzzyText from './FuzzyText';
import './App.css';

function App() {
  const hoverIntensity = 0.5;
  const enableHover = true;

  // Play background music on mount
  useEffect(() => {
    const backgroundAudio = new Audio('./Background.mp3');
    backgroundAudio.loop = true; // Loop the music
    backgroundAudio.play().catch(error => console.log("Audio play failed:", error));
    
    // Cleanup on unmount
    return () => {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
    };
  }, []);

  return (
    <div className="app-container">
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