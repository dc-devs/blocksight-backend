"use strict";
exports.__esModule = true;
var bignumber_js_1 = require("bignumber.js");
var format = {
    prefix: '',
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
    suffix: ''
};
var getFormattedTokenBalances = function (_a) {
    var balance = _a.balance, contractDecimals = _a.contractDecimals;
    bignumber_js_1.BigNumber.config({ FORMAT: format });
    var balanceBN = new bignumber_js_1.BigNumber(balance);
    var TokenBalancesAmount = balanceBN
        .shiftedBy(-contractDecimals)
        .toFormat(4);
    return TokenBalancesAmount.toString();
};
exports["default"] = getFormattedTokenBalances;
