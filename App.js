import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import InputPage from './components/InputPage';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

const theme = {
  colors: {
    primary: '#1a237e',
    secondary: '#3949ab',
    text: '#444',
    background: '#fff',
  },
  shadows: {
    card: '0 12px 30px rgba(0, 0, 0, 0.15)',
    button: '0 8px 20px rgba(26, 35, 126, 0.4)',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/input" element={<InputPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
