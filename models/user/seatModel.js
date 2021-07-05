const seat = require('../../configs/config');

seat.findlistSeat = async function(Idshowtime){
    return seat.query(`SELECT * FROM "SeatsOfShowTime" WHERE "ShowTimeISN" = $1 ORDER BY "SeatISN" ASC`,[Idshowtime]);
} 
module.exports = seat;
// const seat = db.define('seat',{
//     ViTriHang:{
//         type:DataTypes.INTEGER,
//         allowNUll:true,
//     },
//     ViTriCot:{
//         type:DataTypes.INTEGER,
//         allowNUll:true,
//     },
//     TrangThai:{
//         type:DataTypes.INTEGER,
//         defaultValue:0, // chưa có ai đặt thì bằng 0
//     }
// })
// seat.belongsTo(Rap);

// seat.findByRapId = async function(id){
//     return seat.findAll({
//         include:[{
//             model:Rap,
//             where:{
//                 id:id,
                
//             }
//         }]
//     })
// };

//module.exports = seat;