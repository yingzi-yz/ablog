// 将文章集合的构造函数导入到当前文件中
const {ArticleMore} = require('../../model/article');

// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // 接收客户端传递过来的页码
    const page = req.query.page;

    // 标识 表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'article';

    // 查询所有文章数据 (多集合联合查询)
    // page 指定当前页
    // size 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec 向数据库发出查询请求
    // 当集合联合查询和渲染页面模板同时进行时会导致两者冲突，从而导致无法渲染页面。所以报错
    let articles = await pagination(ArticleMore).find().page(page).size(2).display(3).populate('author').exec();
    let str = JSON.stringify(articles);
    articles = JSON.parse(str);
    // res.send(articles);
 
    // 渲染文章列表页面模板
    res.render('admin/article', {
        articles: articles
    });
}