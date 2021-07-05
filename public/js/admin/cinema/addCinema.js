
$("#addCinema").submit(function(e){
    e.preventDefault();
    data = $(this).serializeArray();
    $.ajax({
        url:'/admin/cinema/addCinema',
        method:'POST',
        data:data,
        success:function(data){
            // nếu data = 2 thì địa chỉ đó đã có rạp 
            if(data === "-2"){
                    Swal.fire({
                        title:"This address already exists!",
                        text:'Enter another address,please ! ',
                        icon:'error',
                    })
            }else{
                Swal.fire({
                    title:"Good job!",
                    text:'You have successfully inserted ',
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
})