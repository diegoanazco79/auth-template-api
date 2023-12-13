import { hash, compare } from "bcryptjs";

/* Encrypt a password with hash */
const encrypt = async (password: string) => {
  const passwordHash = await hash(password, 8);
  return passwordHash;
};

/* Verify if match a normal password with password hash */
const verify = async (password: string, passwordHash: string) => {
  const isCorrect = await compare(password, passwordHash);
  return isCorrect;
};

export { encrypt, verify };
