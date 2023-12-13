import { CustomValidator } from "express-validator";

import UserModel from "../models/user";

/* Validate if email exist in users database */
const uniqueUserEmail: CustomValidator = async (email: string) => {
  const existEmail = await UserModel.findOne({ email });
  if (existEmail !== null) {
    throw new Error(`The email "${email}" already exists`);
  }
};

export { uniqueUserEmail };
