/**
 * Created by Administrator on 2018/6/12.
 */
var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/loginDataBase');
var db = mongoose.connection;

db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
    //一次打开记录
    console.log( "**用户信息链接成功**" );
});

var userSchema = { //
    "userName":String,
    "pwd":String,
    "time":String
};

var userModel = db.model('userLister',userSchema); //

/*
var date = new Date();
var nowTime = date.getFullYear()+"-"+ (date.getMonth()+1)+"-"+ date.getDate()+"-"+ date.getHours()+":"+ date.getMinutes();
//console.log(nowTime);

var huizi = new userModel({
    "userName":"惠子",
    "pwd":123,
    "time":nowTime
});
//console.log(one);
huizi.save();*/

/*userModel.create({
    "userName":"惠子",
    "pwd":111,
    "time":nowTime
}, function (err) {
    if(err)throw err;
    console.log( '数据插入成功' );
});*/


module.exports = userModel;