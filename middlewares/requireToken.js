import jwt from "jsonwebtoken";
export const requireToken = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) throw new Error("Token no válido");

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;

    next();
  } catch (error) {
    const errors = {
      "invalid signature": "La firma del JWT no es válida",
      "jwt expired": "JWT expirado",
      "invalid token": "Token no válido",
      "jwt malformed": "JWT formato no válido",
    };

    return res.status(401).send({ error: errors[error.message] });
  }
};
