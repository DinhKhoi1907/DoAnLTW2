const express = require("express");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

/* Require Model */
const movieModel = require("../../models/admin/movieModel");
const cinemaModel = require("../../models/admin/cinemaModel");
const showtimeModel = require("../../models/admin/showtimeModel");
const desStatusModel = require("../../models/admin/desStatusModel");
const staffModel = require("../../models/admin/staffModel");
const roomModel = require("../../models/admin/roomModel");
const router = express.Router();

// SHOW time
router.get('/', async function(req, res){
    const showtime = await showtimeModel.getAllShowTime();
    const listShowTime =  showtime.rows
    //staff
    const staff = await staffModel.getAllStaff();
    const listStaff = staff.rows
  
    //desStatus
    const desStatus = await desStatusModel.getAllDesStatus();
    const listDesStatus= desStatus.rows
    //movie
    const movie = await movieModel.getAllMovie();
    const listMovie = movie.rows
   // cinema 
   const cinema = await cinemaModel.getAllCinema();
   const listCinema = cinema.rows
     // console.log(listShowTime)
    res.render("admin/pages/showtime", { layout:'./admin/layouts/admin',listShowTime:listShowTime, moment: moment,listStaff:listStaff,listDesStatus:listDesStatus,listMovie:listMovie,listCinema:listCinema });
  })
  
router.post('/findRoomByIdRap',async function(req,res){
    const {rapId} = req.body;
    const room = await roomModel.findRoomByIdRap(rapId);
    const listRoom = room.rows;
    
    res.send(listRoom);
})
router.post('/addShowtime',async function(req,res){
  const {MovieISN,RoomISN,DateTimeFrom,DateTimeTo,ShowtimeStatus,TicketPrice,UpdatedBy} = req.body
  //console.log(Number(MovieISN),Number(RoomISN),DateTimeFrom,DateTimeTo,Number(ShowtimeStatus),Number(TicketPrice),Number(UpdatedBy));
  console.log(req.body)
  //insert thì truyền vào số 0
  const check = await showtimeModel.insUpd_Showtime(0,Number(MovieISN),Number(RoomISN),DateTimeFrom,DateTimeTo,Number(ShowtimeStatus),Number(TicketPrice),Number(UpdatedBy));
  //console.log(check.rows[0].fn_showtime_insupd);
  res.send(`${check.rows[0].fn_showtime_insupd}`);
})
router.post('/deleteMovie',async function(req,res){
  const {ShowtimeISN} = req.body

  const check = await showtimeModel.deleteShowtime(ShowtimeISN);
  //console.log(check.rows[0].fn_showtime_insupd);
  res.send(`${check.rows[0].fn_showtime_del}`);
})
module.exports = router;