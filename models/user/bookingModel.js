const booking = require('../../configs/config');

booking.SeatsOfShowTime = async function(Idshowtime){
    return booking.query(`SELECT * FROM SeatsOfShowTime WHERE "ShowTimeISN" = $1`,[Idshowtime]);
} 

booking.InsertBooking = async function(IdUser,Idshowtime,SeatList,bookingStatus){
    return booking.query(`SELECT * FROM fn_booking_ins($1,$2,$3,$4) `,[IdUser,Idshowtime,SeatList,bookingStatus]);
} 

module.exports = booking
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
// DatCho.belongsTo(showtime);
// DatCho.belongsTo(seat);


// module.exports = DatCho
