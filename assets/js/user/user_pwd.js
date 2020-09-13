$(function () {
    layui.form.verify({
        len: [/^\S{6,12}$/, '长度必须6到12位，不能有空格'],

        diff: function (value) {
            var oldPwd = $('[name="oldPwd"]').val()
            if (value === oldPwd) {
                return '新密码不能与旧密码相同'
            }
        },

        same: function (value) {
            var newPwd = $('[name="newPwd"]').val()
            if (value !== newPwd) {
                return '第三个和第二个必须一样'
            }
        }

    })

    $('#changepwd').on('click', function (e) {
        e.preventDefault()

        var formdata = $('#formInfo').serialize()
        $.post('/my/updatepwd', formdata, function (res) {
            console.log(res);
            if (res.status === 0) {
                layui.layer.msg(res.message)
                $('button[type="reset"]').click()

            } else(
                layui.layer.msg(res.message)

            )
        })

    })


})