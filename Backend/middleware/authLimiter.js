// Rate limiting disabled for development/testing
// To re-enable in production, replace with the commented code below:
//
// import rateLimit from "express-rate-limit";
// export const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 10,
//   message: { message: "Too many attempts, please try again later" },
//   standardHeaders: true,
//   legacyHeaders: false,
// });

export const authLimiter = (req, res, next) => next(); // passthrough — no limit
