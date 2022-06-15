import Web3 from 'web3';

require('dotenv').config();

const infuraRpcUrl = process.env.INFURA_RPC_URL;
console.log(infuraRpcUrl);

const web3 = new Web3.providers.WebsocketProvider(infuraRpcUrl);
console.log(web3);

export default web3;
