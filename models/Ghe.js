
const db = require('../configs/config');
const Rap = require('./Rap');


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