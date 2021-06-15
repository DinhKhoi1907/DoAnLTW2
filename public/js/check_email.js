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
       // e.stopPropagation();
       // e.stopImmediatePropagation();
        //khong cho trang load lai
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
                        alert("Email này chưa được đăng kí !")
                }else{
                    alert("Vui lòng kiểm tra email để đặt lại mật khẩu ! ")
                    window.location.href = "/";
                }
                
            },
            error:function(error){
             
             alert(error);
            }
        })
        
    })
            
   


    
});