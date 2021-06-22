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
            url:`/datcho/findCr`, // lay du lieu tu file
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
                        if(cumRap.indexOf(element.provincename) === -1){
                            if(i==0){
                                $("#ListCumRap").append(`<button class="btnCumRap " value="CumRap-${element.provinceisn}">${element.provincename}</button>`);
                                 // gán cho rạp bằng phần tử hiện tại để vòng lặp tiếp theo nó sẽ không thảo điều kiên
                                cumRap.push(element.provincename);
                            
                            }
                            else{
                                $("#ListCumRap").append(`<button class="btnCumRap" value="CumRap-${element.provinceisn}">${element.provincename}</button>`);
                            cumRap.push(element.provincename);
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
                       $.ajax({
                        //${window.location.origin}
                        url:`/datcho/findR`, // lay du lieu tu file
                        type:"POST",
                        timeout: 5000,
                        data: {
                            date:date,
                            CumRapId:CumRapId,
                            idPhim:idPhim,
                        }, 
                        success: function(data){
                            var obj = JSON.parse(data);
                            for (const element of obj){
                                         $("#ListRap").append(`<div id="DetailRap" class="RapTime"><p class="TenRap"  >${element.cinemaname}</p><br></div> <hr>`);
                                          var isn = element.showtimeisnlist.split(",");
                                            var timelist = element.timeshowlist.split(",");       
                                            for(i=0;i<timelist.length;i++){
                                                $(`#DetailRap`).append(`<button class="btnTime" value="SuatChieu-${isn[i]}">${timelist[i]}</button>`);            
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
                            
                        
                            window.location.href = `/datcho/chonGhe/${SuatChieuId}`;
            
                        
                      }
                     
                      });
                    }///
                    
                        },
                        error : function(xhr,status,err){
                            alert(err);
                         } 


                    });
                });  

                }
                     

                },
                 //that bai
            error : function(xhr,status,err){
                alert(err);
             }
                
            });
            
        });


      });

    

    
