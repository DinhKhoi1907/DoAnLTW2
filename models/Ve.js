const { DataTypes } = require('sequelize');
const db = require('./db.js');

const DatCho = require('./DatCho')

const Ve = db.define('Ve', {
  MaVe: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  MaGhe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  DiaChiNgang: {
    type: DataTypes.STRING,
    allowNull: false
  },
  DiaChiDoc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  GiaTien: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

Ve.belongsTo(DatCho)
module.exports = Ve