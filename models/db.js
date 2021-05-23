const { Sequelize } = require('sequelize');
module.exports = new Sequelize(process.env.DATABASE_URL||'postgres://postgres:aloalo@localhost:5432/phim',{
    dialect:'postgres',
    // dialectOptions: {
    //     ssl:{
    //         rejectUnauthorized: false,
    //     }
    // }
});