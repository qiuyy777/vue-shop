const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    "userId": String,
    "userName": String,
    "userEmail": String,
    "userPwd": String,
    "orderList": [],
    "cartList": [{
        "productId": String,
        "productName": String,
        "salePrice": String,
        "productImage": String,
        "ifSelected": Boolean,
        "productNum": String
    }],
    "addressList": [{
        "addressId": Number,
        "receiver": String,
        "addressDetail": String,
        "tel": String,
        "isDefault": Boolean,
        "createDate": Date
    }],
});
module.exports = mongoose.model("User", userSchema);