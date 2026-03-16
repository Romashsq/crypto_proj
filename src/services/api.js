const API_BASE = '/api';
class ApiService {
  constructor() {
    this.token = localStorage.getItem('auth_token') || null;
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  async _request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
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

      if (!response.ok) {
        if (typeof data === 'object' && data.error) {
          throw new Error(data.error);
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (data.token) {
        this.setToken(data.token);
      }

      if (data.user) {
        const existing = this.user || {};
        this._saveUser({ ...existing, ...data.user });
      }

      return data;

    } catch (error) {
      if (error.message.includes('expired') ||
          error.message.includes('Invalid token') ||
          error.message.includes('Неверный токен') ||
          error.message.includes('Неверный или просроченный токен')) {
        this.logout();
      }

      return {
        success: false,
        error: error.message || 'Ошибка сети'
      };
    }
  }

  // ============ АУТЕНТИФИКАЦИЯ ============
  async register(userData) {
    try {
      const response = await this._request('/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      return response;
    } catch (error) {
      return { success: false, error: error.message || 'Ошибка регистрации' };
    }
  }

  async login(credentials) {
    try {
      const response = await this._request('/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      return response;
    } catch (error) {
      return { success: false, error: error.message || 'Ошибка входа' };
    }
  }

  async verifyAuth() {
    try {
      if (!this.token) {
        return { success: false, error: 'Нет токена' };
      }
      const response = await this._request('/verify-auth', { method: 'GET' });
      return response;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ============ КУРСЫ ============
  async saveCourse(courseData) {
    try {
      const response = await this._request('/user/save-course', {
        method: 'POST',
        body: JSON.stringify(courseData)
      });
      return response;
    } catch (error) {
      return { success: false, error: error.message || 'Ошибка сети' };
    }
  }

  async getUserCourses() {
    try {
      const response = await this._request('/user/courses', { method: 'GET' });
      return response;
    } catch (error) {
      return { success: false, error: error.message || 'Ошибка сети' };
    }
  }

  async checkCourseStatus(courseId) {
    try {
      const response = await this._request(`/user/check-course/${courseId}`, { method: 'GET' });
      return response;
    } catch (error) {
      return { success: false, error: error.message || 'Ошибка сети' };
    }
  }

  async enrollCourse(courseData) {
    try {
      const response = await this._request('/enroll-course', {
        method: 'POST',
        body: JSON.stringify(courseData)
      });
      return response;
    } catch (error) {
      return { success: false, error: error.message || 'Ошибка сети' };
    }
  }

  async getMyCourses() {
    try {
      const response = await this._request('/my-courses', { method: 'GET' });
      return response;
    } catch (error) {
      return { success: false, error: error.message || 'Ошибка сети' };
    }
  }

  async checkEnrollment(courseId) {
    try {
      const response = await this._request(`/check-enrollment/${courseId}`, { method: 'GET' });
      return response;
    } catch (error) {
      return { success: false, error: error.message || 'Ошибка сети' };
    }
  }

  async quickEnroll(courseId, courseTitle) {
    const courseData = {
      courseId,
      courseTitle: courseTitle || courseId,
      courseIcon: '📚',
      totalLessons: 6
    };
    return await this.enrollCourse(courseData);
  }

  // ============ УРОКИ И ПРОГРЕСС ============
  async completeLesson(courseId, lessonId, timeSpent = 0, score = 100) {
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

      if (response.success && response.user) {
        this.updateUserInStorage(response.user);
      }

      return response;
    } catch (error) {
      return { success: false, error: error.message || 'Ошибка сети' };
    }
  }

  async getLessonStatus(courseId, lessonId) {
    try {
      const response = await this._request(`/user/lesson-status/${courseId}/${lessonId}`, { method: 'GET' });
      return response;
    } catch (error) {
      return { success: false, error: error.message || 'Ошибка сети' };
    }
  }

  async getOverallProgress() {
    try {
      const response = await this._request('/user/overall-progress', { method: 'GET' });
      return response;
    } catch (error) {
      return { success: false, error: error.message || 'Ошибка сети' };
    }
  }

  async getCourseProgress(courseId) {
    try {
      const response = await this._request(`/user/course/${courseId}/progress`, { method: 'GET' });
      return response;
    } catch (error) {
      return { success: false, error: error.message || 'Ошибка сети' };
    }
  }

  // ============ УТИЛИТЫ ============
  _saveUser(user) {
    try {
      if (!user.id && user._id) {
        user.id = user._id;
      }

      if (!user.id && this.token) {
        try {
          const payload = JSON.parse(atob(this.token.split('.')[1]));
          user.id = payload.id;
        } catch (e) {}
      }

      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));

      if (user.id) {
        localStorage.setItem('user_id', user.id);
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  getCurrentUser() {
    try {
      if (this.user) {
        return this.user;
      }

      const userStr = localStorage.getItem('user');
      if (!userStr) {
        return null;
      }

      const user = JSON.parse(userStr);
      this.user = user;
      return user;
    } catch (error) {
      return null;
    }
  }

  getCurrentUserId() {
    const storedId = localStorage.getItem('user_id');
    if (storedId) {
      return storedId;
    }

    const user = this.getCurrentUser();
    if (user?.id) {
      localStorage.setItem('user_id', user.id);
      return user.id;
    }

    if (this.token) {
      try {
        const payload = JSON.parse(atob(this.token.split('.')[1]));
        if (payload.id) {
          localStorage.setItem('user_id', payload.id);
          return payload.id;
        }
      } catch (e) {}
    }

    return null;
  }

  isAuthenticated() {
    const hasToken = !!this.token;
    const hasUser = !!this.getCurrentUser();
    const hasUserId = !!this.getCurrentUserId();
    return hasToken && hasUser && hasUserId;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    localStorage.removeItem('savedCourses');

    setTimeout(() => {
      window.location.hash = '#/login';
    }, 100);
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.id) {
        localStorage.setItem('user_id', payload.id);
      }
    } catch (e) {}
  }

  getToken() {
    return this.token;
  }

  updateUserInStorage(updates) {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        return null;
      }

      const updatedUser = { ...currentUser, ...updates };
      this.user = updatedUser;
      localStorage.setItem('user', JSON.stringify(updatedUser));

      if (updatedUser.id && updatedUser.id !== currentUser.id) {
        localStorage.setItem('user_id', updatedUser.id);
      }

      return updatedUser;
    } catch (error) {
      return null;
    }
  }

  async refreshUserData() {
    try {
      const response = await this.verifyAuth();
      if (response.success && response.user) {
        this._saveUser(response.user);
        return response.user;
      }
    } catch (error) {}
    return null;
  }

  async checkServer() {
    try {
      const response = await fetch(`${API_BASE}/health`);
      const data = await response.json();
      return data.success === true;
    } catch (error) {
      return false;
    }
  }

  clearLocalData() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  setTestData() {
    if (process.env.NODE_ENV === 'development') {
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
      this._saveUser(testUser);
      this.setToken('test_token_123');
    }
  }
}

const api = new ApiService();

export default api;