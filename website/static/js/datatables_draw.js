/*var getObjects = function(list) {
    var ret = [];
    for(var i=0;i<list.length;++i){
        ret.push({"now":list[i].now, "R1":list[i].R1, "R2":list[i].R2});
    }
    return ret;
};
datatables_draw = function() {
    $('#example').DataTable({
        data: [[ "2018", "19", "34"]],
        colums:[
            {title:"now"},
            {title:"R1"},
            {title:"R2"}
        ]
    });
};
*/
var table;
datatables_draw = function() {
    table = $('#example').DataTable({
        data: localChartData.s9101,//default sensor
        columns:[
            {title:"时间节点", data:'now'},
            {title:"R1(mm)", data:'R1'},
            {title:"R2(°C)", data:'R2'}
        ],
        "language": {
            "info": "",
            paginate: {
                previous: "上页",
                next: "下页"
            },
            "lengthMenu":"每页显示 _MENU_ 条记录",
            "search":"搜索"
        }
    });
};