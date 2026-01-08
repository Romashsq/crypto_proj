import { useCallback } from 'react';
import { useSavedLessons } from './useSavedLessons';
import { useToast } from './useToast';

export const useSaveLesson = () => {
  const { toggleSaveLesson, isLessonSaved } = useSavedLessons();
  const { showToast } = useToast();

  const handleSaveLesson = useCallback((lesson) => {
    const wasAdded = toggleSaveLesson(lesson);
    
    if (wasAdded) {
      showToast('Your lesson has been added to the list!', 'success');
    } else {
      showToast('Lesson removed from your list', 'info');
    }
    
    return wasAdded;
  }, [toggleSaveLesson, showToast]);

  return {
    handleSaveLesson,
    isLessonSaved
  };
};