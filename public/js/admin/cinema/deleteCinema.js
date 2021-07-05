// không để id được vì id là duy nhất mà nút delete nó được xuất hiện nhiều mà dùng chung cho mọi movie được show ra nên ta dùng class
$(".deleteCinema").on('click',function(e){
    e.preventDefault();
    var CinemaISN = $(this).val();

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
                    url:'/admin/cinema/deleteCinema',
                    method:'POST',
                    data:{
                        CinemaISN
                    },
                    success:function(data){
                        // this movie has been activated
                        if(data === '-4'){
                            Swal.fire({
                                title:'Error!',
                                text:'This Cinema has been enabled .', // đang hoạt động
                                icon:'error'
                            })
                        }
                        // this movie is currently playing
                        else if(data === "-3"){
                            Swal.fire({
                                title:'Error',
                                text:'This Cinema is currently playing ', // có nhân viên và room nên k xóa được
                                icon:'error'
                            })
                        }
                        else{
                            Swal.fire({
                                title:'Good job!',
                                text:'Your Cinema has been deleted.',
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