$("#resetPassword").submit(function(e){
 
    e.preventDefault();
   data = $(this).serializeArray();
    $.ajax({
        url:'/user/forgot/resetPassword',
        method:"POST",
        data:data,
        success:function(data){
                if(data==="1"){
                    Swal.fire({
                        title:"Good job !",
                        text:"You have succcessfully changed your password!",
                        icon:"success",
                    }).then((result)=>{
                        if(result.isConfirmed){
                            window.location.href ='/';
                        }
                    })
                }
        },
        error:function(error){
            alert(error);
        }
    })
})