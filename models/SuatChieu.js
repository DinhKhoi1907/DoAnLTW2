

const SuatChieu = require('../configs/config');




SuatChieu.findCrByDateAndMovie = async function(date,idPhim) {
    return SuatChieu.query(`SELECT * FROM fn_getprovinceshasmovieshowedondate($1,$2)`,[date,idPhim]);
};

  SuatChieu.findRapByDateAndMovieCr = async function(date,CumRapId,idPhim) {
    return SuatChieu.query(`SELECT * FROM fn_showtimesofmovie_getbydateandprovince($1,$2,$3)`,[date,CumRapId,idPhim]);
  }

module.exports = SuatChieu;

// const SuatChieu = db.define('SuatChieu', {
//   ThoiDiemBatDau: {
//     type: DataTypes.TIME,
//     allowNull: true
//   },
//   ThoiDiemKetThuc: {
//     type: DataTypes.TIME,
//     allowNull: true
//   },
//   NgayChieu:{
//     type:DataTypes.DATE,
//     allowNull:true,
//   },
//   GiaVe: {
//     type: DataTypes.INTEGER,
//     allowNull: true
//   },
// });

// SuatChieu.belongsTo(Phim)
// SuatChieu.belongsTo(Rap)


// SuatChieu.findMoviePlaying = async function(){
//   return SuatChieu.findAll({
//    // distinct: 'Phim.id',
//     where:{
//       NgayChieu: { 
//         [Op.gte]: Sequelize.fn('NOW'), // lớn hơn hoặc bằng ngày hiện tại
//        // [Op.eq]: NOW  // bằng ngày hiện tại
//       },
//     },
//       include:[{
//         model:Phim,
//        // right: true
//       }],

//       group: ['Phim.id','Phim.Ten','Phim.Poster','Phim.ThoiLuong'],
//       attributes: ['Phim.id','Phim.Ten','Phim.Poster','Phim.ThoiLuong'],
//   })
// }

// SuatChieu.findRapByDateAndMovie = async function(date,idPhim){
// return  SuatChieu.findAll({
//   //   attributes: [
//   //     [Sequelize.fn('DISTINCT', Sequelize.col('SuatChieu.id')) ,'SuatChieu.id'],
//   // ],
//   //attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('Rap.CumRap.id')), 'Rap.CumRap.id'],],
//    where:{
//       NgayChieu: { 
//         [Op.eq]: date, // lớn hơn hoặc bằng ngày hiện tại
//        // [Op.eq]: NOW  // bằng ngày hiện tại
//       },
//     },
//       include:[
//         {
//         model:Phim,
//        // right: true
//        where:{
//           id:idPhim,
//               }
//       },
//       {
//         model:Rap,
//         include:[{
//           model:CumRap,
        
//         }],
        
       
//       },
     
//     ],
//    // group:['Rap.id','Rap.CumRapId','Rap.CumRap.id']
//     //group: ['Rap.CumRap.id'] ,
//      // group: ['Phim.id','Rap.CumRapId','Rap.id','Rap.CumRap.id','Rap.CumRap.DiaChi','Rap.CumRap.TenCum'],
//     // attributes: ['Rap.CumRap.id'],
//   });
  
//   //console.log((await query).toString)
// }

// SuatChieu.findById = async function(id){
//  return SuatChieu.findByPk(id);
// }
// module.exports = SuatChieu;

// INSERT INTO "SuatChieus"("ThoiDiemBatDau","ThoiDiemKetThuc","NgayChieu","GiaVe","PhimId","RapId","createdAt","updatedAt")
// VALUES ('08:00','09:40','2021/6/28',50000,1,1,NOW(),NOW()),
// ('10:00','11:40','2021/6/28',50000,2,1,NOW(),NOW()),
//  ('13:00','14:40','2021/6/28',50000,3,1,NOW(),NOW()),
//  ('15:00','16:40','2021/6/28',50000,4,1,NOW(),NOW()),
//  ('16:00','17:40','2021/6/28',50000,1,1,NOW(),NOW()),
//  ('18:00','19:40','2021/6/28',50000,2,1,NOW(),NOW()),
//  ('20:00','21:40','2021/6/28',50000,3,1,NOW(),NOW()),
//  ('10:00','11:40','2021/6/2',50000,2,1,NOW(),NOW())


// SELECT DIStinct sc."PhimId",p."Ten" FROM "SuatChieus" sc LEFT JOIN "Phims" p on(sc."PhimId" = p.id)
// group by sc."PhimId",sc.id,p."Ten"


//truy vấn ra rạp chứa ngàychiếu và idphim
// SELECT DIStinct sc."PhimId",sc."id",sc."NgayChieu",sc."RapId",r."TenRap",p."Ten"
// FROM "SuatChieus" sc 
// LEFT JOIN "Phims" p on(sc."PhimId" = p.id)
// JOIN "Raps" r on (sc."RapId"=r.id) Where sc."NgayChieu" = '2021-06-02'
// group by sc."PhimId",sc."id",sc."NgayChieu",sc."RapId",r."TenRap",p."Ten"
