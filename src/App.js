import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Index';
import Login from './pages/Login/Index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
