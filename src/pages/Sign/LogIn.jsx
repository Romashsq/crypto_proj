import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sign.module.css'; // Используем те же стили
import { useTheme } from '../../Context/ThemeContext';
import { Moon, Sun } from '../../assets/Icons';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      alert('Please enter your email');
      return;
    }
    
    if (!formData.password) {
      alert('Please enter your password');
      return;
    }
    
    // Имитация входа
    console.log('Login submitted:', formData);
    alert('Login successful! Welcome back!');
    
    // Перенаправление на главную
    navigate('/');
    
    setFormData({
      email: '',
      password: '',
      rememberMe: false
    });
  };

  const handleSocialLogin = (provider) => {
    alert(`Would connect with ${provider} (demo)`);
  };

  const handleForgotPassword = () => {
    alert('Password reset would be sent to your email');
  };

  return (
    <div className={`${styles.signupPage} ${theme === 'dark' ? styles.darkMode : ''}`}>
      {/* Кнопка Back to Home слева */}
      <Link to="/" className={styles.backHomeBtn}>
        <i className="fas fa-arrow-left"></i>
        <span>Back to Home</span>
      </Link>

      {/* Кнопка переключения темы справа */}
      <button 
        className={styles.themeToggleBtn}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        title={`${theme === 'light' ? 'Dark' : 'Light'} theme`}
      >
        {theme === 'light' ? (
          <Moon 
            width={22} 
            height={22} 
            className={styles.themeIcon}
          />
        ) : (
          <Sun 
            width={22} 
            height={22} 
            className={styles.themeIcon}
          />
        )}
      </button>

      <div className={styles.signupContainer}>
        <div className={styles.signupLogo}>
          <div className={styles.logoIcon}>
            <i className="fas fa-chart-line"></i>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to continue your crypto journey</p>
        </div>

        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email Address</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                className={styles.formInput}
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <i className={`fas fa-envelope ${styles.inputIcon}`}></i>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={styles.formInput}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button 
                type="button" 
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
            <label htmlFor="rememberMe">
              Remember me
            </label>
            
            <button 
              type="button" 
              className={styles.forgotPasswordBtn}
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className={styles.signupBtn}>
            <i className="fas fa-sign-in-alt"></i>
            Log In
          </button>
        </form>

        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        <div className={styles.socialButtons}>
          <button 
            type="button" 
            className={`${styles.socialBtn} ${styles.google}`}
            onClick={() => handleSocialLogin('Google')}
          >
            <i className="fab fa-google"></i>
            Continue with Google
          </button>
          
          <button 
            type="button" 
            className={`${styles.socialBtn} ${styles.apple}`}
            onClick={() => handleSocialLogin('Apple')}
          >
            <i className="fab fa-apple"></i>
            Continue with Apple
          </button>
          
          <button 
            type="button" 
            className={`${styles.socialBtn} ${styles.github}`}
            onClick={() => handleSocialLogin('GitHub')}
          >
            <i className="fab fa-github"></i>
            Continue with GitHub
          </button>
        </div>

        <div className={styles.signupLink}>
          Don't have an account? 
          <Link to="/signup" id="signupLink">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;