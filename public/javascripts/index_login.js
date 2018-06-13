/**
 * Created by Administrator on 2018/6/11.
 */
 $(window).ready(function () {
     /*登录页面*/

     $('#loginBtn').on('click', function (e) {
         e.stopPropagation();
         var userName = $('#name').val();
         var userPwd = $('#password').val();
         //console.log( userName, userPwd );
         var data = {
             user:userName,
             pwd:userPwd
         };

         //post请求，请求成功才执行
         $.post('/doLogin',data,function (backData) {  //函数的参数backData,是发送成功后，服务器返回的数据
             //alert( data );
             console.log( backData );
         })

     });
     
     
     
     
     
 });