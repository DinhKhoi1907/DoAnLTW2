const express = require('express');
const User = require('../../models/user/userModel.js');
const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");
//ma hoa mk2
var passwordHash = require('password-hash');
//đọc file
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);


const router = express.Router();




router.post('/',asyncHandler (async function(req,res){

    //dinh nghi tai khoan gui mail xac nhan cho user dang ky
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {

          user: "william.lynguyen@gmail.com",
          pass: "Deobiet_147",
        },
      });

    const {email,password,repassword,name,phone} = req.body;



    // kiem tra username da ton toi trong db chua

      const found = await User.findUserByEmail(email);
        if(!email||!password||!repassword||!name||!phone){
        res.end("0");
           }
        else if(found.rows[0]){
          console.log("User đã tồn tại")
          res.end("-2");
        }
        else if(password !== repassword){
          res.end("-3");
        }

        else{
          //mã hóa password
          const passwordMH = passwordHash.generate(password);
          console.log(passwordMH);
            //neu chua co thi tao user  hàm này trả về id
         const  id =   await  User.InsertNewUserReturnId(email,passwordMH,name,phone);
        
          
            const found3 = await User.findUserById(id.rows[0].fn_customer_insupd);
            //gui mail xac nhan cho user
            await transporter.sendMail({
                from: '"XuanLy 👻" <william.lynguyen@gmail.com>', // sender address
                to: `${found3.rows[0].CustomerEmail}`, // list of receivers
                subject: "Xac nhan email ✔", // Subject line
                html: await readFile('./send_mail.html', 'utf8'),
              });

              //luu id user vao session
            req.session.userId = id.rows[0].fn_customer_insupd;
              res.end("1");
        }

}));

module.exports = router;