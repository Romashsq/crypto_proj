// src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import './styles/global.css';
import './styles/variables.css';
import './styles/animations.css';

function App() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}

export default App;