'use strict'


const Controller = require('egg').Controller

class MainController extends Controller {

    async checkLogin() {
        let userName = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;
        const sql = `select userName from admin_user where userName = '${userName}' and password = '${password}'`;
        const res = await this.app.mysql.query(sql);
        console.log(res);
        if (res.length) {
            let openId = new Date().getTime();
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { 'data': '登录成功', 'openId': openId, error: 0 }
        } else {
            this.ctx.body = { 'data': '登录失败', error: 1 }
        }
    }

    async getTypeInfo() {
        const resType = await this.app.mysql.select('_type')
        this.ctx.body = { data: resType }
    }
    async addArticle() {
        let tmpArticle = this.ctx.request.body;
        const result = await this.app.mysql.insert('article', tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId: insertId
        }
    }
    async updateArticle() {
        let tmpArticle = this.ctx.request.body;
        const result = await this.app.mysql.update('article', tmpArticle);
        const updateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess: updateSuccess
        }
    }
    async getArticleList() {
        let sql = `
    select 
     article.id as id ,
     article.title as title ,
     article_cointent as context,
     article.introduce as introduce,
     article.viewCount as viewCount,
     DATE_FORMAT(article.addTime,'%Y-%m-%d') as addTime,
     _type.typeName as typeName from article
     left join _type on article.type_id = _type.id 
     order by article.id desc 
    `;
        const reList = await this.app.mysql.query(sql);
        this.ctx.body = { list: reList }
    }

    async deleteArticle() {
        let id = this.ctx.params.id;
        const res = await this.app.mysql.delete('article', { 'id': id })
        this.ctx.body = {
            data: res
        }
    }
    async getArticleById() {
        let id = this.ctx.params.id;
        let sql = `select 
        article.id as id ,
        article.title as title ,
        article_cointent as context,
        article.introduce as introduce,
        article.viewCount as viewCount,
        DATE_FORMAT(article.addTime,'%Y-%m-%d') as addTime,
        _type.typeName as typeName ,
        _type.id as typeId
        from article left join _type on article.type_id = _type.id
        where article.id = '${id}' `

        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}
    }

    async getWordsList(){
        const result = await this.app.mysql.select('words');
        this.ctx.body={
            data:result
        }
    }
    async deleteWord(){
        let id = this.ctx.params.id;
        const res = await this.app.mysql.delete('words',{'id':id})
        this.ctx.body={
            data:res
        }
    }
}

module.exports = MainController