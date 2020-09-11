$(function () {
    // Header：

    // Authorization: Bearer
    // var token = window.localStorage.getItem('token');

    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: token,
        // },
        success: function (res) {
            console.log(res);
            if (res.status === 1) {
                return
            }
            var resname = res.data.nickname || res.data.username
            $('#welcome').html('欢迎&nbsp;&nbsp;' + resname);
            if (res.data.user_pic) {
                $('.layui-nav-img').alert('src', res.data.user_pic).show()
                $('.text-avatar').hide()
            } else {
                var first = res.data.username[0].toUpperCase();
                $('.text-avatar').text(first)
                $('.layui-nav-img').hide()
            }
        },
        // complete: function (res) {
        //     console.log(res);
        //     if (
        //         res.responseJSON.status === 1 &&
        //         res.responseJSON.message === '身份认证失败！'
        //     ) {
        //         localStorage.removeItem('token')
        //         window.location.href = '/login.html'
        //     }

        // },



    })








    $('#tuichu').on('click', function () {
        layer.confirm('确认退出？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something

            window.location.href = '../../login.html'
            window.localStorage.removeItem('token')
            layer.close(index);
        });
    })
})