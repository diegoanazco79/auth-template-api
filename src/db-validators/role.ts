import RoleModel from "../models/role";

/* Validate if role name is unique in database */
const uniqueRoleName = async (name: string) => {
  const uniqueName = await RoleModel.findOne({ name });
  if (uniqueName) {
    throw new Error(`The role "${name}" already exists`);
  }
};

/* Validate if role id exist in database */
const existRoleId = async (id: string) => {
  const existId = await RoleModel.findOne({ id });
  if (!existId) {
    throw new Error(`The role with id "${id}" does not exist`);
  }
};

export { uniqueRoleName, existRoleId };
