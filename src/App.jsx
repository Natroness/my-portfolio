import React from 'react';
import TrueFocus from './TrueFocus';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="content">
        <h1 className="main-title">
          <TrueFocus
            blurAmount={5}
            borderColor="green"
            glowColor="rgba(0,255,0,0.6)"
            animationDuration={0.4}
            manualMode={true}
          >
            Hello its me
          </TrueFocus>
        </h1>
        
        <p className="description">
          Hover over any word to see the TrueFocus effect in action!
        </p>
      </div>
    </div>
  );
}

export default App;
