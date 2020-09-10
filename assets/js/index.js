$(function () {
    $('.login a').on('click', function () {
        $('.login').hide().next().show()
    })
    $('.reglog a').on('click', function () {
        $('.reglog').hide().prev().show()
    })

    layui.form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        regpass: function (value) {
            if (value !== $('#shezhi').val()) {
                return '两次密码不相同'
            }
        }
    });
    $('#btn-reg').submit(function (e) {
        e.preventDefault();
        var username = $('#zhuname').val()
        var password = $('#shezhi').val()

        var formdata = {
            username: username,
            password: password,
        }
        $.post('/api/reguser', formdata, function (res) {

            if (res.status === 0) {
                setInterval(function () {
                    $('.reglog a').click()
                }, 2000)

            }
            layui.layer.msg(res.message + '即将返回登录页面')
        })

    })
    $('#btn-log').submit(function (e) {
        e.preventDefault();
        var formdata = $(this).serialize();
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