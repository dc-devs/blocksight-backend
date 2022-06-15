"use strict";
exports.__esModule = true;
var logger_1 = require("../../utils/logger");
var constants_1 = require("../../common/constants");
var logInitMessage = function () {
    console.log('');
    logger_1["default"].debug('');
    logger_1["default"].debug('Port:', constants_1.port);
    logger_1["default"].debug('Environment:', constants_1.environment);
    logger_1["default"].debug('Redis:', process.env.REDIS_URL);
    logger_1["default"].debug('Database:', process.env.DATABASE_URL);
    logger_1["default"].debug('');
};
exports["default"] = logInitMessage;
