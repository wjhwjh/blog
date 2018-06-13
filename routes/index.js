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
  //console.log(req.body.name)

});

router.post('/doLogin', function (req, res, next) {
   console.log( req.body );
  // 检查用户名，密码等


    userModel.find(req.body.user,function (data) {

    });

  res.send({isLogin:true});
  
});


module.exports = router;
