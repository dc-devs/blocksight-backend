"use strict";
exports.__esModule = true;
var environment_1 = require("./environment");
var testPort = 3005;
var developmentPort = 3001;
var defaultPort = environment_1.isTestEnv ? testPort : developmentPort;
exports["default"] = process.env.PORT || defaultPort;
