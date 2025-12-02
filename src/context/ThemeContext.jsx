import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('flow-theme') || 'light';
    setTheme(savedTheme);
    
    // Удаляем все классы тем и добавляем нужный
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(`${savedTheme}-mode`);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('flow-theme', newTheme);
    
    // Удаляем все классы тем и добавляем нужный
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(`${newTheme}-mode`);
  };

  const value = {
    theme,
    toggleTheme,
    isDarkMode: theme === 'dark',
    isLightMode: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};