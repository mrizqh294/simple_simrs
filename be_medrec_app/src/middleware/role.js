export const roleCheck = (role) => {
  return (req, res, next) => {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== role) {
      return res.status(403).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    next();
  };
};

export default roleCheck;
