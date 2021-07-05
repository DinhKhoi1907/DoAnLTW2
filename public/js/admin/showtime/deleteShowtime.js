$(".deleteShowtime").on('click',function(e){
    e.preventDefault();
    var ShowtimeISN = $(this).val();

    Swal.fire({title:'Are you sure ?',
            text:"You won't be able to revert this",
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText:'Yes, delete it',
        }).then((result)=>{
            if(result.isConfirmed){    
              return  $.ajax({
                    url:'/admin/showtime/deleteMovie',
                    method:'POST',
                    data:{
                        ShowtimeISN
                    },
                    success:function(data){
                        // this movie has been activated
                        if(data === '-4'){
                            Swal.fire({
                                title:'Error!',
                                text:'This showtime is working .',
                                icon:'error'
                            })
                        }
                        // this movie is currently playing
                        else if(data === "-3"){
                            Swal.fire({
                                title:'Error',
                                text:'This showtime is already person booked',
                                icon:'error'
                            })
                        }
                        else{
                            Swal.fire({
                                title:'Good job!',
                                text:'Your movie has been deleted.',
                                icon:'success'
                            }).then((result)=>{
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
               
            }
        })
})