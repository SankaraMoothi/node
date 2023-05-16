import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET_KEY);
  next();
};
