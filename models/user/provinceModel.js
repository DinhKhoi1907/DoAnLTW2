const province = require('../../configs/config');





 province.findlistProvince = async function() { 

  return province.query(`SELECT * FROM "Province"`);
}


module.exports =province;





// const province = db.define("province", {
//   TenCum: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   DiaChi: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
  
// });
//module.exports = province

// province.findById = async function(id){
//   return province.findByPk(id);
// }

// INSERT INTO "provinces"("TenCum","DiaChi","createdAt","updatedAt")
// VALUES ('Hồ Chí Minh','TP.HCM',NOW(),NOW()),
// ('Hà Nội','TP.HN',NOW(),NOW()),
// ('Bà Rịa – Vũng Tàu','Bà Rịa – Vũng Tàu',NOW(),NOW()),
// ('Khánh Hòa','Tp. Nha Trang',NOW(),NOW()),
// ('Đồng Nai','Tp. Biên Hoà',NOW(),NOW()),
// ('Đà Nẵng','Tp. Đà Nẵng',NOW(),NOW())
