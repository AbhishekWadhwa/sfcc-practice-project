'use strict';

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var txn = require('dw/system/Transaction');
var server = require('server');
var Basket = require('dw/order/BasketMgr');
var presentBasket = Basket.getCurrentBasket();
var OrderMgr = require('dw/order/OrderMgr');

server.extend(module.superModule);

server.append('PlaceOrder', server.middleware.https, function (req, res, next) {

    var site = require("dw/system/Site");
    //var prodId = "donationProduct";
    var prodId = site.current.getCustomPreferenceValue("prodId");
    var matched = false;
    var price = 0;

    var orderNumber = res.viewData.orderID;
    var currentOrder = OrderMgr.getOrder(orderNumber);
    var iterator = presentBasket.productLineItems.iterator(); 
    while(iterator.hasNext()){
        var obj = iterator.next();
        if (obj.productID === prodId) {
            matched = true;
            price = obj.price;
        }
    }

    txn.wrap(function () {
        if (matched) {
                var key = site.current.getCustomPreferenceValue("donationProductCustomObject");
                // work with business objects here
                var CustomObject = CustomObjectMgr.getCustomObject("totalDonation", key);
                CustomObject.custom.donationAmount = CustomObject.custom.donationAmount + price;
                currentOrder.custom.isDonationProduct = true;
        } else {
            currentOrder.custom.isDonationProduct = false;
        }
    });
    next();
});

module.exports = server.exports();