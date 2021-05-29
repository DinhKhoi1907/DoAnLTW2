//load du lieu
$(document).ready(function () {
    $("#form-register-2").submit(function (e) {
        //khong cho trang load lai
        e.preventDefault();
        //laays gia tri tu body
        data = $(this).serializeArray();
        //ajax
        $.ajax({
            url: "user/register", // lay du lieu tu duong dan
            type: "POST", // method post
            data: data,
            //thanh cong
            success: function (data) {
                if (data === "0") {
                    $("#check-reg-empty").html('<font color="red">Vui lòng điền hết thông tin.</font>');
                }
                if (data === "-1") {
                    $("#check-reg-empty").html('<font color="red">&nbsp;</font>');
                    $("#check-reg-username").html('<font color="red">Username đã được sử dụng, vui long chọn tên khác!.</font>')
                }
                if (data === "-2") {
                    $("#check-reg-empty").html('<font color="red">&nbsp;</font>');
                    $("#check-reg-username").html('<font color="red">&nbsp;</font>')
                    $("#check-reg-email").html('<font color="red">Emai đã được sử dụng, vui lòng chọn email khác!</font>')
                }
                if (data === "-3") {
                    $("#check-reg-empty").html('<font color="red">&nbsp;</font>');
                    $("#check-reg-username").html('<font color="red">&nbsp;</font>')
                    $("#check-reg-email").html('<font color="red">&nbsp;</font>')
                    $("#check-reg-repassword").html('<font color="red">Password không giống, vui lòng kiểm tra lại !</font>')
                }
                if (data === "1") {
                    $("#check-reg-empty").html('<font color="red">&nbsp;</font>');
                    $("#check-reg-username").html('<font color="red">&nbsp;</font>')
                    $("#check-reg-email").html('<font color="red">&nbsp;</font>')
                    $("check-reg-repassword").html('<font color="red">&nbsp;!</font>')
                    $("#check-reg-empty").html('<font color="green">Register success...</font>')
                    alert("Register success..");
                    window.location.href = "/";
                }

            },
            error: function (error) {
                alert(error);
            }
        });
    });
});



    //     var password = document.getElementById("password-2")
    //     var confirm_password = document.getElementById("repassword-2");

    // function validatePassword(){
    //   if(password.value != confirm_password.value) {
    //     confirm_password.setCustomValidity("password vua nhap Khong giong voi password o tren");
    //   } else {
    //     confirm_password.setCustomValidity('');
    //   }
    // }

    // password.onchange = validatePassword;
    // confirm_password.onkeyup = validatePassword;