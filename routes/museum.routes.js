import { Router } from "express";
import {
  getAllMuseums,
  getMuseums,
  getMuseumById,
  createMuseums,
  updateMuseumById,
  deleteMuseumById,
  getCategoriesWithCounts,
} from "../controllers/museum.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  paramIdValidator,
  queryCategoriesValidator,
  queryPaginationValidator,
  querySearchValidator,
  validatorBodyMuseum,
} from "../middlewares/validatorManager.js";
const router = Router();

// GET    /museums/categories get categories of museums
// GET    /museums/           get museums whit pag/search/category
// GET    /museums/all        get all museums
// GET    /museums/:id        get one museum
// POST   /museums/           create museum
// PATCH  /museums/:id        update museum
// DELETE /museums/:id        delete museum

router.get("/categories", requireToken, getCategoriesWithCounts);
router.get(
  "/",
  requireToken,
  querySearchValidator,
  queryPaginationValidator,
  queryCategoriesValidator,
  getMuseums
);
router.get("/all", requireToken, getAllMuseums);
router.get("/:id", requireToken, paramIdValidator, getMuseumById);
router.post("/", requireToken, validatorBodyMuseum, createMuseums);
router.patch(
  "/:id",
  requireToken,
  paramIdValidator,
  validatorBodyMuseum,
  updateMuseumById
);
router.delete("/:id", requireToken, paramIdValidator, deleteMuseumById);

export default router;
