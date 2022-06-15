"use strict";
var _a;
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
var user_validation_error_enum_1 = require("../../models/users/validation-errors/user-validation-error.enum");
var userErrors = (_a = {},
    _a["P2002" /* ErrorCode.UNIQUE_CONSTRAINT */] = {
        email: function () {
            throw new apollo_server_express_1.UserInputError("BAD_USER_INPUT" /* ExtensionCode.BAD_USER_INPUT */, {
                errors: {
                    email: {
                        type: "BAD_USER_INPUT" /* ExtensionCode.BAD_USER_INPUT */,
                        message: user_validation_error_enum_1["default"].EMAIL_IS_TAKEN
                    }
                }
            });
        }
    },
    _a["P2025" /* ErrorCode.RECORD_NOT_FOUND */] = {
        cause: function (message) {
            throw new apollo_server_express_1.UserInputError("BAD_USER_INPUT" /* ExtensionCode.BAD_USER_INPUT */, {
                errors: {
                    cause: {
                        type: "BAD_USER_INPUT" /* ExtensionCode.BAD_USER_INPUT */,
                        message: message
                    }
                }
            });
        }
    },
    _a);
exports["default"] = userErrors;
