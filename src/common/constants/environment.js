"use strict";
exports.__esModule = true;
exports.isDevelopmentEnv = exports.isProductionEnv = exports.isTestEnv = void 0;
exports["default"] = process.env.NODE_ENV || "development" /* Environment.DEVELOPMENT */;
exports.isTestEnv = process.env.NODE_ENV === "test" /* Environment.TEST */;
exports.isProductionEnv = process.env.NODE_ENV === "production" /* Environment.PRODUCTION */;
exports.isDevelopmentEnv = process.env.NODE_ENV === "development" /* Environment.DEVELOPMENT */;
