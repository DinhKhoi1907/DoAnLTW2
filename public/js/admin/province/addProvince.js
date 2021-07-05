//const { default: Swal } = require("sweetalert2");

$("#addProvince").submit(function(e){
    //không cho load lại trang
    e.preventDefault();
       data= $(this).serializeArray()
        $.ajax({
            url:'/admin/province/addProvince',
            method:'POST',
            data:data,
            success:function(data){
                if(data === '-2'){
                        Swal.fire({
                            title:'Error',
                            text:'This Province name already exists',
                            icon:'error'
                        })
                }else{
                    Swal.fire({
                        title:'Good job.',
                        text:'You have been inserted success',
                        icon:'success'
                    }).then((result)=>{
                        if(result.isConfirmed){
                            window.location.reload();
                        }
                    })
                   
                }
                   
            },
            error:function(error){
                alert(error)
            }
        })
})