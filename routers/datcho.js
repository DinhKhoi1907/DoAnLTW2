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
//từ mảng sang dạng chuỗi để gửi qua ajax
var json_encode = require('json_encode');



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

    const title = 'BOOKING';
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


router.get('/logout',function(req,res){
     //delete req.currentUser.id;
    req.session=null;
     res.redirect('/');
 });
 
module.exports = router;