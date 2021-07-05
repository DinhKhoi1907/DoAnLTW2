//const { default: Swal } = require("sweetalert2")

$(".deleteProvince").on('click',function(e){
    e.preventDefault();
    // cái này xài cho form submit thôi
    //data = $(this).serializeArray();
     ProvinceISN = $(this).val();
    Swal.fire({
        title:'Are you sure?',
        text:"You won't be able to revert this",
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'yes,delete it',
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33'
    }).then((result)=>{
        if(result.isConfirmed){
            $.ajax({
                url:'/admin/province/deleteProvince',
                method:'POST',
                data:{ProvinceISN},
                success:function(data){
                    if(data=="1"){
                        Swal.fire({
                            title:'Good job!',
                            text:'Your Province has been deleted',
                            icon:'success'
                        }).then((result)=>{
                            if(result.isConfirmed){
                                window.location.reload();
                            }
                        })
                    }
                  
                },
                error:function(error){
                    alert(error);
                }
            })
           
        }
    })
})