"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var config_1 = require("@nestjs/config");
var auth_module_1 = require("./models/auth/auth.module");
var users_module_1 = require("./models/users/users.module");
var prisma_service_1 = require("./prisma/prisma.service");
var environment_1 = require("./common/constants/environment");
var graphql_module_1 = require("./graphql/graphql.module");
var transfers_module_1 = require("./transfers/transfers.module");
var transactions_module_1 = require("./transactions/transactions.module");
var common_1 = require("@nestjs/common");
var logger_middleware_1 = require("./common/middleware/logger.middleware");
var token_balances_module_1 = require("./token-balances/token-balances.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                users_module_1.UsersModule,
                graphql_module_1.GraphqlModule,
                transfers_module_1.TransfersModule,
                transactions_module_1.TransactionsModule,
                token_balances_module_1.TokenBalancesModule,
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: ['.env', ".env.".concat(environment_1["default"])]
                }),
                auth_module_1.AuthModule,
            ],
            providers: [prisma_service_1.PrismaService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
