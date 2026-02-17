// backend/server.js
const app = require('./app');

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
  console.log('🌐 CORS настроен для: http://localhost:5173');
  console.log('💾 Данные хранятся в памяти');
  console.log('🚀 Готов к работе!');
});