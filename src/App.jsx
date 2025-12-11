import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import Header from './components/Shared/Header/Header';
import Footer from './components/Shared/Footer/Footer';
import ScrollToTop from './components/Shared/ScrollTop/ScrollToTop';
import './styles/global.css';
import './styles/variables.css';
import './styles/animations.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <ScrollToTop />
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;