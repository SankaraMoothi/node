import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.body[0].token;

  jwt.verify(token, process.env.SECRET_KEY);
  next();
};
