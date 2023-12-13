import { Schema, model } from "mongoose";

import { User } from "../interfaces/user";

const UserSchema = new Schema<User>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: true,
    },
    role: {
      type: String,
      ref: "roles",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model("users", UserSchema);

export default UserModel;
