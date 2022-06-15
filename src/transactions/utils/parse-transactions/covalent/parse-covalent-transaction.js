"use strict";
exports.__esModule = true;
var contract_address_exchange_map_1 = require("../../../../mock-db/contract-address-exchange-map");
var contract_address_parse_logs_map_1 = require("../../../../mock-db/contract-address-parse-logs-map");
var parseUniswapTransaction = function (transaction) {
    var block_signed_at = transaction.block_signed_at, block_height = transaction.block_height, tx_hash = transaction.tx_hash, tx_offset = transaction.tx_offset, successful = transaction.successful, from_address = transaction.from_address, from_address_label = transaction.from_address_label, to_address = transaction.to_address, to_address_label = transaction.to_address_label, value = transaction.value, value_quote = transaction.value_quote, gas_offered = transaction.gas_offered, gas_spent = transaction.gas_spent, gas_price = transaction.gas_price, gas_quote = transaction.gas_quote, gas_quote_rate = transaction.gas_quote_rate, log_events = transaction.log_events;
    var toAddress = to_address.toLowerCase();
    var isSupported = !!contract_address_exchange_map_1["default"][toAddress];
    var logEvents = log_events;
    var parsedLogEventData;
    if (isSupported) {
        var parseLogEvents = contract_address_parse_logs_map_1["default"][toAddress];
        parsedLogEventData = parseLogEvents(logEvents);
        console.log(parsedLogEventData);
    }
    return {
        blockSignedAt: block_signed_at,
        blockHeight: block_height,
        txHash: tx_hash,
        txOffset: tx_offset,
        successful: successful,
        fromAddress: from_address,
        fromAddressLabel: from_address_label,
        toAddress: to_address,
        toAddressLabel: to_address_label,
        value: value,
        valueQuote: value_quote,
        gasOffered: gas_offered,
        gasSpent: gas_spent,
        gasPrice: gas_price,
        gasQuote: gas_quote,
        gasQuoteRate: gas_quote_rate,
        logEvents: logEvents,
        isSupported: isSupported,
        parsedLogEventData: parsedLogEventData
    };
};
exports["default"] = parseUniswapTransaction;
