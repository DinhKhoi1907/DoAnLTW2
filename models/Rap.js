
const db = require('../configs/config');
const CumRap = require('./CumRap');
//const Ghe = require('./Ghe.js');
// const Rap = db.define("Rap", {
//   TenRap: {
//     type: DataTypes.STRING,
//     allowNull: false

//   },
//   LoaiRap: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   DiaChi:{
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   KTNgang: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   KTDoc: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   }

// })
// Rap.belongsTo(CumRap)

// Rap.findByIdCumRap = async function(id){
//   return Rap.findAll({
//       include:[{
//           model:CumRap,
//          where:{id:id,},
//          //left:true,
//       }],
//   });
// }


//module.exports = Rap
// INSERT INTO "Raps"("TenRap","LoaiRap","DiaChi","KTNgang","KTDoc","CumRapId","createdAt","updatedAt")
// VALUES ('CGV Hùng Vương Plaza','Rạp một phòng chiếu','Tầng 7, Hùng Vương Plaza, 126 Hùng Vương, Q.5',21,11,1,NOW(),NOW()),
// ('CGV Aeon Tân Phú','Rạp một phòng chiếu','Lầu 3, Aeon Mall 30 Bờ Bao Tân Thắng, P. Sơn Kỳ, Q. Tân Phú',21,11,1,NOW(),NOW()),
// ('CGV Crescent Mall','Rạp một phòng chiếu','Lầu 5, Crescent Mall Đại lộ Nguyễn Văn Linh, Phú Mỹ Hưng, Q.7',21,11,1,NOW(),NOW()),
// ('CGV Vincom Thủ Đức','Rạp một phòng chiếu','Tầng 5, TTTM Vincom Thủ Đức, 216 Võ Văn Ngân, P. Bình Thọ, Q. Thủ Đức',21,11,1,NOW(),NOW()),
// ('CGV Vivo City','Rạp một phòng chiếu','Lầu 5, TTTM SC VivoCity, 1058 Nguyễn Văn Linh, Q.7',21,11,1,NOW(),NOW()),
// ('CGV Aeon Bình Tân','Rạp một phòng chiếu','Tầng 3, TTTM Aeon Mall Bình Tân, Số 1 đường số 17A, khu phố 11, P. Bình Trị Đông B, quận Bình Tân',21,11,1,NOW(),NOW()),
// ('CGV Vincom Bà Triệu','Rạp một phòng chiếu','Tầng 6, VinCom Center Hà Nội, 191 Bà Triệu, Q. Hai Bà Trưng',21,11,2,NOW(),NOW()),
// ('CGV Mipec Tower','Rạp một phòng chiếu','Tầng 5, MIPEC Tower, 229 Tây Sơn, Q. Đống Đa',21,11,2,NOW(),NOW()),
// ('CGV Hồ Gươm Plaza','Rạp một phòng chiếu','Tầng 3, TTTM Hồ Gươm Plaza, 110 Trần Phú, P. Mỗ Lao, Q. Hà Đông',21,11,2,NOW(),NOW()),
// ('CGV IPH Hà Nội','Rạp một phòng chiếu','Tầng 4, Indochina Plaza Hà Nội, 241 Xuân Thủy, Q. Cầu Giấy, Tp. Hà Nội',21,11,2,NOW(),NOW()),
// ('CGV Vĩnh Trung Plaza','Rạp một phòng chiếu','255-257 đường Hùng Vương, Q. Thanh Khê',21,11,6,NOW(),NOW()),
// ('CGV Vincom Đà Nẵng','Rạp một phòng chiếu','Tầng 4, TTTM Vincom Đà Nẵng, Ngô Quyền, P. An Hải Bắc, Q. Sơn Trà',21,11,6,NOW(),NOW()),
// ('CGV Coopmart Biên Hòa','Rạp một phòng chiếu','Tầng 3, Khu Siêu thị Co-op Mart 121 Phạm Văn Thuận, P. Tân Tiến',21,11,1,NOW(),NOW()),
// ('CGV BigC Đồng Nai','Rạp một phòng chiếu','Siêu thị BigC Đồng Nai, Khu phố 1, P. Long Bình Tân',21,11,1,NOW(),NOW()),
// ('CGV BigC Nha Trang','Rạp một phòng chiếu','Tầng Trệt, TTTM Big C Nha Trang, Lô số 4, đường 19/5, Khu đô thị Vĩnh Điềm Trung, Xã Vĩnh Hiệp',21,11,4,NOW(),NOW()),
// ('CGV Lam Sơn Square','Rạp một phòng chiếu','Tầng 4, Lam Sơn Square, 9 Lê Lợi',21,11,3,NOW(),NOW()),
// ('CGV Lapen Center Vũng Tàu','Rạp một phòng chiếu','Lapen Center 33A đường 30/4',21,11,3,NOW(),NOW())


//xóa tất cả bảng
//await sequelize.drop();