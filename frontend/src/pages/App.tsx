import React from 'react';
import NavBar from './landing/components/nav';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Landing from './landing';
import '../global.css';

function App() {
  return (
    <div className="App">
      <Landing></Landing>
    </div>
  );
}

export default App;
