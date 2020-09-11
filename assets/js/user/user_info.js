$(function () {
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        },
    })
    getUserInfo()

    function getUserInfo() {
        $.get('/my/userinfo', function (res) {
            console.log(res);
            if (res.status === 0) {
                // 给表单赋值
                layui.form.val('formInfo', res.data)
            } else {}
        })
    }

    $('#btn-reset').click(function (e) {
        e.preventDefault()
        getUserInfo()
    })

    $('#formInfo').submit(function (e) {
        e.preventDefault()
        $.post('/my/userinfo', $(this).serialize(), function (res) {
            if (res.status === 0) {
                console.log(window.parent)
                window.parent.getUserInfo()
            }
        })
    })
})