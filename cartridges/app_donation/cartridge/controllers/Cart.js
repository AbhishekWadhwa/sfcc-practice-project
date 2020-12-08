'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var BasketMgr = require("dw/order/BasketMgr");
    var currentBasket = BasketMgr.getCurrentOrNewBasket();
    var site = require("dw/system/Site");
    var threshold = site.current.getCustomPreferenceValue("DollarThreshold");
    var acceptdonation = site.current.getCustomPreferenceValue("AcceptDonation");
    var productId = site.current.getCustomPreferenceValue("prodId");
    var viewData = res.getViewData();
    var URLUtils = require("dw/web/URLUtils");
    viewData.addToCartUrl = URLUtils.url("Cart-AddProduct");
    viewData.threshold = threshold;
    viewData.productId = productId;
    viewData.acceptdonation = acceptdonation;
    viewData.grandTotal = currentBasket.totalGrossPrice.value;
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();