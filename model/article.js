// 引入mongoose模块
const mongoose = require('mongoose');

// 创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 1,
        required: [true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传递作者']
    },
    publishDate: {
        type: Date,
        dafault: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
})

// 根据规则创建集合
const ArticleMore = mongoose.model('Article', articleSchema);

// 将集合规则作为模块成员进行导出
module.exports = {
    ArticleMore
} 