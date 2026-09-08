import { verifyToken } from "./jwt.js";

export const getCurrentUser = async (req) => {
  const token = req.cookies?.token;

  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);

  return payload;
};