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
exports.deleteRole = exports.putRole = exports.postRole = exports.getAllRoles = void 0;
const uuid_1 = require("uuid");
const role_1 = __importDefault(require("../models/role"));
const errorHandlers_1 = require("../utils/errorHandlers");
/* List all roles */
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield role_1.default.find({}).select("-_id");
        if (response.length === 0) {
            (0, errorHandlers_1.emptyData)(res, "No roles found");
        }
        else
            res.send(response);
    }
    catch (error) {
        (0, errorHandlers_1.handleHttpError)(res, "Error getting all roles");
    }
});
exports.getAllRoles = getAllRoles;
/* Create a new role */
const postRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleData = Object.assign({ id: (0, uuid_1.v4)() }, req.body);
        const response = yield role_1.default.create(roleData);
        res.send(response);
    }
    catch (error) {
        (0, errorHandlers_1.handleHttpError)(res, "Error creating role");
    }
});
exports.postRole = postRole;
/* Update a role */
const putRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield role_1.default.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        res.send(response);
    }
    catch (error) {
        (0, errorHandlers_1.handleHttpError)(res, "Error updating role");
    }
});
exports.putRole = putRole;
/* Delete a role */
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield role_1.default.findOneAndDelete({ id: req.params.id });
        res.send(response);
    }
    catch (error) {
        (0, errorHandlers_1.handleHttpError)(res, "Error deleting role");
    }
});
exports.deleteRole = deleteRole;
//# sourceMappingURL=role.js.map