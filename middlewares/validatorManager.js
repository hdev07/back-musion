import { validationResult, body } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validationBodyRegister = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Password debe tener al menos 8 caracteres")
    .trim()
    .isLength({ min: 8 }),
  body("password", "Formato de password incorrecto").custom(
    (value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("Passwords no coinciden");
      }
      return value;
    }
  ),
  validationResultExpress,
];

export const validationBodyLogin = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Password debe tener al menos 8 caracteres")
    .trim()
    .isLength({ min: 8 }),
  validationResultExpress,
];
