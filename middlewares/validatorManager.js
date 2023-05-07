import { validationResult, body, param } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const paramIdValidator = [
  param("id")
    .trim()
    .escape()
    .isMongoId()
    .withMessage("Formato de id incorrecto"),
  validationResultExpress,
];

export const validationBodyRegister = [
  body("name", "El nombre es obligatorio").trim().notEmpty(),
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "La contraseña debe tener al menos 8 caracteres")
    .trim()
    .isLength({ min: 8 }),
  body("password", "Formato de contraseña incorrecto").custom(
    (value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("Las contraseñas no coinciden");
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
  validationResultExpress,
];

export const validatorBodyMuseum = [
  body("name", "El nombre es obligatorio").trim().notEmpty(),
  body("description", "La descripcion es obligatoria").trim().notEmpty(),
  body("image", "La imagen es obligatoria").trim().notEmpty(),
  body("coordinates.lat", "La coordenada latitud es obligatoria")
    .trim()
    .notEmpty(),
  body(
    "coordinates.lat",
    "La coordenada latitud tiene que ser numerica"
  ).isNumeric(),
  body("coordinates.lng", "La coordenada longitud es obligatoria")
    .trim()
    .notEmpty(),
  body(
    "coordinates.lng",
    "La coordenada longitud tiene que ser numerica"
  ).isNumeric(),
  body("openingHours", "Los horarios son obligatorios").trim().notEmpty(),
  validationResultExpress,
];
