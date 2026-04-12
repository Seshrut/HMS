import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
    req.username = decoded.username;
    req.role     = decoded.role;
    req.userId   = decoded.userId; // integer — used for DB queries
    next();
  } catch {
    res.sendStatus(403);
  }
}
