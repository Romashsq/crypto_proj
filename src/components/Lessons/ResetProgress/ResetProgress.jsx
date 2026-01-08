import React from 'react';
import styles from './ResetProgress.module.css';

const ResetProgress = ({ courseId, onReset }) => {
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all progress for this course? This cannot be undone!")) {
      onReset();
      alert("Progress has been reset to 0%!");
    }
  };

  return (
    <button onClick={handleReset} className={styles.resetButton}>
      <i className="fas fa-redo"></i>
      Reset Course Progress
    </button>
  );
};

export default ResetProgress;