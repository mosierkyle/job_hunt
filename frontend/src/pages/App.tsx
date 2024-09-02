import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './landing';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
      </Routes>
    </div>
  );
};

export default App;
