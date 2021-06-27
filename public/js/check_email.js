function reloadMask(show,$) {
    if (show)
    {
        $('#status').show();
        $('#preloader').show();
    }
    else {
        $('#status').hide();
        $('#preloader').hide();
    }
}

//load du lieu
$(document).ready(function(){             
    $("#emailSubBtn").on("click",function(e){
        e.preventDefault();
      
        //laays gia tri tu body
        let email = $("#check-email").val();
        reloadMask(true,$);
        //ajax
        $.ajax({
            url:"user/forgot", // lay du lieu tu duong dan
            type:"POST", // method post
            timeout:5000,
            data:{
                email:email,
            },
            //thanh cong
            success:function(data){
                reloadMask(false,$);

                if(data==="0"){
                        Swal.fire({
                            title: "Opps!",
                            text: "This email is not registered!",
                            icon: "info",
                         
                          })
                }else{
                    Swal.fire({
                        title: 'Success!',
                        text: "Please check your email to reset your password!",
                        icon: 'success',
                  
                      }).then((result) => {
                        if (result.isConfirmed) {
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
            
   


    
});