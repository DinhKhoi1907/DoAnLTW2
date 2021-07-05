const express = require('express');
const User = require('../../models/user/userModel.js');
const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");
//random string
var randomstring = require("randomstring");
//ma hoa mk2
var passwordHash = require('password-hash');
//cum rap

//const sendWellcome = require('../')
const router = express.Router();
//
const passport = require('passport')
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

router.post('/',asyncHandler(async function(req,res){

    const {email} = req.body;
    const found = await User.findUserByEmail(email);
    if(found.rows[0]){
      //dat thong bao thay doi password
     const resetPasswordToken = randomstring.generate(20);
     const newtoken= await User.UpDateToken(found.rows[0].CustomerISN,resetPasswordToken)
    //dinh nghia tai khoan gui mail xac nhan cho user
     //console.log(newtoken.rows[0].Token);
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
        to: `${found.rows[0].CustomerEmail}`, // list of receivers
        subject: "Xác nhận email ✔", // Subject line
        html:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Narrative Confirm Email</title>
          <style type="text/css">
        
          /* Take care of image borders and formatting */
        
          img {
            max-width: 600px;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
        
          a {
            border: 0;
            outline: none;
          }
        
          a img {
            border: none;
          }
        
          /* General styling */
        
          td, h1, h2, h3  {
            font-family: Helvetica, Arial, sans-serif;
            font-weight: 400;
          }
        
          td {
            font-size: 13px;
            line-height: 150%;
            text-align: left;
          }
        
          body {
            -webkit-font-smoothing:antialiased;
            -webkit-text-size-adjust:none;
            width: 100%;
            height: 100%;
            color: #37302d;
            background: #ffffff;
          }
        
          table {
            border-collapse: collapse !important;
          }
        
        
          h1, h2, h3 {
            padding: 0;
            margin: 0;
            color: #444444;
            font-weight: 400;
            line-height: 110%;
          }
        
          h1 {
            font-size: 35px;
          }
        
          h2 {
            font-size: 30px;
          }
        
          h3 {
            font-size: 24px;
          }
        
          h4 {
            font-size: 18px;
            font-weight: normal;
          }
        
          .important-font {
            color: #21BEB4;
            font-weight: bold;
          }
        
          .hide {
            display: none !important;
          }
        
          .force-full-width {
            width: 100% !important;
          }
        
          </style>
        
          <style type="text/css" media="screen">
              @media screen {
                @import url(http://fonts.googleapis.com/css?family=Open+Sans:400);
        
                /* Thanks Outlook 2013! */
                td, h1, h2, h3 {
                  font-family: 'Open Sans', 'Helvetica Neue', Arial, sans-serif !important;
                }
              }
          </style>
        
          <style type="text/css" media="only screen and (max-width: 600px)">
            /* Mobile styles */
            @media only screen and (max-width: 600px) {
        
              table[class="w320"] {
                width: 320px !important;
              }
        
              table[class="w300"] {
                width: 300px !important;
              }
        
              table[class="w290"] {
                width: 290px !important;
              }
        
              td[class="w320"] {
                width: 320px !important;
              }
        
              td[class~="mobile-padding"] {
                padding-left: 14px !important;
                padding-right: 14px !important;
              }
        
              td[class*="mobile-padding-left"] {
                padding-left: 14px !important;
              }
        
              td[class*="mobile-padding-right"] {
                padding-right: 14px !important;
              }
        
              td[class*="mobile-block"] {
                display: block !important;
                width: 100% !important;
                text-align: left !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                padding-bottom: 15px !important;
              }
        
              td[class*="mobile-no-padding-bottom"] {
                padding-bottom: 0 !important;
              }
        
              td[class~="mobile-center"] {
                text-align: center !important;
              }
        
              table[class*="mobile-center-block"] {
                float: none !important;
                margin: 0 auto !important;
              }
        
              *[class*="mobile-hide"] {
                display: none !important;
                width: 0 !important;
                height: 0 !important;
                line-height: 0 !important;
                font-size: 0 !important;
              }
        
              td[class*="mobile-border"] {
                border: 0 !important;
              }
            }
          </style>
        </head>
        <body class="body" style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none" bgcolor="#ffffff">
        <table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
          <tr>
            <td align="center" valign="top" bgcolor="#ffffff"  width="100%">
        
            <table cellspacing="0" cellpadding="0" width="100%">
              <tr>
                <td style="background:#1f1f1f" width="100%">
                  <center>
                    <table cellspacing="0" cellpadding="0" width="600" class="w320">
                      <tr>
                        <td valign="top" class="mobile-block mobile-no-padding-bottom mobile-center" width="270" style="background:#1f1f1f;padding:10px 10px 10px 20px;">
                          <a href="#" style="text-decoration:none; font-size:30px">
                          Web đặt vé xem movie
                          </a>
                        </td>
                       
                      </tr>
                    </table>
                  </center>
                </td>
              </tr>
              <tr>
                <td style="border-bottom:1px solid #e7e7e7;">
                  <center>
                    <table cellpadding="0" cellspacing="0" width="600" class="w320">
                      <tr>
                        <td align="left" class="mobile-padding" style="padding:20px">
        
                          <br class="mobile-hide" />
        
                          <h2>Yêu Cầu Đổi mật khẩu!</h2><br> <br>
                          Xin Chào,<br>
                          Chúng tôi đã gửi cho bạn email này để đáp ứng yêu cầu đặt lại mật khẩu của bạn trên web đặt vé xem movie.
                Để đặt lại mật khẩu của bạn, vui lòng bấm nút đặt lại mật khẩu.<br>
                    
                          <br>
                  <br>
                          <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#ffffff">
                            <tr>
                              <td style="width:100px;background:#D84A38;">
                                <div>
                                  
                                      <a href="http://localhost:3000/user/forgot/reset/${newtoken.rows[0].Token}"
                                style="background-color:#D84A38;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:33px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;">Đặt lại mật khẩu</a>     
                                
                  </div>
                              </td>
                    
                              <td width="281" style="background-color:#ffffff; font-size:0; line-height:0;">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                        <td class="mobile-hide" style="padding-top:20px;padding-bottom:0; vertical-align:bottom;" valign="bottom">
                          <table cellspacing="0" cellpadding="0" width="100%">
                            <tr>
                              <td align="right" valign="bottom" style="padding-bottom:0; vertical-align:bottom;">
                                <img  style="vertical-align:bottom;" src="https://www.filepicker.io/api/file/9f3sP1z8SeW1sMiDA48o"  width="174" height="294" />
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </center>
                </td>
              </tr>
              <tr>
                <td style="background-color:#1f1f1f;">
                  <center>
                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="w320" style="height:100%;color:#ffffff" bgcolor="#1f1f1f" >
                      <tr>
                        <td align="right" valign="middle" class="mobile-padding" style="font-size:12px;padding:20px; background-color:#1f1f1f; color:#ffffff; text-align:left; ">
                         
                        </td>
                      </tr>
                    </table>
                  </center>
                </td>
              </tr>
            </table>
        
            </td>
          </tr>
        </table>
        </body>
        </html>`,
        //html: `<b> Xac Nhan Email <a href='http://localhost:3000/user/reset/${newtoken.rows[0].Token}'>Click vào đây để đổi Mật Khẩu </a>! </b>`, // html body
      });
        res.end("1")
    }
    else{
      res.end("0")
    }
}));

      router.get('/reset/:token',asyncHandler(async function(req,res,next){
            const token = req.params.token;
            console.log(token)
            const found = await User.findUserByToken(token);
            if(found.rows[0]){
              const CustomerISN = found.rows[0].CustomerISN;
            res.render('user/pages/reset_password',{layout:false,CustomerISN});
            }else{
            res.json("token khong ton tai");
            }
            next()
        }));

router.post('/resetPassword',asyncHandler(async function(req,res){
      const{CustomerISN,password} = req.body
        const found = await User.findUserById(Number(CustomerISN));

        if(found.rows[0]){
        const passwordMH = passwordHash.generate(password);
        const token = null;
        //update password
        await User.UpDatePasswordAndToken(found.rows[0].CustomerISN,token,passwordMH)
        //lưu id vào session 
        req.session.userId = found.rows[0].CustomerISN
        res.send("1");
        }else{
        res.redirect("0");
        }
        }))

module.exports = router;