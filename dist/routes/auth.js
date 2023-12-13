"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const role_1 = require("../db-validators/role");
const auth_2 = require("../db-validators/auth");
const errorHandlers_1 = require("../utils/errorHandlers");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/auth/invite", [
    (0, express_validator_1.check)("email", "Email is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Email is not valid").isEmail(),
    (0, express_validator_1.check)("email").custom(auth_2.uniqueUserEmail),
    (0, express_validator_1.check)("firstName", "First name is required").not().isEmpty(),
    (0, express_validator_1.check)("lastName", "Last name is required").not().isEmpty(),
    (0, express_validator_1.check)("role").custom(role_1.existRoleId),
    errorHandlers_1.validateFields,
], auth_1.invitationController);
router.post("/auth/register", [
    (0, express_validator_1.check)("token", "Token is required").not().isEmpty(),
    (0, express_validator_1.check)("password", "Password is required").not().isEmpty(),
    (0, express_validator_1.check)("status", "Not valid status").isIn(["active", "inactive"]),
    errorHandlers_1.validateFields,
], auth_1.registerController);
router.post("/auth/login", [
    (0, express_validator_1.check)("email", "Email is required").not().isEmpty(),
    (0, express_validator_1.check)("password", "Password is required").not().isEmpty(),
    errorHandlers_1.validateFields,
], auth_1.loginController);
router.post("/auth/forgot-password", [
    (0, express_validator_1.check)("email", "Email is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Email is not valid").isEmail(),
    (0, express_validator_1.check)("email").custom(auth_2.existEmailValidation),
    errorHandlers_1.validateFields,
], auth_1.forgotPasswordController);
//# sourceMappingURL=auth.js.map