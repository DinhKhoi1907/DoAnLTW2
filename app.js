const express = require('express');
const bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');

const userRouter = require('./routers/user.js');
const rapRouter = require('./routers/rap.js');
const phimRouter = require('./routers/phim.js');
const datchoRouter = require('./routers/datcho.js');
const asyncHandler = require('express-async-handler')
const User = require('./models/user.js');
const CumRap = require('./models/CumRap.js');
const Phim = require('./models/Phim.js');
var cookieSession = require('cookie-session');
//đăng nhập fb

const passport = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;
const config = require('./configs/facebook.js');
//đăng nhập google
const configg = require('./configs/google.js');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session  = require('express-session');
//truoc khi app chay , thi ta chay db truoc
const db = require('./configs/config');

const userMiddlewares = require('./middlewares/user');
const ensureLoggedMiddlewares = require('./middlewares/ensure_logged_in');
const app = express();

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
//use session
//session
app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY||'secret'],
    maxAge:24*60*60*100 // 24 hours
}))
//sudung middleware
app.use(userMiddlewares);
//su dung layout
app.use(expressLayouts);
//ban dau cho layout vao main
app.set('layout','./layouts/user');

//su dung ejs
app.set('view engine','ejs');
app.use(express.static('public'));

//su dung body parser de lay du lieu tu body
app.use(bodyParser.urlencoded({extended:true}));

// -----Passport session setup. 
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  
  // ----Sử dụng FacebookStrategy cùng Passport.
  passport.use(new FacebookStrategy({
      clientID: config.facebook_key,
      clientSecret:config.facebook_secret ,
      callbackURL: config.callback_url
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        console.log(accessToken, refreshToken, profile, done);
        return done(null, profile);
      });
    }
  ));
  passport.use(
    new GoogleStrategy(
      {
        clientID: configg.googleClientID,
        clientSecret: configg.googleClientSecret,
        callbackURL: '/user/google/callback'
      },
      function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          console.log(accessToken, refreshToken, profile, done);
          return done(null, profile);
        });
      }
    )
  );
app.use(session({ secret: 'keyboard cat', key: 'sid'}));  //Save user login

app.use(passport.initialize());
app.use(passport.session());


app.get('/',async function(req,res){
  const cumRap =   await CumRap.findListCumRap();
  const listCumRap = cumRap.rows
 //  console.log(cumRap);
 // tìm phim mới được công chiếu
 const pm = await Phim.findPhimMoiDuocCongChieu();
 const listphimmoi = pm.rows;
 // lấy phim được xem nhiều nhất 
 const top = 8;
 const pp = await Phim.findPhimDuocXemNhieu(top);
 const listPDXN = pp.rows
 console.log(listPDXN);
   res.render('home/home',{layout:'./layouts/home',user: req.user ,listCumRap:listCumRap,listphimmoi:listphimmoi,listPDXN:listPDXN});
});
 

app.use('/user',userRouter);
app.use('/rap',rapRouter);
app.use('/phim',phimRouter);
app.use('/datcho',datchoRouter);
app.use(async function(req,res){

  res.status(404).render("404.ejs",{layout:'./layouts/404'});
});
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
//khoi dong db

    //lam cho no hoat dong tren heroku,
    const port = process.env.PORT || 3000;
    console.log(`server is listening on port ${port}`);
    app.listen(port);


