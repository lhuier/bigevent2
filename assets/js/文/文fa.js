$(function () {
    // 初始化富文本编辑器
    initEditor()



    //
    initCate()

    function initCate() {
        $.get('/my/article/cates', function (res) {
            if (res.status === 0) {
                var strHTML = template('cate', res)
                $('[name=cate_id]').html(strHTML)
                layui.form.render()
            }
        })


        $.get('/my/article/cates', function (res) {
            if (res.status === 0) {
                var shrHtml = template('cate', res)
                $('[mane="cate_id"]').html(shrHtml)
            }
        })
    }

    // 提供state数据
    var state = '已发布'
    $('#caogao').on('click', function () {
        state = '草稿'
    })


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview',
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    //选择图片
    $('#chooseImage').click(function (e) {
        $('#file').click()
    })

    $('#file').change(function (e) {
        var file = e.target.files[0]
        if (!file) return
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    $('#formPub').submit(function (e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state', state)
        console.log(fd);
        fd.forEach(function (a, b) {
            console.log(b, a);
        })
    })
})