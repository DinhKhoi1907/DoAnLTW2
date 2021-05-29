//load du lieu
$(document).ready(function(){
    $("#form-fogot-2").validate({
        rules: {
            email:{
                required:true,
                email:true
            }
           
        },
            messages: {
                email:{
                    required:"Vui lòng nhập email của bạn đã đăng kí trước đây !",
                    email:"Vui lòng nhập đúng định dạng"
                }
            },
            submitHandler:function(){
                    
    $("#emailSubBtn").on("click",function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();
        //khong cho trang load lai
        e.preventDefault();
      
        //laays gia tri tu body
        let email = $("#check-email").val();

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
                if(data==="0"){
                        alert("Email này chưa được đăng kí !")
                }else{
                    alert("Vui lòng kiểm tra email để đặt lại mật khẩu ! ")
                    window.location.href = "/";
                }
                
            },
            error:function(error){
                   //nhan data
                //        var a =JSON.parse(xhr.responseText)
              // console.log(xhr);
            //   console.log(status);
             alert(error);
           //  $("#response-username").html(error.responseJSON.data);
            }
        })
        
    })
            },
        });


    
});