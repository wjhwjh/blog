var express = require('express');
var userModel = require('../data/loginDataBase');
var articleModel = require('../data/articleDatabase');
var fs = require('fs');

var router = express.Router();



//var app = express();  // app和router区别 都可以用来调用路由的，区别


/* GET home page. */
/*req  是用来请求数据的
 * res  是做响应的
 * */
//var loginFlag = '';
router.get('/', function (req, res, next) {
/*
    if(req.session.user){
        loginFlag = '已登录';
    }else {
        loginFlag = '登录';
        req.session.user = '';
    }*/
    /*
    * 1. 获取数据库文章数据
    * 2. 渲染页面
    * 3. 对上传文章进行排序articleModel.sort().exec()
    *    -1按倒序进行排序，后发布的在数据库中最下边，所以需要倒序排列
    * */

    articleModel.find({}).sort({'_id':-1}).exec(function (err, data) {
        if(err) throw err;
        console.log( data );
        res.render('index',{
            title:req.session.user,
            data:data
        });
    });
});

router.get('/login', function (req, res, next) {
    res.render('login');
});
router.get('/register', function (req, res, next) {
    res.render('register');
});


//执行登录
router.post('/doLogin', function (req, res, next) {
    // console.log( req.body );
    // 检查用户名，密码等


    userModel.find({"userName": req.body.user}, function (err, data) {
        //var dataPwd = data[0].pwd; //数据库中的密码是加密的，所以使用的时候还需要解密
        if (data[0]) {
            if (req.body.pwd == data[0].pwd) {
                req.session.user = req.body.user; //判断登录状态
                res.send('登录成功');
                /*写入日志
                 * 登录成功时，把相关的用户信息添加到日志中
                 *
                 * 信息包括 用户名和时间
                 * */
                var date = new Date();
                var loginUser = '时间：' + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getHours() + ":" + date.getMinutes() + '  用户名：' + req.body.user;

                fs.writeFile('./log/dologin.log', loginUser, {flag: "a"}, function (err) { //flag默认值'w'，会清空文件
                    if (err) {
                        console.log('登录失败');
                    } else {
                        console.log('登录成功');
                    }
                });
                //渲染首页的登录按钮


            } else {
                if (err) throw err;
                res.send('密码错误');
            }
        } else {
            res.send('此用户不存在');
        }
    });
});

//判断用户是否已经登录
router.post('/isLogin', function (req, res) {
    console.log(req.session.user);
    if (req.session.user) {
        res.send('do');
    } else {
        res.send('not');
    }
});


//注册,判断是否有该用户
router.post('/isUser', function (req, res, next) {
    //var user = req.body.reg_user;
    // console.log(req.body.reg_user); // 输出说明接收到了
    userModel.find({"userName": req.body.reg_user}, function (err, data) {
        if (err) throw err;
        //console.log( data );
        if (data[0]) {
            res.send('exist');
        } else {
            res.send('noExist');
        }
    });
});

/*执行注册功能*/
router.post('/doRegister', function (req, res, next) {
    //console.log( req.body );
    userModel.create(req.body, function (err, data) { //注册的用户写入数据库
        //console.log( data );
        if (err)throw err;

        /*
         * 注册时的的日志
         *
         * 记录注册用户的姓名和注册日期
         * */
        var date = new Date();
        var registerUser = '时间：' + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getHours() + ":" + date.getMinutes() + '  用户名：' + req.body.userName;
        fs.writeFile('./log/register.log', registerUser, {flag: "a"}, function (err) {
            if (err) {
                console.log('注册失败');
            } else {
                console.log('注册成功');
            }
        });

        res.send('注册成功');
    });

});


module.exports = router;
