const staff = require("../../configs/config.js");

//staff
staff.getAllStaff = async function() {
    return await staff.query(`select * from "Staff"`);
  }

  module.exports = staff;