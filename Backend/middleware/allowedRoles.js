export function allowRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.sendStatus(403);
    }
    next();
  };
}
