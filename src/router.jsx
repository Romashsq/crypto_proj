import { createHashRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from './Context/ThemeContext'; // импорт есть
import App from './App';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CryptoCourse from './pages/CoursesCategory/CryptoCourse';
import ScamsCourse from './pages/CoursesCategory/ScamsCourse';
import MemecoinsCourse from './pages/CoursesCategory/MemecoinsCourse';
import SecurityCourse from './pages/CoursesCategory/SecurityCourse';
import AdditionalCourse from './pages/CoursesCategory/AdditionalCourse';
import DefiCourse from './pages/CoursesCategory/DefiCourse';
import Community from './pages/Community/Community';
import About from './pages/About/About';
import FAQ from './pages/FAQ/FAQ';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import LessonPage from './pages/LessonPage';
import SignUp from './pages/Sign/SignUp';
import Login from './pages/Sign/LogIn'
import YourLessonsPage from './pages/YourLessonsPage/YourLessonsPage';
import Profile from './pages/Profile/Profile';

const wrapComponent = (Component) => <Component />;


const AppWithTheme = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

const router = createHashRouter([
  {
    path: '/',
    element: <AppWithTheme />, // 👈 ИСПОЛЬЗУЕМ ТЕМУ ЗДЕСЬ
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
      {
        path: 'lesson/:courseId/:lessonId',
        element: <LessonPage />
      },
      {
        path: 'lesson/:courseId',
        element: <LessonPage /> 
      },
      {
        path: 'signup',
        element: <SignUp/>
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'your-lessons',
        element: <YourLessonsPage />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'additional',
        element: wrapComponent(AdditionalCourse),
      },
      {
        path: 'defi',
        element: wrapComponent(DefiCourse),
      },
      {
        path: 'community',
        element: wrapComponent(Community),
      },
      {
        path: 'about',
        element: wrapComponent(About),
      },
      {
        path: 'faq',
        element: wrapComponent(FAQ),
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