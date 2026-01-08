import React, { createContext, useState, useEffect, useCallback } from 'react';

const SAVED_LESSONS_KEY = 'flow_saved_lessons';

export const SavedLessonsContext = createContext();

export const SavedLessonsProvider = ({ children }) => {
  const [savedLessons, setSavedLessons] = useState([]);

  // Загружаем из localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAVED_LESSONS_KEY);
      if (stored) {
        setSavedLessons(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading saved lessons:', error);
      setSavedLessons([]);
    }
  }, []);

  // Сохраняем в localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_LESSONS_KEY, JSON.stringify(savedLessons));
    } catch (error) {
      console.error('Error saving lessons:', error);
    }
  }, [savedLessons]);

  const addLesson = useCallback((lesson) => {
    const exists = savedLessons.some(l => 
      l.id === lesson.id && l.courseId === lesson.courseId
    );
    
    if (!exists) {
      const newLesson = {
        ...lesson,
        savedAt: new Date().toISOString(),
        progress: lesson.progress || 0
      };
      
      setSavedLessons(prev => [newLesson, ...prev]);
      return true;
    }
    return false;
  }, [savedLessons]);

  const removeLesson = useCallback((courseId, lessonId) => {
    setSavedLessons(prev => 
      prev.filter(l => !(l.courseId === courseId && l.id === lessonId))
    );
  }, []);

  const toggleSaveLesson = useCallback((lesson) => {
    const exists = savedLessons.some(l => 
      l.id === lesson.id && l.courseId === lesson.courseId
    );
    
    if (exists) {
      removeLesson(lesson.courseId, lesson.id);
      return false;
    } else {
      addLesson(lesson);
      return true;
    }
  }, [savedLessons, addLesson, removeLesson]);

  const isLessonSaved = useCallback((courseId, lessonId) => {
    return savedLessons.some(l => 
      l.courseId === courseId && l.id === lessonId
    );
  }, [savedLessons]);

  const updateLessonProgress = useCallback((courseId, lessonId, progress) => {
    setSavedLessons(prev => 
      prev.map(l => 
        l.courseId === courseId && l.id === lessonId
          ? { ...l, progress: Math.min(100, Math.max(0, progress)) }
          : l
      )
    );
  }, []);

  const clearSavedLessons = useCallback(() => {
    setSavedLessons([]);
  }, []);

  const value = {
    savedLessons,
    addLesson,
    removeLesson,
    toggleSaveLesson,
    isLessonSaved,
    updateLessonProgress,
    clearSavedLessons
  };

  return (
    <SavedLessonsContext.Provider value={value}>
      {children}
    </SavedLessonsContext.Provider>
  );
};