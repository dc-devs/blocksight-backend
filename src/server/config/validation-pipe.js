"use strict";
exports.__esModule = true;
var common_1 = require("@nestjs/common");
exports["default"] = new common_1.ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
        enableImplicitConversion: true
    }
});
