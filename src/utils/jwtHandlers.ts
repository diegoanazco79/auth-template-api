import { sign, verify } from "jsonwebtoken";
import { config } from "../config/config";

const JWT_SECRET = config.jwt_secret || "secret";

/* Generate a token */
const generateToken = async (id: string) => {
  const jwt = sign({ id }, JWT_SECRET, { expiresIn: "4h" });
  return jwt;
};

/* Verify a token */
const verifyToken = (jwt: string) => {
  const decoded = verify(jwt, JWT_SECRET);
  return decoded;
};

export { generateToken, verifyToken };
