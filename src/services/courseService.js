// /frontend/services/courseService.js - УПРОЩЕННАЯ РАБОЧАЯ ВЕРСИЯ
import api from './api';

const courseService = {
  // Все доступные курсы
  getAllCourses: () => {
    return [
      {
        courseId: 'crypto',
        title: 'Crypto Fundamentals',
        icon: 'fa-coins',
        description: 'Master major cryptocurrencies: SOL, BTC, ETH, SUI, BASE, BNB.',
        totalLessons: 6,
        buttonLink: '/course/crypto',
        lessons: [
          { lessonId: 1, title: 'SOL - Solana Fundamentals', duration: '45 min' },
          { lessonId: 2, title: 'BTC - Bitcoin Basics', duration: '35 min' },
          { lessonId: 3, title: 'ETH - Ethereum Ecosystem', duration: '50 min' },
          { lessonId: 4, title: 'SUI - New Generation Blockchain', duration: '30 min' },
          { lessonId: 5, title: 'BASE - Coinbase Layer 2', duration: '25 min' },
          { lessonId: 6, title: 'BNB - Binance Ecosystem', duration: '40 min' }
        ]
      },
      {
        courseId: 'scams',
        title: 'Crypto Scams Protection',
        icon: 'fa-shield-alt',
        description: 'Learn how to identify and avoid common crypto scams.',
        totalLessons: 5,
        buttonLink: '/course/scams',
        lessons: [
          { lessonId: 1, title: 'Phishing Attacks', duration: '25 min' },
          { lessonId: 2, title: 'Fake Wallets', duration: '30 min' },
          { lessonId: 3, title: 'Pump & Dump Schemes', duration: '35 min' },
          { lessonId: 4, title: 'Social Engineering', duration: '40 min' },
          { lessonId: 5, title: 'Smart Contract Vulnerabilities', duration: '45 min' }
        ]
      },
      {
        courseId: 'trading',
        title: 'Crypto Trading Basics',
        icon: 'fa-chart-line',
        description: 'Learn fundamental trading strategies and technical analysis.',
        totalLessons: 8,
        buttonLink: '/course/trading',
        lessons: [
          { lessonId: 1, title: 'Market Basics', duration: '30 min' },
          { lessonId: 2, title: 'Candlestick Patterns', duration: '40 min' },
          { lessonId: 3, title: 'Support & Resistance', duration: '35 min' },
          { lessonId: 4, title: 'Risk Management', duration: '45 min' },
          { lessonId: 5, title: 'Trading Psychology', duration: '50 min' },
          { lessonId: 6, title: 'Technical Indicators', duration: '55 min' },
          { lessonId: 7, title: 'Fundamental Analysis', duration: '40 min' },
          { lessonId: 8, title: 'Creating Trading Plan', duration: '60 min' }
        ]
      }
    ];
  },

  // Проверяем сохранен ли курс - ТЕПЕРЬ БЕЗ USER_ID
  isCourseSaved: async (courseId) => {
    try {
      if (!api.isAuthenticated()) {
        console.log('❌ Пользователь не аутентифицирован');
        return false;
      }

      if (!courseId) {
        console.log('❌ Нет courseId');
        return false;
      }

      console.log('🔍 Проверка статуса курса:', courseId);
      const response = await api.checkCourseStatus(courseId);
      
      if (response.success) {
        console.log('✅ Статус курса:', courseId, 'isSaved:', response.isSaved);
        return response.isSaved === true;
      } else {
        console.log('⚠️ Ошибка проверки курса:', response.error);
        return false;
      }
      
    } catch (error) {
      console.error('❌ Ошибка проверки курса:', error);
      return false;
    }
  },

  // Сохраняем курс пользователю
  saveCourseToUser: async (course) => {
    try {
      if (!course || !course.courseId) {
        return {
          success: false,
          message: 'Данные курса неверны'
        };
      }
      
      if (!api.isAuthenticated()) {
        return {
          success: false,
          message: 'Войдите в систему для сохранения курсов'
        };
      }

      // Получаем данные курса из списка всех курсов
      const allCourses = courseService.getAllCourses();
      const courseData = allCourses.find(c => c.courseId === course.courseId) || course;
      
      // Подготавливаем данные для отправки
      const saveData = {
        courseId: courseData.courseId,
        courseTitle: courseData.title || courseData.courseId,
        courseIcon: courseData.icon || 'fa-book',
        totalLessons: courseData.totalLessons || 1,
        lessons: courseData.lessons || []
      };

      console.log('💾 Отправка данных курса:', saveData);

      // Отправляем запрос на сохранение курса
      const response = await api.saveCourse(saveData);
      
      if (response.success) {
        console.log('✅ Курс успешно сохранен:', courseData.courseId);
        
        // Обновляем локального пользователя
        const currentUser = api.getCurrentUser();
        if (currentUser) {
          // Добавляем информацию о сохраненном курсе
          if (!currentUser.savedCourses) {
            currentUser.savedCourses = [];
          }
          if (!currentUser.savedCourses.includes(courseData.courseId)) {
            currentUser.savedCourses.push(courseData.courseId);
            api.updateUserInStorage(currentUser);
          }
        }
        
        return response;
      } else {
        console.error('❌ Ошибка сохранения курса:', response.error);
        return {
          success: false,
          message: response.error || 'Не удалось сохранить курс'
        };
      }

    } catch (error) {
      console.error('❌ Ошибка сохранения курса:', error);
      return {
        success: false,
        message: error.message || 'Ошибка сети. Проверьте соединение.'
      };
    }
  },

  // Получаем прогресс курса
  getUserCourseProgress: async (courseId) => {
    try {
      if (!api.isAuthenticated()) {
        return null;
      }

      const response = await api.getCourseProgress(courseId);
      
      if (response.success && response.isEnrolled && response.progress) {
        return response.progress;
      }
      
      return null;
    } catch (error) {
      console.error('❌ Ошибка получения прогресса:', error);
      return null;
    }
  },

  // Завершить урок
  completeLesson: async (courseId, lessonId, timeSpent = 0, score = 100) => {
    try {
      if (!api.isAuthenticated()) {
        return {
          success: false,
          message: 'Войдите в систему'
        };
      }

      const response = await api.completeLesson(courseId, lessonId, timeSpent, score);
      
      if (response.success) {
        // Обновляем локальный прогресс
        const currentUser = api.getCurrentUser();
        if (currentUser && response.user) {
          currentUser.xp = response.user.xp || currentUser.xp;
          currentUser.level = response.user.level || currentUser.level;
          api.updateUserInStorage(currentUser);
        }
      }
      
      return response;
    } catch (error) {
      console.error('❌ Ошибка завершения урока:', error);
      return {
        success: false,
        message: error.message || 'Ошибка сети'
      };
    }
  },

  // Получить статус урока
  getLessonStatus: async (courseId, lessonId) => {
    try {
      if (!api.isAuthenticated()) {
        return {
          success: false,
          status: 'locked',
          canAccess: false,
          isCompleted: false
        };
      }

      const response = await api.getLessonStatus(courseId, lessonId);
      
      if (response.success) {
        return response;
      }
      
      return {
        success: false,
        status: 'locked',
        canAccess: false,
        isCompleted: false
      };
    } catch (error) {
      console.error('❌ Ошибка проверки статуса урока:', error);
      return {
        success: false,
        status: 'locked',
        canAccess: false,
        isCompleted: false
      };
    }
  },

  // Получить все курсы пользователя
  getUserCourses: async () => {
    try {
      if (!api.isAuthenticated()) {
        return [];
      }

      const response = await api.getUserCourses();
      
      if (response.success) {
        return response.courses || [];
      }
      
      return [];
    } catch (error) {
      console.error('❌ Ошибка получения курсов:', error);
      return [];
    }
  },

  // Получить курс по ID
  getCourseById: (courseId) => {
    const allCourses = courseService.getAllCourses();
    return allCourses.find(course => course.courseId === courseId);
  }
};

export default courseService;