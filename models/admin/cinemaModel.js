const cinema = require("../../configs/config.js");

/* Rap */
cinema.getAllCinema = async function() {
    return await cinema.query(`SELECT * FROM vw_cinema`);
  }
  cinema.insUpd_Cinema = async function(CinemaISN,CinemaName,CinemaAddress,CinemaStatus,Location,ProvinceISN,UpdateBy){
      return cinema.query(`SELECT fn_cinema_insupd($1,$2,$3,$4,$5,$6,$7)`,[CinemaISN,CinemaName,CinemaAddress,CinemaStatus,Location,ProvinceISN,UpdateBy])
  }
  cinema.deleteCinema = async function(CinemaISN){
    return cinema.query(`SELECT fn_cinema_del($1)`,[CinemaISN]);
  }
module.exports = cinema;