"use strict";
exports.__esModule = true;
var numeral = require("numeral");
var bignumber_js_1 = require("bignumber.js");
var getTransfersTotalFiatValue = function (transfers) {
    var totalTransfers = new bignumber_js_1.BigNumber(0);
    transfers.forEach(function (deposit) {
        var details = deposit.details, amount = deposit.amount;
        var isSuccessfulDeposit = !deposit.canceled_at && deposit.processed_at;
        var isFiatTransfer = !(details === null || details === void 0 ? void 0 : details.crypto_transaction_hash);
        if (isFiatTransfer && isSuccessfulDeposit) {
            totalTransfers = totalTransfers.plus(amount);
        }
    });
    var string = totalTransfers.toString();
    var formatted = numeral(string).format('$0,0.00');
    return {
        string: string,
        formatted: formatted
    };
};
exports["default"] = getTransfersTotalFiatValue;
