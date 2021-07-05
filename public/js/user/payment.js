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

$("#PayAtCounter").click(function(e){
 
    var header = document.getElementById("listSeat");
    var btns = header.getElementsByClassName("active3");
    var seatList =[]; 
    for (var i = 0; i < btns.length; i++) {
      seatList.push(btns[i].value);
    }
      var Idshowtime = Number($("#idshowtime").val());
      var TongTien = Number($("#SetTongTien").val());
      var NgayChieu = $("#dcNgayChieu").val();
      var GioChieu = $("#dcGioChieu").val();
      var TenRap = $("#dcTenRap").val();
      var Tenmovie= $("#dcTenmovie").val();
      
      reloadMask(true,$);
      $.ajax({
    
        url:`/user/payment/PayAtCounter`, // lay du lieu tu file
        type:"POST",
        data: {
          Idshowtime : Idshowtime,
          seatList :seatList,
          TongTien,TongTien,
          NgayChieu:NgayChieu,
          GioChieu:GioChieu,
          TenRap:TenRap,
          Tenmovie:Tenmovie
        },
  
        //thanh cong 
        success: function(data){
          reloadMask(false,$);
              Swal.fire({
                title: "Success!",
                text: "Booking success!",
                icon: "success",
              }).then((result)=>{
                if(result.isConfirmed){
                  window.location.href = "/user/profile/bookingHistory"
                }
              })
             
            
        },
        //that bai
        error : function(xhr,status,err){
           alert(err);
        } 
    });
  });
  
  $("#PayByPaypal").click(function(e){
    var header = document.getElementById("listSeat");
    var btns = header.getElementsByClassName("active3");
    var seatList =[]; 
    for (var i = 0; i < btns.length; i++) {
      seatList.push(btns[i].value);
    }
      var Idshowtime = Number($("#idshowtime").val());
      var TongTien = Number($("#SetTongTien").val());
      var NgayChieu = $("#dcNgayChieu").val();
      var GioChieu = $("#dcGioChieu").val();
      var TenRap = $("#dcTenRap").val();
      var Tenmovie= $("#dcTenmovie").val();
      
      reloadMask(true,$);
      $.ajax({
    
        url:`/user/payment/PayByPayPal`, // gửi giữ liệu qua và lấy dữ liệu về từ 
        type:"POST",
        data: {
          Idshowtime : Idshowtime,
          seatList :seatList,
          TongTien,TongTien,
          NgayChieu:NgayChieu,
          GioChieu:GioChieu,
          TenRap:TenRap,
          Tenmovie:Tenmovie
        },
  
        //thanh cong 
        success: function(data){
          reloadMask(false,$);

              window.location.href = `${data}`

        },
        //that bai
        error : function(xhr,status,err){
           alert(err);
        } 
    });
  });
  
  $("#PayBymomo").click(function(e){
    var header = document.getElementById("listSeat");
    var btns = header.getElementsByClassName("active3");
    var seatList =[]; 
    for (var i = 0; i < btns.length; i++) {
      seatList.push(btns[i].value);
    }
      var Idshowtime = Number($("#idshowtime").val());
      var TongTien = Number($("#SetTongTien").val());
      var NgayChieu = $("#dcNgayChieu").val();
      var GioChieu = $("#dcGioChieu").val();
      var TenRap = $("#dcTenRap").val();
      var Tenmovie= $("#dcTenmovie").val();
      
     reloadMask(true,$);
      $.ajax({
    
        url:`/user/payment/PayBymomo`, // gửi giữ liệu qua và lấy dữ liệu về từ 
        type:"POST",
        data: {
          Idshowtime : Idshowtime,
          seatList :seatList,
          TongTien,TongTien,
          NgayChieu:NgayChieu,
          GioChieu:GioChieu,
          TenRap:TenRap,
          Tenmovie:Tenmovie
        },
        //thanh cong 
        success: function(data){
         reloadMask(false,$);

              window.location.href = `${data}`
        },
        //that bai
        error : function(xhr,status,err){
           alert(err);
        } 
    });
  });

  // $("#Booking").on('submit',function(e){

      
  // })