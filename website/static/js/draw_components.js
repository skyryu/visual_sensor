$(function () {
    //1) Sidebar js
    /*
    $('._wrapper ._sidebar ._inner').on('click', function () {
        alert('aaa');
    });
    */
    
    var lastClick = 'model';

    var setDisplayFlag = function(flag){
        if(flag === "model"){
            $('#_navbar_statistics_show_anchor').removeClass('active');
            $('#_navbar_model_show_anchor').addClass('active');
            $('._3d_model').removeClass('d-none');
            $('._model_or_form, ._datatables, ._echarts1, ._echarts2, .carousel').addClass('d-none');
        }else if(flag === 'device'){
            $('#_navbar_statistics_show_anchor').addClass('active');
            $('#_navbar_model_show_anchor').removeClass('active');
            $('._model_or_form, ._datatables, .carousel').removeClass('d-none');
            $('._3d_model').addClass('d-none');
            $('#lineChart1_carousel, ._echarts1').removeClass('d-none');
            $('#lineChart2_carousel, ._echarts2').addClass('d-none');
            lineChart1.resize();
        } else if(flag === 'warning'){
            $('#_navbar_statistics_show_anchor').addClass('active');
            $('#_navbar_model_show_anchor').removeClass('active');
            $('._echarts, .carousel').removeClass('d-none');
            $('._3d_model').addClass('d-none');
            $('._model_or_form, ._datatables').addClass('d-none');
            $('#lineChart2_carousel, ._echarts2').removeClass('d-none');
            $('#lineChart1_carousel, ._echarts1').addClass('d-none');
            lineChart2.resize();
        }
    }

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
        //3) d-none logic
        setDisplayFlag('device');
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
        //3) d-none logic
        setDisplayFlag('device');
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
        //3) d-none logic
        setDisplayFlag('device');
    });

    $('._wrapper ._sidebar ._warning').on('click', function(){
        //3) d-none logic
        setDisplayFlag('warning');
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
        setDisplayFlag('device');
    });

    $('#_navbar_model_show_anchor').on('click', function(){
        setDisplayFlag('model');
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