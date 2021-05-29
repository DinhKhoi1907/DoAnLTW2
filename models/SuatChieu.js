const { DataTypes } = require('sequelize');
const db = require('./db.js');
const Phim = require('./Phim');
const Rap = require('./Rap');

const SuatChieu = db.define('SuatChieu', {
  ThoiDiemBatDau: {
    type: Sequelize.STRING,
    allowNull: true
  },
  ThoiDiemKetThuc: {
    type: Sequelize.STRING,
    allowNull: true
  },
  GiaVe: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

SuatChieu.belongsTo(Phim)
SuatChieu.belongsTo(Rap)

module.exports = SuatChieu