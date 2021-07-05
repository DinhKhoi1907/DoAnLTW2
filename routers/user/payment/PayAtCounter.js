const express = require('express');
const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");
//cum rap

const bookingModel= require('../../../models/user/bookingModel.js');
const router = express.Router();
//
var randomstring = require("randomstring");
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
        //gửi sms
        sendSMS(['84356320674'], "Bạn vừa đặt vé xem phim trên website chúng tôi",2,"84968658176");
  
      res.send("1");
    
    } 
      else{
        res.send("0");
      }
  
        
  }));


var http = require('http');
var https = require('https');
const ACCESS_TOKEN = "FrJfyMFWp1IBYDKHj-QAel7sVOvsLjuG";

const sendSMS = function(phones, content, type, sender) {
    var url = 'api.speedsms.vn';
    var params = JSON.stringify({
        to: phones,
        content: content,
        sms_type: type,
        sender: sender
    });
    const ACCESS_TOKEN = "FrJfyMFWp1IBYDKHj-QAel7sVOvsLjuG";
    var buf = new Buffer.from(ACCESS_TOKEN + ':x');
    var auth = "Basic " + buf.toString('base64');
    const options = {
        hostname: url,
        port: 443,
        path: '/index.php/sms/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        }
    };

    const req = https.request(options, function(res) {
        res.setEncoding('utf8');
        var body = '';
        res.on('data', function(d) {
            body += d;
        });
        res.on('end', function() {
            var json = JSON.parse(body);
            if (json.status == 'success') {
                console.log("send sms success")
            }
            else {
                console.log("send sms failed " + body);
            }
        });
    });

    req.on('error', function(e) {
        console.log("send sms failed: " + e);
    });

    req.write(params);
    req.end();
}
  module.exports=router;