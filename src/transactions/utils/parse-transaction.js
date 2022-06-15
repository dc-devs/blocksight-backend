"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ethers_1 = require("ethers");
var get_token_data_1 = require("../../services/coingecko/get-token-data");
var parseTransaction = function (_a) {
    var transaction = _a.transaction, contractAbi = _a.contractAbi;
    return __awaiter(void 0, void 0, void 0, function () {
        var ethersInterface, data, value, parsedTransaction, from, args, name, functionFragment, inputs, mappedInputs, paths, inputTokenAddress, outputTokenAddress, inputTokenData, outputTokenData, inputTokenSymbol, inputTokenName, inputTokenDescription, inputTokenImage, outputTokenSymbol, outputTokenName, outputTokenDescription, outputTokenImage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ethersInterface = new ethers_1.ethers.utils.Interface(contractAbi);
                    data = transaction.data, value = transaction.value;
                    parsedTransaction = ethersInterface.parseTransaction({ data: data, value: value });
                    from = transaction.from;
                    args = parsedTransaction.args, name = parsedTransaction.name, functionFragment = parsedTransaction.functionFragment;
                    inputs = functionFragment.inputs;
                    mappedInputs = {};
                    inputs.forEach(function (input, index) {
                        var value = args[index];
                        var name = input.name, type = input.type;
                        mappedInputs[name] = { type: type, value: value };
                    });
                    paths = mappedInputs.path.value;
                    inputTokenAddress = paths[0];
                    outputTokenAddress = paths[1];
                    return [4 /*yield*/, (0, get_token_data_1["default"])(inputTokenAddress)];
                case 1:
                    inputTokenData = _b.sent();
                    return [4 /*yield*/, (0, get_token_data_1["default"])(outputTokenAddress)];
                case 2:
                    outputTokenData = _b.sent();
                    inputTokenSymbol = inputTokenData.symbol, inputTokenName = inputTokenData.name, inputTokenDescription = inputTokenData.description, inputTokenImage = inputTokenData.image;
                    outputTokenSymbol = outputTokenData.symbol, outputTokenName = outputTokenData.name, outputTokenDescription = outputTokenData.description, outputTokenImage = outputTokenData.image;
                    return [2 /*return*/, {
                            type: 'Swap',
                            fromAddress: from,
                            fromWallet: {
                                name: 'MetaMask',
                                logoUrl: 'https://mining-bios.eu/wp-content/uploads/2018/09/metamask-logo.png'
                            },
                            exchange: {
                                name: 'Uniswap',
                                contract: 'Uniswap V2',
                                conractAdress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
                                logoUrl: 'https://cryptologos.cc/logos/uniswap-uni-logo.png?v=010'
                            },
                            methodName: name,
                            inputs: mappedInputs,
                            inputToken: {
                                symbol: inputTokenSymbol,
                                name: inputTokenName,
                                description: inputTokenDescription.en,
                                logoUrl: inputTokenImage
                            },
                            outputToken: {
                                symbol: outputTokenSymbol,
                                name: outputTokenName,
                                description: outputTokenDescription.en,
                                logoUrl: outputTokenImage
                            },
                            transaction: transaction,
                            parsedTransaction: parsedTransaction
                        }];
            }
        });
    });
};
exports["default"] = parseTransaction;
