"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
var infura_networks_1 = require("../../constants/infura-networks");
var chainId = process.env.ETHEREUM_CHAIN_ID;
var network = infura_networks_1["default"][chainId];
var etherscanProvider = new ethers_1.ethers.providers.EtherscanProvider(network, process.env.ETHERSCAN_API_KEY);
exports["default"] = etherscanProvider;
