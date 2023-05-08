import { Router } from "express";
import {
  getMuseums,
  getMuseumById,
  createMuseums,
  updateMuseumById,
  deleteMuseumById,
} from "../controllers/museum.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  paramIdValidator,
  validatorBodyMuseum,
} from "../middlewares/validatorManager.js";
const router = Router();

// GET    /api/v1/museum       get all museum
// GET    /api/v1/museum/:id   get one museum
// POST   /api/v1/museum       create museum
// PATCH  /api/v1/museum/:id   update museum
// DELETE /api/v1/museum/:id   delete museum

router.get("/", requireToken, getMuseums);
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

//ADD THIS MUSEUMS|
// MIDE - MUSEO INTERACTIVO DE ECONOMIA
// BELLAS ARTES
// RIPLEY
// CERA
// SOUMAYA
// JUMEX
