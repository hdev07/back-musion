import { Router } from "express";
import {
  getAllMuseums,
  getMuseums,
  getMuseumById,
  createMuseums,
  updateMuseumById,
  deleteMuseumById,
} from "../controllers/museum.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  paramIdValidator,
  // queryCategoriesValidator,
  queryPaginationValidator,
  querySearchValidator,
  validatorBodyMuseum,
} from "../middlewares/validatorManager.js";
const router = Router();

// GET    /api/v1/museums       get museums whit pagination/search/category
// GET    /api/v1/museums/all   get all museums
// GET    /api/v1/museums/:id   get one museum
// POST   /api/v1/museums       create museum
// PATCH  /api/v1/museums/:id   update museum
// DELETE /api/v1/museums/:id   delete museum

router.get(
  "/",
  requireToken,
  querySearchValidator,
  queryPaginationValidator,
  // queryCategoriesValidator,
  getMuseums
);
router.get("/all", getAllMuseums);
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
