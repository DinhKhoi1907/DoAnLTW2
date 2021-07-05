const express = require("express");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

/* Require Model */
const movieModel = require("../../models/admin/movieModel");
const cinemaModel = require("../../models/admin/cinemaModel");
const showtimeModel = require("../../models/admin/showtimeModel");
const desStatusModel = require("../../models/admin/desStatusModel");
const staffModel = require("../../models/admin/staffModel");
const router = express.Router();

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
      console.log(listStaff)
    res.render("admin/pages/staff", { layout:'./admin/layouts/admin',listShowTime:listShowTime, moment: moment,listStaff:listStaff,listDesStatus:listDesStatus,listMovie:listMovie,listCinema:listCinema });
  })
  
module.exports = router;