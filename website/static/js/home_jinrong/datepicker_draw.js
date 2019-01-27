datepicker_draw = function() {
    //initialize the date picker in dailyCheckModal
    $("#dailyCheckModal #dailyDatePicker").datepicker({
        language: "zh-CN",
        autoclose: true,
        todayBtn: true,
        format: "yyyy-mm-dd"
    });

    $("#dailyCheckModal #dailyDatePicker").datepicker().on("changeDate",
        function(e){
            console.log(e.date);
            check_date = $("#dailyCheckModal #dailyDatePicker").val();
            $.ajax({
                url: $GET_CHECK_RESULT,//$SCRIPT_ROOT +    '/get_sensor_data',
                data: {// The data to send (will be     converted to a query string)
                    proj: "SHJinrong", modal: "dailyCheck",
                    date: check_date,
                },
                type: "GET",
                dataType : "json",
            }).done(function( json ) {
                $("#modalSelectField1").val(0);
                $("#modalSelectField2").val(0);
                $("#modalSelectField3").val(0);
                $("#modalSelectField4").val(0);
                $("#modalSelectField5").val(0);
                $("#modalSelectField6").val(0);
                json.data.forEach(item => {
                    $('#'+item.field).val(item.value);
                });
            }).fail(function( xhr, status, errorThrown ) {
                console.log( "Error: " + errorThrown );
                console.log( "Status: " + status );
                console.dir( xhr );
            });
        });
    
    $("#dailyCheckModal .modal-body button").on('click', function(e){
        check_date = $("#dailyCheckModal #dailyDatePicker").val();
        field1 = $("#modalSelectField1").val();
        field2 = $("#modalSelectField2").val();
        field3 = $("#modalSelectField3").val();
        field4 = $("#modalSelectField4").val();
        field5 = $("#modalSelectField5").val();
        field6 = $("#modalSelectField6").val();
        
        $.ajax({
            url: $POST_CHECK_RESULT,
            data: {// The data to send (will be converted to a query string)
                proj: "SHJinrong", modal: "dailyCheck",
                f_beg: 1, f_end: 6, f_prefix: "modalSelectField",
                date: check_date,
                modalSelectField1:field1,
                modalSelectField2:field2,
                modalSelectField3:field3,
                modalSelectField4:field4,
                modalSelectField5:field5,
                modalSelectField6:field6,
            },
            type: "POST",
            dataType : "json",
        }).done(function( json ) {
            console.log(json.data);
        }).fail(function( xhr, status, errorThrown ) {
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        });
    })

    //initialize the date picker in scheduledCheckModal
    $("#scheduledCheckModal #scheduledDatePicker").datepicker({
        language: "zh-CN",
        autoclose: true,
        todayBtn: true,
        format: "yyyy-mm-dd"
    });

    $("#scheduledCheckModal #scheduledDatePicker").datepicker().on("changeDate",
        function(e){
            console.log(e.date);
            check_date = $("#scheduledCheckModal #scheduledDatePicker").val();
            $.ajax({
                url: $GET_CHECK_RESULT,
                data: {// The data to send (will be     converted to a query string)
                    proj: "SHJinrong", modal: "scheduledCheck",
                    date: check_date,
                },
                type: "GET",
                dataType : "json",
            }).done(function( json ) {
                for(var i=7;i<=34;++i){
                    $("#modalSelectField"+i).val(0);
                }
                json.data.forEach(item => {
                    $('#'+item.field).val(item.value);
                });
            }).fail(function( xhr, status, errorThrown ) {
                console.log( "Error: " + errorThrown );
                console.log( "Status: " + status );
                console.dir( xhr );
            });
        });
    
    //定期检查>整体
    $('#scheduledCheckModal #scheduledCheckModalItem1 button').on('click', function(e){
        check_date = $("#scheduledCheckModal #scheduledDatePicker").val();
        field7 = $("#modalSelectField7").val();
        field8 = $("#modalSelectField8").val();
        field9 = $("#modalSelectField9").val();
        field10 = $("#modalSelectField10").val();
        field11 = $("#modalSelectField11").val();
        $.ajax({
            url: $POST_CHECK_RESULT,
            data: {// The data to send (will be converted to a query string)
                proj: "SHJinrong", modal: "scheduledCheck",
                f_beg: 7, f_end: 11, f_prefix: "modalSelectField",
                date: check_date,
                modalSelectField7:field7,
                modalSelectField8:field8,
                modalSelectField9:field9,
                modalSelectField10:field10,
                modalSelectField11:field11,
            },
            type: "POST",
            dataType : "json",
        }).done(function( json ) {
            console.log(json.data);
        }).fail(function( xhr, status, errorThrown ) {
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        });
    })

    //定期检查>面板
    $('#scheduledCheckModal #scheduledCheckModalItem2 button').on('click', function(e){
        check_date = $("#scheduledCheckModal #scheduledDatePicker").val();
        field12 = $("#modalSelectField12").val();
        field13 = $("#modalSelectField13").val();
        field14 = $("#modalSelectField14").val();
        field15 = $("#modalSelectField15").val();
        field16 = $("#modalSelectField16").val();
        $.ajax({
            url: $POST_CHECK_RESULT,
            data: {// The data to send (will be converted to a query string)
                proj: "SHJinrong", modal: "scheduledCheck",
                f_beg: 12, f_end: 16, f_prefix: "modalSelectField",
                date: check_date,
                modalSelectField12:field12,
                modalSelectField13:field13,
                modalSelectField14:field14,
                modalSelectField15:field15,
                modalSelectField16:field16,
            },
            type: "POST",
            dataType : "json",
        }).done(function( json ) {
            console.log(json.data);
        }).fail(function( xhr, status, errorThrown ) {
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        });
    })

    //定期检查>连接件>五金件及配件
    $('#scheduledCheckModal #schCheckModalItem3_1 button').on('click', function(e){
        check_date = $("#scheduledCheckModal #scheduledDatePicker").val();
        field17 = $("#modalSelectField17").val();
        field18 = $("#modalSelectField18").val();
        field19 = $("#modalSelectField19").val();
        field20 = $("#modalSelectField20").val();
        field21 = $("#modalSelectField21").val();
        field22 = $("#modalSelectField22").val();
        field23 = $("#modalSelectField23").val();
        $.ajax({
            url: $POST_CHECK_RESULT,
            data: {// The data to send (will be converted to a query string)
                proj: "SHJinrong", modal: "scheduledCheck",
                f_beg: 17, f_end: 23, f_prefix: "modalSelectField",
                date: check_date,
                modalSelectField17:field17,
                modalSelectField18:field18,
                modalSelectField19:field19,
                modalSelectField20:field20,
                modalSelectField21:field21,
                modalSelectField22:field22,
                modalSelectField23:field23,
            },
            type: "POST",
            dataType : "json",
        }).done(function( json ) {
            console.log(json.data);
        }).fail(function( xhr, status, errorThrown ) {
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        });
    })

    //定期检查>连接件>结构胶及密封材料
    $('#scheduledCheckModal #schCheckModalItem3_2 button').on('click', function(e){
        check_date = $("#scheduledCheckModal #scheduledDatePicker").val();
        field24 = $("#modalSelectField24").val();
        field25 = $("#modalSelectField25").val();
        field26 = $("#modalSelectField26").val();
        field27 = $("#modalSelectField27").val();
        $.ajax({
            url: $POST_CHECK_RESULT,
            data: {// The data to send (will be converted to a query string)
                proj: "SHJinrong", modal: "scheduledCheck",
                f_beg: 24, f_end: 27, f_prefix: "modalSelectField",
                date: check_date,
                modalSelectField24:field24,
                modalSelectField25:field25,
                modalSelectField26:field26,
                modalSelectField27:field27,
            },
            type: "POST",
            dataType : "json",
        }).done(function( json ) {
            console.log(json.data);
        }).fail(function( xhr, status, errorThrown ) {
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        });
    })

    //定期检查>连接件>构造
    $('#scheduledCheckModal #schCheckModalItem3_3 button').on('click', function(e){
        check_date = $("#scheduledCheckModal #scheduledDatePicker").val();
        field28 = $("#modalSelectField28").val();
        field29 = $("#modalSelectField29").val();
        field30 = $("#modalSelectField30").val();
        field31 = $("#modalSelectField31").val();
        $.ajax({
            url: $POST_CHECK_RESULT,
            data: {// The data to send (will be converted to a query string)
                proj: "SHJinrong", modal: "scheduledCheck",
                f_beg: 28, f_end: 31, f_prefix: "modalSelectField",
                date: check_date,
                modalSelectField28:field28,
                modalSelectField29:field29,
                modalSelectField30:field30,
                modalSelectField31:field31,
            },
            type: "POST",
            dataType : "json",
        }).done(function( json ) {
            console.log(json.data);
        }).fail(function( xhr, status, errorThrown ) {
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        });
    })

    //定期检查>支撑结构>五金件及配件
    $('#scheduledCheckModal #schCheckModalItem4_1 button').on('click', function(e){
        check_date = $("#scheduledCheckModal #scheduledDatePicker").val();
        field32 = $("#modalSelectField32").val();
        field33 = $("#modalSelectField33").val();
        $.ajax({
            url: $POST_CHECK_RESULT,
            data: {// The data to send (will be converted to a query string)
                proj: "SHJinrong", modal: "scheduledCheck",
                f_beg: 32, f_end: 33, f_prefix: "modalSelectField",
                date: check_date,
                modalSelectField32:field32,
                modalSelectField33:field33,
            },
            type: "POST",
            dataType : "json",
        }).done(function( json ) {
            console.log(json.data);
        }).fail(function( xhr, status, errorThrown ) {
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        });
    })

    //定期检查>支撑结构>横梁·立柱
    $('#scheduledCheckModal #schCheckModalItem4_2 button').on('click', function(e){
        check_date = $("#scheduledCheckModal #scheduledDatePicker").val();
        field34 = $("#modalSelectField34").val();
        $.ajax({
            url: $POST_CHECK_RESULT,
            data: {// The data to send (will be converted to a query string)
                proj: "SHJinrong", modal: "scheduledCheck",
                f_beg: 34, f_end: 34, f_prefix: "modalSelectField",
                date: check_date,
                modalSelectField34:field34,
            },
            type: "POST",
            dataType : "json",
        }).done(function( json ) {
            console.log(json.data);
        }).fail(function( xhr, status, errorThrown ) {
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        });
    })
};