$("#addShowtime").submit(function(e){
    e.preventDefault();
      data =  $(this).serializeArray();
      $.ajax({
          url:'/admin/showtime/addShowtime',
          method:'POST',
          data:data,
          success:function(data){
              if(data === '-1'){
                Swal.fire({
                    title:'Error!',
                    text:'The DateTime-from must be greater than the end DateTime-to! ',
                    icon:'error',
                })
              }
              else if(data === '-6'){
                Swal.fire({
                    title:'Error!',
                    text:'Information duplica! ',
                    icon:'error',
                })
              }
              else{
                Swal.fire({
                    title:'Good job!',
                    text:'You have been inserted success! ',
                    icon:'success',
                })
              }
                   
          },
          error:function(error){
              alert(error);
          }
      })
});