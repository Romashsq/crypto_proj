import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sign.module.css';
import { useTheme } from '../../Context/ThemeContext';
import { Moon, Sun } from '../../assets/Icons';
import api from '../../services/api';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    emailOrUsername: '',
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
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация
    if (!formData.emailOrUsername.trim()) {
      setError('Please enter your email or username');
      return;
    }
    
    if (!formData.password.trim()) {
      setError('Please enter your password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      console.log('🔑 Попытка входа:', { 
        email: formData.emailOrUsername, 
        password: '***' 
      });
      
      const result = await api.login({
        email: formData.emailOrUsername,
        password: formData.password
      });
      
      console.log('✅ Ответ сервера:', result);
      
      if (result.success) {
        // Успешный вход
        if (formData.rememberMe) {
          // Токен уже сохраняется в api.js, но можем добавить доп. логику
          console.log('💾 Сессия будет сохранена');
        }
        navigate('/dashboard');
      } else {
        // Ошибка от сервера
        setError(result.error || 'Invalid email or password');
      }
      
    } catch (err) {
      console.error('❌ Ошибка входа:', err);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Social login with ${provider} will be available soon!`);
  };

  const handleForgotPassword = () => {
    const email = prompt('Please enter your email address to reset password:');
    if (email) {
      alert(`Password reset link would be sent to ${email} (demo)`);
    }
  };

  return (
    <div className={`${styles.signupPage} ${theme === 'dark' ? styles.darkMode : ''}`}>
      {/* Кнопка Back to Home */}
      <Link to="/" className={styles.backHomeBtn}>
        <i className="fas fa-arrow-left"></i>
        <span>Back to Home</span>
      </Link>

      {/* Кнопка переключения темы */}
      <button 
        className={styles.themeToggleBtn}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        title={`${theme === 'light' ? 'Dark' : 'Light'} theme`}
      >
        {theme === 'light' ? (
          <Moon width={22} height={22} className={styles.themeIcon} />
        ) : (
          <Sun width={22} height={22} className={styles.themeIcon} />
        )}
      </button>

      <div className={styles.signupContainer}>
        <div className={styles.signupLogo}>
          <div className={styles.logoIcon}>
            <i className="fas fa-chart-line"></i>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to continue your crypto learning journey</p>
        </div>

        {/* Сообщение об ошибке */}
        {error && (
          <div className={styles.errorMessage}>
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        <form className={styles.signupForm} onSubmit={handleSubmit}>
          {/* Email/Username */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email or Username *</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="emailOrUsername"
                className={styles.formInput}
                placeholder="Enter your email or username"
                value={formData.emailOrUsername}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
              <i className={`fas fa-user ${styles.inputIcon}`}></i>
            </div>
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password *</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={styles.formInput}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
              <button 
                type="button" 
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={loading}
              />
              <span>Remember me</span>
            </label>
            
            <button 
              type="button" 
              className={styles.forgotPasswordBtn}
              onClick={handleForgotPassword}
              disabled={loading}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={styles.signupBtn}
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Signing in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Log In
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        {/* Social Buttons */}
        <div className={styles.socialButtons}>
          <button 
            type="button" 
            className={`${styles.socialBtn} ${styles.google}`}
            onClick={() => handleSocialLogin('Google')}
            disabled={loading}
          >
            <i className="fab fa-google"></i>
            Google
          </button>
          
          <button 
            type="button" 
            className={`${styles.socialBtn} ${styles.apple}`}
            onClick={() => handleSocialLogin('Apple')}
            disabled={loading}
          >
            <i className="fab fa-apple"></i>
            Apple
          </button>
          
          <button 
            type="button" 
            className={`${styles.socialBtn} ${styles.github}`}
            onClick={() => handleSocialLogin('GitHub')}
            disabled={loading}
          >
            <i className="fab fa-github"></i>
            GitHub
          </button>
        </div>

        {/* Signup Link */}
        <div className={styles.signupLink}>
          Don't have an account? 
          <Link to="/signup" className={styles.signupLinkText}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;