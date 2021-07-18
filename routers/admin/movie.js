const express = require("express");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

/* Require Model */
const movieModel = require("../../models/admin/movieModel");
const desStatusModel = require("../../models/admin/desStatusModel");
const staffModel = require("../../models/admin/staffModel");
const asyncHandler = require('express-async-handler')
const fs = require('fs-extra') // this is no longer necessary
const router = express.Router();
// tải file lên và lưu vào chỗ mình muốn
var multer = require('multer');


//const formidable = require('formidable');
//const util = require('util')
var storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"public/images/uploads/");
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+'.jpg');
  }
})
const upload = multer({storage:storage});
//const upload = multer({dest:__dirname + '/public/images/uploads/'})

/* Movie */
router.get("/", async function (req, res) {
    const allMovie = await movieModel.getAllMovie();
    //staff
    const staff = await staffModel.getAllStaff();
    const listStaff = staff.rows
  
    //desStatus
    const desStatus = await desStatusModel.getAllDesStatus();
    const listDesStatus= desStatus.rows
  
    res.render("admin/pages/movie", { layout:'./admin/layouts/admin',allMovie, moment: moment,listStaff:listStaff,listDesStatus:listDesStatus });
  });
  router.post("/addMovie",upload.single('poster'),asyncHandler(async function(req,res,next){
  const [movieName,plot,kindOfMovie,director,premiere,movieTime,country,movieStatus,trailer,updatedBy]  = req.body.data;
  console.log(movieName,plot,kindOfMovie,director,premiere,movieTime,country,movieStatus,trailer,updatedBy);
 // console.log(req.body.data)
    
    
      const file = req.file;
      var src = file.path
      //tên file hình
      var imgPosterName = src.split('\\').slice(3).join();  // tách chuỗi ở dấu \\ xong lấy phần tử thứ 3 , rồi join lại để về lại chuỗi

      //truyền vào số 0 để insert
      var check = await movieModel.insUpd_Movie(0,movieName,plot,kindOfMovie,director,premiere,movieTime,country,imgPosterName,movieStatus,trailer,updatedBy)
      //lấy mã phim 
     
      var movieISN = check.rows[0].fn_movie_insupd
      // =-2 là movie đã tồn tại ,nếu tên movie đã tồn tại thì gửi thông báo cho người dúng
      if(movieISN == -2){
        console.log("this name movie already exists")
        res.send("-2");
      }
      console.log(movieISN)
      var dest= "public/images/uploads/" + movieISN +"/";
    /// kiểm tra folder có tồn tại không, không thì tạo, có thì thôi
      fs.ensureDir(dest)
          .then(() => {
            console.log(' create folder success!')
          })
          .catch(err => {
            console.log("thư mục nay đã tồn tại ")
          })

  // di chuyển file đến chỗ mình muốn , truyền vào đường dẫn đến file , và đường dẫn đến folder + tên file
             fs.rename(src, dest + imgPosterName); 
    
     
       res.send("1");
  }))
  router.post("/deleteMovie",async function(req,res){
    const {MovieISN}=req.body;
    
    //kiểm tra movie có xóa được không
    const check = await movieModel.deleteMovie(MovieISN);
   
    res.send(`${check.rows[0].fn_movie_del}`);
  })
  router.post("/updateMovie",upload.single('moviePoster'),async function(req,res){
    const {movieISN}=req.body;
   
     const file = req.file;
      var src = file.path
      //tên file hình
      var imgPosterName = src.split('\\').slice(3).join();  // tách chuỗi ở dấu \\ xong lấy phần tử thứ 3 , rồi join lại để về lại chuỗi

     
      //update
      await movieModel.updateMovie(movieISN,imgPosterName);
   
 
    
      var dest= "public/images/uploads/" + movieISN +"/";
    /// kiểm tra folder có tồn tại không, không thì tạo, có thì thôi
      fs.ensureDir(dest)
          .then(() => {
            console.log(' create folder success!')
          })
          .catch(err => {
            console.log("thư mục nay đã tồn tại ")
          })

  // di chuyển file đến chỗ mình muốn , truyền vào đường dẫn đến file , và đường dẫn đến folder + tên file
             fs.rename(src, dest + imgPosterName); 
   
  })
 router.post("/getMovie",async function(req,res){
   const movie = await movieModel.getAllMovie();
   // console.log(movie.rows)
   res.send(movie.rows);
 })
 
module.exports = router;