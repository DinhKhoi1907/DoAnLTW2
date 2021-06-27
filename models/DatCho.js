const DatCho = require('../configs/config');

DatCho.SeatsOfShowTime = async function(IdSuatChieu){
    return DatCho.query(`SELECT * FROM SeatsOfShowTime WHERE "ShowTimeISN" = $1`,[IdSuatChieu]);
} 

DatCho.InsertBooking = async function(IdUser,IdSuatChieu,SeatList,bookingStatus){
    return DatCho.query(`SELECT * FROM fn_booking_ins($1,$2,$3,$4) `,[IdUser,IdSuatChieu,SeatList,bookingStatus]);
} 

module.exports = DatCho
// const DatCho = db.define('DatCho', {
//   MaDatCho: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV1,
//     primaryKey: true
//   },
//   ThoiDiemDatVe: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   },
//   TongTien: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   }

// })
// DatCho.belongsTo(User);
// DatCho.belongsTo(SuatChieu);
// DatCho.belongsTo(Ghe);


// module.exports = DatCho
