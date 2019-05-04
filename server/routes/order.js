let express = require('express');
let router = express.Router();
require('../formatDate');
let User = require('./../models/user');

router.get("/list", function(req, res, next) {
    let userId = req.cookies.userId;
    User.findOne({ 'userId': userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    result: doc.orderList
                });
            }
        }
    });
});


router.post("/placeOrder", function(req, res, next) {
    let userId = req.cookies.userId;
    let total = req.body.total;
    let address = req.body.address;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
            });
        } else {
            let sysDate = new Date().Format('yyyyMMddhhmmss');
            let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
            let r1 = Math.floor(Math.random() * 10);
            let r2 = Math.floor(Math.random() * 10);
            let orderId = `xm${sysDate}${r1}${r2}`;

            let goodsList = doc.cartList.filter(item => item.ifSelected === true);

            let newCartList = doc.cartList.filter(item => item.ifSelected === false);
            doc.cartList = newCartList

            let order = {
                orderId: orderId,
                createDate: createDate,
                total: total,
                addressInfo: address,
                itemList: goodsList
            };

            doc.orderList.unshift(order);

            doc.save(function(err1, doc1) {
                if (err1) {
                    res.json({
                        status: '1',
                        msg: err1.message,
                        result: ''
                    })
                } else {
                    res.json({
                        status: '0'
                    })
                }
            });
        }
    })

});

module.exports = router;