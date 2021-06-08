
const db = require('../configs/config');

const User = require('./user');
const SuatChieu = require('./SuatChieu');
const Ghe = require('./Ghe');


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
