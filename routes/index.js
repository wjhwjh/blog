var express = require('express');
var userModel = require('../data/loginDataBase');
var router = express.Router();


//var app = express();  // app和router区别 都可以用来调用路由的，区别


/* GET home page. */
/*req  是用来请求数据的
* res  是做响应的
* */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

    //console.log(userModel.find());{'userName':req.body.user},
    userModel.find({"userName": req.body.user} ,function (err, data) {
          //if(err)throw err;
          /* console.log( req.body.user  );
           console.log( data[0].userName );
           console.log( data[0].pwd );*/
           //var dataPwd = data[0].pwd; //数据库中的密码是加密的，所以使用的时候还需要解密
           //console.log( data[0] );
          if( data[0] ){
              if(req.body.pwd == data[0].pwd){
                  res.send('登录成功');
              }else {
                  if(err) throw err;
                  res.send('密码错误');
              }
          }else {
              res.send('此用户不存在');
          }
    });
});


//注册,判断是否有该用户
router.post('/isUser', function (req, res, next) {
    //var user = req.body.reg_user;
     // console.log(req.body.reg_user); // 输出说明接收到了
    userModel.find({"userName":req.body.reg_user}, function (err,data) {
        if(err) throw err;
       //console.log( data );
        if(data[0]){
            res.send('exist');
        }else {
            res.send('noExist');
        }
    });
});

/*执行注册功能*/
router.post('/doRegister', function (req, res, next) {
    //console.log( req.body );
    userModel.create(req.body, function (err, data) { //注册的用户写入数据库
        //console.log( data );

        if(err)throw err;
        res.send( '注册成功');
    });
    
});


module.exports = router;
