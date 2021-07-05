const province = require("../../configs/config.js");

/* Cum rap */
province.getAllProvince =async function() {
    return  province.query(`select * from "Province"`);
  }
  province.insUpd_Province = async function(ProvinceISN,ProvinceName){
    return  province.query(`SELECT fn_province_insupd($1,$2)`,[ProvinceISN,ProvinceName]);
  }
  province.deleteProvince = async function(ProvinceISN){
    return province.query(`DELETE FROM "Province" WHERE "ProvinceISN" = $1`,[ProvinceISN])
  }

  module.exports = province;