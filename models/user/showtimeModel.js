const showtime = require('../../configs/config');




showtime.findCrByDateAndMovie = async function(date,idmovie) {
    return showtime.query(`SELECT * FROM fn_getprovinceshasmovieshowedondate($1,$2)`,[date,idmovie]);
};

  showtime.findRapByDateAndMovieCr = async function(date,provinceId,idmovie) {
    return showtime.query(`SELECT * FROM fn_showtimesofmovie_getbydateandprovince($1,$2,$3)`,[date,provinceId,idmovie]);
  }
  showtime.findById = async function(showtimeISN) {
    return showtime.query(`SELECT * FROM "ShowTime" WHERE "ShowTimeISN" = $1`,[showtimeISN]);
  }
module.exports = showtime;

// const showtime = db.define('showtime', {
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

// showtime.belongsTo(movie)
// showtime.belongsTo(Rap)


// showtime.findMoviePlaying = async function(){
//   return showtime.findAll({
//    // distinct: 'movie.id',
//     where:{
//       NgayChieu: { 
//         [Op.gte]: Sequelize.fn('NOW'), // lớn hơn hoặc bằng ngày hiện tại
//        // [Op.eq]: NOW  // bằng ngày hiện tại
//       },
//     },
//       include:[{
//         model:movie,
//        // right: true
//       }],

//       group: ['movie.id','movie.Ten','movie.Poster','movie.ThoiLuong'],
//       attributes: ['movie.id','movie.Ten','movie.Poster','movie.ThoiLuong'],
//   })
// }

// showtime.findRapByDateAndMovie = async function(date,idmovie){
// return  showtime.findAll({
//   //   attributes: [
//   //     [Sequelize.fn('DISTINCT', Sequelize.col('showtime.id')) ,'showtime.id'],
//   // ],
//   //attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('Rap.province.id')), 'Rap.province.id'],],
//    where:{
//       NgayChieu: { 
//         [Op.eq]: date, // lớn hơn hoặc bằng ngày hiện tại
//        // [Op.eq]: NOW  // bằng ngày hiện tại
//       },
//     },
//       include:[
//         {
//         model:movie,
//        // right: true
//        where:{
//           id:idmovie,
//               }
//       },
//       {
//         model:Rap,
//         include:[{
//           model:province,
        
//         }],
        
       
//       },
     
//     ],
//    // group:['Rap.id','Rap.provinceId','Rap.province.id']
//     //group: ['Rap.province.id'] ,
//      // group: ['movie.id','Rap.provinceId','Rap.id','Rap.province.id','Rap.province.DiaChi','Rap.province.TenCum'],
//     // attributes: ['Rap.province.id'],
//   });
  
//   //console.log((await query).toString)
// }

// showtime.findById = async function(id){
//  return showtime.findByPk(id);
// }
// module.exports = showtime;

// INSERT INTO "showtimes"("ThoiDiemBatDau","ThoiDiemKetThuc","NgayChieu","GiaVe","movieId","RapId","createdAt","updatedAt")
// VALUES ('08:00','09:40','2021/6/28',50000,1,1,NOW(),NOW()),
// ('10:00','11:40','2021/6/28',50000,2,1,NOW(),NOW()),
//  ('13:00','14:40','2021/6/28',50000,3,1,NOW(),NOW()),
//  ('15:00','16:40','2021/6/28',50000,4,1,NOW(),NOW()),
//  ('16:00','17:40','2021/6/28',50000,1,1,NOW(),NOW()),
//  ('18:00','19:40','2021/6/28',50000,2,1,NOW(),NOW()),
//  ('20:00','21:40','2021/6/28',50000,3,1,NOW(),NOW()),
//  ('10:00','11:40','2021/6/2',50000,2,1,NOW(),NOW())


// SELECT DIStinct sc."movieId",p."Ten" FROM "showtimes" sc LEFT JOIN "movies" p on(sc."movieId" = p.id)
// group by sc."movieId",sc.id,p."Ten"


//truy vấn ra rạp chứa ngàychiếu và idmovie
// SELECT DIStinct sc."movieId",sc."id",sc."NgayChieu",sc."RapId",r."TenRap",p."Ten"
// FROM "showtimes" sc 
// LEFT JOIN "movies" p on(sc."movieId" = p.id)
// JOIN "Raps" r on (sc."RapId"=r.id) Where sc."NgayChieu" = '2021-06-02'
// group by sc."movieId",sc."id",sc."NgayChieu",sc."RapId",r."TenRap",p."Ten"
