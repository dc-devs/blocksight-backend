"use strict";
exports.__esModule = true;
exports.SessionConstants = void 0;
require('dotenv').config();
var SessionConstants = {
    SECRET: process.env.SESSION_SECRET
};
exports.SessionConstants = SessionConstants;
