import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";
export const requireToken = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) throw new Error("Token no válido");

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;

    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
  }
};
