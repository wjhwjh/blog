/**
 * Created by Administrator on 2018/6/27.
 */

/*这个模块是用来上传数据的*/
var file_content = require('./read_content'); //引入模块，注意路径问题
var articleModel = require('../articleDatabase');
/*var article_mongoose = require('mongoose');//引入mongoose模块

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
 */
/*
* 读取数据并且添加到数据库中
* */
file_content.readFiles(function (data) {//回调函数形参
    //console.log( data );

    var date = new Date();
    var nowTime = date.getFullYear()+"-"+ (date.getMonth()+1)+"-"+ date.getDate()+"-"+ date.getHours()+":"+ date.getMinutes();

    var artJson = {
        title:'node.js 博客系统（3）',
        relTimes:nowTime,
        author:'惠子',
        describe:'简单的博客系统',
        getNum:0,
        content:data,
        images:'/images/2.jpg'
    };
    articleModel.create(artJson, function (err) {
        if(err) throw err;
        console.log('文章上传成功');
    });
});


