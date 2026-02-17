// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'crypto-learning-platform-secret-key-2024';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Токен доступа требуется' 
    });
  }
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('❌ Ошибка верификации токена:', err.message);
      return res.status(403).json({ 
        success: false, 
        error: 'Неверный или просроченный токен' 
      });
    }
    
    // Проверка существования пользователя будет в контроллерах
    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;