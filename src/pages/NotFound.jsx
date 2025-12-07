import React from 'react';
import { useTheme } from '../Context/ThemeContext';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const NotFound = () => {
  const { theme } = useTheme();

  return (
    <div className={`not-found-page ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '6rem', color: theme === 'dark' ? '#9B2FFF' : '#667eea', marginBottom: '20px' }}>404</h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: theme === 'dark' ? '#f8f8f8' : '#222' }}>Page Not Found</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: theme === 'dark' ? '#aaa' : '#666' }}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          style={{
            display: 'inline-block',
            padding: '15px 30px',
            background: 'linear-gradient(135deg, #9B2FFF, #667eea)',
            color: 'white',
            borderRadius: '14px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 12px 25px rgba(155, 47, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;