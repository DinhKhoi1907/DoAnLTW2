const express = require('express');
const User = require('../../models/user/userModel.js');
const asyncHandler = require('express-async-handler');
//ma hoa mk2
var passwordHash = require('password-hash');
//cum rap
const provinceModel = require('../../models/user/provinceModel.js');

const router = express.Router();


router.get('/',asyncHandler(async function(req,res){
    const province =   await provinceModel.findlistProvince(); 
    const listProvince = province.rows
  
      res.render('user/pages/profile',{layout:'././home/layouts/home',listProvince:listProvince})
  }));
  router.post('/changeinfo',asyncHandler(async function(req,res){
      const {name,address,phone} = req.body; 
      if(name){
         await User.UpdateName(req.currentUser.CustomerISN,name);
      }
       if(address){
        await User.UpdateAddress(req.currentUser.CustomerISN,address);
      }
      if(phone){
        await User.UpdatePhone(req.currentUser.CustomerISN,phone);
      }
      res.end("1");
     
  }));
  
  
  
  router.post('/changepassword',asyncHandler(async function(req,res){
    const {oldpassword,newpassword,renewpassword} = req.body; 
  
    if(passwordHash.verify(oldpassword,req.currentUser.Password)){
       if(newpassword === renewpassword){
        //success
        const passwordMH = passwordHash.generate(newpassword);
        await User.UpdatePassword(req.currentUser.CustomerISN,passwordMH);
        res.end("1");
       }
       else{
         //mật khẩu nhập lại không giống
         res.end("-1");
       }
        
    }
    else {
     //khật khẩu không đúng
     res.end("0");
    }
    
   
  }));

//lịch sử đặt vé
  router.get('/bookingHistory',asyncHandler(async function(req,res){
    const province =   await provinceModel.findlistProvince(); 
    const listProvince = province.rows
    const booking = await User.findBookingHistoryByIdUser(req.currentUser.CustomerISN ? req.currentUser.CustomerISN : req.user);
    const listBooking = booking.rows;
  
      res.render('user/pages/bookingHistory',{layout:'././home/layouts/home',listProvince:listProvince,listBooking:listBooking});
  }));

  module.exports = router;