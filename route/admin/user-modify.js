// 导入用户集合构造函数
const {UserMore} = require('../../model/user');

// 引入bcrypt模块
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    // 接收客户端表单传递过来的请求参数 (这个没有获取到id)
    const {username, email, password, role, state} = req.body;
    // 即将要修改的用户id
    const id = req.query.id;

    // 通过id查找用户信息
    let user = await UserMore.findOne({_id: id})

    // 密码比对
    const isValid = await bcrypt.compare(password, user.password);
    // 密码比对成功
    if (isValid) {
        // 将用户信息更新到数据库中
        await UserMore.updateOne({_id: id}, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        // 将页面重定向到用户列表页面
        res.redirect('/admin/user');
    } else {
        // 密码比对失败
        let obj = {path: '/admin/user-edit', message: '密码比对失败,不能进行用户信息的修改 The password comparison failed. The User information cannot be modified.', id: id}
        next(JSON.stringify(obj));
    }
}