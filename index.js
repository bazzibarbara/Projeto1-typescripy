"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = Number(process.env.PORT);
var server = app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
