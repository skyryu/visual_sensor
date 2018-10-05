$(function () {
    //1) Sidebar js
    $('._wrapper ._sidebar ._inner').on('click', function () {
        alert('aaa');
    });

    $('.btn-toggle-sidebar').on('click', function () {
        $('.wrapper').toggleClass('sidebar-collapse');
    });
    $('.sb-item').on('click', function () {
        if ($(this).hasClass('btn-toggle-sidebar')) return;
        $(this).siblings().removeClass('active');
        $(this).siblings().find('.sb-item').removeClass('active');
        $(this).addClass('active');
    });

    //2) model and statistic form js
    $('#_navbar_statistics_show_anchor a').on('click', function(){
        $('#_navbar_statistics_show_anchor').addClass('active');
        $('#_navbar_model_show_anchor').removeClass('active');
        $('._3d_model').addClass('d-none');
        $('._datatables').removeClass('d-none');
    });

    $('#_navbar_model_show_anchor a').on('click', function(){
        $('#_navbar_statistics_show_anchor').removeClass('active');
        $('#_navbar_model_show_anchor').addClass('active');
        $('._3d_model').removeClass('d-none');
        $('._datatables').addClass('d-none');
    });

    datatables_draw();
    echarts_draw();
});