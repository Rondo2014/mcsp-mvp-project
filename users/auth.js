import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

export const hashPasswordMiddleware = (req, res, next) => {
  if (
    req.body.password &&
    req.originalUrl !== "/users/login" &&
    req.originalUrl !== "/users/password"
  ) {
    bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ err: "Error hashing password" });
      }
      req.body.password = hashedPassword;
      next();
    });
  } else {
    next();
  }
};

export function validateToken(token, secretKey) {
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return { valid: true, decodedToken };
  } catch (err) {
    return { valid: false, decodedToken: null };
  }
}

export function isValidPassword(username, password) {
  return bcrypt.compareSync(password, user.password);
}
