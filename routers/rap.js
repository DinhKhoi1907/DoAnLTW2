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


router.get('/',asyncHandler(async function(req,res){
        const cumRap =   await CumRap.findListCumRap(); 
        const listCumRap = cumRap.rows
        console.log(req.query.id);
        const id = req.query.id;
     
        const rap = await Rap.findListRapByIdCR(id);
        const listRap = rap.rows
         //khi select tới bảng khác thi mới dùng CumRap 
      //  console.log(listRap);
        res.render('home/rap',{layout:'./layouts/user',user: req.user ,listCumRap:listCumRap,listRap:listRap});
    
     
 }));

 module.exports = router;