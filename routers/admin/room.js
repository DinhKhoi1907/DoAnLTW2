const express = require("express");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

/* Require Model */
const cinemaModel = require("../../models/admin/cinemaModel");
const desStatusModel = require("../../models/admin/desStatusModel");
const staffModel = require("../../models/admin/staffModel");
const roomModel = require("../../models/admin/roomModel");
const router = express.Router();


router.get('/roomOfCinema',async function(req,res){
    const CinemaISN = req.query.CinemaISN;
     //staff
   const staff = await staffModel.getAllStaff();
   const listStaff = staff.rows
   //desStatus
   const desStatus = await desStatusModel.getAllDesStatus();
   const listDesStatus= desStatus.rows
   //room
    const room = await roomModel.findRoomByIdRap(CinemaISN);
    const listRoom = room.rows
  //cinema
  const cinema = await cinemaModel.getAllCinema();
  const listCinema = cinema.rows
    res.render("admin/pages/room", {layout:'./admin/layouts/admin',listRoom:listRoom,listStaff:listStaff,listDesStatus:listDesStatus,listCinema:listCinema});

})

router.post('/addRoom',async function(req,res){
  const {RoomName,RowSeats,ColumnSeats,Status,CinemaISN,UpdateBy} = req.body;
  //console.log(RoomName,Number(RowSeats),Number(ColumnSeats),Number(Status),Number(CinemaISN),Number(UpdateBy));
  //insert thì truyền vào số 0
  const check = await roomModel.insUpd_Room(0,RoomName,Number(RowSeats),Number(ColumnSeats),Number(Status),Number(CinemaISN),Number(UpdateBy));

  res.send(`${check.rows[0].fn_room_insupd}`);
})
router.post('/deleteRoom',async function(req,res){
    const {RoomISN} = req.body;

    //insert thì truyền vào số 0
    const check = await roomModel.deleteRoom(Number(RoomISN));
  
    res.send(`${check.rows[0].fn_room_del}`);
  })
module.exports = router;