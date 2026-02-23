// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const helpers = require('../utils/helper');

const JWT_SECRET = process.env.JWT_SECRET || 'crypto-learning-platform-secret-key-2024';

// Глобальные хранилища
let users, userCourses, userProgress;

// Функция для инициализации хранилищ
const setStorage = (storage) => {
  users = storage.users;
  userCourses = storage.userCourses;
  userProgress = storage.userProgress;
  console.log('✅ authController получил хранилище, users.length:', users?.length || 0);
};

// ============ РЕГИСТРАЦИЯ ============
const register = (req, res) => {
  try {
    console.log('📝 Запрос регистрации:', req.body);
    const { username, password, fullName, email } = req.body;
    
    if (!username || !password || !fullName || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Все поля обязательны' 
      });
    }
    
    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'Пользователь с таким именем или email уже существует' 
      });
    }
    
    const newUser = {
      id: Date.now().toString(),
      username: username.trim(),
      password: password,
      fullName: fullName.trim(),
      email: email.trim(),
      xp: 0,
      level: 1,
      streak: 0,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    users.push(newUser);
    console.log('✅ Пользователь создан:', newUser.id, newUser.username);
    
    helpers.initializeUserProgress(newUser.id, userProgress);
    helpers.initializeUserCourses(newUser.id, userCourses);
    
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, email: newUser.email }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.json({ 
      success: true, 
      token, 
      user: userWithoutPassword, 
      message: 'Регистрация успешна' 
    });
    
  } catch (error) {
    console.error('❌ Ошибка регистрации:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера' 
    });
  }
};

// ============ ЛОГИН ============
const login = (req, res) => {
  try {
    console.log('🔑 Запрос логина:', req.body);
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email и пароль обязательны' 
      });
    }
    
    const user = users.find(u => 
      (u.email === email || u.username === email) && u.password === password
    );
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Неверный email или пароль' 
      });
    }
    
    console.log('✅ Пользователь найден:', user.id);
    user.lastLogin = new Date().toISOString();
    
    helpers.initializeUserProgress(user.id, userProgress);
    helpers.initializeUserCourses(user.id, userCourses);
    
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );
    
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ 
      success: true, 
      token, 
      user: userWithoutPassword, 
      message: 'Вход выполнен успешно' 
    });
    
  } catch (error) {
    console.error('❌ Ошибка логина:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера' 
    });
  }
};

// ============ ПРОВЕРКА АВТОРИЗАЦИИ ============
const verifyAuth = (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ 
      success: false, 
      error: 'Пользователь не найден' 
    });
  }
  
  const { password, ...userWithoutPassword } = user;
  
  res.json({ 
    success: true, 
    user: userWithoutPassword, 
    message: 'Токен валиден' 
  });
};

// ============ ПОЛУЧИТЬ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ (ДЛЯ ДЕБАГА) ============
const getAllUsers = (req, res) => {
  try {
    // Проверяем секретный ключ в заголовке (опционально)
    const adminKey = req.headers['x-admin-key'];
    if (adminKey && adminKey !== 'crypto_admin_2024') {
      return res.status(403).json({ 
        success: false, 
        error: 'Неверный ключ доступа' 
      });
    }
    
    // Убираем пароли из ответа
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    
    res.json({
      success: true,
      count: users.length,
      users: usersWithoutPasswords,
      userCourses: userCourses,
      userProgress: userProgress
    });
  } catch (error) {
    console.error('❌ Ошибка получения пользователей:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера' 
    });
  }
};



// ============ ЭКСПОРТЫ ============
module.exports = {
  setStorage,
  register,
  login,
  verifyAuth,
  getAllUsers
};