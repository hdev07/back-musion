import { Router } from "express";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../controllers/favorites.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { paramIdValidator } from "../middlewares/validatorManager.js";
const router = Router();

// GET    /api/v1/favorites       get all favorites
// POST   /api/v1/favorites       create  favorites
// DELETE /api/v1/favorites/:id   remove  favorites

router.get("/", requireToken, getFavorites);
router.post("/", requireToken, addToFavorites);
router.delete("/:id", requireToken, paramIdValidator, removeFromFavorites);

export default router;
