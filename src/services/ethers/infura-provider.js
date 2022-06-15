"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
var infura_networks_1 = require("../../constants/infura-networks");
var chainId = process.env.ETHEREUM_CHAIN_ID;
var network = infura_networks_1["default"][chainId];
var infuraProvider = new ethers_1.ethers.providers.InfuraProvider(network, {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET
});
exports["default"] = infuraProvider;
