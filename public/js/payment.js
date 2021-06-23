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
    
        url:`/datcho/PayAtCounter`, // lay du lieu tu file
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
            if(data== "0"){
              alert("Vui lòng đăng nhập trước khi đặt Chỗ!")
            }
            else {
              alert("Bạn đã đặt chỗ thành công!")
              window.location.href = "/user/bookinghistory"
            }
           // window.location.href = "/user/bookinghistory"
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
      
     // reloadMask(true,$);
      $.ajax({
    
        url:`/datcho/PayByPaypal`, // gửi giữ liệu qua và lấy dữ liệu về từ 
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
       //   reloadMask(false,$);
            if(data== "0"){
              alert("Vui lòng đăng nhập trước khi đặt Chỗ!")
            }
            else {
              //alert("Bạn đã đặt chỗ thành công!")
              window.location.href = `${data}`
            }
           // window.location.href = "/user/bookinghistory"
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
      
     // reloadMask(true,$);
      $.ajax({
    
        url:`/momo`, // gửi giữ liệu qua và lấy dữ liệu về từ 
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
       //   reloadMask(false,$);
            if(data== "0"){
              alert("Vui lòng đăng nhập trước khi đặt Chỗ!")
            }
            else {
              //alert("Bạn đã đặt chỗ thành công!")
              window.location.href = `${data}`
            }
           // window.location.href = "/user/bookinghistory"
        },
        //that bai
        error : function(xhr,status,err){
           alert(err);
        } 
    });
  });