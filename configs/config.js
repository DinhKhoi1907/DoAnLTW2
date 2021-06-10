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
  database: "CinemaDB4",
  password: "aloalo",
  port: "5432",
});