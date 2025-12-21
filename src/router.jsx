import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from './Context/ThemeContext';
import App from './App';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CryptoCourse from './pages/CoursesCategory/CryptoCourse';
import ScamsCourse from './pages/CoursesCategory/ScamsCourse';
import MemecoinsCourse from './pages/CoursesCategory/MemecoinsCourse';
import SecurityCourse from './pages/CoursesCategory/SecurityCourse';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import LessonPage from './pages/LessonPage';

// Обертка для компонентов
const wrapComponent = (Component) => <Component />;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: wrapComponent(Home),
      },
      {
        path: 'home',
        element: wrapComponent(Home),
      },
      {
        path: 'courses',
        element: wrapComponent(Courses),
      },
      {
        path: 'crypto',
        element: wrapComponent(CryptoCourse),
      },
      {
        path: 'scams',
        element: wrapComponent(ScamsCourse),
      },
      {
        path: 'memecoins',
        element: wrapComponent(MemecoinsCourse),
      },
      {
        path: 'security',
        element: wrapComponent(SecurityCourse),
      },
      // УРОКИ - ВАЖНО: должен быть после всех курсов
      {
        path: 'lesson/:courseId/:lessonId',
        element: <LessonPage />
      },
      // Альтернативный путь если нужно
      {
        path: 'lesson/:courseId',
        element: <LessonPage /> 
      },
      {
        path: '*',
        element: wrapComponent(NotFound),
      }
    ],
  },
]);

export default router;
export { RouterProvider };