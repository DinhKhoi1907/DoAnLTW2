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
 
    var header = document.getElementById("ListGhe");
    var btns = header.getElementsByClassName("active3");
    var seatList =[]; 
    for (var i = 0; i < btns.length; i++) {
      seatList.push(btns[i].value);
    }
      var IdSuatChieu = Number($("#idSuatChieu").val());
      var TongTien = Number($("#SetTongTien").val());
      var NgayChieu = $("#dcNgayChieu").val();
      var GioChieu = $("#dcGioChieu").val();
      var TenRap = $("#dcTenRap").val();
      var TenPhim= $("#dcTenPhim").val();
      
      reloadMask(true,$);
      $.ajax({
    
        url:`/PayAtCounter`, // lay du lieu tu file
        type:"POST",
        data: {
          IdSuatChieu : IdSuatChieu,
          seatList :seatList,
          TongTien,TongTien,
          NgayChieu:NgayChieu,
          GioChieu:GioChieu,
          TenRap:TenRap,
          TenPhim:TenPhim
        },
  
        //thanh cong 
        success: function(data){
          reloadMask(false,$);
              swal({
                title: "Success!",
                text: "Booking success!",
                icon: "success",
                button: true,
              })
              window.location.href = "/user/bookinghistory"
            
        },
        //that bai
        error : function(xhr,status,err){
           alert(err);
        } 
    });
  });
  
  $("#PayByPaypal").click(function(e){
    var header = document.getElementById("ListGhe");
    var btns = header.getElementsByClassName("active3");
    var seatList =[]; 
    for (var i = 0; i < btns.length; i++) {
      seatList.push(btns[i].value);
    }
      var IdSuatChieu = Number($("#idSuatChieu").val());
      var TongTien = Number($("#SetTongTien").val());
      var NgayChieu = $("#dcNgayChieu").val();
      var GioChieu = $("#dcGioChieu").val();
      var TenRap = $("#dcTenRap").val();
      var TenPhim= $("#dcTenPhim").val();
      
      reloadMask(true,$);
      $.ajax({
    
        url:`/PayByPayPal`, // gửi giữ liệu qua và lấy dữ liệu về từ 
        type:"POST",
        data: {
          IdSuatChieu : IdSuatChieu,
          seatList :seatList,
          TongTien,TongTien,
          NgayChieu:NgayChieu,
          GioChieu:GioChieu,
          TenRap:TenRap,
          TenPhim:TenPhim
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
    var header = document.getElementById("ListGhe");
    var btns = header.getElementsByClassName("active3");
    var seatList =[]; 
    for (var i = 0; i < btns.length; i++) {
      seatList.push(btns[i].value);
    }
      var IdSuatChieu = Number($("#idSuatChieu").val());
      var TongTien = Number($("#SetTongTien").val());
      var NgayChieu = $("#dcNgayChieu").val();
      var GioChieu = $("#dcGioChieu").val();
      var TenRap = $("#dcTenRap").val();
      var TenPhim= $("#dcTenPhim").val();
      
     reloadMask(true,$);
      $.ajax({
    
        url:`/PayBymomo`, // gửi giữ liệu qua và lấy dữ liệu về từ 
        type:"POST",
        data: {
          IdSuatChieu : IdSuatChieu,
          seatList :seatList,
          TongTien,TongTien,
          NgayChieu:NgayChieu,
          GioChieu:GioChieu,
          TenRap:TenRap,
          TenPhim:TenPhim
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