const provinceModel = require('../../models/user/provinceModel.js');
const cinemaModel = require('../../models/user/cinemaModel.js');
const express = require('express');
const router = express.Router();

router.get('/',async function(req,res){
    const province =   await provinceModel.findlistProvince();
    const listProvince = province.rows
   //  console.log(province);
   // tìm movie mới được công chiếu
   const pm = await cinemaModel.findmovieMoiDuocCongChieu();
   const listMoviemoi = pm.rows;
  
   // lấy movie được xem nhiều nhất 
   const top = 8;
   const pp = await cinemaModel.findmovieDuocXemNhieu(top);
   const listPDXN = pp.rows
   
     res.render('home/pages/home',{layout:'./home/layouts/home',user: req.user ,listProvince:listProvince,listMoviemoi:listMoviemoi,listPDXN:listPDXN});
  });
   
  module.exports = router;