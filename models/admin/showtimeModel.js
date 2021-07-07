const showtime = require("../../configs/config.js");

/* Suất chiếu */
showtime.getAllShowTime =  function (){
  return  showtime.query(`SELECT * FROM vw_showtime WHERE "ShowTimeISN" = $1`,[400327]);
}


showtime.insUpd_Showtime =  function (ShowtimeISN,MovieISN,RoomISN,DateTimeFrom,DateTimeTo,ShowtimeStatus,TicketPrice,UpdatedBy){
  return  showtime.query(`SELECT fn_showtime_insupd($1,$2,$3,$4,$5,$6,$7,$8)`,[ShowtimeISN,MovieISN,RoomISN,DateTimeFrom,DateTimeTo,ShowtimeStatus,TicketPrice,UpdatedBy])
}
showtime.deleteShowtime = async function (ShowtimeISN){
  return await showtime.query(`SELECT * FROM fn_showtime_del($1)`,[ShowtimeISN]);
}
module.exports = showtime;