"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.AuthResolver = void 0;
// const  Web3 = require('web3');
var web3_1 = require("web3");
var common_1 = require("@nestjs/common");
var guards_1 = require("./guards");
var dto_1 = require("./dto");
var graphql_1 = require("@nestjs/graphql");
var generate_graphql_error_1 = require("../../graphql/errors/generate-graphql-error");
var eth_sig_util_1 = require("@metamask/eth-sig-util");
var AuthResolver = /** @class */ (function () {
    function AuthResolver(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    AuthResolver.prototype.login = function (request, sessionInput) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = request.user;
                return [2 /*return*/, { isAuthenticated: true, user: user }];
            });
        });
    };
    AuthResolver.prototype.signUp = function (request, createUserInput) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser, loggedInUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.usersService.create(__assign({}, createUserInput))];
                    case 1:
                        newUser = _a.sent();
                        return [4 /*yield*/, this.authService.login(__assign(__assign({}, request), { user: __assign({}, newUser) }))];
                    case 2:
                        loggedInUser = _a.sent();
                        return [2 /*return*/, { isAuthenticated: true, user: loggedInUser }];
                    case 3:
                        error_1 = _a.sent();
                        (0, generate_graphql_error_1["default"])(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthResolver.prototype.signInMetaMask = function (request, signInMetaMaskInput) {
        return __awaiter(this, void 0, void 0, function () {
            var message, signature, address, recoveredAddress, user;
            return __generator(this, function (_a) {
                try {
                    message = signInMetaMaskInput.message, signature = signInMetaMaskInput.signature, address = signInMetaMaskInput.address;
                    console.log('signInMetaMaskInput', { message: message, signature: signature, address: address });
                    recoveredAddress = (0, eth_sig_util_1.recoverTypedSignature)({
                        data: JSON.parse(message),
                        signature: signature,
                        version: eth_sig_util_1.SignTypedDataVersion.V4
                    });
                    console.log('');
                    console.log('address', address);
                    console.log('recoveredAddress', recoveredAddress);
                    console.log('');
                    console.log('Web3', web3_1["default"]);
                    user = {
                        id: 1,
                        email: 'email',
                        role: 'USER'
                    };
                    return [2 /*return*/, { isAuthenticated: true, user: user }];
                    // const newUser = await this.usersService.create({
                    // 	...createUserInput,
                    // });
                    // const loggedInUser = await this.authService.login({
                    // 	...request,
                    // 	user: { ...newUser },
                    // });
                    // return { isAuthenticated: true, user: loggedInUser };
                }
                catch (error) {
                    console.error('ERROR', error);
                    // generateGraphQLError(error);
                }
                return [2 /*return*/];
            });
        });
    };
    AuthResolver.prototype.currentUser = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = request.user;
                return [2 /*return*/, { isAuthenticated: true, user: user }];
            });
        });
    };
    AuthResolver.prototype.logOut = function (response, request, userId) {
        try {
            this.authService.logOut({ request: request, response: response, userId: userId });
            return { isAuthenticated: false, userId: userId };
        }
        catch (error) {
            (0, generate_graphql_error_1["default"])(error);
        }
    };
    __decorate([
        (0, graphql_1.Mutation)(function () { return dto_1.SessionResponse; }),
        (0, common_1.UseGuards)(guards_1.IsValidUser, guards_1.LogInUser),
        __param(0, (0, graphql_1.Context)('req')),
        __param(1, (0, graphql_1.Args)('sessionInput'))
    ], AuthResolver.prototype, "login");
    __decorate([
        (0, graphql_1.Mutation)(function () { return dto_1.SessionResponse; }),
        __param(0, (0, graphql_1.Context)('req')),
        __param(1, (0, graphql_1.Args)('createUserInput'))
    ], AuthResolver.prototype, "signUp");
    __decorate([
        (0, graphql_1.Mutation)(function () { return dto_1.SessionResponse; }),
        __param(0, (0, graphql_1.Context)('req')),
        __param(1, (0, graphql_1.Args)('signInMetaMaskInput'))
    ], AuthResolver.prototype, "signInMetaMask");
    __decorate([
        (0, graphql_1.Query)(function () { return dto_1.SessionResponse; }),
        (0, common_1.UseGuards)(guards_1.IsAuthenticated),
        __param(0, (0, graphql_1.Context)('req'))
    ], AuthResolver.prototype, "currentUser");
    __decorate([
        (0, graphql_1.Mutation)(function () { return dto_1.LogOutResponse; }),
        __param(0, (0, graphql_1.Context)('res')),
        __param(1, (0, graphql_1.Context)('req')),
        __param(2, (0, graphql_1.Args)('userId'))
    ], AuthResolver.prototype, "logOut");
    AuthResolver = __decorate([
        (0, graphql_1.Resolver)()
    ], AuthResolver);
    return AuthResolver;
}());
exports.AuthResolver = AuthResolver;
