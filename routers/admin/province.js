const express = require("express");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

/* Require Model */

const provinceModel = require("../../models/admin/provinceModel");

const router = express.Router();

//từ mảng sang dạng chuỗi để gửi qua ajax
var json_encode = require('json_encode');
/* Province */
router.get("/", async function (req, res) {
    const allProvince = await provinceModel.getAllProvince();
    res.render("admin/pages/province", {layout:'./admin/layouts/admin', allProvince });
  });
  router.post("/addProvince",async function(req,res){
    const {ProvinceName} = req.body;
    // insert thì truyền vào số 0
    const check = await provinceModel.insUpd_Province(0,ProvinceName);
   
    res.send(`${check.rows[0].fn_province_insupd}`);
  });
  router.post("/deleteProvince",async function(req,res){
      const {ProvinceISN} = req.body
      const check = await provinceModel.deleteProvince(ProvinceISN);
      //console.log(check)
      res.send("1");
  });
  

  router.post("/getProvince",async function(req,res){
    const province = await provinceModel.getAllProvince();
    var listProvince =province.rows;
    
    //console.log(listProvince)
    res.send(listProvince);
  });




module.exports = router;