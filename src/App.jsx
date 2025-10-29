import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Redirect directly to the dashboard (static site being served on 8080)
    const target = 'http://localhost:8080/index.html';
    if (window.location.href !== target) {
      window.location.replace(target);
    }
  }, []);

  return null;
}

export default App;
