import { Router } from "express";
import { check } from "express-validator";

import {
  deleteRole,
  getAllRoles,
  postRole,
  putRole,
} from "../controllers/role";

import { existRoleId, uniqueRoleName } from "../db-validators/role";
import { validateFields } from "../utils/errorHandlers";

const router = Router();

router.get("/", getAllRoles);

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("name", "Name must be unique").custom(uniqueRoleName),
    validateFields,
  ],
  postRole
);

router.put(
  "/:id",
  [
    check("id").custom(existRoleId),
    check("name", "Name is required").not().isEmpty(),
    check("name", "Name must be unique").custom(uniqueRoleName),
    validateFields,
  ],

  putRole
);

router.delete(
  "/:id",
  [check("id").custom(existRoleId), validateFields],
  deleteRole
);

export { router };
