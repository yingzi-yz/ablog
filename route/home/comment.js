// 引入评论集合构造函数
const {CommentMore} = require('../../model/comment');

module.exports = async (req, res) => {
    // 接收客户端传递过来的请求参数
    const {content, uid, aid} = req.body;

    // 将评论信息存储到评论集合中
    await CommentMore.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    })

    // 将页面重定向文章详情页面
    res.redirect('/home/article?id='+aid);
}