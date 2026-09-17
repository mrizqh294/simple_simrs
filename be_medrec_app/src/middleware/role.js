export const roleCheck = (...allowedRoles) => {
  return (req, res, next) => {
    const currentUserRole = req.current_user_role;

    if (!allowedRoles.includes(currentUserRole)) {
      return res.status(403).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    next();
  };
};

export default roleCheck;
