"use strict";
exports.__esModule = true;
var getTokenSymbols = function (TokenBalancess) {
    var symbols = '';
    TokenBalancess.forEach(function (token, index) {
        if (index === 0) {
            symbols += "".concat(token.contract_ticker_symbol);
        }
        else {
            symbols += ",".concat(token.contract_ticker_symbol);
        }
    });
    return symbols;
};
exports["default"] = getTokenSymbols;
