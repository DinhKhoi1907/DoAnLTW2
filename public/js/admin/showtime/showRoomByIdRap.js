$("#CinemaName").change(function(){
    var rapId = $(this).val();
    $.ajax({
        url:'/admin/showtime/findRoomByIdRap',
        method:'POST',
        data:{rapId},
            success:function(data){
                $("#RoomName").html(`<font>$nbsp</font>`)
                    for(element of data){
                      //  alert(element.RoomName)
                        $("#RoomName").append(`<option value="${element.RoomISN}">${element.RoomName}</option>`);
                    }
            },
            error:function(data){

            }
    })
})