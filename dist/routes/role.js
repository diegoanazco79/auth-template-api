"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const role_1 = require("../controllers/role");
const role_2 = require("../db-validators/role");
const errorHandlers_1 = require("../utils/errorHandlers");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", role_1.getAllRoles);
router.post("/", [
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("name", "Name must be unique").custom(role_2.uniqueRoleName),
    errorHandlers_1.validateFields,
], role_1.postRole);
router.put("/:id", [
    (0, express_validator_1.check)("id").custom(role_2.existRoleId),
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("name", "Name must be unique").custom(role_2.uniqueRoleName),
    errorHandlers_1.validateFields,
], role_1.putRole);
router.delete("/:id", [(0, express_validator_1.check)("id").custom(role_2.existRoleId), errorHandlers_1.validateFields], role_1.deleteRole);
//# sourceMappingURL=role.js.map