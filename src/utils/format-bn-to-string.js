"use strict";
exports.__esModule = true;
var numeral = require("numeral");
var formatBnToString = function (_a) {
    var bigNumber = _a.bigNumber, format = _a.format;
    return numeral(bigNumber.toString()).format(format);
};
exports["default"] = formatBnToString;
