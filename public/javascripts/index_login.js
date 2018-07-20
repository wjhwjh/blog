/**
 * Created by Administrator on 2018/6/11.
 */
$(window).ready(function () {

    //alert(111);
    /*登录页面*/
    $('#loginBtn').on('click', function () {
        var userName = $('#name').val();
        var userPwd = $('#password').val();
        var data = {
            user: userName,
            pwd: $.md5(userPwd)
        };

        //对输入的数据进行后台请求
        $.post('/doLogin', data, function (result) {  //函数的参数backData,是发送成功后，服务器返回的数据
            alert(result);

            /*
             * 返回上一个页面,如果是没有注册的用户，则先注册然后登录，这时登录以后返回注册页面？
             * */
            if (result == '登录成功') { //
                //self.location = document.referrer;
                self.location.href = '/'; //登录成功返回首页
            }
        })
    });

    //注册页面
    $('#registerBtn').on('click', function () {

        var userName = $('#registerName').val();
        var userPwd = $('#registerPassword').val();

        //把输入的数据传到服务器
        $.post('/isUser', {reg_user: userName}, function (result) {  //请求该用户是否存在
            if (result == 'exist') {
                alert('该用户已经存在');
            } else { //如果用户不存在则写入数据库
                var date = new Date();
                var createTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "  " + date.getHours() + ":" + date.getMinutes();

                //把用户注册信息发送到后台，也就是继续进行请求
                //在向后台传输的过程中就为密码加密
                $.post('/doRegister', {
                    "userName": userName,
                    "pwd": $.md5(userPwd),   //对密码进行加密
                    "time": createTime
                }, function (result) { //result是服务器响应值
                    alert(result);
                    history.go(-1);
                    location.reload();
                    self.location.href = '/login'; //注册成功跳转到登录页面
                });
            }
        })
    });

    /*退出登录*/



});//结束