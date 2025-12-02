import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, href, type = 'button', variant = 'primary', ...props }) => {
  const className = `${styles.btn} ${styles[variant]}`;

  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;