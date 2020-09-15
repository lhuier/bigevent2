$(function () {


    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: $('[name="cate_id"]').val(),
        state: $('[name="state"]').val(),
    }

    //模板过滤器
    template.defaults.imports.formatDate = function (a) {
        var newtime = moment(a).format('MMMM Do YYYY, h:mm:ss a')
        return newtime;
    }

    //获取数据并渲染
    initList();

    function initList() {
        $.get("/my/article/list", q, function (res) {
            if (res.status === 0) {
                console.log(res.message);
                var shrHtml = template('tpl-table', res)
                $('tbody').html(shrHtml);
                renderPage(res.total)
            }
        })
    }



    initCate();

    function initCate() {
        $.get("/my/article/cates", function (res) {
            if (res.status === 0) {
                console.log(res.message);
                var shrHtml = template('tpl-cate', res)
                $('#sct-cate').html(shrHtml);
                layui.form.render()
            }
        })
    }

    //筛选
    $('#form-search').submit(function (e) {
        e.preventDefault()
        q.cate_id = $('[name="cate_id"]').val()
        q.state = $('[name="state"]').val()
        initList();
        console.log(q);
    })



    //分页
    function renderPage(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            laypage.render({
                elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
                count: total, //数据总数，从服务端得到
                curr: q.pagenum,
                limit: q.pagesize,
                limits: [2, 3, 5, 10],
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：

                    if (!first) {
                        console.log(obj.curr) //得到当前页，以便向服务端请求对应页的数据。
                        //得到每页显示的条数
                        q.pagenum = obj.curr
                        q.pagesize = obj.limit
                        initList();

                    }
                },

            });
        })
    }

    // 删除文章
    $('tbody').on('click', '.delete', function (e) {
        e.preventDefault()
        var len = $('.delete').length;
        var Id = $(this).attr('data-id')
        layer.confirm('is not?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            $.get(`/my/article/delete/${Id}`, function (res) {
                if (res.status === 0) {
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }

                    initList()
                    layer.close(index)
                }
            })
        })
    })






})