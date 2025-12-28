import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sign.module.css';
import { useTheme } from '../../Context/ThemeContext'; // Проверь правильный путь
import { Moon, Sun } from '../../assets/Icons'; // Импорт SVG иконок

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    username: '',
    email: '',
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username.startsWith('@')) {
      alert('Username must start with @');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    if (!formData.agreeTerms) {
      alert('You must agree to the Terms of Service');
      return;
    }
    
    console.log('Form submitted:', formData);
    alert('Registration successful! Welcome to Crypto Pro!');
    
    setFormData({
      name: '',
      birthDate: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    });
  };

  const handleSocialLogin = (provider) => {
    alert(`Would connect with ${provider} (demo)`);
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
          <h1>Create Account</h1>
          <p>Sign up to start learning about crypto</p>
        </div>

        <form className={styles.signupForm} onSubmit={handleSubmit}>
          {/* ... остальная форма без изменений ... */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="name"
                className={styles.formInput}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <i className={`fas fa-user ${styles.inputIcon}`}></i>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Date of Birth</label>
            <div className={styles.inputWrapper}>
              <input
                type="date"
                name="birthDate"
                className={styles.formInput}
                value={formData.birthDate}
                onChange={handleInputChange}
                required
              />
              <i className={`fas fa-calendar-alt ${styles.inputIcon}`}></i>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Username</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="username"
                className={styles.formInput}
                placeholder="@username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <i className={`fas fa-at ${styles.inputIcon}`}></i>
            </div>
            <span className={styles.hint}>Must start with @</span>
          </div>

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
                placeholder="Create a strong password"
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
            <span className={styles.hint}>Minimum 8 characters</span>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Confirm Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className={styles.formInput}
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <button 
                type="button" 
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`fas fa-eye${showConfirmPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="terms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="terms">
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button type="submit" className={styles.signupBtn}>
            <i className="fas fa-user-plus"></i>
            Sign Up
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

        <div className={styles.loginLink}>
          You have an account? 
          <Link to="/login" id="loginLink">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;