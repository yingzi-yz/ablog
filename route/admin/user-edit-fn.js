// 导入用户集合构造函数
const {UserMore, validateUser} = require('../../model/user');

// 引入加密模块
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    try {   
        await validateUser(req.body);
    } catch(e) {
        // 验证没有通过 (e.message实际上就是schema中的error自定义的错误信息)
        // 重定向回用户添加页面
        // res.redirect('/admin/user-edit?message=' + e.message);
        // return res.redirect(`/admin/user-edit?message=${e.message}`);
        // 传递给错误处理中间件
        // JSON.stringify() 将对象数据类型转换为字符串数据类型
        return next(JSON.stringify({path: '/admin/user-edit', message: e.message}));
    }   

    // 根据邮箱地址查询用户是否存在
    let user = await UserMore.findOne({email: req.body.email})
    // 如果用户已经存在,说明邮箱地址已经被别人占用
    if (user) {
        // 重定向回用户添加页面
        // return res.redirect('/admin/user-edit?message=邮箱地址已被使用 The email address is already in use.');
        return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已被使用 The email address is already in use.'}))
    }

    // 对密码进行加密处理
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    // 加密
    const password = await bcrypt.hash(req.body.password, salt);
    // 替换密码
    req.body.password = password;
    
    // 将用户信息添加到数据库中
    await UserMore.create(req.body);
    // 将页面重定向到用户列表页面
    res.redirect('/admin/user');
}