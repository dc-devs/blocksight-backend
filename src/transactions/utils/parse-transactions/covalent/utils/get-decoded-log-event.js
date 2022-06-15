"use strict";
exports.__esModule = true;
var getDecodedLogEvent = function (logEvents, eventName) {
    var swapLogEvent = logEvents.find(function (logEvent) {
        return logEvent.decoded.name === eventName;
    });
    return swapLogEvent.decoded;
};
exports["default"] = getDecodedLogEvent;
