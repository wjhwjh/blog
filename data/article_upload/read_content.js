/**
 * Created by Administrator on 2018/6/27.
 */
var fs = require('fs');
/*读取文章的*/
module.exports.readFiles = function (callback) { //回调函数作为参数
    fs.readFile('./article.text','utf-8', function (err,data) {
        if(err)throw err;
       //console.log(data);
        callback(data); //回调函数的实参
    });
};