"use strict";
exports.__esModule = true;
var custom_errors_1 = require("./custom-errors");
var generateGraphQLError = function (error) {
    var code = error.code, meta = error.meta;
    var graphqlError;
    var errorMessage;
    var errorField;
    if (Array.isArray(meta === null || meta === void 0 ? void 0 : meta.target) && (meta === null || meta === void 0 ? void 0 : meta.target.length) > 0) {
        errorField = meta.target[0];
    }
    if (meta === null || meta === void 0 ? void 0 : meta.cause) {
        errorField = 'cause';
        errorMessage = meta.cause;
    }
    if (custom_errors_1["default"][code] && custom_errors_1["default"][code][errorField]) {
        graphqlError = custom_errors_1["default"][code] && custom_errors_1["default"][code][errorField];
    }
    if (graphqlError && errorMessage) {
        graphqlError(errorMessage);
    }
    else if (graphqlError) {
        graphqlError();
    }
    throw new Error(error);
};
exports["default"] = generateGraphQLError;
