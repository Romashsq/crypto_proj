import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import { SavedLessonsProvider } from './context/SavedLessonsContext';
import Header from './components/Shared/Header/Header';
import Footer from './components/Shared/Footer/Footer';
import ScrollToTop from './components/Shared/ScrollTop/ScrollToTop';
import './styles/global.css';
import './styles/variables.css';
import './styles/animations.css';

function App() {
  const location = useLocation();

  const noLayoutPaths = ['/signup', '/login'];
  
  const shouldShowLayout = !noLayoutPaths.some(path => 
    location.pathname === path || 
    location.pathname.startsWith(path + '/')
  );

  return (
    <ThemeProvider>
      <SavedLessonsProvider>
        <div className="app">
          <ScrollToTop />
          {shouldShowLayout && <Header />}
          <main className="main-content">
            <Outlet />
          </main>
          {shouldShowLayout && <Footer />}
        </div>
      </SavedLessonsProvider>
    </ThemeProvider>
  );
}

export default App;