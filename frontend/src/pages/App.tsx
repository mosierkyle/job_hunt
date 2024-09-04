import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './landing';
import Home from './home';
import '../global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Landing></Landing>
      </div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
