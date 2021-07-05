$(".choosePM").change(function(e){
         var check = $(".choosePM").val();
        // nếu là 1 thì select province
        var checkPro = $('.chooseSome').hasClass('selectedProvince');
       // alert(check2)
       var checkMov = $('.chooseSome').hasClass('selectedMovie');
        if(check === '1' && checkPro == false){
            
            $.ajax({
                url:'/admin/province/getProvince',
                method:'POST',
              
                success:function(data){
                    //nếu có class selectedMovie thì xóa để lát chọn movie nó sẽ hiển thị lại
                    $('.chooseSome').removeClass("selectedMovie");
                   
                   // đặt lại tất cả trong label 
                    $('.chooseSome').html(`<font>&nbsp</font>`);
                     

                     //thêm selected để không cho hiện  lặp lại nữa
                    $('.chooseSome').addClass("selectedProvince")
                    
                    $(".chooseSome").append('<p>Choose province</p><select class="Province form-control" name="ProvinceISN" required><option value="">---Choose---</option></select>');
                    for(Element of data){
                        $(".Province").append(`<option value="${Element.ProvinceISN}">${Element.ProvinceName}</option>`);
                    }
                            
                    ////   ----  /// hiển thị cinema  ////   ----  /// 
                        $(".Province").change(function(e){
                           
                           var CinemaISN = $(this).val();
                         
                           $.ajax({
                            url:'/admin/cinema/getCinema',
                            method:'POST',
                            success:function(data){
                               // đặt lại tất cả trong label cinema
                                 $('.chooseCinema').html(`<font>&nbsp</font>`);
                                 
                                $(".chooseCinema").append(`<p>Choose cinema</p> <select class="Cinema form-control" name="CinemaISN" required><option value=""> ---Choose--- </option></select>`)
                                for(Element of data){
                                    $(".Cinema").append(`<option value="${Element.CinemaISN}">${Element.CinemaName}</option>`)
                                }
                            },
                            error:function(error){
                                alert(error)
                            }
                           })
                        })
                
                },
                error:function(error){
                    alert(error)
                }
            })
        }
          else if(check === "2" && checkMov==false){
            $.ajax({
                url:'/admin/movie/getMovie',
                method:'POST',
                
                success:function(data){
                    // nếu .chooseSome có class selectedProvince thì xóa để lát chọn province  thì nó hiển thị lại
                    $('.chooseSome').removeClass("selectedProvince");
                    // đặt lại tất cả trong label class chooseSome
                    $('.chooseSome').html(`<font>&nbsp</font>`);
                    // đặt lại tất cả trong label cinema
                    $('.chooseCinema').html(`<font>&nbsp</font>`);

                    //thêm selected để không cho hiện  lặp lại nữa
                    $('.chooseSome').addClass("selectedMovie")

                    $(".chooseSome").append('<p>Choose movie</p><select class="Movie form-control" name="MovieISN" required><option value="">-------------Choose-------------</option></select>');
                    for(Element of data){
                        $(".Movie").append(`<option value="${Element.MovieISN}">${Element.MovieName}</option>`);
                    }
                
                },
                error:function(error){
                    alert(error)
                }
            })
        }


});

