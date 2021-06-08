const db = require('../configs/config');





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