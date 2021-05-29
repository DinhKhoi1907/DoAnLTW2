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
//bat click loginBtn
$(document).ready(function () {
    $("#form-login-2").submit(function(e){
       
        e.preventDefault()
        //lay data trong form bang ham nay
        data = $(this).serializeArray();

        reloadMask(true,$);
        $.ajax({
            //${window.location.origin}
            url:`/user/login`, // lay du lieu tu file
            type:"POST",
            timeout: 5000,
            data: data,
     
            //thanh cong 
            success: function(data){
                reloadMask(false,$);
                if(data === "1" ){
                    $("#response").html('<font color="green">login success...!</font>');
                    window.location.href = "/";

                }
               else{
                   
                    $("#response").html('<font color="red">Email hoặc password sai!...!</font>');
               }
            },
            //that bai
            error : function(xhr,status,err){
               alert(err);
            } 
        });
      });

    

    
})
    //nhap vao btn co id la loginBtn, tao function




    // $("#form-login-2www").validate({
    //     rules: {
    //         username:"required",
    //         password:"required",
    //     },
    //         messages: {
    //             username: ' Vui lòng nhập username của bạn !',
    //             password: 'Vui lòng nhập password của bạn !',
    //         },

    //         submitHandler: function() {
    //             console.log(this);
    //             $("#loginBtn").on("click",function(e){
    //                 //khong cho trang load  
    //                e.preventDefault()

    //                var status = $('#status');
    //                var preloader = $('#preloader');
    //                status.show()
    //                preloader.show()
                  
    //                // $("#preloader").addClass('hide');
    //                //lay gia tri cua  id: email ma nguoi dung nhap vao 
    //                let username = $("#username").val();
    //                //lay gia tri cua  id: password ma nguoi dung nhap vao
           
    //                let password = $("#password").val(); 
    //                //alert (' aa');
    //                //ajax
           
    //                $.ajax({
    //                    //${window.location.origin}
    //                    url:`/user/login`, // lay du lieu tu file
    //                    type:"POST",
    //                    timeout: 5000,
    //                    data:{
    //                        login:1,
    //                        username:username,
    //                        password:password
    //                    },
                
    //                    //thanh cong 
    //                    success: function(data){
    //                     var status = $('#status');
    //                     var preloader = $('#preloader');
    //                     status.hide()
    //                      preloader.hide()
    //                        if(data === "1" ){
    //                            $("#response").html('<font color="green">login success...!</font>');
    //                            window.location.href = "/";

    //                        }
    //                       else{
                              
    //                            $("#response").html('<font color="red">Username hoac password sai!...!</font>');
    //                       }
           
           
    //                    },
    //                    //that bai
    //                    error : function(xhr,status,err){
    //                       alert(err);
    //                    } 
    //                });
    //              //   $('#preloader').hide();
    //            })
    //           }
    // })