import { Router } from "express";
import { check } from "express-validator";

import {
  invitationController,
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
  signupController,
  verifyController,
  googleLoginController,
} from "../controllers/auth";

import { existRoleId } from "../db-validators/role";
import { existEmailValidation, uniqueUserEmail } from "../db-validators/auth";
import { validateFields } from "../utils/errorHandlers";

const router = Router();

router.post(
  "/auth/signup",
  [
    check("email", "Email is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("email").custom(uniqueUserEmail),
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("role").custom(existRoleId),
    validateFields,
  ],
  signupController
);

router.post(
  "/auth/verify",
  [check("token", "Token is required").not().isEmpty(), validateFields],
  verifyController
);

router.post(
  "/auth/invite",
  [
    check("email", "Email is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("email").custom(uniqueUserEmail),
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("role").custom(existRoleId),
    validateFields,
  ],
  invitationController
);

router.post(
  "/auth/register",
  [
    check("token", "Token is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("status", "Not valid status").isIn(["active", "inactive"]),
    validateFields,
  ],
  registerController
);

router.post(
  "/auth/login",
  [
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  loginController
);

router.post(
  "/auth/google-login",
  [
    check("token", "Token is required").not().isEmpty(),
     validateFields
  ],
  googleLoginController
);

router.post(
  "/auth/forgot-password",
  [
    check("email", "Email is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("email").custom(existEmailValidation),
    validateFields,
  ],
  forgotPasswordController
);

router.post(
  "/auth/reset-password",
  [
    check("token", "Token is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  resetPasswordController
);

export { router };
