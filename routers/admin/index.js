const express = require("express");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

/* Require Model */

const router = express.Router();

router.get("/", function (req, res) {
    res.render("admin/pages/index",{layout:'./admin/layouts/admin'});
  });

  router.get("/logout", function (req, res) {
    req.session=null;
    //ra home
     res.redirect('/../../');
  });

 module.exports = router; 