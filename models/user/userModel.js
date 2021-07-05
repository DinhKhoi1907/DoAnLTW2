const user = require('../../configs/config');

user.findUserByEmail = async function(email){
    return user.query(`SELECT * FROM "Customer" WHERE "CustomerEmail" = $1`,[email])
}

user.findUserById = async function(id){
    return user.query(`SELECT * FROM "Customer" WHERE "CustomerISN" = $1`,[id]);
}
// User.InsertNewUserReturnId = async function(email,password,name,phone){
//     return User.query(`INSERT INTO "Customer"("CustomerEmail","Password","CustomerName","CustomerPhone") VALUES($1,$2,$3,$4) RETURNING "CustomerISN"`,[email,password,name,phone])
// }

user.InsertNewUserReturnId = async function(email,password,name,phone){
    return user.query(`SELECT fn_customer_insupd($1,$2,$3,$4,$5,$6,$7)`,[0,name,email,password,phone,'',''])
}

//fb and gg  thêm id vào cột email
user.NewUserFB = async function(email,name){
   // console.log(id,name);
    //return User.query(`INSERT INTO "Customer"("CustomerEmail","CustomerName") VALUES($1,$2) RETURNING "CustomerISN"`,[id,name])
    return user.query(`SELECT fn_customer_insupd($1,$2,$3,$4,$5,$6,$7)`,[0,name,email,' ',' ',' ',' '])
}

user.InsertUserGG = async function(id,name){
   // return User.query(`INSERT INTO "Customer"("CustomerEmail") VALUES($1) RETURNING "CustomerISN"`,[id])
    return user.query(`SELECT fn_customer_insupd($1,$2,$3,$4,$5,$6,$7)`,[0,name,id,'','','',''])
}



user.UpDateToken  = async function(idCustomer,token){
    return user.query(`UPDATE "Customer"
                        SET "Token" = $1
                        WHERE "CustomerISN" = $2 RETURNING "Token";`,[token,idCustomer])
}
user.findUserByToken = async function(token){
    return user.query(`SELECT * FROM "Customer" WHERE "Token"= $1;`,[token])
}
user.UpDatePasswordAndToken = async function(idCustomer,token,password){
    return user.query(`UPDATE "Customer"
                        SET "Token" = $1,"Password" = $2
                        WHERE "CustomerISN" = $3;`,[token,password,idCustomer])
}
user.UpdateName = async function(idCustomer,name){
     user.query(`UPDATE "Customer"
                        SET "CustomerName" = $1
                        WHERE "CustomerISN" = $2`,[name,idCustomer])
}
user.UpdateAddress = async function(idCustomer,address){
    return user.query(`UPDATE "Customer"
                        SET "CustomerAddress" = $1
                        WHERE "CustomerISN" = $2`,[address,idCustomer])
}
user.UpdatePassword = async function(idCustomer,password){
    return user.query(`UPDATE "Customer"
    SET "Password" = $1
    WHERE "CustomerISN" = $2`,[password,idCustomer])
}
user.UpdatePhone = async function(idCustomer,phone){
    return user.query(`UPDATE "Customer"
    SET "CustomerPhone" = $1
    WHERE "CustomerISN" = $2`,[phone,idCustomer])
}


user.findBookingHistoryByIdUser = async function(idCustomer){
    return user.query(`SELECT * FROM "Customer" c 
                        JOIN "Booking" b on(c."CustomerISN"=b."CustomerISN")
                        JOIN "ShowTime" st on(st."ShowTimeISN"= b."ShowTimeISN")
                        JOIN "Movie" m on (m."MovieISN"=st."MovieISN")
                        JOIN "Room" r on (r."RoomISN" = st."RoomISN")
                        JOIN "Cinema" cnm on (cnm."CinemaISN" = r."CinemaISN")
                        WHERE c."CustomerISN" = $1 ORDER BY b."BookingISN" DESC `,[idCustomer])
}

user.checkAdmin = async function(email){
    return user.query(`SELECT * FROM "Staff" WHERE "StaffEmail"= $1;`,[email])
}

module.exports = user;

// User.findBookingHistoryByIdUser = async function(idCustomer){
//     return User.query(`SELECT fn_historiesbooking ($1)`,[idCustomer])
// }
/* <div class="movie-item-style-2 userrate">
<img src="/<%-list.Poster%>" alt="">
<div class="mv-item-infor"> 
    <%var position = list.fn_historiesbooking.indexOf('"');
     var temp = list.fn_historiesbooking.slice(position+1);
     
      
      position = temp.indexOf('"');
      result = temp.slice(0,position-1);
      var temp = temp.slice(position+3);
    %>
    <p><a href="#" style="font-size: 17px;">Movie name : <%- result %> </a></p>
    <div> 
        <% position = temp.indexOf('"');result = temp.slice(0,position-1); temp = temp.slice(position+3); %>

        <p  class="booking-history"style="font-size: 15px;">Cinema: <b><%-result %></b> </p>

        <%  position = temp.indexOf('"'); result = temp.slice(0,position); var temp = temp.slice(position+3); %>
        
        <p  class="booking-history">Cinema Address : <b><%-result %></b> </p>
        <%  position = temp.indexOf('"'); result = temp.slice(0,position); var temp = temp.slice(position+3); %>
        <p class="booking-history">Your seat : <b><%-result%></b> </p>
        <%  position = temp.indexOf('"'); result = temp.slice(0,position); var temp = temp.slice(position+3); %>
        <p class="booking-history">Date Start : <b><%-result%></b>  </p>
        <%  position = temp.indexOf(','); result = temp.slice(0,position); var temp = temp.slice(position+1); %>
        <p class="booking-history">Time Start : <b> <%-result%></b> </p>
        <%  position = temp.indexOf('"'); result = temp.slice(0,position); var temp = temp.slice(position+3); %>
        <p  class="booking-history">Total Money : <b><%-result%> VNĐ</b> </p>
    </div>
</div>
</div> */


//fn_customer_insupd 
// return mdUser.query(`insert into ${tbl_users} (name, email) values ($1, $2) RETURNING id`, [
//     name,
//     email,
//   ]);

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