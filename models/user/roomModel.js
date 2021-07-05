const room  = require('../../configs/config');






room.findRoommovieBySC = async function(showtimeISN){
  return room.query(`SELECT * FROM "Room" r
                    JOIN "ShowTime" st ON (r."RoomISN" = st."RoomISN")
                     WHERE st."ShowTimeISN"  = $1`,[showtimeISN]);
}

module.exports=room;