import { Router } from "express";
import {
  getAllFavorites,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  getFavoritesById,
} from "../controllers/favorites.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  paramIdValidator,
  queryPaginationValidator,
  querySearchValidator,
} from "../middlewares/validatorManager.js";
const router = Router();

// GET    /api/v1/favorites       get favorites whit pagination/search/category
// GET    /api/v1/favorites/all   get all favorites
// GET    /api/v1/favorites/:id   get one favorites
// POST   /api/v1/favorites       create  favorites
// DELETE /api/v1/favorites/:id   remove  favorites

router.get(
  "/",
  requireToken,
  querySearchValidator,
  queryPaginationValidator,
  // queryCategoriesValidator,
  getFavorites
);
router.get("/all", requireToken, getAllFavorites);
router.get("/:id", requireToken, paramIdValidator, getFavoritesById);
router.post("/", requireToken, addToFavorites);
router.delete("/:id", requireToken, paramIdValidator, removeFromFavorites);

export default router;
