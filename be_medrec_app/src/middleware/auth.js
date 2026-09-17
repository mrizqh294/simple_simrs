import { getCurrentUser } from "../lib/auth.js";

const auth = async (req, res, next) => {
  const currentUser = await getCurrentUser(req);

  if (!currentUser) {
    return res.status(401).json({
      success: false,
      message: "Anda belum terautentikasi",
    });
  }

  const role = currentUser.role;

  req.current_user_role = role;

  next();
};

export default auth;
