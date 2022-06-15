"use strict";
exports.__esModule = true;
var bignumber_js_1 = require("bignumber.js");
var get_decoded_log_event_1 = require("../utils/get-decoded-log-event");
var getUniswapV2InputOutputAmounts = function (logEvents) {
    var decodedSwapEvent = (0, get_decoded_log_event_1["default"])(logEvents, 'Swap');
    var inputTokenAmount = new bignumber_js_1.BigNumber('0');
    var outputTokenAmount = new bignumber_js_1.BigNumber('0');
    if (!decodedSwapEvent) {
        throw Error('No Swap Event Found');
    }
    decodedSwapEvent.params.forEach(function (param) {
        var name = param.name, value = param.value;
        if (name === 'amount0In' || name === 'amount1In') {
            inputTokenAmount = bignumber_js_1.BigNumber.sum(inputTokenAmount, value);
        }
        if (name === 'amount0Out' || name === 'amount1Out') {
            outputTokenAmount = bignumber_js_1.BigNumber.sum(outputTokenAmount, value);
        }
    });
    return {
        inputTokenAmount: inputTokenAmount.toString(),
        outputTokenAmount: outputTokenAmount.toString()
    };
};
exports["default"] = getUniswapV2InputOutputAmounts;
