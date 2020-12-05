let ipUrl =' http://127.0.0.1:7001/default/'

let servicePath = {
    getArticleList:ipUrl+'getArticleList',//获取首页文章列表接口
    getArticleById:ipUrl+'getArticleById/',//文章详细页
    getListById:ipUrl+'getListById/',//根据id对应的类型获取文章列表
    getWordsList:ipUrl+'getWordsList',//获取留言列表
    addWords:ipUrl+'addWords'//添加留言
}

export default servicePath