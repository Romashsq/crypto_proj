require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Детальная диагностика MongoDB Atlas...\n');

// Покажем URI (скрыв пароль для безопасности)
const uri = process.env.MONGODB_URI;
const safeUri = uri ? uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@') : 'НЕ УСТАНОВЛЕНА';
console.log('📌 URI (пароль скрыт):', safeUri);

// Проверим структуру URI
console.log('\n🔧 Анализ строки подключения:');
const match = uri?.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]+)\?/);
if (match) {
  console.log('✅ Формат верный');
  console.log('   👤 Username:', match[1]);
  console.log('   🔐 Password length:', match[2].length, 'символов');
  console.log('   🌐 Host:', match[3]);
  console.log('   📦 Database:', match[4]);
} else {
  console.log('❌ Неверный формат URI');
}

// Пробуем подключиться с более детальной информацией
console.log('\n🔄 Пробуем подключиться...');

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000, // 5 секунд таймаут
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ Подключение успешно!');
  console.log('   Host:', mongoose.connection.host);
  console.log('   Port:', mongoose.connection.port);
  console.log('   Database:', mongoose.connection.name);
  
  // Покажем все базы данных
  return mongoose.connection.db.admin().listDatabases();
})
.then(result => {
  console.log('\n📦 Доступные базы данных:');
  result.databases.forEach(db => {
    console.log(`   - ${db.name} (${db.sizeOnDisk} bytes)`);
  });
  
  console.log('\n🎉 MongoDB Atlas работает корректно!');
  process.exit(0);
})
.catch(err => {
  console.error('\n❌ Ошибка подключения:', err.message);
  console.error('   Код ошибки:', err.code);
  console.error('   Имя ошибки:', err.name);
  
  console.log('\n🔧 Возможные причины и решения:');
  console.log('1. 🔑 Неверный пароль - проверь в Atlas → Database Access');
  console.log('2. 🌐 IP не добавлен - в Atlas → Network Access → Add IP Address → 0.0.0.0/0');
  console.log('3. 👤 Пользователь не существует - создай нового в Database Access');
  console.log('4. ⏰ Сервер Atlas не отвечает - проверь статус на status.mongodb.com');
  
  console.log('\n🔄 Попробуй это:');
  console.log('   • Создай нового пользователя с простым паролем (только буквы и цифры)');
  console.log('   • Добавь IP 0.0.0.0/0 в Network Access');
  console.log('   • Перезапусти кластер в Atlas');
  
  process.exit(1);
});