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


    //分页layui.use('laypage', function(){


    function renderPage(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            laypage.render({
                elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号

                count: total, //数据总数，从服务端得到
                curr: q.pagenum,
                limit: q.pagesize,
            });
        })
    }







})