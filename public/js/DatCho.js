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
$( ".btnGhe" ).click(function(event) {
  if($(this).hasClass('AnGhe')){

  }else{
    if($(this).hasClass('active3')) {
      $(this).removeClass('active3')
      //bõ chọn gế thì trừ tiền
    
      var Tien = Number($("#Tien").val());
      var TongTien = Number($("#SetTongTien").val());
       TongTien = TongTien - Tien;
     $("#SetTongTien").val(TongTien)
     TongTien = TongTien.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
      $("#TongTien").html(TongTien);
    }
    else {
      //chọn gế thì cộng tiền
      $(this).addClass('active3')
      var Tien = Number($("#Tien").val());
      var TongTien = Number($("#SetTongTien").val());
       TongTien = TongTien + Tien;
     $("#SetTongTien").val(TongTien)
     TongTien = TongTien.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
      $("#TongTien").html(TongTien);
    
    }
  }
 
});

$("#DatCho").click(function(e){
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
  
      url:`/datcho/datcho`, // lay du lieu tu file
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

