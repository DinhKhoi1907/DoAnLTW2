const { DataTypes } = require('sequelize');
const db = require('./db.js');

const Phim = db.define('Phim', {
  Ten: {
    type: DataTypes.STRING,
    allowNull: false
  },
  NgayCongChieu: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Poster: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  ThoiLuong: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
});

module.exports = Phim