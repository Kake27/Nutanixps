import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './landingPage';
import InputPage from './inputPage';

function App() {


  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/input" element={<InputPage />} />
        </Routes>
    </Router>
  )
}

export default App
