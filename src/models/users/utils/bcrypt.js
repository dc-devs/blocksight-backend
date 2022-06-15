"use strict";
exports.__esModule = true;
exports.encodePassword = void 0;
var bcrypt_1 = require("bcrypt");
var encodePassword = function (password) {
    var saltRounds = 10;
    var salt = (0, bcrypt_1.genSaltSync)(saltRounds);
    return (0, bcrypt_1.hashSync)(password, salt);
};
exports.encodePassword = encodePassword;
