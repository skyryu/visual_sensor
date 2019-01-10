//# sourceURL=echarts_draw.js
/**
 * define how to display the carousels themselves and the echarts inside each carousel
 * applying to $(._wrapper ._main ._visual ._echarts) 
 */
var lineChart1;
var lineChart2;


var localChartData = {
    winpre1: [],
    winpre2: [],
    winpre3: [],
    /*hydrolevel1901: [],
    hydrolevel1902: [],
    hydrolevel1903: [],
    clino1901: [],
    clino1902: [],
    clino1903: [],
    clino1904: [],
    clino1905: []*/
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
            text: "风压1"
        },
        /*legend: {
            data: ['R1', 'R2']
        },*/
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
            data: localChartData.winpre1.map(item=>item.now)//getNow(lineChartData1) 
        },
        yAxis: [
            {
                type: 'value',
                name: '风压',
                //min: -15,
                //max: 10,
                position: 'left',
                axisLabel:{
                    formatter: '{value} pa'
                }
            }/*,
            {
                type: 'value',
                name: 'R2',
                //min: 0,
                //max: 50,
                position: 'right',
                axisLabel:{
                    formatter: '{value} °C'
                }
            }*/
        ],
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 0,
                end: 100,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 3,
                    shadowOffsetY: 3
                }
            }
        ],
        series: [{ name: 'default', type: 'line', }/*,
                 { name: 'R2', type: 'line', yAxisIndex: 1 }*/
                ]
    };

    var lineChartOption2 = {
        backgroundColor: '#f5f5f5',
        title: {
            text: "数据对比"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: ['风压1', '风压2', '风压3', '风压4']
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
            data: localChartData.winpre1.map(item=>item.now)//getNow(lineChartData1) 
        },
        yAxis: [
            {
                type: 'value',
                name: '风压',
                //min: -40,
                //max: 0,
                position: 'left',
                axisLabel:{
                    formatter: '{value} pa'
                }
            }
        ],
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 0,
                end: 100,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 3,
                    shadowOffsetY: 3
                }
            }
        ],
        series: [{name: '风压1', type: 'line'},
                 {name: '风压2', type: 'line'},
                 {name: '风压3', type: 'line'}
        ]
    };
    // 基于准备好的dom，初始化echarts实例
    lineChart1 = echarts.init(document.getElementById('lineChart1'));
    lineChart2 = echarts.init(document.getElementById('lineChart2'));

    // 使用刚指定的配置项和数据显示图表。
    lineChart1.setOption(lineChartOption1);
    lineChart2.setOption(lineChartOption2);
};