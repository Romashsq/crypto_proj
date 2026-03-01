// /frontend/services/api.js - ПОЛНОСТЬЮ ИСПРАВЛЕННАЯ ВЕРСИЯ
const API_BASE = '/api';
class ApiService {
  constructor() {
    this.token = localStorage.getItem('auth_token') || null;
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
    console.log('🔧 API сервис инициализирован, токен:', this.token ? 'есть' : 'нет');
  }

  // Универсальный метод запроса
  async _request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    
    console.log(`🌐 [API] Запрос: ${options.method || 'GET'} ${endpoint}`);
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    // Добавляем токен если есть
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
      console.log(`🔑 [API] Токен добавлен в заголовок`);
    }

    const config = {
      ...options,
      headers
    };

    try {
      const response = await fetch(url, config);
      
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      console.log(`📥 [API] Ответ ${endpoint}:`, response.status, data);
      
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
      
      // Сохраняем пользователя если пришел (мержим с существующим, чтобы не терять fullName и др.)
      if (data.user) {
        const existing = this.user || {};
        this._saveUser({ ...existing, ...data.user });
      }
      
      return data;
      
    } catch (error) {
      console.error(`❌ [API] Ошибка запроса ${endpoint}:`, error.message);
      
      // Если токен истек - очищаем
      if (error.message.includes('expired') || 
          error.message.includes('Invalid token') || 
          error.message.includes('Неверный или просроченный токен')) {
        console.log('🔄 [API] Токен истек, очищаем...');
        this.logout();
      }
      
      // Возвращаем ошибку в стандартном формате
      return {
        success: false,
        error: error.message || 'Ошибка сети'
      };
    }
  }

  // ============ АУТЕНТИФИКАЦИЯ ============
  async register(userData) {
    console.log('📝 [API] Регистрация:', userData.username);
    
    try {
      const response = await this._request('/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      
      // Если ответ содержит ошибку от _request
      if (response.success === false) {
        return response;
      }
      
      return response;
    } catch (error) {
      console.error('❌ [API] Ошибка регистрации:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка регистрации' 
      };
    }
  }

  async login(credentials) {
    console.log('🔑 [API] Логин:', credentials.email);
    
    try {
      const response = await this._request('/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      
      // Если ответ содержит ошибку от _request
      if (response.success === false) {
        return response;
      }
      
      return response;
    } catch (error) {
      console.error('❌ [API] Ошибка логина:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка входа' 
      };
    }
  }

  async verifyAuth() {
    try {
      if (!this.token) {
        console.log('⚠️ [API] Нет токена для проверки');
        return { success: false, error: 'Нет токена' };
      }
      
      console.log('🔍 [API] Проверка авторизации...');
      const response = await this._request('/verify-auth', {
        method: 'GET'
      });
      
      // Если ответ содержит ошибку от _request
      if (response.success === false) {
        return response;
      }
      
      return response;
    } catch (error) {
      console.error('❌ [API] Ошибка проверки авторизации:', error.message);
      return { success: false, error: error.message };
    }
  }

  // ============ КУРСЫ ============
  async saveCourse(courseData) {
    console.log('💾 [API] Сохранение курса:', courseData?.courseId);
    
    try {
      const response = await this._request('/user/save-course', {
        method: 'POST',
        body: JSON.stringify(courseData)
      });
      
      // Если ответ содержит ошибку от _request
      if (response.success === false) {
        return response;
      }
      
      return response;
    } catch (error) {
      console.error('❌ [API] Ошибка сохранения курса:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  async getUserCourses() {
    console.log('📚 [API] Получение курсов пользователя');
    
    try {
      const response = await this._request('/user/courses', {
        method: 'GET'
      });
      
      // Если ответ содержит ошибку от _request
      if (response.success === false) {
        return response;
      }
      
      return response;
    } catch (error) {
      console.error('❌ [API] Ошибка получения курсов:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  async checkCourseStatus(courseId) {
    console.log('🔍 [API] Проверка статуса курса:', courseId);
    
    try {
      const response = await this._request(`/user/check-course/${courseId}`, {
        method: 'GET'
      });
      
      // Если ответ содержит ошибку от _request
      if (response.success === false) {
        return response;
      }
      
      return response;
    } catch (error) {
      console.error('❌ [API] Ошибка проверки курса:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  // ============ НОВЫЕ МЕТОДЫ ДЛЯ КУРСОВ ============
  
  // Записаться на курс (новая простая версия)
  async enrollCourse(courseData) {
    console.log('🎯 [API] Запись на курс:', courseData?.courseId);
    
    try {
      const response = await this._request('/enroll-course', {
        method: 'POST',
        body: JSON.stringify(courseData)
      });
      
      // Если ответ содержит ошибку от _request
      if (response.success === false) {
        return response;
      }
      
      return response;
    } catch (error) {
      console.error('❌ [API] Ошибка записи на курс:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  // Получить все мои курсы (новая простая версия)
  async getMyCourses() {
    console.log('📚 [API] Получение моих курсов');
    
    try {
      const response = await this._request('/my-courses', {
        method: 'GET'
      });
      
      // Если ответ содержит ошибку от _request
      if (response.success === false) {
        return response;
      }
      
      return response;
    } catch (error) {
      console.error('❌ [API] Ошибка получения курсов:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  // Проверить зачислен ли на курс
  async checkEnrollment(courseId) {
    console.log('🔍 [API] Проверка зачисления:', courseId);
    
    try {
      const response = await this._request(`/check-enrollment/${courseId}`, {
        method: 'GET'
      });
      
      // Если ответ содержит ошибку от _request
      if (response.success === false) {
        return response;
      }
      
      return response;
    } catch (error) {
      console.error('❌ [API] Ошибка проверки зачисления:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  // Быстрая запись на курс
  async quickEnroll(courseId, courseTitle) {
    console.log('⚡ [API] Быстрая запись на курс:', courseId);
    
    const courseData = {
      courseId,
      courseTitle: courseTitle || courseId,
      courseIcon: '📚',
      totalLessons: 6 // по умолчанию
    };
    
    return await this.enrollCourse(courseData);
  }

  // ============ УРОКИ И ПРОГРЕСС ============
  async completeLesson(courseId, lessonId, timeSpent = 0, score = 100) {
    console.log('✅ [API] Завершение урока:', { courseId, lessonId });
    
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
      
      // Если ответ содержит ошибку от _request
      if (response.success === false) {
        return response;
      }
      
      // Обновляем локального пользователя
      if (response.success && response.user) {
        this.updateUserInStorage(response.user);
      }
      
      return response;
    } catch (error) {
      console.error('❌ [API] Ошибка завершения урока:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  async getLessonStatus(courseId, lessonId) {
    console.log('🔍 [API] Статус урока:', { courseId, lessonId });
    
    try {
      const response = await this._request(`/user/lesson-status/${courseId}/${lessonId}`, {
        method: 'GET'
      });
      
      // Если ответ содержит ошибку от _request
      if (response.success === false) {
        return response;
      }
      
      return response;
    } catch (error) {
      console.error('❌ [API] Ошибка проверки статуса урока:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  async getOverallProgress() {
    console.log('📊 [API] Получение общего прогресса');
    
    try {
      const response = await this._request('/user/overall-progress', {
        method: 'GET'
      });
      
      // Если ответ содержит ошибку от _request
      if (response.success === false) {
        return response;
      }
      
      return response;
    } catch (error) {
      console.error('❌ [API] Ошибка получения общего прогресса:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  async getCourseProgress(courseId) {
    console.log('📈 [API] Получение прогресса курса:', courseId);
    
    try {
      const response = await this._request(`/user/course/${courseId}/progress`, {
        method: 'GET'
      });
      
      // Если ответ содержит ошибку от _request
      if (response.success === false) {
        return response;
      }
      
      return response;
    } catch (error) {
      console.error('❌ [API] Ошибка получения прогресса курса:', error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка сети' 
      };
    }
  }

  // ============ УТИЛИТЫ ============
  _saveUser(user) {
    try {
      // Убедимся что у пользователя есть id
      if (!user.id && user._id) {
        user.id = user._id;
      }
      
      // Если у пользователя нет id, генерируем из токена
      if (!user.id && this.token) {
        try {
          const payload = JSON.parse(atob(this.token.split('.')[1]));
          user.id = payload.id;
        } catch (e) {
          console.error('❌ [API] Не могу распарсить токен для получения id:', e);
        }
      }
      
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      
      // Сохраняем отдельно id для быстрого доступа
      if (user.id) {
        localStorage.setItem('user_id', user.id);
      }
      
      console.log('💾 [API] Пользователь сохранен в localStorage:', user.username, 'ID:', user.id);
      return true;
    } catch (error) {
      console.error('❌ [API] Ошибка сохранения пользователя:', error);
      return false;
    }
  }

  getCurrentUser() {
    try {
      // Возвращаем пользователя из памяти если есть
      if (this.user) {
        return this.user;
      }
      
      // Иначе загружаем из localStorage
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        return null;
      }
      
      const user = JSON.parse(userStr);
      this.user = user;
      
      return user;
    } catch (error) {
      console.error('❌ [API] Ошибка получения пользователя:', error);
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
        console.error('❌ [API] Не могу распарсить токен для получения user_id:', e);
      }
    }
    
    console.warn('⚠️ [API] Не могу получить user ID');
    return null;
  }

  isAuthenticated() {
    const hasToken = !!this.token;
    const hasUser = !!this.getCurrentUser();
    const hasUserId = !!this.getCurrentUserId();
    
    const isAuth = hasToken && hasUser && hasUserId;
    
    console.log(`🔍 [API] Проверка аутентификации: ${isAuth ? 'Аутентифицирован' : 'Не аутентифицирован'}`, {
      hasToken,
      hasUser,
      hasUserId
    });
    
    return isAuth;
  }

  logout() {
  console.log('🚪 [API] Выход из системы');
  this.token = null;
  this.user = null;
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
  localStorage.removeItem('user_id');
  localStorage.removeItem('savedCourses');
  
  // Перенаправляем на главную, а не на логин
  if (window.location.pathname !== '/crypto_proj/') {
    setTimeout(() => {
      window.location.href = '/crypto_proj/'; 
    }, 100);
  }
}

  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
    console.log('🔑 [API] Токен установлен');
    
    // Пытаемся получить user_id из токена
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.id) {
        localStorage.setItem('user_id', payload.id);
        console.log('✅ [API] User ID из токена:', payload.id);
      }
    } catch (e) {
      console.error('❌ [API] Не могу распарсить токен для получения user_id:', e);
    }
  }

  getToken() {
    return this.token;
  }

  updateUserInStorage(updates) {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        console.warn('⚠️ [API] Нет текущего пользователя для обновления');
        return null;
      }
      
      const updatedUser = { ...currentUser, ...updates };
      this.user = updatedUser;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Обновляем user_id если изменился
      if (updatedUser.id && updatedUser.id !== currentUser.id) {
        localStorage.setItem('user_id', updatedUser.id);
      }
      
      console.log('💾 [API] Пользователь обновлен');
      return updatedUser;
    } catch (error) {
      console.error('❌ [API] Ошибка обновления пользователя:', error);
      return null;
    }
  }

  // Обновить данные о пользователе с сервера
  async refreshUserData() {
    try {
      console.log('🔄 [API] Обновление данных пользователя с сервера');
      const response = await this.verifyAuth();
      if (response.success && response.user) {
        this._saveUser(response.user);
        return response.user;
      }
    } catch (error) {
      console.error('❌ [API] Ошибка обновления данных пользователя:', error);
    }
    return null;
  }

  // Проверить доступность сервера
  async checkServer() {
    try {
      console.log('🏥 [API] Проверка доступности сервера');
      const response = await fetch(`${API_BASE}/health`);
      const data = await response.json();
      return data.success === true;
    } catch (error) {
      console.error('❌ [API] Сервер недоступен:', error);
      return false;
    }
  }

  // Удалить все локальные данные
  clearLocalData() {
    console.log('🧹 [API] Очистка локальных данных');
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  // Установить тестовые данные (для разработки)
  setTestData() {
    if (process.env.NODE_ENV === 'development') {
      console.log('🧪 [API] Установка тестовых данных');
      const testUser = {
        id: 'test_user_123',
        username: 'testuser',
        email: 'test@example.com',
        fullName: 'Test User',
        xp: 500,
        level: 2,
        streak: 3,
        createdAt: new Date().toISOString()
      };
      
      const testToken = 'test_token_123';
      
      this._saveUser(testUser);
      this.setToken(testToken);
    }
  }
}

// Создаем единственный экземпляр
const api = new ApiService();

// Для отладки в консоли
if (typeof window !== 'undefined') {
  window.api = api;
}

export default api;