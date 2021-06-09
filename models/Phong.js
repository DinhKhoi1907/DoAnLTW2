const Phong  = require('../configs/config');






Phong.findRoomPhimBySC = async function(SuatChieuId){
  return Phong.query(`SELECT * FROM "Room" r
                    JOIN "ShowTime" st ON (r."RoomISN" = st."RoomISN")
                     WHERE st."ShowTimeISN"  = $1`,[SuatChieuId]);
}

module.exports=Phong;