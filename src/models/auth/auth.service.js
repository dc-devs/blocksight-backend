"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.AuthService = void 0;
var bcrypt_1 = require("bcrypt");
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var AuthService = /** @class */ (function () {
    function AuthService(usersService) {
        this.usersService = usersService;
    }
    AuthService.prototype.validateUser = function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var validatedUser, user, hasCorrectPassword, password_1, restOfUserData, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        validatedUser = null;
                        return [4 /*yield*/, this.usersService._findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (user) {
                            hasCorrectPassword = (0, bcrypt_1.compareSync)(password, user.password);
                            if (user && hasCorrectPassword) {
                                password_1 = user.password, restOfUserData = __rest(user, ["password"]);
                                validatedUser = restOfUserData;
                            }
                        }
                        return [2 /*return*/, validatedUser];
                    case 2:
                        e_1 = _b.sent();
                        throw new common_2.UnauthorizedException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.login = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = request.user;
                if (user && request.session) {
                    request.session.userId = user.id;
                }
                else {
                    throw new common_2.UnauthorizedException();
                }
                return [2 /*return*/, user];
            });
        });
    };
    AuthService.prototype.logOut = function (_a) {
        var request = _a.request, response = _a.response, userId = _a.userId;
        request.session.userId = undefined;
        response.cookie("_bb_session" /* Cookie.NAME */, null, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date("Thu, 01 Jan 1970 00:00:00 GMT" /* Cookie.EXPIRED_DATE */)
        });
        request.session.destroy();
        request.sessionStore.destroy(userId);
        return true;
    };
    AuthService = __decorate([
        (0, common_1.Injectable)()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
