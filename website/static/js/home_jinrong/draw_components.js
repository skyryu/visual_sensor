$(function () {
    //1) Sidebar js

    //TODO: use Vue framework to refactor
    const setDisplayFlag = function(flag){
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

    //below flags tell ajax callback to re-draw which chart
    let currentChartInstance = lineChart1;
    let currentSensorDisplay = new Map([
       ['winpre1', false], ['winpre2', false], ['winpre3', false], ['winpre4', false]
    ]);
    let winpreSet = new Set(['winpre1', 'winpre2', 'winpre3', 'winpre4']);
    let winpreWarningSet = new Set();
    /*let hydrolevelSensorSet = new Set(['hydrolevel1901', 'hydrolevel1902', 'hydrolevel1903']);
    let clinoSensorSet = new Set(['clino1901', 'clino1902', 'clino1903', 'clino1904', 'clino1905']);
    let hydrolevelWarningSet = new Set([{name:'警戒1', threshhold:-24}, {name:'警戒2', threshhold:-30}]);
    let clinoWarningSet = new Set();*/

    //TODO: implement observer pattern. The echarts and datatables obj are the observers, and the localChartData and 
    //the on-click listeners are the observerables.
    //called by sidebar click and ajax call back
    const setDeviceChatOption = function(lineChartInstance, titleText, sensor_name){
        //1) update global flags 
        currentChartInstance = lineChartInstance;
        for(let key of currentSensorDisplay.keys()){//for device chart, all other sensors is d-none
            if(sensor_name === key){
                currentSensorDisplay.set(key, true);
            }
            else{
                currentSensorDisplay.set(key, false);
            }
        }
        //2) update chart options
        if(titleText !== null ){
            lineChartInstance.setOption({
                title: { text: titleText}
            }); 
        }

        lineChartInstance.setOption({
            series: [{
                        name: '风压',
                        data: localChartData[sensor_name].map(i=>i.default)//getR1(lineChartData)
                     }/*,{
                        name: 'R2',
                        data: localChartData[sensor_name].map(i=>i.R2)//getR2(lineChartData)
                     }*/   
            ],
            xAxis: {
                type: 'category',
                data: localChartData[sensor_name].map(item=>item.now)//getNow(lineChartData1) 
            },
        });
    };

    const updateDataTables = function(sensor_name){
        table.rows().remove();
        table.rows.add(localChartData[sensor_name]).draw(); 
    };
    
    /*
    * 这里我们会任取某一sensor的时轴作为横坐标，线性罗列各个sensor的数据，
    * 如果某一sensor缺失了某一时间点的数据，则该sensor后续数据皆会错位。
    * 因此后端需保证所有sensor在时间轴上没有缺失的点（若某时间点没有数据，则应补0，以防错位）
    */
    const setWarningChatOption = function(lineChartInstance, 
                                          titleText, 
                                          sensor_set,
                                          warn_set){
        //1) update global flags 
        currentChartInstance = lineChartInstance;
        for(let key of currentSensorDisplay.keys()){//for device chart, all other sensors is d-none
            if(sensor_set.has(key)){
                currentSensorDisplay.set(key, true);
            }
            else{
                currentSensorDisplay.set(key, false);
            }
        }

        //2) update chart options
        if(titleText !== null ){
            lineChartInstance.setOption({
                title: { text: titleText}
            }); 
        }

        let seriesList = [];
        let legendList = [];
        for(let sname of sensor_set){
            seriesList.push(
                {name:'风压'+sname.replace(/[A-Za-z]/g, ''), 
                 type:'line', 
                 data:localChartData[sname].map(item=>item.default/*comp name*/)
                }
            );
            legendList.push('风压'+sname.replace(/[A-Za-z]/g, ''));
        }
        timeAxis = [...sensor_set][0];/*from set to array and pick the first item*/
        if(warn_set !== null){
            for(let obj of warn_set){
                seriesList.push(
                    {name:obj.name, type:'line', data:localChartData[timeAxis].map(item=>obj.threshhold)}
                )        
                legendList.push(obj.name);
            } 
        }

        lineChartInstance.setOption({
            xAxis: {
                type: 'category',
                data: localChartData[timeAxis].map(item=>item.now)//getNow(lineChartData1) 
            },

            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: legendList
            },
            series: seriesList
        });
    };

    //1.1) device echarts
    $('._wrapper ._sidebar ._winpre1').on('click', function(){
        setDeviceChatOption(lineChart1, "风压1", 'winpre1');
        updateDataTables('winpre1');
        setDisplayFlag('device');//d-none logic
    });
    $('._wrapper ._sidebar ._winpre2').on('click', function(){
        setDeviceChatOption(lineChart1, "风压2", 'winpre2');
        updateDataTables('winpre2');
        setDisplayFlag('device');//d-none logic
    });
    $('._wrapper ._sidebar ._winpre3').on('click', function(){
        setDeviceChatOption(lineChart1, "风压3", 'winpre3');
        updateDataTables('winpre3');
        setDisplayFlag('device');//d-none logic
    });
    $('._wrapper ._sidebar ._winpre4').on('click', function(){
        setDeviceChatOption(lineChart1, "风压4", 'winpre4');
        updateDataTables('winpre4');
        setDisplayFlag('device');//d-none logic
    });

    //1.2) warning echarts
    $('._wrapper ._sidebar ._warning_winpre').on('click', function(){
        setWarningChatOption(lineChart2, null, winpreSet, winpreWarningSet);
        setDisplayFlag('warning');
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

    //4)datatables and echarts display
    datatables_draw();
    $('#example').removeAttr('style');
    $('div.dataTables_wrapper div.dataTables_filter input').css('width', '8rem');

    echarts_draw();
    $('._echarts1, ._echarts2').resize(function(){
        echarts_resize();
    });

    //5) datepicker display
    datepicker_draw();

    //6) setInterval for AJAX
    var minIntervalTime = 1000;//1sec
    var maxIntervalTime = 60*1000;//1min
    var internalDelta = 2;//multiplier for interval increasement
    var intervalTime = minIntervalTime;

    const getSensorData = function(sensor){
        const promise = new Promise(function(resolve, reject){
            $.ajax({
                url: $GET_SENSOR_DATA,
                data: {// The data to send (will be converted to a query string)
                    start: (()=>{
                        let length = localChartData[sensor].length;
                        return length===0?'20180920 13:00:00':localChartData[sensor][length-1].now;
                    })(), 
                    sensor: sensor,
                    limit: 1000 
                },
                type: "GET",
                dataType : "json",
            }).done(function( json ) {
                localChartData[sensor].push(...json.data);
                resolve(json.data.length);//trigger promise.then
            }).fail(function( xhr, status, errorThrown ) {
                reject({xhr:xhr, status:status, errorThrown:errorThrown});//trigger promise.catch
            });
        });
        promise.then(
            ajaxRetNum => {
                if(ajaxRetNum === 0){//slow down the update frequency if no data
                    if(intervalTime < maxIntervalTime){
                        intervalTime *= internalDelta;
                    }
                }
                else{
                    if(currentSensorDisplay.get(sensor) === true){
                        if(currentChartInstance === lineChart1){
                            setDeviceChatOption(currentChartInstance, null, sensor);
                        }
                        else{//linechart2 warning chart
                            //let warningSet = hydrolevelSensorSet.has(sensor)?hydrolevelSensorSet:clinoSensorSet;
                            setWarningChatOption(currentChartInstance, null, winpreSet)
                        }
                        updateDataTables(sensor);
                    }
                    if(intervalTime !== minIntervalTime){//fast start up
                        intervalTime = minIntervalTime;
                    }
                }
                setTimeout(function(){
                    getSensorData(sensor);
                }, intervalTime);
                //console.log("what's the interval time ? "+intervalTime);
            }
        ).catch(
            error => {
                //alert( "Sorry, there was a problem!" );
                console.log( "Error: " + error.errorThrown );
                console.log( "Status: " + error.status );
                console.dir( error.xhr );

                intervalTime = minIntervalTime;
                setTimeout(function(){
                    getSensorData(sensor);
                }, intervalTime);
            }
        );
    }

    setTimeout(getSensorData('winpre1'), intervalTime);
    setTimeout(getSensorData('winpre2'), intervalTime);
    setTimeout(getSensorData('winpre3'), intervalTime);
    setTimeout(getSensorData('winpre4'), intervalTime);
    
});//doc on ready func end