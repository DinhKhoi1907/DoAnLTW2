const express = require('express');
const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");
//cum rap
const CumRap = require('../models/CumRap.js');
const Rap = require('../models/Rap.js');
const Phong= require('../models/Phong.js');
const Phim = require('../models/Phim.js');
const SuatChieu= require('../models/SuatChieu.js');
const DatCho= require('../models/DatCho.js');
const Ghe= require('../models/Ghe.js');
const router = express.Router();
//

var paypal = require('paypal-rest-sdk');
//từ mảng sang dạng chuỗi để gửi qua ajax
var json_encode = require('json_encode');


//kết nối tới tài khaonr nhận tiền
//Giải ngân có nghĩa là ngân hàng xuất (giải quyết) tiền, tài chính (ngân) cho khách hàng theo hợp đồng cho vay đã thỏa thuận.
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ASJ3j3M4L8u8C-Qwmps4FsAuWwE1FpJ76YIpOFO6Z9bvxIIVDoaJ_HNrwXla8_N4DF6KLPbPA8047jaq',
  'client_secret': 'EKbmjnfbshxG6TUzkfdwqSJjQ-KyRixwZhSUWKF1MDlWrGwKSjw_up0nw077Qi5l4nygJ6bsq-HbkfgA'
});

router.post('/',function(req,res){
  const {IdSuatChieu,seatList,TongTien,NgayChieu,GioChieu,TenRap,TenPhim} = req.body;
  req.session.IdSuatChieu = IdSuatChieu;
  req.session.seatList= seatList;
  req.session.TongTien = TongTien;
  req.session.NgayChieu = NgayChieu;
  req.session.GioChieu = GioChieu;
  req.session.TenRap = TenRap;
  req.session.TenPhim = TenPhim;
 

 // Request to pay
  var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": `http://localhost:3000/PayByPayPal/success`, // thanh toán thành công thì qua cái này
        "cancel_url": "http://localhost:3000/cancel" // thanh toán thất bại thì qua cái này
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": `${TenPhim}`, // tên phim 
                "sku": `${req.currentUser.CustomerISN}`, // mã khách hàng
                "price": `${TongTien}`, //giá tiền 
                "currency": "USD",
                "quantity": 1 // số lượng gế
            }]
        },
        "amount": {
            "currency": "USD",
            "total": `${TongTien}`  // phải điền đủ tổng tiền nếu không là nó bị lỗi
        },
        "description": "This is the payment description.",
      
    }]
};



paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
    for(let i =0;i<payment.links.length;i++){
      if(payment.links[i].rel === 'approval_url'){
        //console.log(payment);
        res.send(payment.links[i].href);
      }
    }
  }
});


});

router.get('/success', asyncHandler(async function(req,res){
  var payerID = req.query.PayerID;
  var execute_payment_json = {
    "payer_id": payerID,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": `${req.session.TongTien}`
        }
    }]
};

var paymentId = req.query.paymentId;
// thanh thoán thành công thì 
paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
      //console.log(JSON.stringify(payment));
  
   const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {

      user: "william.lynguyen@gmail.com",
      pass: "Deobiet_147",
    },
  });
 

     var SeatList = req.session.seatList.toString();
         //insert vào bảng booking
    var bookingStatus = 0; // đã thanh toán online
    // dữ liệu idSuat chiếu và seatlist lấy từ session lưu hồi nãy
    const idDatcho = await DatCho.InsertBooking(req.currentUser.CustomerISN,req.session.IdSuatChieu,SeatList,bookingStatus);
     //gui mail thông báo user đã đặt vế
     transporter.sendMail({
      from: '"XuanLy 👻" <william.lynguyen@gmail.com>', // sender address
      to: `${req.currentUser.CustomerEmail}`, // list of receivers
      subject: "Đặt chỗ thành công ✔", // Subject line
       html: `<h1>Bạn đã đặt chỗ ở web chúng tôi</h1>  <br> 
              mã đặt chỗ của bạn là : ${idDatcho.rows[0].fn_booking_ins} <br>
              Tại rạp :  ${req.session.TenRap} <br>
              bạn đã đặt ghế : ${req.session.seatList} <br>
              Phim bạn chọn là : ${req.session.TenPhim}  <br>
              Ngày chiếu : ${req.session.NgayChieu}<br>
              Giờ bắt đầu : ${req.session.GioChieu} <br>
              Tổng Tiền :  ${req.session.TongTien}<br>
              Trạng thái :  Đã thanh toán<br> 
              Phương thức thanh toán :  Thanh toán online bằng PayPal<br>`,
    });

    res.redirect('/user/bookinghistory');
    //  const idDatcho = await DatCho.InsertBooking(req.currentUser.CustomerISN,IdSuatChieu,SeatList);
    }
});

}));

module.exports=router;