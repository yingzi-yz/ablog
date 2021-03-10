// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 出现下面这个报错就加这个代码  mongoose.set('useCreateIndex', true)
// (node:16184) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead. 
mongoose.set('useCreateIndex', true)

// 导入bcrypt模块
const bcrypt = require('bcrypt');

// 引入joi模块
const Joi = require('joi');

// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    }, 
    email: {
        type: String,
        // 保证邮箱地址插入数据库时不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true
    },
    state: {
        // 0是启用状态,1是禁用状态
        type: Number,
        dafault: 0
    }   
});

// 创建集合
const UserMore = mongoose.model('User', userSchema);

async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('admin', salt);
    const user = await UserMore.create({
        username: 'test',
        email: 'test@qq.com',
        password: pass,
        role: 'normal',
        state: 0
    })
}

// createUser();

// 验证用户信息
const validateUser = (user) => {
    // 定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则 The username cannot conform with the validation rules.')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求 The email format does not meet the requirements.')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求 The password format does not meet the requirements.')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法 The charcter value is illegal.')),
        state: Joi.number().valid('0', '1').required().error(new Error('状态值非法 The status value is illegal.'))
    };

    // 实施验证
    return Joi.validate(user, schema);
}

// 将用户集合作为模块成员进行导出
module.exports = {
    // 在es6中键和值相等,可以省略值,实际上等于UserMore: UserMore
    UserMore,
    validateUser
}