"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SessionResponse = void 0;
var graphql_1 = require("@nestjs/graphql");
var SessionResponse = /** @class */ (function () {
    function SessionResponse() {
    }
    __decorate([
        (0, graphql_1.Field)()
    ], SessionResponse.prototype, "user");
    __decorate([
        (0, graphql_1.Field)()
    ], SessionResponse.prototype, "isAuthenticated");
    SessionResponse = __decorate([
        (0, graphql_1.ObjectType)()
    ], SessionResponse);
    return SessionResponse;
}());
exports.SessionResponse = SessionResponse;
