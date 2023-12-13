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

router.get("/role", getAllRoles);

router.post(
  "/role",
  [
    check("name", "Name is required").not().isEmpty(),
    check("name", "Name must be unique").custom(uniqueRoleName),
    validateFields,
  ],
  postRole
);

router.put(
  "role/:id",
  [
    check("id").custom(existRoleId),
    check("name", "Name is required").not().isEmpty(),
    check("name", "Name must be unique").custom(uniqueRoleName),
    validateFields,
  ],

  putRole
);

router.delete(
  "role/:id",
  [check("id").custom(existRoleId), validateFields],
  deleteRole
);

export { router };
