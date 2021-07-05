$("#addRoom").submit(function(e){
    e.preventDefault();
    data = $(this).serializeArray();
    $.ajax({
            url:`/admin/room/addRoom`,
            method:'POST',
            data:data,
            success: function(data){
                    if(data === "-2"){
                        Swal.fire(
                            'Error !',
                            'This room name already exists!',
                            'error'
                          )
                    }
                    else{
                        Swal.fire(
                                'GOOD JOB ...',
                                'You have successfully inserted!',
                                'success'
                              ).then((result)=>{
                                      if(result.isConfirmed){
                                              window.location.reload();
                                      }
                              })
                    }
                   
            },
            error:function(error){
                    alert(error);
            }
    })
})