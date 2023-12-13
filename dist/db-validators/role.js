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
exports.existRoleId = exports.uniqueRoleName = void 0;
const role_1 = __importDefault(require("../models/role"));
/* Validate if role name is unique in database */
const uniqueRoleName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueName = yield role_1.default.findOne({ name });
    if (uniqueName) {
        throw new Error(`The role "${name}" already exists`);
    }
});
exports.uniqueRoleName = uniqueRoleName;
/* Validate if role id exist in database */
const existRoleId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existId = yield role_1.default.findOne({ id });
    if (!existId) {
        throw new Error(`The role with id "${id}" does not exist`);
    }
});
exports.existRoleId = existRoleId;
//# sourceMappingURL=role.js.map