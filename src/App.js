import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import CarShowcase from './CarShowcase';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/car">Car Showcase</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car" element={<CarShowcase />} />
      </Routes>
    </Router>
  );
}

export default App;
