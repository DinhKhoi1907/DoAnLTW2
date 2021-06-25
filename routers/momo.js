//const uuidv1 = require('uuidv1');
const { v1: uuidv1 } = require('uuid');
const https = require('https');
const asyncHandler = require('express-async-handler');
const CumRap = require('../models/CumRap.js');
const User = require('../models/user.js');
//parameters send to MoMo get get payUrl
var endpoint = "https://test-payment.momo.vn/gw_payment/transactionProcessor";
var hostname = "https://test-payment.momo.vn";
var path = "/gw_payment/transactionProcessor";
var partnerCode = "MOMOC27G20200806";
var accessKey = "lm2Vlmt6Nek0Ugqz";
var serectkey = "7WuFHv01aOMAiYwWW5zf6WQA84auopeN";
var returnUrl = "http://localhost:3000/momo/return";
var notifyurl = "http://localhost:3000/notify";

var orderId = uuidv1();
var requestId = uuidv1();
var requestType = "captureMoMoWallet";
var extraData = "merchantName=Nguyễn Xuân Lý ;merchantId=" //pass empty value if your merchant does not have stores else merchantName=[storeName]; merchantId=[storeId] to identify a transaction map with a physical store
const express = require('express');
const router = express.Router();

router.post('/',function(req,res){
  const {IdSuatChieu,seatList,TongTien,NgayChieu,GioChieu,TenRap,TenPhim} = req.body;
   req.session.IdSuatChieu = IdSuatChieu;
   req.session.seatList= seatList;
  req.session.TongTien = TongTien;

  console.log(IdSuatChieu,seatList,TongTien,NgayChieu,GioChieu,TenRap,TenPhim);

  var amount = `${TongTien}`;
  var orderInfo = `Pay By Momo`;

  //var movieName=TenPhim;
//  var NgayChieu="29/9/200";
 
//before sign HMAC SHA256 with format
//partnerCode=$partnerCode&accessKey=$accessKey&requestId=$requestId&amount=$amount&orderId=$oderId&orderInfo=$orderInfo&returnUrl=$returnUrl&notifyUrl=$notifyUrl&extraData=$extraData
var rawSignature = 
"partnerCode="+partnerCode+
"&accessKey="+accessKey+
"&requestId="+requestId+
"&amount="+amount+
"&orderId="+orderId+
"&orderInfo="+orderInfo+
"&returnUrl="+returnUrl+
"&notifyUrl="+notifyurl+
"&extraData="+extraData;//puts raw signature

console.log("--------------------RAW SIGNATURE----------------")
console.log(rawSignature)
//signature
const crypto = require('crypto');
var signature = crypto.createHmac('sha256', serectkey)
                   .update(rawSignature)
                   .digest('hex');

console.log("--------------------SIGNATURE----------------")
console.log(signature)

//json object send to MoMo endpoint
var body = JSON.stringify({
    partnerCode : partnerCode,
    accessKey : accessKey,
    requestId : requestId,
    amount : amount,
    orderId : orderId,
    orderInfo : orderInfo,
    returnUrl : returnUrl,
    notifyUrl : notifyurl,
    extraData : extraData,
    requestType : requestType,
    signature : signature,
})

var options = {
  hostname:'test-payment.momo.vn',
  port: 443,
  path: '/gw_payment/transactionProcessor',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
 }
};

//Send the request and get the response
console.log("Sending....")
var request = https.request(options, (response) => {
  console.log(`Status: ${response.statusCode}`);
  console.log(`Headers: ${JSON.stringify(response.headers)}`);
  response.setEncoding('utf8');
  response.on('data', (body) => {
    console.log('Body');
    console.log(body);
    console.log('payURL');
    console.log(JSON.parse(body).payUrl);
    //chuyển sang momo để thanh toán
    res.send(JSON.parse(body).payUrl);
  });
  
  response.on('end', () => {
    console.log('No more data in response.');
  });
});

request.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
request.write(body);
request.end();



})
router.get('/return',asyncHandler(async function(req,res){
  const cumRap =   await CumRap.findListCumRap(); 
  const listCumRap = cumRap.rows
  const booking = await User.findBookingHistoryByIdUser(req.currentUser.CustomerISN ? req.currentUser.CustomerISN : req.user);
  const listBooking = booking.rows;
  console.log("Thanh toán thành công");      
  console.log(req.query.partnerCode); 
    res.render('user/booking_history',{layout:'./layouts/home',listCumRap:listCumRap,listBooking:listBooking});
}));
module.exports = router;