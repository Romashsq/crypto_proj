import React from 'react';
import Home from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';
import './styles/variables.css';
import './styles/animations.css';

function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}

export default App;