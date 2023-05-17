import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: "Demasiadas peticiondes desde tu IP, intenta de nuevo en un minuto",
  standardHeaders: true,
  legacyHeaders: false,
});
