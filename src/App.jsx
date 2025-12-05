import React from 'react';
// import Home from './pages/Home';
import Courses from './pages/Courses';
import { ThemeProvider } from './Context/ThemeContext';
import './styles/global.css';
import './styles/variables.css';
import './styles/animations.css';

function App() {
  return (
    <ThemeProvider>
     <Courses></Courses>
    </ThemeProvider>
  );
}

export default App;