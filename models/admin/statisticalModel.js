const statistical = require("../../configs/config.js");

//staff
statistical.getReportSalesByMovie = async function(ProvinceISN,dateTimeFrom,dateTimeTo) {
    return await statistical.query(`SELECT * FROM fn_reportsalesbymoviefromdatetodate($1,$2,$3)`,[ProvinceISN,dateTimeFrom,dateTimeTo]);
  }
  statistical.getReportTotalSalesByMovie = async function(ProvinceISN,dateTimeFrom,dateTimeTo) {
    return await statistical.query(`SELECT * FROM fn_reporttotalsalesbymoviefromdatetodate($1,$2,$3)`,[ProvinceISN,dateTimeFrom,dateTimeTo]);
  }
 
  
  statistical.getReportSalesByCinema = async function(ProvinceISN,dateTimeFrom,dateTimeTo) {
    return await statistical.query(`SELECT * FROM fn_reportsalesbycinemafromdatetodate($1,$2,$3)`,[ProvinceISN,dateTimeFrom,dateTimeTo]);
  }
  statistical.getReportTotalSalesByCinema = async function(ProvinceISN,dateTimeFrom,dateTimeTo) {
    return await statistical.query(`SELECT * FROM fn_reporttotalsalesbycinemafromdatetodate($1,$2,$3)`,[ProvinceISN,dateTimeFrom,dateTimeTo]);
  }
  module.exports = statistical;


