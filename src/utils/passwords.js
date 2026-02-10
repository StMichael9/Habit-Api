import bcrypt from "bcryptjs";
import env from "../../env.js";

// This is done so passwords are not susceptible to time attacks
export const hashPassword = async (password) => {
  return bcrypt.hash(password, env.BCRYPT_ROUNDS);
};

export const comparePasswords = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
