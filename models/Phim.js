
const Phim = require('../configs/config');



//const findListCumRap = CumRap.query(new findListCumRap('SELECT * FROM fn_GetAllProvinces()'))
Phim.findPhimSapChieu = async function() {
    return Phim.query(`SELECT * FROM fn_movie_commingsoon()`);
  }
  Phim.findPhimDangChieu = async function() {
    return Phim.query(`SELECT * FROM fn_movie_nowshowing()`);
  }  

  Phim.findById = async function(id) {
    return Phim.query(`SELECT * FROM "Movie" WHERE "MovieISN" = $1`,[id]);
  }  
   //findListCumRap = CumRap.query('SELECT * FROM fn_GetAllProvinces()')
  
  // const { Client } = require('pg')
  // const client = new Client()
  // await client.connect()
  // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
  // console.log(res.rows[0].message) // Hello world!
  // await client.end()
  
  
  module.exports =Phim;
// const Phim = db.define('Phim', {
//   Ten: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   NgayCongChieu: {
//     type: DataTypes.DATE,
//     allowNull: false
//   },
//   Poster: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   TraiLers: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
  
//   ThoiLuong: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   DaoDien: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   DienVien: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   TheLoai: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },

// });

// Phim.findById = async function(id){
//   return Phim.findByPk(id);
// }
// Phim.findPhimSapChieu = async function(){
//   return Phim.findAll({
//     where:{
//       NgayCongChieu:{
//         [Op.gte]: Sequelize.fn('NOW'), //// lớn hơn hoặc bằng ngày hiện tại
//       }
//     }
//   })
// }
//module.exports = Phim

// INSERT INTO "Phims"("Ten","NgayCongChieu","Poster","ThoiLuong","TraiLers","createdAt","updatedAt")
// VALUES ('Iron man 1','2012/10/5','images/uploads/iron-man-1.jpg',150,'https://www.youtube.com/watch?v=8ugaeA-nMTc&ab_channel=SonyPicturesEntertainmentSonyPicturesEntertainment%C4%90%C3%A3x%C3%A1cminh',NOW(),NOW()),
// ('Iron man 2','2015/6/23','images/uploads/iron-man-2.jpg',161,'https://www.youtube.com/watch?v=wKtcmiifycU&ab_channel=MovieclipsClassicTrailersMovieclipsClassicTrailers%C4%90%C3%A3x%C3%A1cminh',NOW(),NOW()),
// ('Iron man 3','2017/4/12','images/uploads/iron-man-3.jpg',150,'https://www.youtube.com/watch?v=Ke1Y3P9D0Bc&ab_channel=MarvelUKMarvelUK',NOW(),NOW()),
//   ('Iron man 4','2022/10/28','images/uploads/iron-man-4.jpg',182,'https://www.youtube.com/watch?v=My9guChk6WU&ab_channel=PrismTrailersPrismTrailers',NOW(),NOW()),
// ('VeNom 1','2018/10/5','images/uploads/venom-1.jpg',170,'https://www.youtube.com/watch?v=u9Mv98Gr5pY&ab_channel=SonyPicturesEntertainment',NOW(),NOW()),
// ('VeNom 2','201/11/09','images/uploads/venom-2.jpg',150,'https://www.youtube.com/watch?v=rrwBnlYOp4g&ab_channel=SonyPicturesEntertainmentSonyPicturesEntertainment%C4%90%C3%A3x%C3%A1cminh',NOW(),NOW()),
// ('Sprider man far from hone ','2019/6/23','images/uploads/spider-man-far-from-home.jpg',150,'https://www.youtube.com/watch?v=Nt9L1jCKGnE&ab_channel=SonyPicturesEntertainmentSonyPicturesEntertainment%C4%90%C3%A3x%C3%A1cminh',NOW(),NOW())
//DELETE FROM "Phims"
