const desStatus = require("../../configs/config.js");

desStatus.getAllDesStatus =async function() {
    return await desStatus.query(`select * from "DesStatus"`);
  }

module.exports = desStatus;