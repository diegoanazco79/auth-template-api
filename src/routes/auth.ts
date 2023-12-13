import { Router } from "express";
// import { check } from "express-validator";

import { invitationController } from "../controllers/auth";

import { existRoleId } from "../db-validators/role";
import { uniqueUserEmail } from "../db-validators/auth";
import { validateFields } from "../utils/errorHandlers";

const router = Router();

router.post(
  "/invite",
  [
    // check("email", "Email is required").not().isEmpty(),
    // check("email", "Email is not valid").isEmail(),
    // check("email").custom(uniqueUserEmail),
    // check("firstName", "First name is required").not().isEmpty(),
    // check("lastName", "Last name is required").not().isEmpty(),
    // check("role").custom(existRoleId),
    validateFields,
  ],
  invitationController
);

export { router };
