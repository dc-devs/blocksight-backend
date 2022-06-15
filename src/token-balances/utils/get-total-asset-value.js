"use strict";
exports.__esModule = true;
var bignumber_js_1 = require("bignumber.js");
var getTotalAssetValue = function (_a) {
    var TokenBalancess = _a.TokenBalancess;
    var totalAssetValue = new bignumber_js_1["default"](0);
    if (TokenBalancess.length > 0) {
        TokenBalancess.forEach(function (TokenBalances) {
            var quote = TokenBalances.quote;
            totalAssetValue = totalAssetValue.plus(quote);
        });
    }
    return totalAssetValue;
};
exports["default"] = getTotalAssetValue;
