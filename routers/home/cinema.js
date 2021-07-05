const express = require('express');
const asyncHandler = require('express-async-handler');

const provinceModel = require('../../models/user/provinceModel.js');
const cinemaModel = require('../../models/user/cinemaModel.js');
const router = express.Router();



router.get('/',asyncHandler(async function(req,res){
        const province =   await provinceModel.findlistProvince(); 
        const listProvince = province.rows
       // console.log(req.query.id);
        const id = req.query.id;
     
        const cinema = await cinemaModel.findlistCinemaByIdCR(id);
        const listCinema = cinema.rows
         //khi select tới bảng khác thi mới dùng province 
      //  console.log(listCinema);
        res.render('home/pages/cinema',{layout:'./home/layouts/home',user: req.user ,listProvince:listProvince,listCinema:listCinema});
    
     
 }));

 module.exports = router;