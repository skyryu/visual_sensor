$(function () {
    //1) Sidebar js
    /*
    $('._wrapper ._sidebar ._inner').on('click', function () {
        alert('aaa');
    });
    */

    var optionSeries = function(lineChartData){
                        return [{
                                    name: 'R1',
                                    data: getR1(lineChartData)
                                },{
                                    name: 'R2',
                                    data: getR2(lineChartData)
                                }];
                       };


    $('._wrapper ._sidebar ._one').on('click', function(){
        //1) update echarts
        lineChart1.setOption({
            title: { text: "测斜仪1(20180923)"},
            series: optionSeries(lineChartData1) 
        });
        //2) update datatables
        table.rows().remove();
        table.rows.add(lineChartData1).draw();
    });

    $('._wrapper ._sidebar ._two').on('click', function(){
        //1) update echarts
        lineChart1.setOption({
            title: { text: "测斜仪2(20180923)"},
            series: optionSeries(lineChartData2)
        });
        //2) update datatables
        table.rows().remove();
        table.rows.add(lineChartData2).draw();
    });

    $('._wrapper ._sidebar ._three').on('click', function(){
        //1) update echarts
        lineChart1.setOption({
            title: { text: "测斜仪3(20180923)"},
            series: optionSeries(lineChartData3)
        });
        //2) update datatables
        table.rows().remove();
        table.rows.add(lineChartData3).draw();
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
    $('#_navbar_statistics_show_anchor').on('click', function(){
        $('#_navbar_statistics_show_anchor').addClass('active');
        $('#_navbar_model_show_anchor').removeClass('active');
        $('._3d_model').addClass('d-none');
        $('._datatables').removeClass('d-none');
    });

    $('#_navbar_model_show_anchor').on('click', function(){
        $('#_navbar_statistics_show_anchor').removeClass('active');
        $('#_navbar_model_show_anchor').addClass('active');
        $('._3d_model').removeClass('d-none');
        $('._datatables').addClass('d-none');
    });

    //3) toggle sidebar display
    $('#sidebarToggleIcon').on('click', function(){
        //alert('click toggle')
        if( $('._wrapper').hasClass('_sidebar_collapse') ){
            //alert('has d-none')
            $('._wrapper').removeClass('_sidebar_collapse')
        }
        else{
            //alert('no d-none')
            $('._wrapper').addClass('_sidebar_collapse')
        }

        echarts_resize();
    });

    datatables_draw();
    echarts_draw();

    $('._echarts').resize(function(){
        echarts_resize();
    });
});