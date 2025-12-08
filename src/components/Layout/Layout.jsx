import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../Context/ThemeContext';

const Layout = () => {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
};

export default Layout;