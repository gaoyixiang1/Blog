module.exports = app =>{
    const {router,controller} =app;
    router.get('/default/getArticleList',controller.default.home.getArticleList)
    router.get('/default/getArticleById/:id',controller.default.home.getArticleById)
    router.get('/default/getListById/:id',controller.default.home.getListById)
    router.get('/default/getWordsList',controller.default.home.getWordsList)
    router.post('/default/addWords',controller.default.home.addWords)
}