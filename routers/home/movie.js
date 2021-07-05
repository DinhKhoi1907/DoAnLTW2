const express = require('express');

const asyncHandler = require('express-async-handler');

const provinceModel = require('../../models/user/provinceModel.js');

const movieModel = require('../../models/user/movieModel.js');
const router = express.Router();



//show ra danh sách movie
router.get('/',asyncHandler(async function(req,res){
   const province =   await provinceModel.findlistProvince(); 
   const listProvince = province.rows
     const title = 'LIST OF  MOVIES';
  const movie = await movieModel.findAllMovie();
  const listMovie = movie.rows
  console.log(listMovie)
    res.render('home/pages/movie',{layout:'./home/layouts/home',user: req.user ,listProvince:listProvince,listMovie:listMovie,title});

 
}));
 //chi tiết movie
 router.get('/detailMovie',asyncHandler(async function(req,res){
   const province =   await provinceModel.findlistProvince(); 
   const listProvince = province.rows

    const id = req.query.id;
    const movie = await movieModel.findRapById(id);
    const detailMovie = movie.rows

    //console.log(movie)
    const date = new Date();
    res.render('home/pages/detailMovie',{layout:'./home/layouts/home.ejs',user: req.user ,listProvince:listProvince,detailMovie: detailMovie,date})
 }))


 //show ra các movie đang chiếu
 router.get('/movieIsPlaying',asyncHandler(async function(req,res){
   const province =   await provinceModel.findlistProvince(); 
   const listProvince = province.rows
    
             const title = 'LIST OF PLAYING MOVIES';
             const movie = await movieModel.findmovieDangChieu();
             const listMovie = movie.rows;
            res.render('home/pages/movie',{layout:'./home/layouts/home.ejs',listMovie:listMovie,title,listProvince:listProvince,user: req.user});
 }));


  //show ra các movie sắp chiếu
  router.get('/movieCommingSoon',asyncHandler(async function(req,res){
   const province =   await provinceModel.findlistProvince(); 
   const listProvince = province.rows
  
             const title = 'List of upcoming movies';
            const movie = await movieModel.findmovieSapChieu();
            const listMovie = movie.rows;
         
            res.render('home/pages/movie',{layout:'./home/layouts/home.ejs',listMovie:listMovie,title,listProvince:listProvince,user: req.user});
 }));

 
module.exports = router;