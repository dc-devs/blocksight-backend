"use strict";
exports.__esModule = true;
var get_uniswap_v2_input_output_amounts_1 = require("../../../../../transactions/utils/parse-transactions/covalent/uniswap-v2/get-uniswap-v2-input-output-amounts");
// lEFT OFF
// Get this function working
// Check how many uniswapv2 have multiple swap events,
// possibly getting first swap won't work
// get these to display in ui
// start to add up totals
// start to show number of transactions actually
var parseUniswapV2LogEvents = function (logEvents) {
    var _a = (0, get_uniswap_v2_input_output_amounts_1["default"])(logEvents), inputTokenAmount = _a.inputTokenAmount, outputTokenAmount = _a.outputTokenAmount;
    return { inputTokenAmount: inputTokenAmount, outputTokenAmount: outputTokenAmount };
};
exports["default"] = parseUniswapV2LogEvents;
