"use strict";

let express = require('express');
let router = express.Router();
require('../formatDate');
let User = require('./../models/user');


router.get('/checkLogin', function(req, res, next) {
    if (req.cookies.userId) {
        res.json({
            status: '0',
            result: req.cookies.userName
        })
    } else {
        res.json({
            status: '1',
        })
    }
});
 
router.post('/login', function(req, res, next) {
    var userName = req.body.userName,
        userPwd = req.body.userPwd;
    var userInfo = User.findOne({ 'userName': userName });
    userInfo.exec(function(err, doc) {
        if (doc !== null) {
            if (doc.userPwd === userPwd) {
                res.cookie("userId", doc.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                res.cookie("userName", doc.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                res.json({
                    status: '0',
                    result: {
                        userName: doc.userName
                    }
                });
            } else {
                res.json({
                    status: '1'
                });
            }
        } else {
            res.json({
                status: '2'
            });
        }
    });
});

router.post('/logout', function(req, res, next) {
    res.cookie('userId', '', { path: '/', maxAge: -1 });
    res.json({
        status: '0',
        result: '点击登录'
    });
});
router.post('/signup', function(req, res, next) {
    var userName = req.body.userName,
        userEmail = req.body.userEmail,
        userPwd = req.body.userPwd;
    var r1 = Math.floor(Math.random() * 100);
    var r2 = Math.floor(Math.random() * 100);
    var UserId = `${r1}${r2}`;
    var newUser = new User({
        'userId': UserId,
        'userName': userName,
        'userEmail': userEmail,
        'userPwd': userPwd,
        'orderList': [],
        'cartList': [],
        'addressList': []
    });
    newUser.save(function(err, fb) {
        if (err) {
            res.json({
                status: '1'
            });
        } else {
            res.json({
                status: '0'
            });
        }
    })


});
router.get('/checkUserName', function(req, res, next) {
    let userName = req.query.userName;
    User.find({'userName': userName}, function(err, doc) {
        if (err) {
            res.json({
                status: '1'
            })
        } else {
            res.json({
                status: '0',
                result: doc
            });
        }
    });
});
router.get('/checkEmail', function(req, res, next) {
    let userEmail = req.query.userEmail;
    User.find({'userEmail': userEmail }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
            })
        } else {
            res.json({
                status: '0',
                result: doc
            })
        }
    });
});


module.exports = router;