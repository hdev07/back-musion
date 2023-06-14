import { Router } from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById,
  getEventsByIdMuseum,
} from "../controllers/event.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { paramIdValidator } from "../middlewares/validatorManager.js";

const router = Router();

// GET    /api/v1/events                    - Obtener todos los eventos
// GET    /api/v1/events/museum/:id/events - Obtener todos los eventos de un museo
// GET    /api/v1/events/:id                - Obtener un evento por su ID
// POST   /api/v1/events                    - Crear un nuevo evento
// PATCH  /api/v1/events/:id                - Actualizar un evento existente
// DELETE /api/v1/events/:id                - Eliminar un evento existente

// Rutas para los eventos
router.get("/", requireToken, getAllEvents);
router.get("/museum/:id/events", requireToken, getEventsByIdMuseum);
router.get("/:id", requireToken, paramIdValidator, getEventById);
router.post("/", requireToken, createEvent);
router.patch("/:id", requireToken, paramIdValidator, updateEventById);
router.delete("/:id", requireToken, paramIdValidator, deleteEventById);

export default router;
