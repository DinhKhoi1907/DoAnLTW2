const { DataTypes } = require('sequelize');
const db = require('./db.js');

const Phim = db.define('Phim', {
  Ten: {
    type: Sequelize.STRING,
    allowNull: false
  },
  NgayCongChieu: {
    type: Sequelize.DATE,
    allowNull: false
  },
  Poster: {
    type: Sequelize.STRING,
    allowNull: false
  },
  TraiLers: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ThoiLuong: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  DaoDien: {
    type: Sequelize.STRING,
    allowNull: false
  },
  DienVien: {
    type: Sequelize.STRING,
    allowNull: false
  },
  TheLoai: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = Phim