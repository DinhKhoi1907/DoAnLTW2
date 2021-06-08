$( ".btnGhe" ).click(function(event) {
  if($(this).hasClass('AnGhe')){

  }else{
    if($(this).hasClass('active3')) {
      $(this).removeClass('active3')
    }
    else {
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
  var ViTriGhes =[]; 
  for (var i = 0; i < btns.length; i++) {
    ViTriGhes.push(btns[i].value);
  }
    var IdSuatChieu = Number($("#idSuatChieu").val());
    var IdRap = Number($("#idRap").val());
    $.ajax({
      //${window.location.origin}
      url:`/user/datcho`, // lay du lieu tu file
      type:"POST",
      data: {
        IdSuatChieu : IdSuatChieu,
        ViTriGhes :ViTriGhes,
        IdRap:IdRap,
      },

      //thanh cong 
      success: function(data){
          //reloadMask(false,$);
       alert("Bạn đã đặt vé thành công!")
      },
      //that bai
      error : function(xhr,status,err){
         alert(err);
      } 
  });
});

