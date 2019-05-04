let express = require('express');
let router = express.Router();
require('../formatDate');
let User = require('./../models/user');

router.get('/list', function(req, res, next) {
    let userId = req.cookies.userId;
    if (userId) {
        User.findOne({ 'userId': userId, 'addressList': { $exists: true } }, function(err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message
                })
            } else {
                res.json({
                    status: '0',
                    result: doc
                })
            }
        })
    } else {
        res.json({
            status: '3',
            msg: '已退出'
        })
    }
});

router.post('/add', function(req, res, next) {
    let userId = req.cookies.userId;
    let addrId = Math.floor(Math.random() * 1000);
    let receiver = req.body.receiver;
    let telNum = req.body.telNum;
    let addr = req.body.addr;
    let isDefault = req.body.isDefault;
    let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
    let newAddr = {
        'addressId': addrId,
        'receiver': receiver,
        'addressDetail': addr,
        'tel': telNum,
        'isDefault': isDefault,
        'createDate': createDate
    }
    User.update({
        'userId': userId
    }, {
        $push: {
            'addressList': newAddr
        }
    }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                result: 'suc'
            });
        }
    });
});
router.post('/delete', function(req, res, next) {
    let userId = req.cookies.userId;
    let addrId = req.body.addrId;
    User.update({ 'userId': userId }, {
        $pull: {
            addressList: {
                'addressId': addrId
            }
        }
    }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                result: ''
            });
        }
    });
});
router.post('/setDefault', function(req, res, next) {
    let userId = req.cookies.userId,
        addrId = req.body.addrId;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            let addrList = doc.addressList;
            addrList.forEach((item) => {
                item.isDefault = false;
                if (item.addressId === addrId) {
                    item.isDefault = true;
                }
            });
            doc.save(function(err1, doc1) {
                if (err1) {
                    res.json({
                        status: '1',
                        msg: err1.message,
                        result: ''
                    });
                } else {
                    res.json({
                        status: '0',
                        msg: '',
                        result: addrId
                    });
                }
            })
        }
    })

});


module.exports = router;