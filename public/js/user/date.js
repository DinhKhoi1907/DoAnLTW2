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
       idmovie = $("#idmovie").val();
      
        $.ajax({
            //${window.location.origin}
            url:`/user/booking/getProvince`, // lay du lieu tu file
            type:"POST",
            data: {
                date:date,
                idmovie:idmovie,
            },
     
            //thanh cong 
            success: function(data){
                if(data){
                    $("#listProvince").html(`<font color="green">&nbsp;</font>`);
                    $("#listCinema").html(`<font>&nbsp;</font>`);
                    var obj = JSON.parse(data);
                   console.log(obj);
                      //ban đầu cho mảng rap = rỗng để thêm phần tử dầu
                   var province = [];
                   i=0;
                    for (const element of obj) {
                         //hàm indexOf là hàm kiểm tra phần tử đã có ở mảng hay chưa , nếu có nó sẽ trả về vị trí 0 1  2 ...
                        if(province.indexOf(element.provincename) === -1){
                            if(i==0){
                                $("#listProvince").append(`<button class="btnprovince " value="province-${element.provinceisn}">${element.provincename}</button>`);
                                 // gán cho rạp bằng phần tử hiện tại để vòng lặp tiếp theo nó sẽ không thảo điều kiên
                                province.push(element.provincename);
                            
                            }
                            else{
                                $("#listProvince").append(`<button class="btnprovince" value="province-${element.provinceisn}">${element.provincename}</button>`);
                            province.push(element.provincename);
                            }
                            i++;
                        }



                      }
                   
                      var header = document.getElementById("listProvince");
                      var btns = header.getElementsByClassName("btnprovince");
                      for (var i = 0; i < btns.length; i++) {
                        btns[i].addEventListener("click", function() {
                        var current = document.getElementsByClassName("active");
                        current[0].className = current[0].className.replace(" active", "");
                        this.className += " active";
                        });
                      }

                     
                      
                    $(".btnprovince").click(function(){
                        $("#listCinema").html(`<font>&nbsp;</font>`);
                        //lấy class bằng .active vì cụm rạp khi bấm vào sẽ tự thêm một class .active và set mấy button khác bằng .btnprovince thôi
                       var string = $(".active").val();
                       var provinceId = Number(string.slice(9));
                      
                       //ban đầu cho mảng rap = rỗng để thêm phần tử dầu
                       $.ajax({
                        //${window.location.origin}
                        url:`/user/booking/getCinema`, // lay du lieu tu file
                        type:"POST",
                        timeout: 5000,
                        data: {
                            date:date,
                            provinceId:provinceId,
                            idmovie:idmovie,
                        }, 
                        success: function(data){
                            var obj = JSON.parse(data);
                            for (const element of obj){
                                         $("#listCinema").append(`<div id="DetailRap" class="RapTime"><p class="TenRap"  >${element.cinemaname}</p><br></div> <hr>`);
                                          var isn = element.showtimeisnlist.split(",");
                                            var timelist = element.timeshowlist.split(",");       
                                            for(i=0;i<timelist.length;i++){
                                                $(`#DetailRap`).append(`<button class="btnTime" value="showtime-${isn[i]}">${timelist[i]}</button>`);            
                                            }
                               
                         }
                          
                    // bắt click vào giờ
                    var header = document.getElementById("listCinema");
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
                           
                            showtimeISN = Number(string3.slice(9));
                            
                            window.location.href = `/user/booking/chooseSeat/${showtimeISN}`;
            
                        
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

    

    
