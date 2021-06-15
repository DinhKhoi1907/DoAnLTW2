// const { Sequelize } = require('sequelize');
// module.exports = new Sequelize(process.env.DATABASE_URL||'postgres://postgres:aloalo@localhost:5432/CinemaDB',{
//     dialect:'postgres',
//     // dialectOptions: {
//     //     ssl:{
//     //         rejectUnauthorized: false,
//     //     }
//     // }
// });

const Pool = require("pg").Pool;
module.exports = new Pool({
  user: "postgres",
  host: "localhost",
<<<<<<< HEAD
  database: "CinemaDB",
  password: "123456",
=======
  database: "CinemaDB4",
  password: "aloalo",
>>>>>>> 8c9face9b6685984d895adb217d69734e30feb76
  port: "5432",
});