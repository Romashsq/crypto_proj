import { useContext } from 'react';
import { SavedLessonsContext } from '../Context_TEMP/SavedLessonsContext';

export const useSavedLessons = () => {
  const context = useContext(SavedLessonsContext);
  
  if (!context) {
    console.warn('useSavedLessons used outside SavedLessonsProvider');
    return {
      savedLessons: [],
      addLesson: () => console.log('SavedLessonsProvider not available'),
      removeLesson: () => {},
      toggleSaveLesson: () => false,
      isLessonSaved: () => false,
      updateLessonProgress: () => {},
      clearSavedLessons: () => {}
    };
  }
  
  return context;
};