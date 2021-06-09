const Ghe = require('../configs/config');

Ghe.findListGhe = async function(IdSuatChieu){
    return Ghe.query(`SELECT * FROM "SeatsOfShowTime" WHERE "ShowTimeISN" = $1 ORDER BY "SeatISN" ASC`,[IdSuatChieu]);
} 
module.exports = Ghe;
// const Ghe = db.define('Ghe',{
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
// Ghe.belongsTo(Rap);

// Ghe.findByRapId = async function(id){
//     return Ghe.findAll({
//         include:[{
//             model:Rap,
//             where:{
//                 id:id,
                
//             }
//         }]
//     })
// };

//module.exports = Ghe;