const express = require('express');
const asyncHandler = require('express-async-handler');

//cum rap
const provinceModel = require('../../models/user/provinceModel.js');
const cinemaModel = require('../../models/user/cinemaModel.js');
const roomModel= require('../../models/user/roomModel.js');
const movieModel = require('../../models/user/movieModel.js');
const showtimeModel= require('../../models/user/showtimeModel.js');
const seatModel= require('../../models/user/seatModel.js');
const router = express.Router();
//
//từ mảng sang dạng chuỗi để gửi qua ajax
var json_encode = require('json_encode');



router.post('/getProvince',asyncHandler(async function(req,res){
    const {date,idmovie} = req.body;

   const province = await showtimeModel.findCrByDateAndMovie(date,idmovie);

   var listProvince = json_encode(province.rows);

  res.end(listProvince);
}));


router.post('/getCinema',asyncHandler(async function(req,res){
 
const {date,provinceId,idmovie} = req.body;

const rap = await showtimeModel.findRapByDateAndMovieCr(date,provinceId,idmovie);
//console.log(rap.rows);
var listsRap = json_encode(rap.rows);

//console.log(listMovieRap[1]);

res.end(listsRap);
}));

//đặt chỗ
router.get('/chooseSeat/:showtimeISN',asyncHandler(async function(req,res){
  const province =   await provinceModel.findlistProvince(); 
  const listProvince = province.rows

    const title = 'BOOKING';
    //console.log(listMovie);
  //lấy ra được rapid 
  const showtimeISN = req.params.showtimeISN;
     // lấy ra dãy gế và trạng thái gế
  const seat = await seatModel.findlistSeat(showtimeISN) ;
  const listSeat = seat.rows;
   // lấy ra movie vừa chọn
  const p = await movieModel.findmovieBySC(showtimeISN);
  const movie = p.rows;
  //lấy suất chiếu
  const sc = await showtimeModel.findById(showtimeISN);
  const showtime = sc.rows;
  //lấy rạp
  const r = await cinemaModel.findRapmovieBySC(showtimeISN);
  const rap = r.rows;
  const ro = await roomModel.findRoommovieBySC(showtimeISN);
  const room = ro.rows;
  
  res.render('user/pages/booking',{layout:'././home/layouts/home',room,rap,showtime,listSeat:listSeat,movie,title,user: req.user ,listProvince:listProvince});
}));



 
module.exports = router;