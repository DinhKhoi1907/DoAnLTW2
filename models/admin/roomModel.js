const room = require("../../configs/config.js");


room.findRoomByIdRap = function(rapId) {
    return  room.query(`SELECT * FROM vw_room WHERE "CinemaISN" = $1`,[rapId]);
}

room.insUpd_Room = function(RoomISN,RoomName,RowSeats,ColumnSeats,Status,CinemaISN,UpdateBy) {
  return  room.query(`SELECT  fn_room_insupd($1,$2,$3,$4,$5,$6,$7)`,[RoomISN,RoomName,RowSeats,ColumnSeats,Status,CinemaISN,UpdateBy]);
}
room.deleteRoom = function(RoomISN) {
  return  room.query(`SELECT fn_room_del($1)`,[RoomISN]);
}

  module.exports = room;

//select * FROM vw_room where "CinemaISN" = 10095