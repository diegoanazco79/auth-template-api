"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// import { check } from "express-validator";
const auth_1 = require("../controllers/auth");
const errorHandlers_1 = require("../utils/errorHandlers");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/invite", [
    // check("email", "Email is required").not().isEmpty(),
    // check("email", "Email is not valid").isEmail(),
    // check("email").custom(uniqueUserEmail),
    // check("firstName", "First name is required").not().isEmpty(),
    // check("lastName", "Last name is required").not().isEmpty(),
    // check("role").custom(existRoleId),
    errorHandlers_1.validateFields,
], auth_1.invitationController);
//# sourceMappingURL=auth.js.map