import React, { useEffect, useState } from 'react';
import styles from './Toast.module.css';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) setTimeout(onClose, 300);
  };

  return (
    <div className={`${styles.toast} ${styles[type]} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.toastContent}>
        {type === 'success' && (
          <div className={styles.toastIcon}>✓</div>
        )}
        {type === 'error' && (
          <div className={styles.toastIcon}>✗</div>
        )}
        <div className={styles.toastMessage}>{message}</div>
        <button className={styles.toastClose} onClick={handleClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;