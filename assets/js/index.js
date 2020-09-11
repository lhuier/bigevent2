$(function () {
    //切换注册登录块
    $('.login a').on('click', function () {
        $('.login').hide().next().show()
    })
    $('.reglog a').on('click', function () {
        $('.reglog').hide().prev().show()
    })
    //  登录注册正则判断
    layui.form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //确认密码
        regpass: function (value) {
            if (value !== $('#shezhi').val()) {
                return '两次密码不相同'
            }
        }
    });

    //注册form表单提交
    $('#btn-reg').submit(function (e) {
        e.preventDefault();
        var username = $('#zhuname').val()
        var password = $('#shezhi').val()
        var formdata = {
            username: username,
            password: password,
        }

        //发起注册请求
        $.post('/api/reguser', formdata, function (res) {

            if (res.status === 0) {
                setInterval(function () {
                    $('.reglog a').click()
                }, 2000)

            }
            layui.layer.msg(res.message + '即将返回登录页面')
        })

    })
    // 登录form表单提交
    $('#btn-log').submit(function (e) {
        e.preventDefault();
        var formdata = $(this).serialize();
        //发起登录请求
        $.post('/api/login', formdata, function (res) {
            console.log(res);
            if (res.status === 0) {
                window.location.href = '../../shouye.html'
                res.token.length !== 0 && window.localStorage.setItem('token', res.token)
            }
            layui.layer.msg(res.message)
        })

    })

})