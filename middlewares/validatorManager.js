import { validationResult, body, param, query } from "express-validator";

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

export const querySearchValidator = [
  query("search")
    .trim()
    .escape()
    .isLength({ max: 30 })
    .withMessage("El parámetro 'search' debe tener como máximo 30 caracteres"),
  validationResultExpress,
];

export const queryPaginationValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "El parámetro 'page' debe ser un número entero mayor o igual a 1"
    ),
  validationResultExpress,
];

export const queryCategoriesValidator = [
  query("categories").optional().escape(),
  // .custom((value) => {
  //   const categories = value.split(",");
  //   // Agregar la ista de categorías permitidas
  //   const allowedCategories = ["categoria1", "categoria2", "categoria3"];

  //   for (const category of categories) {
  //     if (!allowedCategories.includes(category)) {
  //       throw new Error(`La categoría '${category}' no es válida`);
  //     }
  //   }

  //   return true;
  // }),
  validationResultExpress,
];

export const validationBodyRegister = [
  body("name", "El nombre es obligatorio").trim().notEmpty(),
  body("email", "Formato de email incorrecto").trim().isEmail(),
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
