//const db = require('./config.js'); // lát để trong folder config tên file là default nha ok
const CumRap = require("../configs/config.js");

// cái chỗ này là em viết nó là 1 function rồi mà thay vì bên router router.get('/, function)
// const findListCumRap =  function (req, res) {
//     db.query("SELECT * FROM fn_GetAllProvinces()", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     console.log(results.rows)
//     //res.end(results.rows)
//     res.status(200).json(results.rows);
//   });
// };


//const findListCumRap = CumRap.query(new findListCumRap('SELECT * FROM fn_GetAllProvinces()'))
 CumRap.findListCumRap = async function() {
  return CumRap.query(`SELECT * FROM fn_GetAllProvinces()`);
}
 //findListCumRap = CumRap.query('SELECT * FROM fn_GetAllProvinces()')

// const { Client } = require('pg')
// const client = new Client()
// await client.connect()
// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message) // Hello world!
// await client.end()


module.exports =CumRap;





// const CumRap = db.define("CumRap", {
//   TenCum: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   DiaChi: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
  
// });
//module.exports = CumRap

// CumRap.findById = async function(id){
//   return CumRap.findByPk(id);
// }

// INSERT INTO "CumRaps"("TenCum","DiaChi","createdAt","updatedAt")
// VALUES ('Hồ Chí Minh','TP.HCM',NOW(),NOW()),
// ('Hà Nội','TP.HN',NOW(),NOW()),
// ('Bà Rịa – Vũng Tàu','Bà Rịa – Vũng Tàu',NOW(),NOW()),
// ('Khánh Hòa','Tp. Nha Trang',NOW(),NOW()),
// ('Đồng Nai','Tp. Biên Hoà',NOW(),NOW()),
// ('Đà Nẵng','Tp. Đà Nẵng',NOW(),NOW())
