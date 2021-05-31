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
const passport = require('passport')


//show ra danh sách phim
router.get('/',asyncHandler(async function(req,res){
    const listCumRap = await CumRap.findAll(); 
   // console.log(req.query.id);
   // const id = req.query.id;
    const listPhim = await Phim.findAll();
     //khi select tới bảng khác thi mới dùng CumRap 
   
    res.render('home/phim',{layout:'./layouts/user',user: req.user ,listCumRap:listCumRap,listPhim:listPhim});

 
}));
 //chi tiết phim
 router.get('/detail',asyncHandler(async function(req,res){
    const listCumRap = await CumRap.findAll(); 

    const id = req.query.id;
    const detailPhim = await Phim.findById(id);
    
    res.render('home/detail-phim',{layout:'./layouts/user',user: req.user ,listCumRap:listCumRap,detailPhim})
 }))

module.exports = router;