var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index'); //路由器
var users = require('./routes/users');
var other = require('./routes/other');

var session = require('express-session');

var app = express();




// view engine setup 视图设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 使用 session 中间件
app.use(session({ //参数的意义
  secret :  parseInt(Math.random()*10000).toString(), // 对session id 相关的cookie 进行签名
  name: 'name',
  resave :false, //是否每次都重新保存会话
  saveUninitialized: false, // 是否自动保存未初始化的会话
  cookie : {
    maxAge : 1000*60*60*60*3 // 设置 session 的有效时间，单位毫秒
  }
}));



app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



//app.use('/63342',ajax);


module.exports = app;
