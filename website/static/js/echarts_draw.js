//# sourceURL=echarts_draw.js
/**
 * define how to display the carousels themselves and the echarts inside each carousel
 * applying to $(._wrapper ._main ._visual ._echarts) 
 */
var lineChart1;
var lineChart2;
var lineChartData;
var lineChartData1 = [
    {now:'20180923 00:00:00',R1:-9.176513, R2:18},
    {now:'20180923 01:00:00',R1:-9.154629, R2:18},
    {now:'20180923 02:00:00',R1:-9.067082, R2:18.3},
    {now:'20180923 03:00:00',R1:-9.08897, R2:18.3},
    {now:'20180923 04:00:00',R1:-9.110857, R2:18.4},
    {now:'20180923 05:00:00',R1:-9.023303, R2:18.7},
    {now:'20180923 06:00:00',R1:-9.110857, R2:18.8},
    {now:'20180923 07:00:00',R1:-9.067082, R2:18.9},
    {now:'20180923 08:00:00',R1:-9.935736, R2:20.1},
    {now:'20180923 09:00:00',R1:-9.891948, R2:21.2},
    {now:'20180923 10:00:00',R1:-9.067082, R2:22.5},
    {now:'20180923 11:00:00',R1:-9.045193, R2:26},
    {now:'20180923 12:00:00',R1:-9.067082, R2:27.9}
]

var lineChartData2 = [
    {now:'20180923 00:00:00',R1:-9.401031, R2:18},
    {now:'20180923 01:00:00',R1:-9.401031, R2:18.1},
    {now:'20180923 02:00:00',R1:-9.29583, R2:18.3},
    {now:'20180923 03:00:00',R1:-9.422069, R2:18.3},
    {now:'20180923 04:00:00',R1:-9.337913, R2:18.4},
    {now:'20180923 05:00:00',R1:-9.443106, R2:18.7},
    {now:'20180923 06:00:00',R1:-9.29583, R2:18.8},
    {now:'20180923 07:00:00',R1:-9.379992, R2:18.9},
    {now:'20180923 08:00:00',R1:-9.358953, R2:20.1},
    {now:'20180923 09:00:00',R1:-9.274787, R2:21.1},
    {now:'20180923 10:00:00',R1:-9.337913, R2:22.7},
    {now:'20180923 11:00:00',R1:-9.148513, R2:26.3},
    {now:'20180923 12:00:00',R1:-9.274787, R2:28.2}
]

var lineChartData3 = [
    {now:'20180923 00:00:00',R1:-10.326817, R2:17.9},
    {now:'20180923 01:00:00',R1:-10.196709, R2:18},
    {now:'20180923 02:00:00',R1:-10.175022, R2:18.4},
    {now:'20180923 03:00:00',R1:-10.196709, R2:18.4},
    {now:'20180923 04:00:00',R1:-10.326817, R2:18.5},
    {now:'20180923 05:00:00',R1:-10.153333, R2:18.8},
    {now:'20180923 06:00:00',R1:-10.283451, R2:18.9},
    {now:'20180923 07:00:00',R1:-10.044879, R2:19},
    {now:'20180923 08:00:00',R1:-10.109954, R2:20.4},
    {now:'20180923 09:00:00',R1:-10.218396, R2:21.4},
    {now:'20180923 10:00:00',R1:-10.001491, R2:23},
    {now:'20180923 11:00:00',R1:-10.979796, R2:27.1},
    {now:'20180923 12:00:00',R1:-10.893008, R2:28.9}
]

var getNow = function(list) {
    var ret = [];
    for(var i=0;i<list.length;++i){
        ret.push(list[i].now.split(" ")[1]);
    }
    return ret;
}

var getR1 = function(list) {
    var ret = [];
    for(var i=0;i<list.length;++i){
        ret.push(list[i].R1);
    }
    return ret;
}

var getR2 = function(list) {
    var ret = [];
    for(var i=0;i<list.length;++i){
        ret.push(list[i].R2);
    }
    return ret;
}

echarts_resize = function () {
    lineChart1.resize();
    lineChart2.resize();
};

echarts_draw = function() {

    //3) Echarts js
    //prevent auto sliding
    $('.carousel').carousel({
        interval: false
    });

    // 指定图表的配置项和数据
    var lineChartOption1 = {
        backgroundColor: '#f5f5f5',
        title: {
            text: "20180923"
        },
        /*dataset: {
            dimensions: ['now', 'R1', 'R2'],
            source: lineChartData1
        },*/
        legend: {
            data: ['R1', 'R2']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            right:'10%',
            left:'10%'
        },
        xAxis: {
            type: 'category',
            data: getNow(lineChartData1) 
        },
        yAxis: [
            {
                type: 'value',
                name: 'R1',
                min: -15,
                max: 0,
                position: 'left',
                axisLabel:{
                    formatter: '{value} mm'
                }
            },
            {
                type: 'value',
                name: 'R2',
                min: 0,
                max: 30,
                position: 'right',
                axisLabel:{
                    formatter: '{value} °C'
                }
            }
        ],
        series: [{
            name: 'R1',
            type: 'line',
        },{
            name: 'R2',
            type: 'line',
            yAxisIndex: 1
        }]
    };

    var lineChartOption2 = {
        backgroundColor: '#f5f5f5',
        title: {
            text: "数据对比"
        },
        /*dataset: {
            dimensions: ['now', 'R1', 'R2'],
            source: lineChartData1
        },*/
        legend: {
            data: ['1', '2', '3', '警戒1', '警戒2']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            right:'10%',
            left:'10%'
        },
        xAxis: {
            type: 'category',
            data: getNow(lineChartData1) 
        },
        yAxis: [
            {
                type: 'value',
                name: 'R2',
                min: 0,
                max: 40,
                position: 'left',
                axisLabel:{
                    formatter: '{value} °C'
                }
            }
        ],
        series: [{name: '1', type: 'line', data:getR2(lineChartData1)},
                 {name: '2', type: 'line', data:getR2(lineChartData2)},
                 {name: '3', type: 'line', data:getR2(lineChartData3)},
                 {name: '警戒1', type: 'line', data:[24,24,24,24,24,24,24,24,24,24,24,24,24]},
                 {name: '警戒2', type: 'line', data:[30,30,30,30,30,30,30,30,30,30,30,30,30]}
        ]
    };
    // 基于准备好的dom，初始化echarts实例
    lineChart1 = echarts.init(document.getElementById('lineChart1'));
    lineChart2 = echarts.init(document.getElementById('lineChart2'));

    // 使用刚指定的配置项和数据显示图表。
    lineChart1.setOption(lineChartOption1);
    lineChart2.setOption(lineChartOption2);

    lineChart1.setOption({
        series: [{
            name: 'R1',
            data: getR1(lineChartData1)
        },{
            name: 'R2',
            data: getR2(lineChartData1)
        }]
    });
};