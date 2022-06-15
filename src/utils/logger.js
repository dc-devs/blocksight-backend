"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var colors = require("colors");
var environment_1 = require("../common/constants/environment");
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.debug = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        var log = console.log;
        var title = messages.shift();
        var coloredMessages = messages.map(function (baseMessage) {
            var message;
            var isMessageApplicableForColor = !Array.isArray(baseMessage);
            if (isMessageApplicableForColor) {
                message = baseMessage.toString();
                message = message.green;
            }
            else {
                message = baseMessage;
            }
            return message;
        });
        if (environment_1.isDevelopmentEnv || process.env.LOGGER_DEBUG) {
            log.apply(console, __spreadArray([
                colors.cyan('[Nest-Debug]'),
                colors.cyan(title)
            ], coloredMessages, true));
        }
    };
    Logger.success = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        var log = console.log;
        var coloredMessages = messages.map(function (baseMessage) {
            var message;
            var isMessageApplicableForColor = !Array.isArray(baseMessage);
            if (isMessageApplicableForColor) {
                message = baseMessage.toString();
                message = message.green;
            }
            else {
                message = baseMessage;
            }
            return message;
        });
        log.apply(console, __spreadArray([
            colors.green('[Nest-Success]')
        ], coloredMessages, true));
    };
    Logger.error = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        var log = console.log;
        var coloredMessages = messages.map(function (baseMessage) {
            var message;
            var isMessageApplicableForColor = !Array.isArray(baseMessage);
            if (isMessageApplicableForColor) {
                message = baseMessage.toString();
                message = message.red;
            }
            else {
                message = baseMessage;
            }
            return message;
        });
        log.apply(console, __spreadArray([colors.red('[Nest-Error]')], coloredMessages, true));
    };
    return Logger;
}());
exports["default"] = Logger;
