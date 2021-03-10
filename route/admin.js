// 引用express框架
const express = require('express');

// 导入bcrypt模块
const bcrypt = require('bcrypt');

// 导入用户集合构造函数
const {UserMore} = require('../model/user');

// 创建博客展示页面路由
const admin = express.Router();

// 创建登录页面路由
admin.get('/login', require('./admin/loginPage'));

// 实现登录功能
admin.post('/login', require('./admin/login'));

// 创建用户列表路由
admin.get('/user', require('./admin/userPage'));

// 实现退出功能
admin.get('/logout', require('./admin/logout'));

// 创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'));

// 实现用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));

// 实现用户修改功能路由
admin.post('/user-modify', require('./admin/user-modify'));

// 删除用户功能路由
admin.get('/delete', require('./admin/user-delete'));

// 文章列表页面路由
admin.get('/article', require('./admin/article.js'));

// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));

// 实现文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'));

// 将路由对象做为模块成员进行导出
module.exports = admin;