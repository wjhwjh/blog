/**
 * Created by Administrator on 2018/7/20.
 */
//文章详情页面评论部分
var $commentName = $('.commentName'),
    $commentValue = $('.commentValue'),
    $sbtBtn = $('.sbtBtn');


$sbtBtn.on('click', function () {
    var commentNameVal = $commentName.val(),
        commentValueVal = $commentValue.val();
    var date = new Date();
    var createTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

    //console.log( commentValueVal );
    var data = {
        commentTime:createTime,
        //commemtUser:commentNameVal,
        commentCont:commentValueVal

    };

    $.post('/isLogin',function (result) {
        console.log(result);
        if(result == 'not'){
            alert('登录以后才能发表评论哦~~');
        }else {
            $.post('/articleComment', data, function (result) {
                 console.log(result);
            })
        }
    });
});