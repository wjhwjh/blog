var express = require('express');
var router = express.Router();
//var app = express();  // app和router区别 都可以用来调用路由的，区别


/* GET home page. */
/*req  是用来请求数据的
* res  是做响应的
* */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/logIn', function (req, res, next) {
  res.render('logIn');
});

module.exports = router;
