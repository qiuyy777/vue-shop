"use strict";

var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
/* GET home page. */
var Goods = require('../models/goods');

// DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. 
// To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
// 解决方法如下：
mongoose.connect('mongodb://yy:123456@localhost:27017/ymall', { useNewUrlParser: true })
    // mongoose.connect('mongodb://127.0.0.1:27017/ymall');

mongoose.connection.on('connected', function() {
    console.log('mongodb runs success');
});
mongoose.connection.on('error', function() {
    console.log('mongodb failed');
});

router.get('/list', function(req, res, next) {
    let page = parseInt(req.param('page'));
    let pageSize = parseInt(req.param('pageSize'));
    let skip = (page - 1) * pageSize;
    let goodsModel = Goods.find().skip(skip).limit(pageSize);
    goodsModel.exec(function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            });
        }
    })
});

router.get('/search', function(req, res, next) {
    let query = new RegExp(req.query.keyword, 'i');
    Goods.find({ 'productName': query }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: doc
            });
        }
    })
});

module.exports = router;