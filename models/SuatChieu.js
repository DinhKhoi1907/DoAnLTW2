const { DataTypes } = require('sequelize');
const db = require('./db.js');
const Phim = require('./Phim');
const Rap = require('./Rap');

const SuatChieu = db.define('SuatChieu', {
  ThoiDiemBatDau: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ThoiDiemKetThuc: {
    type: DataTypes.STRING,
    allowNull: true
  },
  GiaVe: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

SuatChieu.belongsTo(Phim)
SuatChieu.belongsTo(Rap)

module.exports = SuatChieu