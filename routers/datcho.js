const express = require('express');
const User = require('../models/user.js');
const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");
//random string 
var randomstring = require("randomstring");
//cum rap
const CumRap = require('../models/CumRap.js');
const Rap = require('../models/Rap.js');
const Phong= require('../models/Phong.js');
const Phim = require('../models/Phim.js');
const SuatChieu= require('../models/SuatChieu.js');
const DatCho= require('../models/DatCho.js');
const Ve= require('../models/Ve.js');
const Ghe= require('../models/Ghe.js');
const router = express.Router();
//
const passport = require('passport');
//từ mảng sang dạng chuỗi để gửi qua ajax
var json_encode = require('json_encode');
//const ensureLoggedIn = require('../middlewares/ensure_logged_in.js')



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

router.post('/datcho',asyncHandler(async function(req,res){
    
  if(!req.currentUser){
      res.send("0");
  } 
   else{
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
  
    // for(i=0;i<ViTriGhes.length;i++){
    //   const ghe = {};
    //    ghe.ViTriHang = ViTriGhes[i].slice(0,1);
    //    ghe.ViTriCot = ViTriGhes[i].slice(2,3);
    //   ghe.RapId = IdRap;
    //   await Ghe.create(ghe);
    // }
      
}));
router.get('/logout',function(req,res){
     //delete req.currentUser.id;
    req.session=null;
     res.redirect('/');
 });
 
module.exports = router;