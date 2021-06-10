const User = require('../models/user.js');
const asyncHandler = require('express-async-handler');
module.exports = asyncHandler(async function(req,res,next){
    //tim userId tren session
    const {userId} = req.session;
    //bien de luu thong tin user
    res.locals.currentUser = null;
    //kiem tra co user tren session khong
    if(userId){
        //neu co thi tim thong tin cua user trong db coi co dung khong
        const user = await User.findUserById(userId);
        //neu tim duoc thong tin user
        if(user){
            
            //luu vao req de su dung ben router
            req.currentUser = user.rows[0];
            console.log("aaaaaaa")
            console.log(user.rows[0]);
            //luu vao de su dung ben view
            res.locals.currentUser = user.rows[0];
        }
        next();
    }else{
        next();
  
    }   
});