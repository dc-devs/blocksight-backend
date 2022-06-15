"use strict";
exports.__esModule = true;
var web3_1 = require("web3");
require('dotenv').config();
var infuraRpcUrl = process.env.INFURA_RPC_URL;
console.log(infuraRpcUrl);
var web3 = new web3_1["default"].providers.WebsocketProvider(infuraRpcUrl);
console.log(web3);
exports["default"] = web3;
