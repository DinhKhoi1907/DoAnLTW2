const express = require("express");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

/* Require Model */
const cinemaModel = require("../../models/admin/cinemaModel");
const provinceModel = require("../../models/admin/provinceModel");
const desStatusModel = require("../../models/admin/desStatusModel");
const staffModel = require("../../models/admin/staffModel");
const router = express.Router();


/* Cinema */
router.get("/", async function (req, res) {
    const allCinema = await cinemaModel.getAllCinema();
   // console.log(allCinema)
    //province
    const province = await provinceModel.getAllProvince();
    const listProvince = province.rows
     //staff
     const staff = await staffModel.getAllStaff();
     const listStaff = staff.rows
     //desStatus
     const desStatus = await desStatusModel.getAllDesStatus();
     const listDesStatus= desStatus.rows
    res.render("admin/pages/cinema", {layout:'./admin/layouts/admin', allCinema ,listProvince:listProvince,listStaff:listStaff,listDesStatus:listDesStatus});
  });

  router.post("/addCinema",async function(req,res){
    const{ CinemaName,CinemaAddress,CinemaStatus,ProvinceISN,UpdateBy} = req.body;
    //truyền vào số 0 để insert
    const check = await cinemaModel.insUpd_Cinema(0,CinemaName,CinemaAddress,Number(CinemaStatus),Number(ProvinceISN),Number(UpdateBy))
    res.send(`${check.rows[0].fn_cinema_insupd}`)
  })
  
  router.post("/deleteCinema",async function(req,res){
    const {CinemaISN}=req.body;
  
    //kiểm tra movie có xóa được không
    const check = await cinemaModel.deleteCinema(CinemaISN);
   
    res.send(`${check.rows[0].fn_cinema_del}`);
  })

router.post("/getCinema",async function(req,res){
  const cinema = await provinceModel.getAllCinema();
  var listCinema =cinema.rows;
  
  //console.log(listProvince)
  res.send(listCinema);
});


module.exports = router;