import { Router } from "express";
import {
  getEvents,
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByIdMuseum,
} from "../controllers/event.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  paramIdValidator,
  queryPaginationValidator,
  querySearchValidator,
  validatorBodyEvent,
} from "../middlewares/validatorManager.js";

const router = Router();

// GET    /events/           - get events whit pag/search/startDate
// GET    /events/all        - get all events
// GET    /events/museum/:id - get all events for id museum
// GET    /events/:id        - get one event
// POST   /events/           - create event
// PATCH  /events/:id        - update event
// DELETE /events/:id        - delete event

// Rutas para los eventos
router.get(
  "/",
  requireToken,
  querySearchValidator,
  queryPaginationValidator,
  getEvents
);
router.get("/all", requireToken, getAllEvents);
router.get("/museum/:id", requireToken, paramIdValidator, getEventsByIdMuseum);
router.get("/:id", requireToken, paramIdValidator, getEventById);
router.post("/", requireToken, validatorBodyEvent, createEvent);
router.patch(
  "/:id",
  requireToken,
  paramIdValidator,
  validatorBodyEvent,
  updateEvent
);
router.delete("/:id", requireToken, paramIdValidator, deleteEvent);

export default router;
