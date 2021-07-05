const express = require("express");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

/* Require Model */
const movieModel = require("../../models/admin/movieModel");
const cinemaModel = require("../../models/admin/cinemaModel");
const provinceModel = require("../../models/admin/provinceModel");
const showtimeModel = require("../../models/admin/showtimeModel");
const desStatusModel = require("../../models/admin/desStatusModel");
const staffModel = require("../../models/admin/staffModel");
const router = express.Router();

/* Movie */
router.get("/", async function (req, res) {
    const booking = await bookingModel.getAllBooking();
    const listBooking = await booking.rows
    console.log(listBooking)
    res.render("admin/pages/booking", {layout:'./admin/layouts/admin',moment: moment, listBooking:listBooking});
  });
  router.post("/addMovie",async function(req,res){
    const { movieName,plot,kindOfMovie,director,premiere,movieTime,country,poster,movieStatus,trailer,updatedBy} = req.body;
    const movie = await movieModel.insertMovie(movieName,plot,kindOfMovie,director,premiere,Number(movieTime),country,poster,Number(movieStatus),trailer,Number(updatedBy));
      //console.log(movie)
        res.send("1");
  })
  router.post("/deleteMovie",async function(req,res){
    const {MovieISN}=req.body;
    
    //kiểm tra movie có xóa được không
    const check = await movieModel.deleteMovie(MovieISN);
   
    res.send(`${check.rows[0].fn_movie_del}`);
  })
  

module.exports = router;