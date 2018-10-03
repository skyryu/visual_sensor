//# sourceURL=echarts_draw.js
/**
 * define how to display the carousels themselves and the echarts inside each carousel
 * applying to $(._wrapper ._main ._visual ._echarts) 
 */
echarts_draw = function() {
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
        $('._statistic_form').removeClass('d-none');
    });

    $('#_navbar_model_show_anchor a').on('click', function(){
        $('#_navbar_statistics_show_anchor').removeClass('active');
        $('#_navbar_model_show_anchor').addClass('active');
        $('._3d_model').removeClass('d-none');
        $('._statistic_form').addClass('d-none');
    });

    //3) Echarts js
    //prevent auto sliding
    $('.carousel').carousel({
        interval: false
    });


    //line chart functions begin
    function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        return {
            name: now.toString(),
            value: [
                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                Math.round(value)
            ]
        }
    }
    
    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
        data.push(randomData());
    }
    
    
    setInterval(function () {
        for (var i = 0; i < 5; i++) {
            data.shift();
            data.push(randomData());
        }
        lineChart1.setOption({
            series: [{
                data: data
            }]
        });
    }, 1000);

    // 指定图表的配置项和数据
    var lineChartOption = {
        backgroundColor: '#f5f5f5',
        title: {
            text: '动态数据 + 时间坐标轴'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: true
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '20%'],
            splitLine: {
                show: false
            }
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        }]
    };

    pieChartOption = {
        title: {
            text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },

        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [{
                    value: 335,
                    name: '直接访问'
                },
                {
                    value: 310,
                    name: '邮件营销'
                },
                {
                    value: 274,
                    name: '联盟广告'
                },
                {
                    value: 235,
                    name: '视频广告'
                },
                {
                    value: 400,
                    name: '搜索引擎'
                }
            ].sort(function (a, b) {
                return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color:'#ccc' 
                    }
                }
            },
            itemStyle: {
                normal: {
                    //color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }]
    };

    samplePieChartOption={
        backgroundColor: '#2c343c',
    
        title: {
            text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },
    
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
    
        visualMap: {
            show: true,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:274, name:'联盟广告'},
                    {value:235, name:'视频广告'},
                    {value:400, name:'搜索引擎'}
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
    
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };

    // 基于准备好的dom，初始化echarts实例
    var pieChart1 = echarts.init(document.getElementById('pieChart1'), 'dark');
    var lineChart1 = echarts.init(document.getElementById('lineChart1'));
    var myChart3 = echarts.init(document.getElementById('piechart3'));

    // 使用刚指定的配置项和数据显示图表。
    pieChart1.setOption(pieChartOption);
    lineChart1.setOption(lineChartOption);
    myChart3.setOption(pieChartOption);
    window.onresize = function () {
        pieChart1.resize();
        lineChart1.resize();
        myChart3.resize();
    };

};