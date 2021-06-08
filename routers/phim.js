const express = require('express');
const User = require('../models/user.js');
const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");
//random string 
var randomstring = require("randomstring");
//cum rap
const CumRap = require('../models/CumRap.js');
const Rap = require('../models/Rap.js');
const Phim = require('../models/Phim.js');
const SuatChieu= require('../models/SuatChieu.js');
const DatCho= require('../models/DatCho.js');
const Ve= require('../models/Ve.js');
const router = express.Router();
//
const passport = require('passport');
//từ mảng sang dạng chuỗi để gửi qua ajax
var json_encode = require('json_encode');


//show ra danh sách phim
router.get('/',asyncHandler(async function(req,res){
   const cumRap =   await CumRap.findListCumRap(); 
   const listCumRap = cumRap.rows
   // console.log(req.query.id);
   // const id = req.query.id;
    const listPhim = await Phim.findAll();
     //khi select tới bảng khác thi mới dùng CumRap 
     const title = 'Danh sách phim đang chiếu';
     //console.log(listPhim);
    res.render('home/phim',{layout:'./layouts/user',user: req.user ,listCumRap:listCumRap,listPhim:listPhim,title});

 
}));
 //chi tiết phim
 router.get('/detail',asyncHandler(async function(req,res){
   const cumRap =   await CumRap.findListCumRap(); 
   const listCumRap = cumRap.rows

    const id = req.query.id;
    const phim = await Phim.findById(id);
    const detailPhim = phim.rows
    console.log("ahahaha");
    console.log(detailPhim[0].MovieName);
    const date = new Date();
    res.render('home/detail-phim',{layout:'./layouts/user',user: req.user ,listCumRap:listCumRap,detailPhim,date})
 }))


 //show ra các phim đang chiếu
 router.get('/phimdangchieu',asyncHandler(async function(req,res){
   const cumRap =   await CumRap.findListCumRap(); 
   const listCumRap = cumRap.rows

    
             const title = 'Danh sách phim đang chiếu';
             const phim = await Phim.findPhimDangChieu();
             const listPhim = phim.rows;
           //  console.log(listPhim);
            res.render('home/phim',{layout:'layouts/user',listPhim:listPhim,title,listCumRap:listCumRap,user: req.user});
 }));


  //show ra các phim sắp chiếu
  router.get('/phimsapchieu',asyncHandler(async function(req,res){
   const cumRap =   await CumRap.findListCumRap(); 
   const listCumRap = cumRap.rows
  
             const title = 'Danh sách phim sắp chiếu';
            const phim = await Phim.findPhimSapChieu();
            const listPhim = phim.rows;
            console.log("ahahah")
            console.log(listPhim);
            res.render('home/phim',{layout:'layouts/user',listPhim:listPhim,title,listCumRap:listCumRap,user: req.user});
 }));

 //datve
 //danh sách rạp có chiếu phim tìm theo ngày chiếu phim 
 router.post('/datve',asyncHandler(async function(req,res){
      const {date,idPhim} = req.body;
   // console.log(d)
     
     const listPhimRap = await SuatChieu.findRapByDateAndMovie(date,idPhim);
     console.log(listPhimRap[0].Rap.TenRap);
     var listsPhimRap = json_encode(listPhimRap);
     
     console.log(listPhimRap[1]);

    res.end(listsPhimRap);
 }));

module.exports = router;