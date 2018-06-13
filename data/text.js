/**
 * Created by Administrator on 2018/6/11.
 */
/*var mongoose = require("mongoose"); //引入模块
var db = mongoose.createConnection("localhost","texts"); //localhost为什么*/

/*另一种链接方法*/
var mongoose = require('mongoose');
//连接数据库users。如果数据库不存在会自动创建。
mongoose.connect('mongodb://localhost/users');
var db = mongoose.connection;


db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
    //一次打开记录
    console.log( "链接成功" );
});

/*执行一次，创建一条数据，这里需要去重*/
var userSchema = {
    "name": String,
    "age": Number,
    "sex": String
};
var User = mongoose.model("users", userSchema); //模板化

var my = new User({ //实例化
    "name":"小明",
    "age":12,
    "sex":"男"
});
console.log( my );
my.save();//存储

db.close();


