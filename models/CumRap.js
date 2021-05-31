const { DataTypes } = require('sequelize');
const db = require('./db.js');
const CumRap = db.define("CumRap", {
  TenCum: {
    type: DataTypes.STRING,
    allowNull: false
  },
  DiaChi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
});

module.exports = CumRap

CumRap.findById = async function(id){
  return CumRap.findByPk(id);
}

// INSERT INTO "CumRaps"("TenCum","DiaChi","createdAt","updatedAt")
// VALUES ('Hồ Chí Minh','TP.HCM',NOW(),NOW()),
// ('Hà Nội','TP.HN',NOW(),NOW()),
// ('Bà Rịa – Vũng Tàu','Bà Rịa – Vũng Tàu',NOW(),NOW()),
// ('Khánh Hòa','Tp. Nha Trang',NOW(),NOW()),
// ('Đồng Nai','Tp. Biên Hoà',NOW(),NOW()),
// ('Đà Nẵng','Tp. Đà Nẵng',NOW(),NOW())