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

router.post('/PayByPaypal',function(req,res){
  const {IdSuatChieu,seatList,TongTien,NgayChieu,GioChieu,TenRap,TenPhim} = req.body;
  req.session.IdSuatChieu = IdSuatChieu;
  req.session.seatList= seatList;
  req.session.TongTien = TongTien;
  
 // console.log(IdSuatChieu,seatList,TongTien,NgayChieu,GioChieu,TenRap,TenPhim);

 // Request to pay
  var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": `http://localhost:3000/datcho/success`, // thanh toán thành công thì qua cái này
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

router.get('/success',function(req,res){
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
paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
      console.log(JSON.stringify(payment));
  
      //lấy dữ liệu từ session
   const   SeatList = req.session.seatList;
   const IdSuatChieu = req.session.IdSuatChieu;

    //  const idDatcho = await DatCho.InsertBooking(req.currentUser.CustomerISN,IdSuatChieu,SeatList);
        res.json("Bạn đã thanh toán thành công");
    }
});

});

router.post('/findCr',asyncHandler(async function(req,res){
    const {date,idPhim} = req.body;

   const cumRap = await SuatChieu.findCrByDateAndMovie(date,idPhim);

   var listCumRap = json_encode(cumRap.rows);

  res.end(listCumRap);
}));


router.post('/findR',asyncHandler(async function(req,res){
 
const {date,CumRapId,idPhim} = req.body;

const rap = await SuatChieu.findRapByDateAndMovieCr(date,CumRapId,idPhim);
//console.log(rap.rows);
var listsRap = json_encode(rap.rows);

//console.log(listPhimRap[1]);

res.end(listsRap);
}));

//đặt chỗ
router.get('/chonGhe/:SuatChieuId',asyncHandler(async function(req,res){
  const cumRap =   await CumRap.findListCumRap(); 
  const listCumRap = cumRap.rows

    const title = 'Đặt Chỗ';
    //console.log(listPhim);
  //lấy ra được rapid 
  const SuatChieuId = req.params.SuatChieuId;
     // lấy ra dãy gế và trạng thái gế
  const ghe = await Ghe.findListGhe(SuatChieuId) ;
  const listGhe = ghe.rows;
   // lấy ra phim vừa chọn
  const p = await Phim.findPhimBySC(SuatChieuId);
  const phim = p.rows;
  //lấy suất chiếu
  const sc = await SuatChieu.findById(SuatChieuId);
  const suatchieu = sc.rows;
  //lấy rạp
  const r = await Rap.findRapPhimBySC(SuatChieuId);
  const rap = r.rows;
  const ro = await Phong.findRoomPhimBySC(SuatChieuId);
  const room = ro.rows;
  
  res.render('user/datcho',{layout:'./layouts/home',room,rap,suatchieu,listGhe:listGhe,phim,title,user: req.user ,listCumRap:listCumRap});
}));

router.post('/PayAtCounter',asyncHandler(async function(req,res){
    
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

    const {IdSuatChieu,seatList,TongTien,NgayChieu,GioChieu,TenRap,TenPhim} = req.body;
   
    var SeatList = seatList.toString()
  //  console.log(IdSuatChieu,SeatList,TongTien);
    //insert vào bảng booking
     const idDatcho = await DatCho.InsertBooking(req.currentUser.CustomerISN,IdSuatChieu,SeatList);

   
      //gui mail thông báo user đã đặt vế
       transporter.sendMail({
        from: '"XuanLy 👻" <william.lynguyen@gmail.com>', // sender address
        to: `${req.currentUser.CustomerEmail}`, // list of receivers
        subject: "Đặt chỗ thành công ✔", // Subject line
         html: `<h1>Bạn đã đặt chỗ ở web chúng tôi</h1>  <br> 
                mã đặt chỗ của bạn là : ${idDatcho.rows[0].fn_booking_ins} <br>
                Tại rạp :  ${TenRap} <br>
                bạn đã đặt ghế : ${seatList} <br>
                Phim bạn chọn là : ${TenPhim}  <br>
                Ngày chiếu : ${NgayChieu}<br>
                Giờ bắt đầu : ${GioChieu} <br>
                Tổng Tiền :  ${TongTien}<br> `,
      });

    res.send("1");
  
  } 
   else if(req.user) {
      //dinh nghi tai khoan gui mail thong báo đặt chỗ thành công cho user
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {

        user: "william.lynguyen@gmail.com",
        pass: "Deobiet_147",
      },
    });

    const {IdSuatChieu,seatList,TongTien,NgayChieu,GioChieu,TenRap,TenPhim} = req.body;
   
    var SeatList = seatList.toString()
  //  console.log(IdSuatChieu,SeatList,TongTien);
    //insert vào bảng booking
     const idDatcho = await DatCho.InsertBooking(req.user.id,IdSuatChieu,SeatList);

   
      //gui mail thông báo user đã đặt vế
      //  transporter.sendMail({
      //   from: '"XuanLy 👻" <william.lynguyen@gmail.com>', // sender address
      //   to: `${req.currentUser.CustomerEmail}`, // list of receivers
      //   subject: "Đặt chỗ thành công ✔", // Subject line
      //    html: `<h1>Bạn đã đặt chỗ ở web chúng tôi</h1>  <br> 
      //           mã đặt chỗ của bạn là : ${idDatcho.rows[0].fn_booking_ins} <br>
      //           Tại rạp :  ${TenRap} <br>
      //           bạn đã đặt ghế : ${seatList} <br>
      //           Phim bạn chọn là : ${TenPhim}  <br>
      //           Ngày chiếu : ${NgayChieu}<br>
      //           Giờ bắt đầu : ${GioChieu} <br>
      //           Tổng Tiền :  ${TongTien}<br> `,
      // });

    res.send("1");
  
 }
    else{
      res.send("0");
    }



      
}));
router.get('/logout',function(req,res){
     //delete req.currentUser.id;
    req.session=null;
     res.redirect('/');
 });
 
module.exports = router;