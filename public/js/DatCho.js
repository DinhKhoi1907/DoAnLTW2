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

