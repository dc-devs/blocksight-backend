"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserWithPassword = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var UserWithPassword = /** @class */ (function () {
    function UserWithPassword() {
    }
    __decorate([
        (0, graphql_1.Field)(),
        (0, class_validator_1.IsNumber)()
    ], UserWithPassword.prototype, "id");
    __decorate([
        (0, graphql_1.Field)(),
        (0, class_validator_1.IsEmail)()
    ], UserWithPassword.prototype, "email");
    __decorate([
        (0, graphql_1.Field)(),
        (0, class_validator_1.IsString)()
    ], UserWithPassword.prototype, "role");
    __decorate([
        (0, graphql_1.Field)(),
        (0, class_validator_1.IsString)()
    ], UserWithPassword.prototype, "password");
    __decorate([
        (0, graphql_1.Field)(),
        (0, class_validator_1.IsDate)()
    ], UserWithPassword.prototype, "createdAt");
    __decorate([
        (0, graphql_1.Field)(),
        (0, class_validator_1.IsDate)()
    ], UserWithPassword.prototype, "updatedAt");
    UserWithPassword = __decorate([
        (0, graphql_1.ObjectType)()
    ], UserWithPassword);
    return UserWithPassword;
}());
exports.UserWithPassword = UserWithPassword;
