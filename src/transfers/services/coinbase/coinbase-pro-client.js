"use strict";
exports.__esModule = true;
var coinbase_pro_node_1 = require("coinbase-pro-node");
exports["default"] = new coinbase_pro_node_1.CoinbasePro({
    apiKey: process.env.COINBASE_PRO_API_KEY,
    apiSecret: process.env.COINBASE_PRO_API_SECRET,
    passphrase: process.env.COINBASE_PRO_API_PASSPHRASE,
    useSandbox: false
});
