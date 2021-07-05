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
$(document).ready(function(){
    $("#change-info").submit(function(e){
            e.preventDefault();
            //lấy data trong form bằng hàm này
            data = $(this).serializeArray();
            reloadMask(true,$);
            $.ajax({
                //${window.location.origin}
                url:`/user/profile/changeinfo`, // lay du lieu tu file
                type:"POST",
                data: data,
         
                //thanh cong 
                success: function(data){
                    reloadMask(false,$);
                    if(data === "0" ){
                        Swal.fire({
                            title: "Opps!",
                            text: "Change profile infomation fail!",
                            icon: "warning",
                           
                          })
                    }
                   else{
                      Swal.fire({
                        title: 'Success!',
                        text: "Change profile infomation success ...",
                        icon: 'success',
                  
                      }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                      })
                   }
                },
                //that bai
                error : function(xhr,status,err){
                   alert(err);
                } 
            });
    });

    $("#change-password").submit(function(e){
        e.preventDefault();
        //lấy data trong form bằng hàm này
        data = $(this).serializeArray();
        reloadMask(true,$);
        $.ajax({
            //${window.location.origin}
            url:`/user/profile/changepassword`, // lay du lieu tu file
            type:"POST",
            timeout: 5000,
            data: data,
     
            //thanh cong 
            success: function(data){
                reloadMask(false,$);
                if(data === "0" ){
                    $("#check-old-password").html('The password entered is incorrect');

                }
                else if(data==="-1"){
                    $("#check-old-password").html('&nbsp;');
                    $("#check-renewpassword-password").html('The password is not the same as the one above')
                }
               else{
                  Swal.fire({
                    title: 'Success!',
                    text: "Change Password success ...",
                    icon: 'success',
              
                  }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                  })

               }
            },
            //that bai
            error : function(xhr,status,err){
               alert(err);
            } 
        });
});
});
