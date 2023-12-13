import UserModel from "../models/user";

/* Validate if email exist in users database */
const uniqueUserEmail = async (email: string) => {
  const existEmail = await UserModel.findOne({ email });
  if (existEmail !== null) {
    throw new Error(`The email "${email}" already exists`);
  }
};

export { uniqueUserEmail };
