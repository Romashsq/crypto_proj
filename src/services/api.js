// /frontend/services/api.js - ИСПРАВЛЕННАЯ ВЕРСИЯ
const API_BASE = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('auth_token') || null;
    console.log('🔧 API сервис инициализирован, токен:', this.token ? 'есть' : 'нет');
  }

  // Универсальный метод запроса
  async _request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    // Добавляем токен если есть
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config = {
      ...options,
      headers
    };

    try {
      console.log(`🌐 Запрос: ${config.method || 'GET'} ${endpoint}`);
      
      const response = await fetch(url, config);
      
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      console.log(`📥 Ответ ${endpoint}:`, response.status, data);
      
      if (!response.ok) {
        if (typeof data === 'object' && data.error) {
          throw new Error(data.error);
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // Сохраняем токен если пришел
      if (data.token) {
        this.setToken(data.token);
      }
      
      // Сохраняем пользователя если пришел
      if (data.user) {
        this._saveUser(data.user);
      }
      
      return data;
      
    } catch (error) {
      console.error(`❌ Ошибка запроса ${endpoint}:`, error.message);
      
      if (error.message.includes('expired') || error.message.includes('Invalid token')) {
        console.log('🔄 Токен истек, очищаем...');
        this.logout();
      }
      
      throw error;
    }
  }

  // ============ АУТЕНТИФИКАЦИЯ ============
  async register(userData) {
    console.log('📝 Регистрация:', userData.username);
    
    try {
      const response = await this._request('/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      
      return response;
    } catch (error) {
      console.error('❌ Ошибка регистрации:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка регистрации' 
      };
    }
  }

  async login(credentials) {
    console.log('🔑 Логин:', credentials.email);
    
    try {
      const response = await this._request('/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      
      return response;
    } catch (error) {
      console.error('❌ Ошибка логина:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка входа' 
      };
    }
  }

  async verifyAuth() {
    try {
      if (!this.token) {
        return { success: false, error: 'Нет токена' };
      }
      
      const response = await this._request('/verify-auth', {
        method: 'GET'
      });
      
      return response;
    } catch (error) {
      console.log('❌ Ошибка проверки авторизации:', error.message);
      return { success: false, error: error.message };
    }
  }

  // ============ КУРСЫ ============
  async saveCourse(courseData) {
    console.log('💾 Сохранение курса:', courseData?.courseId);
    
    try {
      const response = await this._request('/user/save-course', {
        method: 'POST',
        body: JSON.stringify(courseData)
      });
      
      // Обновляем локального пользователя если курс сохранен
      if (response.success) {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          // Обновляем общий прогресс в локальном хранилище
          if (response.overallProgress) {
            currentUser.overallProgress = response.overallProgress;
            this._saveUser(currentUser);
          }
        }
      }
      
      return response;
    } catch (error) {
      console.error('❌ Ошибка сохранения курса:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  async getUserCourses() {
    console.log('📚 Получение курсов пользователя');
    
    try {
      const response = await this._request('/user/courses', {
        method: 'GET'
      });
      
      return response;
    } catch (error) {
      console.error('❌ Ошибка получения курсов:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  async checkCourseStatus(courseId) {
    console.log('🔍 Проверка статуса курса:', courseId);
    
    try {
      const response = await this._request(`/user/check-course/${courseId}`, {
        method: 'GET'
      });
      
      return response;
    } catch (error) {
      console.error('❌ Ошибка проверки курса:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  // ============ УРОКИ И ПРОГРЕСС ============
  async completeLesson(courseId, lessonId, timeSpent = 0, score = 100) {
    console.log('✅ Завершение урока:', { courseId, lessonId });
    
    try {
      const response = await this._request('/user/complete-lesson', {
        method: 'POST',
        body: JSON.stringify({ 
          courseId, 
          lessonId: parseInt(lessonId), 
          timeSpent: Math.floor(timeSpent),
          score 
        })
      });
      
      // Обновляем локального пользователя
      if (response.success && response.user) {
        this.updateUserInStorage(response.user);
      }
      
      return response;
    } catch (error) {
      console.error('❌ Ошибка завершения урока:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  async getLessonStatus(courseId, lessonId) {
    console.log('🔍 Статус урока:', { courseId, lessonId });
    
    try {
      const response = await this._request(`/user/lesson-status/${courseId}/${lessonId}`, {
        method: 'GET'
      });
      
      return response;
    } catch (error) {
      console.error('❌ Ошибка проверки статуса урока:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  async getOverallProgress() {
    console.log('📊 Получение общего прогресса');
    
    try {
      const response = await this._request('/user/overall-progress', {
        method: 'GET'
      });
      
      return response;
    } catch (error) {
      console.error('❌ Ошибка получения общего прогресса:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  async getCourseProgress(courseId) {
    console.log('📈 Получение прогресса курса:', courseId);
    
    try {
      const response = await this._request(`/user/course/${courseId}/progress`, {
        method: 'GET'
      });
      
      return response;
    } catch (error) {
      console.error('❌ Ошибка получения прогресса курса:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  // ============ УТИЛИТЫ ============
  _saveUser(user) {
    try {
      // Сохраняем user с id в localStorage
      if (!user.id && user._id) {
        user.id = user._id;
      }
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('user_id', user.id); // Сохраняем отдельно id для быстрого доступа
      console.log('💾 Пользователь сохранен в localStorage:', user.username, 'ID:', user.id);
      return true;
    } catch (error) {
      console.error('❌ Ошибка сохранения пользователя:', error);
      return false;
    }
  }

  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        return null;
      }
      
      const user = JSON.parse(userStr);
      
      // Если id нет, но есть _id - копируем
      if (!user.id && user._id) {
        user.id = user._id;
      }
      
      // Если все еще нет id, пытаемся получить из токена
      if (!user.id && this.token) {
        try {
          const payload = JSON.parse(atob(this.token.split('.')[1]));
          user.id = payload.id;
        } catch (e) {
          console.error('❌ Не могу распарсить токен:', e);
        }
      }
      
      return user;
    } catch (error) {
      console.error('❌ Ошибка получения пользователя:', error);
      return null;
    }
  }

  getCurrentUserId() {
    // Сначала проверяем localStorage
    const storedId = localStorage.getItem('user_id');
    if (storedId) {
      return storedId;
    }
    
    // Если нет в localStorage, получаем из объекта пользователя
    const user = this.getCurrentUser();
    if (user?.id) {
      localStorage.setItem('user_id', user.id);
      return user.id;
    }
    
    // Если все еще нет, пытаемся получить из токена
    if (this.token) {
      try {
        const payload = JSON.parse(atob(this.token.split('.')[1]));
        if (payload.id) {
          localStorage.setItem('user_id', payload.id);
          return payload.id;
        }
      } catch (e) {
        console.error('❌ Не могу распарсить токен:', e);
      }
    }
    
    console.error('❌ Не могу получить user ID');
    return null;
  }

  isAuthenticated() {
    const hasToken = !!this.token;
    const hasUser = !!this.getCurrentUser();
    const hasUserId = !!this.getCurrentUserId();
    
    console.log('🔍 Проверка аутентификации:', {
      hasToken,
      hasUser,
      hasUserId,
      token: this.token,
      user: this.getCurrentUser(),
      userId: this.getCurrentUserId()
    });
    
    return hasToken && hasUser && hasUserId;
  }

  logout() {
    console.log('🚪 Выход из системы');
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    
    // Перенаправляем на страницу логина
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }

  // ============ НОВЫЕ МЕТОДЫ ДЛЯ КУРСОВ (добавить в существующий api.js) ============

// Записаться на курс (простая версия)
async enrollCourse(courseData) {
  console.log('🎯 Запись на курс:', courseData?.courseId);
  
  try {
    const response = await this._request('/enroll-course', {
      method: 'POST',
      body: JSON.stringify(courseData)
    });
    
    return response;
  } catch (error) {
    console.error('❌ Ошибка записи на курс:', error.message);
    return { 
      success: false, 
      error: error.message || 'Ошибка сети' 
    };
  }
}

// Получить все мои курсы
async getMyCourses() {
  console.log('📚 Получение моих курсов');
  
  try {
    const response = await this._request('/my-courses', {
      method: 'GET'
    });
    
    return response;
  } catch (error) {
    console.error('❌ Ошибка получения курсов:', error.message);
    return { 
      success: false, 
      error: error.message || 'Ошибка сети' 
    };
  }
}

// Проверить зачислен ли на курс
async checkEnrollment(courseId) {
  console.log('🔍 Проверка зачисления:', courseId);
  
  try {
    const response = await this._request(`/check-enrollment/${courseId}`, {
      method: 'GET'
    });
    
    return response;
  } catch (error) {
    console.error('❌ Ошибка проверки зачисления:', error.message);
    return { 
      success: false, 
      error: error.message || 'Ошибка сети' 
    };
  }
}

// Быстрая запись на курс
async quickEnroll(courseId, courseTitle) {
  console.log('⚡ Быстрая запись на курс:', courseId);
  
  const courseData = {
    courseId,
    courseTitle: courseTitle || courseId,
    courseIcon: '📚',
    totalLessons: 6 // по умолчанию
  };
  
  return await this.enrollCourse(courseData);
}

  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
    console.log('🔑 Токен установлен');
    
    // Пытаемся получить user_id из токена
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.id) {
        localStorage.setItem('user_id', payload.id);
        console.log('✅ User ID из токена:', payload.id);
      }
    } catch (e) {
      console.error('❌ Не могу распарсить токен для получения user_id:', e);
    }
  }

  getToken() {
    return this.token;
  }

  updateUserInStorage(updates) {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) return null;
      
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Обновляем user_id если изменился
      if (updatedUser.id && updatedUser.id !== currentUser.id) {
        localStorage.setItem('user_id', updatedUser.id);
      }
      
      console.log('💾 Пользователь обновлен');
      return updatedUser;
    } catch (error) {
      console.error('❌ Ошибка обновления пользователя:', error);
      return null;
    }
  }

  // Получить данные о пользователе с сервера
  async refreshUserData() {
    try {
      const response = await this.verifyAuth();
      if (response.success && response.user) {
        this._saveUser(response.user);
        return response.user;
      }
    } catch (error) {
      console.error('❌ Ошибка обновления данных пользователя:', error);
    }
    return null;
  }

  // ============ ПРОВЕРКА СЕРВЕРА ============
  async checkServer() {
    try {
      const response = await fetch(`${API_BASE}/health`);
      const data = await response.json();
      return data.success === true;
    } catch (error) {
      console.error('❌ Сервер недоступен:', error);
      return false;
    }
  }
}



// Создаем единственный экземпляр
const api = new ApiService();

export default api;