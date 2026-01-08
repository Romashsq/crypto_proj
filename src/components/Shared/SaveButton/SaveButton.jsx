// components/Shared/SaveButton/SaveButton.jsx
import React from 'react';
import { useSaveLesson } from '../../../hooks/useSaveLesson';
import { Heart } from '../../../assets/Icons';
import styles from './SaveButton.module.css';

const SaveButton = ({ lesson, size = 'medium', showLabel = false, className = '' }) => {
  const { handleSaveLesson, isLessonSaved } = useSaveLesson();
  
  // Убедимся, что lesson содержит все необходимые поля
  const lessonData = {
    id: lesson.id || lesson.lessonId || lesson.lessonNumber,
    courseId: lesson.courseId || 'crypto', // дефолтное значение
    title: lesson.title || 'Untitled Lesson',
    description: lesson.description || '',
    duration: lesson.duration || '0 min',
    level: lesson.level || 'Beginner',
    ...lesson
  };
  
  const isSaved = isLessonSaved(lessonData.courseId, lessonData.id);
  
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Saving lesson:', lessonData); // Для дебага
    handleSaveLesson(lessonData);
  };
  
  const getSizeClass = () => {
    switch(size) {
      case 'small': return styles.small;
      case 'large': return styles.large;
      default: return styles.medium;
    }
  };
  
  return (
    <button
      className={`${styles.saveButton} ${getSizeClass()} ${isSaved ? styles.saved : ''} ${className}`}
      onClick={handleClick}
      aria-label={isSaved ? 'Remove from saved lessons' : 'Save lesson'}
      title={isSaved ? 'Remove from saved' : 'Save lesson'}
    >
      <Heart 
        width={size === 'small' ? 18 : size === 'large' ? 24 : 20}
        height={size === 'small' ? 18 : size === 'large' ? 24 : 20}
        className={styles.heartIcon}
      />
      {showLabel && (
        <span className={styles.buttonLabel}>
          {isSaved ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
};

export default SaveButton;