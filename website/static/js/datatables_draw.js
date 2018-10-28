var datatables_data = [];

datatables_setInterval = function() {
    //do a ajax call to sync up the backend data
    $.get('url', 'para', function onSuccess(){
        //when sucess, insert newly add data into SessionStore
        //the session store will expire when the brower restart

    });
}

datatables_draw = function() {
    $('#example').DataTable();
};