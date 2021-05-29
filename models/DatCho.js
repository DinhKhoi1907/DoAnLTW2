const { DataTypes } = require('sequelize');
const db = require('./db.js');

const User = require('./User')
const SuatChieu = require('./SuatChieu')

const DatCho = db.define('DatCho', {
  MaDatCho: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  ThoiDiemDatVe: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  TongTien: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

})
DatCho.belongsTo(User)
DatCho.belongsTo(SuatChieu)
module.exports = DatCho