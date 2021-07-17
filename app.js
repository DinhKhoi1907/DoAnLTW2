const express = require('express');
const bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
//user router
//const userRouter = require('./routers/user/user.js');
const bookingRouter = require('./routers/user/booking.js');
const momoRouter = require('./routers/user/payment/PayBymomo.js');
const PayPalRouter = require('./routers/user/payment/PayByPayPal.js');
const CounterRouter = require('./routers/user/payment/PayAtCounter.js');
const loginRouter = require('./routers/user/login.js');
const logoutRouter = require('./routers/user/logout.js');
const profileRouter = require('./routers/user/profile.js');
const registerRouter = require('./routers/user/register.js');
const forgotPassRouter = require('./routers/user/forgotPass.js');
//home router

const cinemaRouter = require('./routers/home/cinema.js');
const movieRouter = require('./routers/home/movie.js');
const homeRouter = require('./routers/home/index.js')
//admin router
const indexAdRouter = require("./routers/admin/index");
const cinemaAdRouter = require("./routers/admin/cinema");
const movieAdRouter = require("./routers/admin/movie");
const provinceAdRouter = require("./routers/admin/province");
const showtimeAdRouter = require("./routers/admin/showtime");
const staffAdRouter = require("./routers/admin/staff");
const roomAdRouter = require("./routers/admin/room");
const statisticalAdRouter = require("./routers/admin/statistical");



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
//app.set('layout','./layouts/user');

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



 
//user
//app.use('/user',userRouter);
app.use('/user/booking',bookingRouter);
app.use('/user/payment/PayBymomo',momoRouter);
app.use('/user/payment/PayByPayPal',PayPalRouter);
app.use('/user/payment/PayAtCounter',CounterRouter);
app.use('/user/login',loginRouter);
app.use('/user/logout',logoutRouter);
app.use('/user/profile',profileRouter);
app.use('/user/forgot',forgotPassRouter);
app.use('/user/register',registerRouter);

//home
app.use('/',homeRouter);
app.use('/home/cinema',cinemaRouter);
app.use('/home/movie',movieRouter);

//admin 
app.use("/admin", indexAdRouter);
app.use("/admin/cinema", cinemaAdRouter);
app.use("/admin/movie", movieAdRouter);
app.use("/admin/province", provinceAdRouter);
app.use("/admin/showtime", showtimeAdRouter);
app.use("/admin/staff", staffAdRouter);
app.use("/admin/room", roomAdRouter);
app.use("/admin/statistical", statisticalAdRouter);


app.use(async function(req,res){
  res.status(404).render("404.ejs",{layout:false});
});
//var path = require('path');
//app.use(express.static(path.join(__dirname, 'public')));
//khoi dong db

    //lam cho no hoat dong tren heroku,
    const port = process.env.PORT || 3000;
    console.log(`server is listening on port ${port}`);
    app.listen(port);


