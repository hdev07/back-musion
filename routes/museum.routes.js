import { Router } from "express";
import {
  getAllMuseums,
  getMuseums,
  getMuseumById,
  createMuseum,
  updateMuseum,
  deleteMuseum,
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
// GET    /museums/           get museums withpag/search/category
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
router.post("/", requireToken, validatorBodyMuseum, createMuseum);
router.patch(
  "/:id",
  requireToken,
  paramIdValidator,
  validatorBodyMuseum,
  updateMuseum
);
router.delete("/:id", requireToken, paramIdValidator, deleteMuseum);

export default router;
