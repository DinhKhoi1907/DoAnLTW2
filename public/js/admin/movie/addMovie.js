$('#addMovie').submit(function(e){
        //không cho load lại trang
        e.preventDefault();
        var data = $(this).serializeArray();
  
        var formData = new FormData();
       //console.log(data)
        var file = $('#inputPoster')[0].files[0]
        console.log(data)
        //debugger
        // data.forEach((value,key) => {
        // console.log(key+value)
        //  });
        for(e of data){
            formData.append('data', e.value)
        }
        formData.append('poster', file)
   //    formData.append('data', data)
      // formData.concat( data)
    //    formData.forEach((value,key) => {
    //     console.log(key+value)
    //      });
        
        
    $.ajax({
            url:`/admin/movie/addMovie`,
            method:'POST',
            //data:data,
            data: formData,
            contentType: false,
            processData: false,
            success: function(data){
                    if(data === "1"){
                        Swal.fire(
                                'GOOD JOB ...',
                                'You have successfully inserted!',
                                'success'
                              ).then((result)=>{
                                      if(result.isConfirmed){
                                              window.location.reload();
                                      }
                              })
                    }
                    else if(data==="-2"){
                        Swal.fire(
                            'Error',
                            'This name movie already exists!',
                            'error'
                          )
                    }
                  
            },
            error:function(error){
                    alert(error);
            }
    })
})