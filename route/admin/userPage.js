// 导入用户集合构造函数
const {UserMore} = require('../../model/user');

module.exports = async (req, res) => {
    // 标识 表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    // 接收客户端传递过来的当前页参数
    let page = req.query.page || 1;
    // 每一页显示的数据条数
    let pagesize = 10;
    // 查询用户数据的总数
    let count = await UserMore.countDocuments({});
    // 总页数
    let total = Math.ceil(count / pagesize);
    // 页码对应的数据查询开始位置
    let start = (page - 1) * pagesize;

    // 将用户信息从数据库中查询出来
    let users = await UserMore.find({}).limit(pagesize).skip(start);
    // 渲染用户列表模板
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    })
}