const express = require('express');
const bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
const userRouter = require('./routers/user.js');
const asyncHandler = require('express-async-handler')
const User = require('./models/user.js');
var cookieSession = require('cookie-session');

//truoc khi app chay , thi ta chay db truoc
const db = require('./models/db.js');

const userMiddlewares = require('./middlewares/user');

const app = express();

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

app.get('/',function(req,res){
    res.render('user/home',{layout:'./layouts/home'});
});
 

app.use('/user',userRouter);


//khoi dong db
db.sync().then(function(){
    //lam cho no hoat dong tren heroku,
    const port = process.env.PORT || 3000;
    console.log(`server is listening on port ${port}`);
    app.listen(port);
}).catch(console.error)