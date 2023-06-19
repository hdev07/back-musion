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
    .isInt({ min: 1, max: 100 })
    .withMessage(
      "El parámetro 'page' debe ser un número entero mayor o igual a 1 y menor a 100"
    ),
  validationResultExpress,
];

export const queryCategoriesValidator = [
  query("categories")
    .optional()
    .escape()
    .custom((value) => {
      const categories = value.split(",");
      const allowedCategories = [
        "Sin categoría",
        "Antropología",
        "Arqueología",
        "Arte",
        "Arte Alternativo",
        "Ciencia y tecnología",
        "Especializado",
        "Historia",
        "TND",
      ];

      for (const category of categories) {
        if (!allowedCategories.includes(category)) {
          throw new Error(`La categoría '${category}' no es válida`);
        }
      }

      return true;
    }),
  validationResultExpress,
];

export const queryRatingValidator = [
  query("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("El rating debe ser un némero entero entre 1 y 5"),
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
  body("openingHours")
    .isArray({ min: 1 })
    .withMessage("Los horarios son obligatorios"),
  validationResultExpress,
];

export const validatorBodyEvent = [
  body("museum", "El museo es obligatorio").trim().notEmpty(),
  body("museum", "Id museo no valido").isMongoId(),
  body("title", "El titulo es obligatorio").trim().notEmpty(),
  body("description", "La descripcion es obligatoria").trim().notEmpty(),
  body("startDate", "La fecha de inicio es obligatoria").trim().notEmpty(),
  body("startDate", "El campo de inicio debe ser una fecha").isDate(),
  body("endDate", "La fecha de fin es obligatoria").trim().notEmpty(),
  body("endDate", "El campo de fin debe ser una fecha").isDate(),
  body("cost", "El costo es obligatorio").trim().notEmpty(),
  validationResultExpress,
];

export const validatorBodyReview = [
  body("museum", "El museo es obligatorio").trim().notEmpty(),
  body("museum", "Id museo no valido").isMongoId(),
  body("rating", "El rating es obligatorio").trim().notEmpty(),
  body("rating", "El rating debe ser un numero")
    .isNumeric()
    .isInt({ min: 1, max: 5 })
    .withMessage("El rating debe ser un número entre 1 y 5"),
  body("comment", "El comentario es obligatorio").trim().notEmpty(),
  validationResultExpress,
];

export const validatorBodyOpinion = [
  body("name", "El nombre es obligatorio").trim().notEmpty().escape(),
  body("email", "Formato de email incorrecto").trim().isEmail().escape(),
  body("telephone", "Teléfono debe ser numérico o nulo")
    .optional()
    .custom((value, { req }) => {
      if (value === null || value === undefined) {
        return true; // Permite que el campo sea nulo
      }
      if (!/^\d{10}$/.test(value)) {
        throw new Error("Teléfono debe tener una longitud de 10 números");
      }
      return true;
    }),
  body("comment", "El mensaje es obligatorio").trim().notEmpty().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
