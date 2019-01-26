var express = require('express');
var router = express.Router();
var User = require('../db/schema');
var passport = require('passport')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
    //addToDB(req,res);
});

router.post('/register', function (req, res , next) {
    console.log('inside register server!');
    addToDB(req,res);
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function(err) {
            if (err) { return res.status(501).json(err); }
            return res.status(200).json({message:'login success'});
        });
    })(req, res, next);
});

router.get('/home',isValidUser, function (req, res, next) {
    return res.status(200).json(req.user);
});

router.get('/logout',isValidUser, function (req, res, next) {
    req.logout();
    return res.status(200).json(req.user);
});

function isValidUser(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).json({message:'Unauthorized request'});
    }
}

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
