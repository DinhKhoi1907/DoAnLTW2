// //bat click loginBtn
$(document).ready(function () {
    $(".btnDate").click(function(e){
        e.preventDefault()
       
        //lay data trong form bang ham nay
        fullDate = new Date($(this).val());
       Ngay =  fullDate.getDate(),
       Thang = fullDate.getMonth() + 1,
       
       Nam = fullDate.getFullYear(),
        date = String(Nam) + "-" +String(Thang) + "-" +String(Ngay);
      //  alert(date); 
       idPhim = $("#idPhim").val();
      
        $.ajax({
            //${window.location.origin}
            url:`/phim/datve`, // lay du lieu tu file
            type:"POST",
            timeout: 5000,
            data: {
                date:date,
                idPhim:idPhim,
            },
     
            //thanh cong 
            success: function(data){
                if(data){
                    $("#ListCumRap").html(`<font color="green">&nbsp;</font>`);
                    $("#ListRap").html(`<font>&nbsp;</font>`);
                    var obj = JSON.parse(data);
                   console.log(obj);
                      //ban đầu cho mảng rap = rỗng để thêm phần tử dầu
                   var cumRap = [];
                   i=0;
                    for (const element of obj) {
                         //hàm indexOf là hàm kiểm tra phần tử đã có ở mảng hay chưa , nếu có nó sẽ trả về vị trí 0 1  2 ...
                        if(cumRap.indexOf(element.Rap.CumRap.DiaChi) === -1){
                            if(i==0){
                                $("#ListCumRap").append(`<button class="btnCumRap active" value="CumRap-${element.Rap.CumRap.id}">${element.Rap.CumRap.DiaChi}</button>`);
                                 // gán cho rạp bằng phần tử hiện tại để vòng lặp tiếp theo nó sẽ không thảo điều kiên
                                cumRap.push(element.Rap.CumRap.DiaChi);
                            
                            }
                            else{
                                $("#ListCumRap").append(`<button class="btnCumRap" value="CumRap-${element.Rap.CumRap.id}">${element.Rap.CumRap.DiaChi}</button>`);
                            cumRap.push(element.Rap.CumRap.DiaChi);
                            }
                            i++;
                        }



                      }
                   
                      var header = document.getElementById("ListCumRap");
                      var btns = header.getElementsByClassName("btnCumRap");
                      for (var i = 0; i < btns.length; i++) {
                        btns[i].addEventListener("click", function() {
                        var current = document.getElementsByClassName("active");
                        current[0].className = current[0].className.replace(" active", "");
                        this.className += " active";
                        });
                      }

                     
                      
                    $(".btnCumRap").click(function(){
                        $("#ListRap").html(`<font>&nbsp;</font>`);
                        //lấy class bằng .active vì cụm rạp khi bấm vào sẽ tự thêm một class .active và set mấy button khác bằng .btnCumRap thôi
                       var string = $(".active").val();
                       var CumRapId = Number(string.slice(7));
                       //ban đầu cho mảng rap = rỗng để thêm phần tử dầu
                       var Rap = [];
                       i=0;
                       for (const element of obj){
                        if(element.Rap.CumRap.id == CumRapId){
                            //hàm indexOf là hàm kiểm tra phần tử đã có ở mảng hay chưa , nếu có nó sẽ trả về vị trí 0 1  2 ...
                            if(Rap.indexOf(element.Rap.TenRap) === -1){

                                if(i==0){
                                    $("#ListRap").append(`<div id="RapId-${element.Rap.id}" class="RapTime"><p class="TenRap"  >${element.Rap.TenRap}</p><br></div> <hr>`);
                                   // gán cho rạp bằng phần tử hiện tại để vòng lặp tiếp theo nó sẽ không thảo điều kiên
                                     Rap.push(element.Rap.TenRap);
                                     
                                   
                                }
                                else{
                                    $("#ListRap").append(`<div id="RapId-${element.Rap.id}" class="RapTime"><p class="TenRap"  >${element.Rap.TenRap}</p> <br></div> <hr>`);
                                     Rap.push(element.Rap.TenRap);
                                }
                                i++;
                                
                            }
                        }
                    }
                    
                    for(const element of obj){
                        var string2 = `RapId-${element.Rap.id}`;
                        var RapId = Number(string2.slice(6));
                        //alert(RapId);
                        if(element.RapId == RapId){
                            $(`#RapId-${element.Rap.id}`).append(`<button class="btnTime" value="SuatChieu-${element.id}">${element.ThoiDiemBatDau}</button>`);
                            
                        }
                         
                   }
                  
                 
                    // bắt click vào giờ
                    var header = document.getElementById("ListRap");
                    var btns = header.getElementsByClassName("btnTime");
                    //alert(btns.length)
                    for (var i = 0; i < btns.length; i++) {
                      btns[i].addEventListener("click", function() {
                      var current = document.getElementsByClassName("active2");
                      if (current.length > 0) { 
                        current[0].className = current[0].className.replace(" active2", "");
                      }
                      else{
                        this.className += " active2";
                       
                            var string3 = $(".active2").val();
                            SuatChieuId = Number(string3.slice(10));
                            
                        
                            window.location.href = `/user/datcho/${SuatChieuId}`
            
                        
                      }
                     
                      });
                    }
                 //  }
                  

                    });
                     

                }
              
            },
            //that bai
            error : function(xhr,status,err){
               alert(err);
            } 
        });


      });

    

    
})