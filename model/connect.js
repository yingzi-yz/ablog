// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 引入config第三方模块
const config = require('config');

console.log(config.get('db.host'));

// 连接数据库
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('The database connected successfully.'))
        .catch(() => console.log('The database connection failed.'))