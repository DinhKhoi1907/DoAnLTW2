const express = require('express');
const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");
//cum rap

const bookingModel= require('../../../models/user/bookingModel.js');
const router = express.Router();
//
//từ mảng sang dạng chuỗi để gửi qua ajax
var json_encode = require('json_encode');

router.post('/',asyncHandler(async function(req,res){
    
    if(req.currentUser){
          //dinh nghi tai khoan gui mail thong báo đặt chỗ thành công cho user
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
  
          user: "william.lynguyen@gmail.com",
          pass: "Deobiet_147",
        },
      });
  
      const {Idshowtime,seatList,TongTien,NgayChieu,GioChieu,TenRap,Tenmovie} = req.body;
     
      var SeatList = seatList.toString()
    //  console.log(Idshowtime,SeatList,TongTien);
      //insert vào bảng booking
      var bookingStatus = 1;
       const idDatcho = await bookingModel.InsertBooking(req.currentUser.CustomerISN,Idshowtime,SeatList,bookingStatus);
  
     
        //gui mail thông báo user đã đặt vế
         transporter.sendMail({
          from: '"XuanLy 👻" <william.lynguyen@gmail.com>', // sender address
          to: `${req.currentUser.CustomerEmail}`, // list of receivers
          subject: "Đặt chỗ thành công ✔", // Subject line
           html: `<h1>Bạn đã đặt chỗ ở web chúng tôi</h1>  <br> 
                  mã đặt chỗ của bạn là : ${idDatcho.rows[0].fn_booking_ins} <br>
                  Tại rạp :  ${TenRap} <br>
                  bạn đã đặt ghế : ${seatList} <br>
                  movie bạn chọn là : ${Tenmovie}  <br>
                  Ngày chiếu : ${NgayChieu}<br>
                  Giờ bắt đầu : ${GioChieu} <br>
                  Tổng Tiền :  ${TongTien}<br> `,
        });
  
      res.send("1");
    
    } 
      else{
        res.send("0");
      }
  
        
  }));

  module.exports=router;