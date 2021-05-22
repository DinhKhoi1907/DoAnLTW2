const express = require('express');
const bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');

const app = express();


//su dung layout
app.use(expressLayouts);
//ban dau cho layout vao main
app.use('layout','./layouts/main');

//su dung ejs
app.set('view engine','ejs');
app.use(express.static('public'));

//su dung body parser de lay du lieu tu body
app.use(bodyParser.urlencoded());

app.get('/',function(req,res){
    res.render('index',{layout:"./layouts/home"});
});
sua file
