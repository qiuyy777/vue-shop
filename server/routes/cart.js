let express = require('express');
let router = express.Router();
require('../formatDate');
let User = require('./../models/user');
let Goods = require('./../models/goods');

router.get('/list', function(req, res, next) {
    let userId = req.cookies.userId;
    User.findOne({ 'userId': userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    result: doc.cartList
                });
            }
        }
    });
});
router.post('/edit', function(req, res, next) {
    let userId = req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum
    User.update({ 'userId': userId, 'cartList.productId': productId }, {
        'cartList.$.productNum': productNum
    }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            res.json({
                status: '0',
                result: 'suc'
            });
        }
    })
});
router.post('/select', function(req, res, next) {
    let userId = req.cookies.userId,
        productId = req.body.productId,
        checked = req.body.itemChecked;
    User.update({ 'userId': userId, 'cartList.productId': productId }, {
        'cartList.$.ifSelected': checked
    }, function(err, resData) {
        if (err) {
            res.json({
                status: '1',
                msg: 'err.message'
            });
        } else {
            res.json({
                status: '0',
                result: 'suc'
            });
        }
    })
});
router.post('/selectAll', function(req, res, next) {
    let userId = req.cookies.userId,
        checkAll = req.body.checkAll;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            let cartList = doc.cartList;
            cartList.forEach((item) => {
                item.ifSelected = checkAll;
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
                        result: ''
                    });
                }
            })
        }
    })
});

router.post('/add', function(req, res, next) {
    var userName = req.cookies.userName;
    var productId = req.body.productId;
    var User = require('../models/user');
    User.findOne({ userName: userName }, function(err, userDoc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            if (userDoc) {
                var goodsItem = '';
                userDoc.cartList.forEach(function(item) {
                    if (item.productId == productId) {
                        goodsItem = item;
                        item.productNum++;
                    }
                });
            }
            if (goodsItem) {
                userDoc.save(function(err2, doc2) {
                    if (err2) {
                        res.json({
                            status: '1',
                            msg: err2.message
                        })
                    } else {
                        res.json({
                            status: '0',
                            msg: '',
                            result: doc2.cartList
                        })
                    }
                })
            } else {
                Goods.findOne({ productId: productId }, function(err1, doc) {
                    if (err1) {
                        res.json({
                            status: '1',
                            msg: err.message
                        });
                    } else {
                        if (doc) {
                            doc.productNum = 1;
                            doc.checked = 0;
                            userDoc.cartList.push(doc);
                            userDoc.save(function(err2, doc2) {
                                if (err2) {
                                    res.json({
                                        status: '1',
                                        msg: err2.message
                                    });
                                } else {
                                    res.json({
                                        status: '0',
                                        msg: '',
                                        result: doc2.cartList
                                    });
                                }
                            });
                        }
                    }
                })
            }
        }
    })
});

router.post('/delete', function(req, res, next) {
    let userId = req.cookies.userId,
        delAll = req.body.delAll;
    if (delAll) {
        User.update({ 'userId': userId }, { $set: { 'cartList': [] } }, function(err, doc) {
            if (err) {
                res.json({
                    status: '1'
                })
            } else {
                res.json({
                    status: '0',
                    result: doc.cartList
                })
            }
        })
    } else {
        User.update({
                'userId': userId
            }, {
                $pull: {
                    'cartList': {
                        ifSelected: true
                    }
                },
            }, { multi: true },
            function(err2, doc2) {
                if (err2) {
                    res.json({
                        status: '1',
                    });
                } else {
                    res.json({
                        status: '0',
                        result: doc2.cartList
                    })
                }
            })
    }
});

router.post('/add', function(req, res, next) {
    var userName = req.cookies.userName;
    var productId = req.body.productId;
    var User = require('../models/user');
    User.findOne({ userName: userName }, function(err, userDoc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            if (userDoc) {
                var goodsItem = '';
                userDoc.cartList.forEach(function(item) {
                    if (item.productId == productId) {
                        goodsItem = item;
                        item.productNum++;
                    }
                });
            }
            if (goodsItem) {
                userDoc.save(function(err2, doc2) {
                    if (err2) {
                        res.json({
                            status: '1',
                            msg: err2.message
                        })
                    } else {
                        res.json({
                            status: '0',
                            msg: '',
                            result: doc2.cartList
                        })
                    }
                })
            } else {
                Goods.findOne({ productId: productId }, function(err1, doc) {
                    if (err1) {
                        res.json({
                            status: '1',
                            msg: err.message
                        });
                    } else {
                        if (doc) {
                            doc.productNum = 1;
                            doc.checked = 0;
                            userDoc.cartList.push(doc);
                            userDoc.save(function(err2, doc2) {
                                if (err2) {
                                    res.json({
                                        status: '1',
                                        msg: err2.message
                                    });
                                } else {
                                    res.json({
                                        status: '0',
                                        msg: '',
                                        result: doc2.cartList
                                    });
                                }
                            });
                        }
                    }
                })
            }
        }
    })
});

module.exports = router;