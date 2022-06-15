"use strict";
exports.__esModule = true;
var bignumber_js_1 = require("bignumber.js");
var getTokenAssetValue = function (_a) {
    var balance = _a.balance, tokenPrice = _a.tokenPrice, contractDecimals = _a.contractDecimals;
    var balanceBN = new bignumber_js_1["default"](balance);
    var balanceETHBN = balanceBN.shiftedBy(-contractDecimals);
    return balanceETHBN.multipliedBy(tokenPrice);
};
exports["default"] = getTokenAssetValue;
