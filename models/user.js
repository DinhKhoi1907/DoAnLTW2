const User = require('../configs/config');

User.findUserByEmail = async function(email){
    return User.query(`SELECT * FROM "Customer" WHERE "CustomerEmail" = $1`,[email])
}

User.findUserById = async function(id){
    return User.query(`SELECT * FROM "Customer" WHERE "CustomerISN" = $1`,[id]);
}
// User.InsertNewUserReturnId = async function(email,password,name,phone){
//     return User.query(`INSERT INTO "Customer"("CustomerEmail","Password","CustomerName","CustomerPhone") VALUES($1,$2,$3,$4) RETURNING "CustomerISN"`,[email,password,name,phone])
// }

User.InsertNewUserReturnId = async function(email,password,name,phone){
    return User.query(`SELECT fn_customer_insupd($1,$2,$3,$4,$5,$6,$7)`,[0,name,email,password,phone,'',''])
}

User.UpDateToken  = async function(idCustomer,token){
    return User.query(`UPDATE "Customer"
                        SET "Token" = $1
                        WHERE "CustomerISN" = $2 RETURNING "Token";`,[token,idCustomer])
}
User.findUserByToken = async function(token){
    return User.query(`SELECT * FROM "Customer" WHERE "Token"= $1;`,[token])
}
User.UpDatePasswordAndToken = async function(idCustomer,token,password){
    return User.query(`UPDATE "Customer"
                        SET "Token" = $1,"Password" = $2
                        WHERE "CustomerISN" = $3;`,[token,password,idCustomer])
}
//fn_customer_insupd
// return mdUser.query(`insert into ${tbl_users} (name, email) values ($1, $2) RETURNING id`, [
//     name,
//     email,
//   ]);
module.exports = User;
// // const User = db.define('User',{
// //     name:{
// //         type:DataTypes.STRING,
// //         allowNull:true,
// //     },
// //     email:{
// //         type:DataTypes.STRING,
// //         allowNULL:true,
// //     },
// //     phone:{
// //         type:DataTypes.STRING,
// //         allowNULL:true,
// //     },
// //     address:{
// //         type:DataTypes.STRING,
// //         allowNULL:true,
// //     },
// //     password:{
// //         type:DataTypes.STRING,
// //         allowNULL:false,
// //     },
// //     resetPasswordToken:{
// //         type:DataTypes.STRING,
// //         allowNull:true,
// //     },
// //     role:{
// //         type:DataTypes.STRING,
// //         allowNull:true,
// //     }
   

// // });



// // User.findByUsername = async function(username){
// //     return User.findOne({
// //         where:{
// //             username,
// //         }
// //     });
// // }
// // User.findByEmail = async function(email){
// //     return User.findOne({
// //         where:{
// //             email,
// //         }
// //     });
// // }
// // User.findByToken = async function(resetPasswordToken){
// //     //tim id bang ham findByPk
// //     return User.findOne({
// //         where:{
// //             resetPasswordToken,
// //         }
// //     });
// // }
// // User.findById = async function(id){
// //     //tim id bang ham findByPk
// //     return User.findByPk(id);
// // }

// //module.exports= User;

// // const User = [{
// //     id :1,
// //     name:"admin",
// //     username:"admin",
// //     password:'1',
// //     isAdmin:1
// // },{
// //     id:2,
// //     name:"Khach",
// //     username:"padkey",
// //     password:"1",
// //     isAdmin:0
// // }]