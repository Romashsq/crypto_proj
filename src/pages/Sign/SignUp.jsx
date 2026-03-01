// pages/Sign/SignUp.jsx - ПОЛНАЯ РАБОЧАЯ ВЕРСИЯ

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sign.module.css';
import { useTheme } from '../../Context/ThemeContext';
import { Moon, Sun } from '../../assets/Icons';
import api from '../../services/api';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Очищаем ошибку при вводе
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'Please enter your full name';
    }
    
    if (!formData.email.trim()) {
      return 'Please enter your email';
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Please enter a valid email address';
    }
    
    if (!formData.username.trim()) {
      return 'Please enter a username';
    }
    
    if (formData.username.startsWith('@')) {
      return 'Username should not start with @';
    }
    
    if (formData.username.length < 3) {
      return 'Username must be at least 3 characters long';
    }
    
    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      return 'You must agree to the Terms of Service';
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log('📝 Данные формы:', formData);
  
  // Простая валидация
  if (!formData.name.trim()) {
    alert('Введите имя');
    return;
  }
  
  if (!formData.email.trim()) {
    alert('Введите email');
    return;
  }
  
  if (!formData.username.trim()) {
    alert('Введите имя пользователя');
    return;
  }
  
  if (formData.password.length < 8) {
    alert('Пароль должен быть не менее 8 символов');
    return;
  }
  
  if (formData.password !== formData.confirmPassword) {
    alert('Пароли не совпадают');
    return;
  }
  
  if (!formData.agreeTerms) {
    alert('Примите условия использования');
    return;
  }
  
  try {
    console.log('🔄 Отправка данных регистрации...');
    
    const result = await api.register({
      fullName: formData.name,
      email: formData.email,
      password: formData.password,
      username: formData.username
    });
    
    console.log('✅ Ответ сервера:', result);
    
    if (result.success) {
      alert('✅ Регистрация успешна! Добро пожаловать!');
      navigate('/profile');
    } else {
      alert(`❌ Ошибка: ${result.error || 'Неизвестная ошибка'}`);
    }
    
  } catch (error) {
    console.error('❌ Ошибка регистрации:', error);
    alert(`❌ Ошибка регистрации: ${error.message}`);
  }
};

  const handleSocialLogin = (provider) => {
    alert(`Social login with ${provider} will be available soon!`);
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
          <h1>Create Account</h1>
          <p>Start your crypto learning journey today</p>
        </div>

        {/* Сообщение об ошибке */}
        {error && (
          <div className={styles.errorMessage}>
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        <form className={styles.signupForm} onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name *</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="name"
                className={styles.formInput}
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
              <i className={`fas fa-user ${styles.inputIcon}`}></i>
            </div>
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email Address *</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                className={styles.formInput}
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
              <i className={`fas fa-envelope ${styles.inputIcon}`}></i>
            </div>
          </div>

          {/* Username */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Username *</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="username"
                className={styles.formInput}
                placeholder="johndoe"
                value={formData.username}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
              <i className={`fas fa-at ${styles.inputIcon}`}></i>
            </div>
            <span className={styles.hint}>Without @, at least 3 characters</span>
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password *</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={styles.formInput}
                placeholder="Minimum 8 characters"
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

          {/* Confirm Password */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Confirm Password *</label>
            <div className={styles.inputWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className={styles.formInput}
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
              <button 
                type="button" 
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                <i className={`fas fa-eye${showConfirmPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="terms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              disabled={loading}
              required
            />
            <label htmlFor="terms">
              I agree to the <Link to="/terms" className={styles.termsLink}>Terms of Service</Link> and <Link to="/privacy" className={styles.termsLink}>Privacy Policy</Link>
            </label>
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
                Creating Account...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i>
                Create Account
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
            Continue with Google
          </button>
          
          <button 
            type="button" 
            className={`${styles.socialBtn} ${styles.apple}`}
            onClick={() => handleSocialLogin('Apple')}
            disabled={loading}
          >
            <i className="fab fa-apple"></i>
            Continue with Apple
          </button>
          
          <button 
            type="button" 
            className={`${styles.socialBtn} ${styles.github}`}
            onClick={() => handleSocialLogin('GitHub')}
            disabled={loading}
          >
            <i className="fab fa-github"></i>
            Continue with GitHub
          </button>
        </div>

        {/* Login Link */}
        <div className={styles.loginLink}>
          Already have an account? 
          <Link to="/login" className={styles.loginLinkText} id="loginLink">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;