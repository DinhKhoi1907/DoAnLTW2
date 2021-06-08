
const DatCho = require('../configs/config');

DatCho.SeatsOfShowTime = async function(IdSuatChieu){
    return DatCho.query(`SELECT * FROM SeatsOfShowTime WHERE "ShowTimeISN" = $1`,[SuatChieuId]);
} 
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
