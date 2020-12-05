let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
    checkLogin : ipUrl+'checkLogin',//检查用户名密码
    getTypeInfo : ipUrl+'getTypeInfo',//获取文章类别
    addArticle : ipUrl+'addArticle',//添加文章
    updateArticle: ipUrl+'updateArticle',//修改文章
    getArticleList:ipUrl+'getArticleList',//获取文章列表
    deleteArticle:ipUrl+'deleteArticle/',//删除文章
    getArticleById:ipUrl+'getArticleById/',//根据id获取文章
    getWordsList:ipUrl+'getWordsList',//获取留言列表
    deleteWord:ipUrl+'deleteWord/'//删除留言
}
export default servicePath