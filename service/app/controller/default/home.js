'use strict';
//前台接口
const Controller = require('egg').Controller;

class HomeController extends Controller {
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
    `;
    const results = await this.app.mysql.query(sql)
    this.ctx.body = { data: results }
  }

  async getArticleById() {
    let sql = `
    select 
     article.id as id ,
     article.title as title ,
     article_cointent as context,
     article.introduce as introduce,
     article.viewCount as viewCount,
     DATE_FORMAT(article.addTime,'%Y-%m-%d') as addTime,
     _type.id as typeId,
     _type.typeName as typeName from article
     left join _type on article.type_id = _type.id
     where article.id =${this.ctx.params.id}
    `;

    const results = await this.app.mysql.query(sql)
    this.ctx.body = { data: results }
  }
  async getListById() {
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
     where type_id=${this.ctx.params.id}   
    `;
    const results = await this.app.mysql.query(sql)
    this.ctx.body = { data: results }
  }
  async addWords(){
    let tmpWord = this.ctx.request.body;
    const result = await this.app.mysql.insert('words',tmpWord);
    const insertSuccess = result.affectedRows === 1;
    this.ctx.body={
      isSuccess:insertSuccess
    }
  }
  async getWordsList(){
    const result = await this.app.mysql.select('words');
    this.ctx.body={data:result}
  }

 

}

module.exports = HomeController;
