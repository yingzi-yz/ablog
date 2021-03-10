const {ArticleMore} = require('../../model/article');
const {CommentMore} = require('../../model/comment');

module.exports = async (req, res) => {
    // 接收客户端传递过来的文章id值
    const id = req.query.id;

    // 根据id查询文章详细信息
    // 在mongoose中使用populate方法实现集合关联时，导致模板引擎art-template无法渲染
    // lean()方法：是告诉mongoose返回的是普通对象，而不是mongoose文档对象,解决无法渲染问题
    const article = await ArticleMore.findOne({_id: id}).populate('author').lean();
    // res.send(article);

    // 查询当前文章所对于的评论信息
    let comments = await CommentMore.find({aid: id}).populate('uid').lean();
    // res.send(comments);
    
    res.render('home/article', {
        article: article,
        comments
    })
}