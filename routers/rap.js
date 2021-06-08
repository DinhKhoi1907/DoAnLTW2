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
        const listCumRap = await CumRap.findAll(); 
        console.log(req.query.id);
        const id = req.query.id;
     
        const listRap = await Rap.findByIdCumRap(id);
         //khi select tới bảng khác thi mới dùng CumRap 
        console.log(listRap.length);
        res.render('home/rap',{layout:'./layouts/user',user: req.user ,listCumRap:listCumRap,listRap:listRap});
    
     
 }));

 module.exports = router;