"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// import { check } from "express-validator";
const role_1 = require("../controllers/role");
const errorHandlers_1 = require("../utils/errorHandlers");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", role_1.getAllRoles);
router.post("/", [
    // check("name", "Name is required").not().isEmpty(),
    // check("name", "Name must be unique").custom(uniqueRoleName),
    errorHandlers_1.validateFields,
], role_1.postRole);
router.put("/:id", [
    // check("id").custom(existRoleId),
    // check("name", "Name is required").not().isEmpty(),
    // check("name", "Name must be unique").custom(uniqueRoleName),
    errorHandlers_1.validateFields,
], role_1.putRole);
router.delete("/:id", [
    // check("id").custom(existRoleId), 
    errorHandlers_1.validateFields
], role_1.deleteRole);
//# sourceMappingURL=role.js.map