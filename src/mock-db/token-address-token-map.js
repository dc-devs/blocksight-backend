"use strict";
exports.__esModule = true;
var rsr_1 = require("./tokens/rsr");
var weth_1 = require("./tokens/weth");
var contractAddressAbiMap = {
    '0x8762db106B2c2A0bccB3A80d1Ed41273552616E8': rsr_1["default"],
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': weth_1["default"]
};
exports["default"] = contractAddressAbiMap;
