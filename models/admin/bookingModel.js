const booking = require("../../configs/config.js");


booking.insUpd_Cinema =  function(CinemaISN,CinemaName,CinemaAddress,CinemaStatus,ProvinceISN,UpdateBy){
      return booking.query(`SELECT fn_cinema_insupd($1,$2,$3,$4,$5,$6)`,[CinemaISN,CinemaName,CinemaAddress,CinemaStatus,ProvinceISN,UpdateBy])
  }
  booking.deleteCinema =  function(CinemaISN){
    return booking.query(`SELECT fn_cinema_del($1)`,[CinemaISN]);
  }
  booking.getAllBooking =  function(){
    return booking.query(`SELECT * FROM vw_booking()`);
  }
module.exports = booking;