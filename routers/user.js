const express = require('express');
const User = require('../models/user.js');
const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");
//random string 
var randomstring = require("randomstring");
//ma hoa mk2
var passwordHash = require('password-hash');
const { request } = require('express');
const httpMsgs = require("http-msgs");
const db = require('../configs/config');
//cum rap
const CumRap = require('../models/CumRap.js');
const Rap = require('../models/Rap.js');
const Ghe= require('../models/Ghe.js');
const Phim = require('../models/Phim.js');
const SuatChieu= require('../models/SuatChieu.js');
const DatCho= require('../models/DatCho.js');
const Ve= require('../models/Ve.js');

const router = express.Router();
//
const passport = require('passport')


//router.get('/a',CumRap.findListCumRap )

router.get('/',asyncHandler(async function(req,res){
    const cumRap =   await CumRap.findListCumRap(); 
   const listCumRap = cumRap.rows
    console.log(cumRap);
    res.render('user/home',{layout:'./layouts/user',user: req.user ,listCumRap:listCumRap});
    
}))
router.post('/register',asyncHandler (async function(req,res){
    
    //dinh nghi tai khoan gui mail xac nhan cho user dang ky
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {

          user: "william.lynguyen@gmail.com", 
          pass: "Deobiet_147", 
        },
      });

      
    const user={};
    const {email,password,repassword} = req.body;
    
    user.email = email;
    //ma hoa password
    user.password = passwordHash.generate(password);

    // kiem tra username da ton toi trong db chua
    
      const found = await User.findByEmail(email);


        if(!email||!password||!repassword){
       // httpMsgs.send200(req,res,"Vui long dien het thong tin");
        res.end("0");
       //return done(null, false, {message : 'Vui long dien het thong tin'});
           }
        else if(found){
          res.end("-2");
        }
        else if(password !== repassword){
          res.end("-3");
        }
      
        else{
            //neu chua co thi tao user 
            await  User.create(user);
            //tim User moi dang ky
            const found3 = await User.findByEmail(email);
            //gui mail xac nhan cho user 
            await transporter.sendMail({
                from: '"XuanLy 👻" <william.lynguyen@gmail.com>', // sender address
                to: `${found3.email}`, // list of receivers
                subject: "Xac nhan email ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Xac Nhan Email <a href="/"></a>!</b>", // html body
              });

              //luu id user vao session
            req.session.userId = found3.id;
              res.end("1");
        }
  

  //  res.redirect('/');
    
}));

  router.post('/login',asyncHandler(async function(req,res){
    console.log(req.body);
    const {email,password} = req.body;
    const found = await User.findByEmail(email);
    if(found && passwordHash.verify(password,found.password) ){
        //luu id vao session
        req.session.userId = found.id;
        //return 1
        res.end ("1");
    } else{
    //neu password va mat khau khong chinh xac return 0
     res.end("0");
    }
}));





router.post('/forgot',asyncHandler(async function(req,res){

          const {email} = req.body;
          const found = await User.findByEmail(email);
          if(found){
            //dat thong bao thay doi password
            found.resetPasswordToken = randomstring.generate(20);
            found.save();
          //dinh nghia tai khoan gui mail xac nhan cho user 
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              host: 'smtp.gmail.com',
              auth: {

                user: "william.lynguyen@gmail.com", 
                pass: "Deobiet_147", 
              },
            });


             await transporter.sendMail({
              from: '"XuanLy 👻" <william.lynguyen@gmail.com>', // sender address
            //  to: 'padkey123456@gmail.com', // list of receivers
              to: `${found.email}`, // list of receivers
              subject: "Xác nhận email ✔", // Subject line
              text:'Bạn nhận được thông báo này vì bạn (hoặc ai đó) đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn. \ N \ n' +
              'Vui lòng nhấp vào liên kết sau hoặc dán liên kết này vào trình duyệt của bạn để hoàn tất quá trình: \ n \ n' +
              'http: // localhost: 3000 / user / reset /' + found.resetPasswordToken + '\ n \ n' +
              'Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không thay đổi. \ N',
              html: "<b> Xac Nhan Email <a href="/"> </a>! </b>", // html body
            });
              res.end("1")
          }
          else{
            res.end("0")
          }
}));

router.get('/reset/:token',function(req,res,next){
  const token = req.params.token;
  const found = User.findByToken(token);
  if(found){
      res.render('user/reset_password',{layout:'./layouts/try'});
  }else{
    res.json("token khong ton tai");
  }
  next()
});

router.post('/reset/:token',asyncHandler(async function(req,res){
  const token = req.params.token;
  const found = await User.findByToken(token);
  if(found){
    const {password} = req.body;
    found.password = passwordHash.generate(password);
    found.resetPasswordToken = null;
    found.save();
    res.redirect('/');
  }else{
    res.redirect('/');
  }
}))

//đăng nhập bằng fb 
router.get('/facebook', passport.authenticate('facebook',{scope:'email'}));

router.get('/facebook/callback',passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
 //đăng nhập bằng google
router.get('/google', passport.authenticate('google',{scope:'email'}));

router.get('/google/callback',passport.authenticate('google', { successRedirect : '/', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
  
//cụm rạp
//router.get('user/CumRap/:id',asyncHandler())
//tìm các rạp có các cụm rạp 
router.get('/rap',asyncHandler(async function(req,res){
   const listCumRap = await CumRap.findAll(); 
     //  const id = req.params.id;
       //const listRap = await Rap.findByIdCumRap(id);
       res.render('home/rap',{layout:'./layouts/user',user: req.user ,listCumRap:listCumRap});
   
    
}));
//đặt chỗ
router.get('/datcho/:SuatChieuId',asyncHandler(async function(req,res){
  const listCumRap = await CumRap.findAll(); 
  // console.log(req.query.id);
  // const id = req.query.id;

    //khi select tới bảng khác thi mới dùng CumRap 
    const title = 'Đặt Chỗ';
    //console.log(listPhim);
  //lấy ra được rapid 
  const SuatChieuId = req.params.SuatChieuId;
   const  suatchieu = await SuatChieu.findById(SuatChieuId);
//select phim
const phim = await Phim.findByPk(suatchieu.PhimId)
   //select rạp để lấy 
   const rap = await Rap.findByPk(suatchieu.RapId) ;
   // lấy ra dãy gế và trạng thái gế
  const listGhe = await Ghe.findByRapId(suatchieu.RapId);

    //res.json(ghe[0].ViTriCot);
    res.render('user/datcho',{layout:'./layouts/user',rap,suatchieu,listGhe:listGhe,phim,title,user: req.user ,listCumRap:listCumRap});
}));

router.post('/datcho',asyncHandler(async function(req,res){
    const {IdSuatChieu,ViTriGhes,IdRap} = req.body;

    for(i=0;i<ViTriGhes.length;i++){
      const ghe = {};
       ghe.ViTriHang = ViTriGhes[i].slice(0,1);
       ghe.ViTriCot = ViTriGhes[i].slice(2,3);
      ghe.RapId = IdRap;
      await Ghe.create(ghe);
    }
      
    res.end();
}));
router.get('/logout',function(req,res){
     //delete req.currentUser.id;
    req.session=null;
     res.redirect('/');
 });
 
module.exports = router;
