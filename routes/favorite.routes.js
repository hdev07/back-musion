import { Router } from "express";
import {
  getFavorites,
  getAllFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../controllers/favorite.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  queryPaginationValidator,
  querySearchValidator,
  queryCategoriesValidator,
  paramIdValidator,
} from "../middlewares/validatorManager.js";
const router = Router();

// GET    /favorites/      get favorites whit pag/search/category
// GET    /favorites/all   get all favorites
// POST   /favorites/      create  favorites
// DELETE /favorites/:id   remove  favorites

router.get(
  "/",
  requireToken,
  querySearchValidator,
  queryPaginationValidator,
  queryCategoriesValidator,
  getFavorites
);
router.get("/all", requireToken, getAllFavorites);
router.post("/", requireToken, addToFavorites);
router.delete("/:id", requireToken, paramIdValidator, removeFromFavorites);

export default router;
