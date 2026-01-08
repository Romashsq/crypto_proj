const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'crypto-learning-secret-2024';

const auth = (req, res, next) => {
  try {
    // Получаем токен из заголовка
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Требуется аутентификация'
      });
    }

    // Верифицируем токен
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Добавляем данные пользователя в запрос
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Ошибка аутентификации:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Неверный токен'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Токен истек'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Ошибка аутентификации'
    });
  }
};

module.exports = auth;