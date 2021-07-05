const express = require('express');

const router = express.Router();


router.get('/',function(req,res){
    //delete req.currentUser.id;
   req.session=null;
    res.redirect('/');
});

module.exports = router;