/**
 * Created by Administrator on 2018/6/28.
 */
var article_mongoose = require('mongoose');//引入mongoose模块

/*连接数据库，以及数据模板类，并抛出*/

//连接数据库
article_mongoose.connect('mongodb://localhost/articleDatabase'); // 连接到某一个数据库
var articleDB = article_mongoose.connection; //连接端口

//console.log( articleDB );

articleDB.on('error',console.error.bind(console,'连接错误:'));
articleDB.once('open',function(){
    //一次打开记录
    console.log( "***文章数据库链接成功***" );
});

//创建文章的schema
var articleSchema = new article_mongoose.Schema({
    title:String,       //标题
    relTimes:String,    //时间
    author:String,      //作者
    describe:String,    //简述
    getNum:String,      //访问量
    content:String,     //内容
    images:String       //图片
});

//把创建的schema转化为一个model
var articleModel = articleDB.model('articleList',articleSchema);
module.exports = articleModel;