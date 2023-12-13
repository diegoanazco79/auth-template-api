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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existEmailValidation = exports.uniqueUserEmail = void 0;
const user_1 = __importDefault(require("../models/user"));
/* Validate if email exist in users database */
const uniqueUserEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existEmail = yield user_1.default.findOne({ email });
    if (existEmail !== null) {
        throw new Error(`The email "${email}" already exists`);
    }
});
exports.uniqueUserEmail = uniqueUserEmail;
/* Validate if email exist in users database */
const existEmailValidation = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existEmail = yield user_1.default.findOne({ email });
    if (existEmail === null) {
        throw new Error(`The email "${email}" does not exist`);
    }
    else {
        const isUserActive = existEmail.status === "active";
        if (!isUserActive) {
            throw new Error(`The user is not active`);
        }
    }
});
exports.existEmailValidation = existEmailValidation;
//# sourceMappingURL=auth.js.map