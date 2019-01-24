var express = require('express');
var router = express.Router();
var User = require('../db/schema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
    //addToDB(req,res);
});

router.post('/register', function (req, res , next) {
    console.log('inside register server!');
    addToDB(req,res);
});

async function addToDB(req, res) {
    console.log(req);
    var user = new User({
      email:req.body.email,
        username:req.body.username,
        password:User.hashPassword(req.body.password),
        creation_dt:Date.now()
    });
    try {
      doc = await user.save();
      return res.status(201).json(doc);
    }
    catch(err) {
      return res.status(501).json(err);
    }
};

module.exports = router;
