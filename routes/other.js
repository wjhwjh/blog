/**
 * Created by Administrator on 2018/7/9.
 */
var express = require('express');
var router = express.Router();

router.post('/ajaxText', function (req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    res.writeHead(200,{"content-type":"text/plain"});
    console.log( req.body );
});
