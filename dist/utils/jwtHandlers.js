"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config/config");
const JWT_SECRET = config_1.config.jwt_secret || "secret";
/* Generate a token */
const generateToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const jwt = (0, jsonwebtoken_1.sign)({ id }, JWT_SECRET, { expiresIn: "4h" });
    return jwt;
});
exports.generateToken = generateToken;
/* Verify a token */
const verifyToken = (jwt) => {
    const decoded = (0, jsonwebtoken_1.verify)(jwt, JWT_SECRET);
    return decoded;
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwtHandlers.js.map