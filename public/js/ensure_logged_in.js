//import swal from 'sweetalert';
$("#btnBooking").click(function(e){
  var header = document.getElementById("ListGhe");
  var btns = header.getElementsByClassName("active3");
  var seatList =[]; 
  for (var i = 0; i < btns.length; i++) {
    seatList.push(btns[i].value);
  }
 
      $.ajax({
    
        url:`/user/ensureLoggedIn`, // gửi giữ liệu qua và lấy dữ liệu về từ 
        type:"POST",
        //thanh cong 
        success: function(data){
       // reloadMask(false,$);
            if(data== "0"){
              Swal.fire({
              title: "Opps!",
              text: "Please login before booking!",
              icon: "info",
           
            })
             // swal("Vui lòng đăng nhập trước khi đặt Chỗ!");
              $(".loginLink").click();
            }
            else {
              if(seatList.length == 0){
                Swal.fire({
                  title: "You haven't chosen a seat yet!",
                  text: "Please choose a seat!",
                  icon: "info",
               
                })
              }else{
                $("#myModal").modal('show');
              }
           
            }
           // window.location.href = "/user/bookinghistory"
        },
        //that bai
        error : function(xhr,status,err){
           alert(err);
        } 
    });
  });