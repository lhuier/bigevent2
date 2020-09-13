$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)



    $('#up').on('click', function (e) {
        e.preventDefault()
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        // e.target获取当前的input：file这个DOM=>
        // console.log(e.target.files)
        // 1. 获取图片对象
        console.log(e);
        var file = e.target.files[0]
        // 2. 根据选择的文件，创建一个对应的 URL 地址：
        // URL:统一资源定位符->资源路径
        var newImgURL = URL.createObjectURL(file)
        // console.log(newImgURL) 
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    $('#sure').on('click', function (e) {
        e.preventDefault()
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100,
            })
            .toDataURL('image/png')
        console.log(dataURL);
        $.post('/my/update/avatar', {
            avatar: dataURL
        }, function (res) {
            if (res.status === 0) {
                alert(res.message);
                window.parent.getUserInfo()
            }
        })
    })

})