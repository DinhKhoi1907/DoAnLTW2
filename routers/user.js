const express = require('express');
const User = require('../models/user.js');
const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");
//random string 
var randomstring = require("randomstring");
//ma hoa mk2
var passwordHash = require('password-hash');
const { request } = require('express');

const router = express.Router();


router.get('/',function(req,res){
    res.render('user/home',{layout:'./layouts/home'});
})
router.post('/register',asyncHandler (async function(req,res){
const {email} = req.body;
return "{'email':'eeee'}";
    //dinh nghi tai khoan gui mail xac nhan cho user dang ky
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {

          user: "william.lynguyen@gmail.com", 
          pass: "Deobiet_147", 
        },
      });

      
    const user={};
    const {username,email,password} = req.body;
    
    user.username = username;
    user.email = email;
    //ma hoa password
    user.password = passwordHash.generate(password);

    // kiem tra username da ton toi trong db chua
      const found = await User.findByUsername(username);
        if(found){
            res.json('User da ton tai');
        }else{
            //neu chua co thi tao user 
            await  User.create(user);
            
            //tim User moi dang ky
            const found2 = await User.findByUsername(username);
            //gui mail xac nhan cho user 
            await transporter.sendMail({
                from: '"XuanLy 👻" <william.lynguyen@gmail.com>', // sender address
                to: `${found2.email}`, // list of receivers
                subject: "Xac nhan email ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Xac Nhan Email <a href="/"></a>!</b>", // html body
              });

              //luu id user vao session
            req.session.userId = found2.id;
        }
  

    res.redirect('/');
    
}));
router.post('/login',asyncHandler(async function(req,res){
     const {username,password} = req.body;
     const found = await User.findByUsername(username);
     if(found && passwordHash.verify(password,found.password) ){
         //luu id vao session
         req.session.userId = found.id;
         res.redirect('/');
     } else{
         res.json('password va mat khau sai ');
     }
 }));



router.post('/forgot',asyncHandler(async function(req,res){
    

          const {email} = req.body;
          const found = await User.findByEmail(email);
          if(found){
            //dat thong bao thay doi password
            found.resetPasswordToken = randomstring.generate(20);
            found.save();

          //dinh nghia tai khoan gui mail xac nhan cho user 
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              host: 'smtp.gmail.com',
              auth: {

                user: "william.lynguyen@gmail.com", 
                pass: "Deobiet_147", 
              },
            });


             await transporter.sendMail({
              from: '"XuanLy 👻" <william.lynguyen@gmail.com>', // sender address
            //  to: 'padkey123456@gmail.com', // list of receivers
              to: `${found.email}`, // list of receivers
              subject: "Xac nhan email ✔", // Subject line
              text:'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://localhost:3000/user/reset/' + found.resetPasswordToken + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n',
              html: "<b>Xac Nhan Email <a href="/"></a>!</b>", // html body
            });


          }
          else{
            req.flash("Khong co tai khoan voi kia chi email do ton tai");
           // console.json("Khong co tai khoan voi kia chi email do ton tai");
            redirect('/');
          }
}));

router.get('/reset/:token',function(req,res,next){
  const token = req.params.token;
  const found = User.findByToken(token);
  if(found){
      res.render('user/reset_password',{layout:'./layouts/try'});
  }else{
    res.json("token khong ton tai");
  }
  next()
});

router.post('/reset/:token',asyncHandler(async function(req,res){
  const token = req.params.token;
  const found = await User.findByToken(token);
  if(found){
    const {password} = req.body;
    found.password = passwordHash.generate(password);
    found.resetPasswordToken = null;
    found.save();
    res.redirect('/');
  }else{
    res.redirect('/');
  }
}))


router.get('/logout',function(req,res){
     //delete req.currentUser.id;
    req.session =null;
     res.redirect('/');
 });
 
module.exports = router;


  // .then(data=>{
    //     //neu da ton tai
    //     if(data){
    //         res.json('User da ton tai');
    //     }
    //     //neu chua ton tai
    //     else{
    //         res.json("tao thanh cong");
    //             User.create(user)
             
    //         //neu tao user thanh cong thi
    //         .then(data=>{
    //             const found =  User.findByUsername(username);
    //             res.json("tao thanh cong");
    //                     //luu id vao session
    //                     req.session.userId = found.id;
    //                          }) .catch(err=>{
    //                             res.status(500).json('tao tai khoan that bai'); //bao loi
    //                         })
    //     }
    // })
    // //neu loi thi
    // .catch(err=>{
    //     res.status(500).log('tao tai khoan that bai'); //bao loi
    // })