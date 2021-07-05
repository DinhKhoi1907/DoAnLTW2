const express = require('express');
const User = require('../../models/user/userModel.js');
const asyncHandler = require('express-async-handler');

//ma hoa mk2
var passwordHash = require('password-hash');

//const sendWellcome = require('../')
const router = express.Router();
const passport = require('passport')

// đảm bảo user đã loggin
router.post('/ensureLoggedIn',asyncHandler(async function(req,res){
    if(req.currentUser){
      res.send("1");
    }
    else{
      res.send("0");
    }
  }))

  //login
router.post('/',asyncHandler(async function(req,res){
    console.log(req.body);
    const {email,password} = req.body;
    //kiểm tra có phải admin không
    const checkAdmin = await User.checkAdmin(email);
    if(checkAdmin.rows[0] && passwordHash.verify(password,checkAdmin.rows[0].Password)){
       //luu id vao session
       req.session.userId = checkAdmin.rows[0].StaffISN;
      res.send("2");
    }
    else{
      //nếu không phải admin thì
      const found = await User.findUserByEmail(email);
      if(found.rows[0] && passwordHash.verify(password,found.rows[0].Password) ){
          //luu id vao session
          req.session.userId = found.rows[0].CustomerISN;
          //return 1
          res.send ("1");
      } else{
      //neu password va mat khau khong chinh xac return 0
       res.send("0");
      }

    }
   
}));

//đăng nhập bằng fb
router.get('/facebook', passport.authenticate('facebook',{scope:'email'}));

router.get('/facebook/callback',passport.authenticate('facebook', { successRedirect : '/user/checkAccountFbOrGg', failureRedirect: '/login' }));

;
 //đăng nhập bằng google
router.get('/google', passport.authenticate('google',{scope:'email'}));

router.get('/google/callback',passport.authenticate('google', { successRedirect : '/user/checkAccountFbOrGg', failureRedirect: '/login' }));

  router.get('/checkAccountFbOrGg',asyncHandler(async function(req,res){
    const found = await User.findUserByEmail(req.user.id);
    if(found.rows[0]){  
      req.session.userId = found.rows[0].CustomerISN;
      res.redirect('/');
    }else{
      if(req.user.displayName){
        const id = await User.NewUserFB(req.user.id,req.user.displayName);
        // lưu id vào session 
     
        req.session.userId = id.rows[0].fn_customer_insupd;
        res.redirect('/')
      }
      else{
        const id = await User.InsertUserGG(req.user.id,req.user.emails[0].value);
        // lưu id vào session 
        req.session.userId = id.rows[0].fn_customer_insupd;
        console.log();
        res.redirect('/');
      }
     ;
    }
}))

module.exports = router;