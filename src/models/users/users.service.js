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
exports.__esModule = true;
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt_1 = require("./utils/bcrypt");
var select = {
    id: true,
    email: true,
    role: true,
    createdAt: true,
    updatedAt: true
};
var UsersService = /** @class */ (function () {
    function UsersService(prisma) {
        this.prisma = prisma;
    }
    UsersService.prototype.findAll = function (findAllUsersInput) {
        var skip = findAllUsersInput.skip, cursor = findAllUsersInput.cursor, take = findAllUsersInput.take, orderBy = findAllUsersInput.orderBy, where = findAllUsersInput.where;
        return this.prisma.user.findMany({
            skip: skip,
            take: take,
            cursor: cursor,
            where: where,
            orderBy: orderBy,
            select: select
        });
    };
    UsersService.prototype.findOne = function (findOneUserInput) {
        var id = findOneUserInput.id, email = findOneUserInput.email;
        return this.prisma.user.findUnique({
            where: { id: id, email: email },
            select: select
        });
    };
    UsersService.prototype._findOne = function (findOneUserInput) {
        var id = findOneUserInput.id, email = findOneUserInput.email;
        return this.prisma.user.findUnique({
            where: { id: id, email: email },
            select: __assign(__assign({}, select), { password: true })
        });
    };
    UsersService.prototype.create = function (createUserInput) {
        var email = createUserInput.email, password = createUserInput.password;
        var emailLowerCase = email.toLowerCase();
        var encodedPassword = (0, bcrypt_1.encodePassword)(password);
        return this.prisma.user.create({
            data: {
                email: emailLowerCase,
                password: encodedPassword
            },
            select: select
        });
    };
    UsersService.prototype.update = function (id, data) {
        return this.prisma.user.update({
            where: {
                id: id
            },
            data: data,
            select: select
        });
    };
    UsersService.prototype["delete"] = function (id) {
        return this.prisma.user["delete"]({
            where: {
                id: id
            },
            select: select
        });
    };
    UsersService = __decorate([
        (0, common_1.Injectable)()
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
