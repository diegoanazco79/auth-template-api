import { Schema, model } from "mongoose";

import { Role } from "../interfaces/role";

const RoleSchema = new Schema<Role>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RoleModel = model("roles", RoleSchema);

export default RoleModel;
