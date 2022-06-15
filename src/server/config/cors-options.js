"use strict";
exports.__esModule = true;
exports["default"] = {
    credentials: true,
    origin: [
        "http://localhost:3000" /* AppUrl.FRONTEND */,
        "http://localhost:3001" /* AppUrl.DEV_SERVER */,
        "http://localhost:3005" /* AppUrl.TEST_SERVER */,
        "https://studio.apollographql.com" /* AppUrl.APOLLO_CLIENT */,
        "https://localhost:3000" /* AppUrl.FRONTEND_SECURE */,
    ],
    exposedHeaders: ['Set-Cookie']
};
