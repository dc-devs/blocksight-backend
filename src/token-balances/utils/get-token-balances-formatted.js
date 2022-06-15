"use strict";
exports.__esModule = true;
var numeral = require("numeral");
var get_formatted_token_balance_1 = require("./get-formatted-token-balance");
var getTokenBalancesFormatted = function (_a) {
    var TokenBalancess = _a.TokenBalancess;
    return TokenBalancess.map(function (TokenBalances) {
        var quote = TokenBalances.quote, balance = TokenBalances.balance, logo_url = TokenBalances.logo_url, quote_rate = TokenBalances.quote_rate, contract_name = TokenBalances.contract_name, contract_address = TokenBalances.contract_address, contract_decimals = TokenBalances.contract_decimals, contract_ticker_symbol = TokenBalances.contract_ticker_symbol;
        var tokenLogoUrl = logo_url;
        var tokenName = contract_name;
        var tokenSymbol = contract_ticker_symbol.toUpperCase();
        var TokenBalancesAmountFormatted = (0, get_formatted_token_balance_1["default"])({
            balance: balance,
            contractDecimals: contract_decimals
        });
        var tokenPrice = quote_rate || 0;
        var tokenPriceFormatted = numeral(tokenPrice).format('$0,000.000');
        var totalValueFormatted = numeral(quote).format('$0,000.00');
        return {
            name: tokenName,
            symbol: tokenSymbol,
            logoUrl: tokenLogoUrl,
            contractAddress: contract_address,
            balance: TokenBalancesAmountFormatted,
            price: {
                number: tokenPrice,
                formatted: tokenPriceFormatted
            },
            totalValue: {
                number: quote,
                formatted: totalValueFormatted
            }
        };
    });
};
exports["default"] = getTokenBalancesFormatted;
