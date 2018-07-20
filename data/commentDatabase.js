/**
 * Created by Administrator on 2018/7/20.
 */
var commentMongoose = require('mongoose');

commentMongoose.connect('mongodb://localhost/commentDatabase');
var commentDB = commentMongoose.connection;

commentDB.on('error',console.error.bind(console,'连接错误:'));
commentDB.once('open',function(){
    //一次打开记录
    console.log( "**评论数据库连接成功**" );
});

//创建用户评论数据的schema

var commentShema = new commentMongoose.Schema({
    commentTime:String,
    commentCont:String,
    commemtUser:String
});


//把创建的schema转化为一个model
var commentModel = commentDB.model('commentList',commentShema);


/*commentModel1.create({
    commentTime:'2018/7/20',
    commemtUser:'慧儿',
    commentCont:'评论测试1111'
},function (err, data) {
    if(err) throw err;
    console.log( '添加成功' );
});*/

module.exports = commentModel;






