$(function () {
    initTable()

    function initTable() {
        $.get('/my/article/cates', function (res) {
            console.log(res);
            if (res.status === 0) {
                var strHtml = template('tpl-table', res)
                $('tbody').html(strHtml)


            }
        })
    }
    var strAddHtml = $('#tpl-add').html()
    var addIndex = 0;
    var editIndex = 0;

    // 打开添加页面
    $('#addBtn').on('click', function (e) {
        e.preventDefault();
        addIndex = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            // content的值是很多标签->手写没提示->tempalte
            // content: '<form class="form"><div><input/><input/></div></form>',
            content: strAddHtml,
        })


    })


    //提交添加
    $('body').on('submit', '#addForm', function (e) {

        e.preventDefault()
        var formdata = $(this).serialize()
        $.post('/my/article/addcates', formdata, function (res) {
            if (res.status === 0) {
                console.log(res.message)
                // 关闭弹出层
                layui.layer.close(addIndex)
                initTable()

            }
        })
    })

    //打开编辑页面
    $('body').on('click', '.edit', function (e) {
        e.preventDefault()
        var strEditHtml = $('#tpl-edit').html()
        editIndex = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: strEditHtml,
        })
        var Id = $(this).attr('data-id')
        console.log(Id);



        $.get(`/my/article/cates/${Id}`, function (res) {
            if (res.status === 0) {
                console.log(res.data)
                layui.form.val('editForm', res.data)
            }
        })
    })

    //编辑按钮--提交编辑
    $('body').on('submit', '#editForm', function (e) {
        e.preventDefault();

        var formdata = $(this).serialize();
        $.post(`/my/article/updatecate`, formdata, function (res) {
            if (res.status === 0) {
                layui.layer.close(editIndex)
                initTable()
            }
        })
    })

    //删除按钮--删除当前
    $('tbody').on('click', '.delete', function (e) {
        e.preventDefault;
        var Id = $(this).attr('data-id')

        layer.confirm('Sure?', {
            icon: 3,
            title: '真的要把我删除嘛？'
        }, function (
            index
        ) {
            //do something
            $.get(`/my/article/deletecate/${Id}`, function (res) {
                console.log(res);
                if (res.status === 0) {
                    initTable()
                    layer.close(index)
                }
            })
        })

    })
})