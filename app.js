require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');

const userRouter = require('./routers/user.js');
const rapRouter = require('./routers/rap.js');
const phimRouter = require('./routers/phim.js');

const asyncHandler = require('express-async-handler')
const User = require('./models/user.js');
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
const db = require('./models/db.js');

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
app.set('layout','./layouts/user');

//su dung ejs
app.set('view engine','ejs');
app.use(express.static('public'));

//su dung body parser de lay du lieu tu body
app.use(bodyParser.urlencoded());

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








app.get('/',function(req,res){
    //res.render('user/home',{layout:'./layouts/home'});
    res.redirect('/user');
});
 

app.use('/user',userRouter);
app.use('/rap',rapRouter);
app.use('/phim',phimRouter);


var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
//khoi dong db
db.sync().then(function(){
    //lam cho no hoat dong tren heroku,
    const port = process.env.PORT || 3000;
    console.log(`server is listening on port ${port}`);
    app.listen(port);
}).catch(console.error)

