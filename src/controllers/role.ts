import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";

import RoleModel from "../models/role";

import { emptyData, handleHttpError } from "../utils/errorHandlers";

/* List all roles */
const getAllRoles = async (req: Request, res: Response) => {
  try {
    const response = await RoleModel.find({}).select("-_id");
    if (response.length === 0) {
      emptyData(res, "No roles found");
    } else res.send(response);
  } catch (error) {
    handleHttpError(res, "Error getting all roles");
  }
};

/* Create a new role */
const postRole = async (req: Request, res: Response) => {
  try {
    const roleData = {
      id: uuidv4(),
      ...req.body,
    };
    const response = await RoleModel.create(roleData);
    res.send(response);
  } catch (error) {
    handleHttpError(res, "Error creating role");
  }
};

/* Update a role */
const putRole = async (req: Request, res: Response) => {
  try {
    const response = await RoleModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(response);
  } catch (error) {
    handleHttpError(res, "Error updating role");
  }
};

/* Delete a role */
const deleteRole = async (req: Request, res: Response) => {
  try {
    const response = await RoleModel.findOneAndDelete({ id: req.params.id });
    res.send(response);
  } catch (error) {
    handleHttpError(res, "Error deleting role");
  }
};

export { getAllRoles, postRole, putRole, deleteRole };
