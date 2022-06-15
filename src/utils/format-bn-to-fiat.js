"use strict";
exports.__esModule = true;
var numeral = require("numeral");
var formatBnToFiat = function (_a) {
    var bigNumber = _a.bigNumber, currency = _a.currency, format = _a.format;
    var currenies = {
        usd: '$'
    };
    var currencySymbol = currenies[currency];
    return numeral(bigNumber.toString()).format("".concat(currencySymbol).concat(format));
};
exports["default"] = formatBnToFiat;
