$(function () {
    $('.login a').on('click', function () {
        $('.login').hide().next().show()
    })
    $('.reglog a').on('click', function () {
        $('.reglog').hide().prev().show()
    })

})