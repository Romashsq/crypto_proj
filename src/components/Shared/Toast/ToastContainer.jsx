// src/components/Shared/Toast/ToastContainer.jsx
import React from 'react';
import { useToast } from '../../../context/ToastContext';
import Toast from './Toast';
import styles from './ToastContainer.module.css';

const ToastContainer = () => {
  const { toasts = [], removeToast } = useToast();

  if (!toasts || toasts.length === 0) {
    return null; 
  }

  return (
    <div className={styles.toastContainer}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;