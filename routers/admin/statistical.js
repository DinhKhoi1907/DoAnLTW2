const express = require("express");
;

/* Require Model */
const statisticalModel = require("../../models/admin/statisticalModel");
const router = express.Router();

router.post("/province",async function(req,res){
    const {dateTimeFrom,dateTimeTo,CinemaISN} = req.body;
    console.log(CinemaISN,dateTimeFrom,dateTimeTo);
    const statistical = await statisticalModel.getReportSalesByCinema(CinemaISN,dateTimeFrom,dateTimeTo);
    const statisticalTotal = await statisticalModel.getReportTotalSalesByCinema(CinemaISN,dateTimeFrom,dateTimeTo);
  
    //gộp 2 mảng lại để gửi qua ajax
     statistical.rows.push(statisticalTotal.rows[0])
    
        console.log(statistical.rows)
    res.send(statistical.rows);
});
router.post("/movie",async function(req,res){
    const {dateTimeFrom,dateTimeTo,MovieISN} = req.body;
    console.log(MovieISN,dateTimeFrom,dateTimeTo);
    const statistical = await statisticalModel.getReportSalesByMovie(MovieISN,dateTimeFrom,dateTimeTo);
    const statisticalTotal = await statisticalModel.getReportTotalSalesByMovie(MovieISN,dateTimeFrom,dateTimeTo);
   
    //gộp 2 mảng lại để gửi qua ajax
     statistical.rows.push(statisticalTotal.rows[0])

        console.log(statistical.rows)
    res.send(statistical.rows);
});
module.exports = router;